import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { UserInfo } from '../model/UserInfo';
import { RoleInfo } from '../model/RoleInfo';
import { ConfirmationService, SelectItem, DialogService } from 'primeng/api';
import { RetabService, ApiService, Md5Service, PwdModifyComponent } from 'bidm-web';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserComponent implements OnInit {

  userAccount:string = "";
  userName:string = "";
  userInfo:UserInfo = new UserInfo();
  userInfoList:UserInfo[];
  display:boolean;
  dialogUserInfo:UserInfo = new UserInfo();

  allRole:RoleInfo[];
  unAsignRoleList:RoleInfo[];
  asignRoleList:RoleInfo[];
  asignRoleList_:RoleInfo[];//cash asign menu for unpdate
  userAccount_:string="";// cash select row
  // tips
  tip_:string='';
  //page
  rows = 10;
  totalRecords = 0;
  rowsPerPageOptions = [10, 15, 20];
  pageInfo = { pageRow: this.rows, startRow: 0 };

  searchConditions: any[];
  userTypeItems: SelectItem[];
  // pwdChangeDialogVisible: boolean = false;
  // pwdChangeDialogTitle: string;
  // pwdChangeValue = {
  //   account: "",
  //   pwd1: "",
  //   pwd2: ""
  // };
  // pwdChangeHintVisible: boolean = false;
  // pwdChangeHint: string;

  constructor(
    private service: ApiService,
    private confirmationService:ConfirmationService,
    private changeDetectorRef: ChangeDetectorRef,
    // private breadcrumbService: BreadcrumbService,
    public tService: RetabService,
    private md5: Md5Service,
    private dialog: DialogService
  ) {
    // this.breadcrumbService.setItems([
    //   { label: 'Admin' },
    //   { label: 'user' },
    // ]);

   // this.tService.setItems('Admin-user');
  }

  ngOnInit() {
    this.searchConditions = [
      {
        label: "admin.useraccount",
        type: "text",
        placeholder: "",
        id: "useraccount",
        model: "userAccount"
      },
      {
        label: "admin.username",
        type: "text",
        placeholder: "",
        id: "username",
        model: "userName"
      }
    ];

    this.userTypeItems = [
      { label: '默认', value: 0 },
      { label: '不超时', value: 1 }
    ];

    this.getUserInfo();
  }

  showDialog(){
    this.display = !this.display;
  }

  showPwdChangeDialog(userInfo) {
    this.dialog.open(PwdModifyComponent, {
      header: '修改密码' + " - " + userInfo.userName,
      width: '30%',
      data: {
        userCode: userInfo.userAccount,
        prod: environment.production,
        force: true
      }
    });
  }

  getUserInfo(){
    this.clearPickList();
    this.getPageCount();
    const options = {
      params: {
        userAccount:this.userAccount,
        userName:this.userName,
        pageRow: this.pageInfo['pageRow'],
        startRow: this.pageInfo['startRow']
      }
    };
    this.service.get('/userinfo/selectAllUser/',options).subscribe(
      (res) => {
        this.userInfoList = <UserInfo[]>res;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  updateUserInfo(obj){
    this.service.put('/userinfo/update/updateUserInfo',obj).subscribe(
      (res) => {

      },
      (error) => {
      }
    )
  }

  addUserInfo(){
    if(this.dialogUserInfo.userAccount==null || this.dialogUserInfo.userAccount==""){
      return;
    }
    this.dialogUserInfo.state=true;
    this.service.post('/userinfo/insert/userInfo',this.dialogUserInfo).subscribe(
      (res) => {
        //if(res == 1){
          this.userInfoList.push(this.dialogUserInfo);
          this.dialogHide();
          this.totalRecords = this.totalRecords + 1;
          this.changeDetectorRef.detectChanges();
        //}
      },
      (error) => {
      }
    )
  }

  dialogHide(){
    this.dialogUserInfo = null;
    this.dialogUserInfo = new UserInfo();
  }

   deleteData(obj) {
    this.confirmationService.confirm({
      message: '确定要删除用户 ' + obj.userName + ' 吗?',
      accept: () => {
        this.actionDelete(obj);
      }
    });
  }

  actionDelete(obj) {
    const url = '/userinfo/delete/deleteUserInfo';
    this.userInfo = obj;
    const data = { body: this.userInfo };
    this.service.delete(url, data).subscribe(
      (res) => {
        var index = this.userInfoList.indexOf(obj);
        this.userInfoList.splice(index,1);
        this.totalRecords = this.totalRecords - 1;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //init pick list
  onRowSelect(event) {
    this.userAccount_ = this.userInfo.userAccount;
    this.getAllRole();
  }

  getAllRole(){
    this.service.get('/userrolelink/getRoleList_List/').subscribe(
      (res) => {
        this.allRole = <RoleInfo[]>res;

        this.setPickList(this.userInfo.userAccount);
       },
      (error) => {
        console.log(error);
      }
    );
  }

  setPickList(userAccount_){
    //获取右侧列表
    const options = {
      params:{"userAccount":userAccount_}
    };
    this.service.get('/userrolelink/getAsignedRoleByUserId',options).subscribe(
        (res) => {
          this.asignRoleList = <RoleInfo[]>res;
          this.asignRoleList_ = this.asignRoleList.slice();
          //获取左侧列表
           this.getUNAsignRoleList();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getUNAsignRoleList(){
    const array_ = new Array<string>();
    this.asignRoleList.forEach((role)=>{
       array_.push(role.roleId);
    });

    this.unAsignRoleList = this.allRole.filter(function(role){
           return !array_.includes(role.roleId);
      });

  }

  saveChange(){
    if(this.userAccount_==""){
      return;
    }
    const options = {
      "asignRoleList_":this.asignRoleList_,"asignRole":this.asignRoleList,"userAccount":this.userAccount_
   };
     this.service.put('/userrolelink/update/saveChange',options).subscribe(
     (res) => {
         if(res==0){
           this.tip_ = "保存成功";
           setTimeout(()=>{this.tip_=""},3000);
          }
          else
          {
            this.tip_ = "保存失败，请刷新页面后重新提交";
            setTimeout(()=>{this.tip_=""},3000);
          }
     },
     (error) => {
        this.tip_ = "保存失败，请刷新页面后重新提交";
        setTimeout(()=>{this.tip_=""},3000);
     }
   )
 }

  clearPickList(){
    this.asignRoleList=null;
    this.unAsignRoleList=null;
    this.userAccount_="";
  }

  getPageCount() {
    const url = '/userinfo/getcount';
    const options = {
      params: {
        userAccount:this.userAccount,
        userName:this.userName,
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
    this.getUserInfo();
  }

  searchClick(event) {
    this.userAccount = event['userAccount'];
    this.userName = event['userName'];
    this.getUserInfo();
  }
}
