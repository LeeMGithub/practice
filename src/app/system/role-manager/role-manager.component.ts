import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { RoleInfo } from '../model/role-info';
import { HttpClient } from '@angular/common/http';
import { AddNewRoleComponent } from './dialog/add-new-role/add-new-role.component';
import { EditRoleComponent } from './dialog/edit-role/edit-role.component';
import { Router } from '@angular/router';
import { MenuClickService } from 'src/app/service/menu-click.service';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RoleManagerComponent implements OnInit {

  @ViewChild(AddNewRoleComponent) addNewRoleChild: AddNewRoleComponent;
  @ViewChild(EditRoleComponent) editRoleChild: EditRoleComponent;

  //每页的角色信息
  pageData: RoleInfo[];

  //在输入框中输入的角色名
  rolename: string;
  
  //table的列信息
  cols;
  //table每页的行数
  rows;
  //table的总记录数
  totalRecords;

  // 查询失败后的dialog状态
  systemPromptState: boolean = false;

  // 是否选择table行
  isTableSelected: boolean = true;
  // table中选中的用户
  selectedRole: RoleInfo;

  constructor(private http: HttpClient,private router: Router, private mcs: MenuClickService) { 
    this.mcs.menuClick(this.router.url);
  }
  
  ngOnInit() {

    this.cols = [
      { field: 'rolename', header: '角色名称', width: '30%'},
      { field: 'description', header: '备注', width: '70%'}
    ];
    this.init();
  }

  //页面初始化
  init(){
    this.rows = 25;
    this.getTotalRecords();
    this.getDataPerPage(0,25);
  }

  // table页数改变事件
  onPageChange(event) {
    this.getDataPerPage(event.first,event.rows);
  }

  //选中table行事件
  onRowSelect(event){
    this.isTableSelected = false;
    this.selectedRole = event.data;
    this.editRoleChild.role = event.data;
  }

  //tabel取消选中事件
  onRowUnselect(event){
    this.isTableSelected = true;
  }

  //获取每页的数据
  getDataPerPage(index: number, rows: number){
    this.isTableSelected = true;
    const url = '/api/role-manage/roleinfo/pagedata/' + index + '/' + rows;
    this.http.get(url).subscribe(
      (res) => {
        this.pageData = <RoleInfo[]>res;
      }
    );
  }

  //获取全部记录数
  getTotalRecords(){
    this.http.get('/api/role-manage/roleinfo/totalrecords').subscribe(
      (res) => {
        this.totalRecords = res;
      }
    );
  }

  //查询按钮事件
  queryClickMethod(){
    if(this.rolename == '' || this.rolename == null){
      this.totalRecords = this.getTotalRecords();
      this.getDataPerPage(0, 25);
    }
    else{
      this.isTableSelected = true;
      const url = '/api/role-manage/roleinfo/rolename/' + this.rolename;
      this.http.get(url).subscribe(
        (res) => {
          if(res != null){
            this.pageData = [];
            this.pageData.push(<RoleInfo>res);
            this.totalRecords = 1;
          }
          else{
            this.systemPromptState = true;
          }
        }
      ); 
    }
  }

  //新增按钮事件
  addClickMethod(){
    this.addNewRoleChild.state = true;
  }

  //编辑按钮事件
  editClickMethod(){
    this.editRoleChild.state = true;
  }
  
  //删除按钮事件
  deleteClickMethod(){
    const url = '/api/role-manage/roleinfo/deleterole/' + this.selectedRole.rolename;
    this.http.delete(url).subscribe(
      (res) => {
        this.init();
      }
    );
  }

}
