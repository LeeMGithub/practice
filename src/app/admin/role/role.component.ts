import { AdminUtilService } from './../../common/service/admin/admin-util.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { ApiService } from '../../common/service/api/api.service';
import { HttpClient } from '@angular/common/http';
import { RoleInfo } from '../model/RoleInfo';
import { MenuInfo } from '../model/MenuInfo';
// import { BreadcrumbService } from '@breadcrumb/service/breadcrumb.service';
// import { TabService } from '../../../core/layout/retab/service/tab.service';
import { TreeNode, ConfirmationService } from 'primeng/api';
import { RetabService, ApiService } from 'bidm-web';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  roleId:string="";
  roleInfo:RoleInfo = new RoleInfo(); 
  roleInfoList:RoleInfo[];
  display:boolean;
  dialogRoleInfo:RoleInfo = new RoleInfo();
  allMenuInfoList: MenuInfo[];    
  selectMenuInfoList: MenuInfo[];
  tip_:string = "";
 //page
 rows = 10;
 totalRecords = 0;
 rowsPerPageOptions = [10, 15, 20];
 pageInfo = { pageRow: this.rows, startRow: 0 };

  treeData: TreeNode[];
  selectedNodes: TreeNode[];
  tmpArray = [];  //for test 
  tmpSelectedLeafNode = [];
  tmpMenuList = [];//缓存已选的菜单

  constructor(private service: ApiService,private adminService: AdminUtilService,private confirmationService:ConfirmationService,
    private changeDetectorRef: ChangeDetectorRef,
    // private breadcrumbService: BreadcrumbService, 
    public tService: RetabService
  ) {
    // this.breadcrumbService.setItems([
    //   { label: 'Admin' },
    //   { label: 'role' },
    // ]);

    //this.tService.setItems('Admin-role');
   }
  ngOnInit() {   
    this.getRoleInfo();
  }

  showDialog(){
    this.display = !this.display;   
  }
  getRoleInfo(){ 
    //clear tree
    this.roleInfo.roleId = "";
    this.getPageCount();  
    const options = {
      params: {
        roleId: this.roleId,
        pageRow: this.pageInfo['pageRow'],
        startRow: this.pageInfo['startRow']
      }
    };

    this.service.get('/roleinfo/selectAllRole/',options).subscribe(
      (res) => {
        this.roleInfoList = <RoleInfo[]>res;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  updateRoleInfo(obj){ 
    this.service.put('/roleinfo/update/updateRoleInfo',obj).subscribe(
      (res) => {            
      },
      (error) => {    
      }
    )    
  }

  addRoleInfo(){ 
    this.dialogRoleInfo.state=true;
    this.service.post('/roleinfo/insert/roleInfo',this.dialogRoleInfo).subscribe(
      (res) => { 
       // if(res == 1){
        this.roleInfoList.push(this.dialogRoleInfo);          
        this.dialogHide();
        this.totalRecords = this.totalRecords + 1;
        this.changeDetectorRef.detectChanges();
       // }           
      },
      (error) => {    
      }
    ) 
  }

  dialogHide(){
    this.dialogRoleInfo = null;
    this.dialogRoleInfo = new RoleInfo();
  }

  deleteData(obj) {
    this.confirmationService.confirm({
      message: '确定要删除角色 ' + obj.roleId + ' 吗?',
      accept: () => {
        this.actionDelete(obj);
      }
    }); 
 }

 actionDelete(obj) {
   const url = '/roleinfo/delete/deleteRoleInfo';
   this.roleInfo = obj;
   const data = { body: this.roleInfo };
   this.service.delete(url, data).subscribe(
     (res) => {
       var index = this.roleInfoList.indexOf(obj);
       this.roleInfoList.splice(index,1);
       this.totalRecords = this.totalRecords - 1;
       this.changeDetectorRef.detectChanges();
     },
     (error) => {
       console.log(error);
     }
   );
 }

  onRowSelect(event) {
    this.setTree();
  }

  setTree() {
    this.service.get("/menuinfo/getmenutree").subscribe(
      (data) => {
        this.treeData = data['items'];
        this.setSelectTree();//初始化已选择菜单
      }
    );
  }

  setSelectTree() {
    this.tmpArray = [];
    this.tmpMenuList = [];
    if (this.roleInfo == null || this.roleInfo.roleId == "") {
      return;
    }
    const options = {
      params:{"menuId":this.roleInfo.roleId}
    };
    this.service.get("/menuinfo/getasignmenutree", options).subscribe(
      (res) => {
         this.tmpMenuList = res;
           this.treeData.forEach(element => {
            if(this.tmpMenuList.includes(element.data)){
              this.selectedTreeNode(element);
            }
          });
         this.selectedNodes = this.tmpArray;
       }
    );
  }

 
  // tree function
  selectedTreeNode(node: TreeNode) {
      if(this.tmpMenuList.includes(node.data)){
        this.tmpArray.push(node);
        if (node.children) {
          node.children.forEach(childNode => {
            this.selectedTreeNode(childNode);
          });
        }  
      }
 
  }
 
  nodeUnselect(event){
  }
  nodeSelect(event) {   
  }
  
 setLeafNode(node){ 
     if(node.parent){
      if(!this.tmpSelectedLeafNode.includes(node.parent.data)){
        this.tmpSelectedLeafNode.push(node.parent.data);
        this.setLeafNode(node.parent)
      } 
     }        
 }
  // init select menu
  selectMenu(node) {
    if (!this.tmpSelectedLeafNode.includes(node.data)) {
      this.tmpSelectedLeafNode.push(node.data);
    }
  }
  saveRoleMenu() {
    this.tmpSelectedLeafNode = [];
    this.selectedNodes.forEach(elem => { //获取所有已选节点的目录节点
      if (!elem.children) {
        this.setLeafNode(elem);
      }
      else //获取所有非目录节点
      {
        this.selectMenu(elem);
      }
    });
    //获取所有选择的菜单
    this.selectedNodes.forEach(elem => {
      this.selectMenu(elem);
    });

     const options = {
      "menuList": this.tmpSelectedLeafNode, "tmpMenuList": this.tmpMenuList, "roleId": this.roleInfo.roleId
    };

    this.service.put('/rolemenulink/update/saverolemenu', options).subscribe(
      (res) => {
        if (res === 0) {
          this.tmpMenuList = this.tmpSelectedLeafNode.splice(0);
          this.tip_ = "保存成功";
          setTimeout(() => { this.tip_ = "" }, 3000);          
        }
      },
      (error) => {
      }
    )
  }

  getPageCount() {
    const url = '/roleinfo/getcount';
    const options = {
      params: {
        roleId: this.roleId
      }
    };
    this.service.get(url, options).subscribe(
      (res) => {
        this.totalRecords = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  paginate(event) {
    this.pageInfo.pageRow = event['rows'];
    this.pageInfo.startRow = event['first'];
    this.getRoleInfo();
  }
}
