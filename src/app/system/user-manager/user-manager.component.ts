import { UserInfo } from './../model/user-info';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { AddNewUserComponent } from './dialog/add-new-user/add-new-user.component';
import { UserLinkMenuComponent } from './dialog/user-link-menu/user-link-menu.component';
import { UserLinkMenuSiteComponent } from './dialog/user-link-menu-site/user-link-menu-site.component';
import { BatchImportComponent } from './dialog/batch-import/batch-import.component';
import { UserLinkRoleComponent } from './dialog/user-link-role/user-link-role.component';
import { Router } from '@angular/router';
import { MenuClickService } from 'src/app/service/menu-click.service';

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class UserManagerComponent implements OnInit {

  @ViewChild(AddNewUserComponent) addNewUserChild: AddNewUserComponent;
  @ViewChild(UserLinkMenuComponent) userLinkMenuChild: UserLinkMenuComponent;
  @ViewChild(UserLinkMenuSiteComponent) userLinkMenuSiteChild: UserLinkMenuSiteComponent;
  @ViewChild(UserLinkRoleComponent) userLinkRoleChild: UserLinkRoleComponent;
  @ViewChild(BatchImportComponent) batchImportChild: BatchImportComponent;

  //每页的用户信息
  pageData: UserInfo[];

  //在输入框中输入的用户账号
  account: string;

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
  selectedUser: UserInfo;

  constructor(private http: HttpClient, private router: Router, private mcs: MenuClickService) {
    this.mcs.menuClick(this.router.url);
  }

  ngOnInit() {
    this.cols = [
      { field: 'username', header: '用户姓名' },
      { field: 'userAccount', header: '用户账号' },
      { field: 'siteName', header: '现地' },
      { field: 'email', header: '邮箱' },
      { field: 'phone', header: '手机号码' }
    ];
    this.init();
  }

  //页面初始化
  init() {
    this.rows = 25;
    this.getTotalRecords();
    this.getDataPerPage(0, 25);
  }

  // table页数改变事件
  onPageChange(event) {
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    this.getDataPerPage(event.first, event.rows);
  }

  //选中table行事件
  onRowSelect(event) {
    this.isTableSelected = false;
    //this.editUserChild.userInfo = event.data;
    this.userLinkRoleChild.userInfo = event.data;
    this.userLinkMenuChild.userInfo = event.data;
    this.userLinkMenuSiteChild.userInfo = event.data;
    this.selectedUser = event.data;
  }

  //tabel取消选中事件
  onRowUnselect(event) {
    this.isTableSelected = true;
  }

  //获取每页的数据
  getDataPerPage(index: number, rows: number) {
    this.isTableSelected = true;
    const url = '/api/user-manager/userinfo/pagedata/' + index + '/' + rows;
    this.http.get(url).subscribe(
      (res) => {
        this.pageData = <UserInfo[]>res;
      }
    );
  }

  //获取全部记录数
  getTotalRecords() {
    this.http.get('/api/user-manager/userinfo/totalrecords').subscribe(
      (res) => {
        this.totalRecords = res;
      }
    );
  }

  // 查询按钮事件
  queryClickMethod() {
    if (this.account == '' || this.account == null) {
      this.totalRecords = this.getTotalRecords();
      this.getDataPerPage(0, 25);
    }
    else {
      this.isTableSelected = true;
      const url = '/api/user-manager/userinfo/account/' + this.account;
      this.http.get(url).subscribe(
        (res) => {
          if (res != null) {
            this.pageData = [];
            this.pageData.push(<UserInfo>res);
            this.totalRecords = 1;
          }
          else {
            this.systemPromptState = true;
          }
        }
      );
    }
  }

  //新增按钮事件
  addClickMethod() {
    this.addNewUserChild.state = true;
  }

  //删除按钮事件
  deleteClickMethod() {
    const url = '/api/user-manager/userinfo/deleteuser/' + this.selectedUser.userAccount;
    this.http.delete(url).subscribe(
      (res) => {
        this.init();
      }
    );
  }

  //关联角色
  userLinkRoleMethod() {
    this.userLinkRoleChild.state = true;
    this.userLinkRoleChild.initSource();
    this.userLinkRoleChild.initTarget();
  }

  //关联菜单
  userLinkMenuMethod() {
    this.userLinkMenuChild.state = true;
    this.userLinkMenuChild.initNodes();
  }

  //关联现地
  userLinkMenuSiteMethod() {
    this.userLinkMenuSiteChild.state = true;
    this.userLinkMenuSiteChild.initNodes();
  }

  //重置权限按钮事件
  resetMenthod() {
    const url = '/api/user-manager/reset/' + this.selectedUser.userAccount;
    this.http.delete(url).subscribe(
      (res) => {
        this.userLinkMenuChild.cancel();
        this.userLinkMenuSiteChild.cancel();
        this.userLinkRoleChild.cancel();
      }
    );
  }

  importClickMethod() {
    this.batchImportChild.state = true;
  }

  exportExecl() {
    window.location.href = '/api/user-manager/excel';
  }

  statehHandler(e) { }
}
