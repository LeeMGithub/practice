import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from 'src/app/system/model/user-info';

@Component({
  selector: 'app-user-link-role',
  templateUrl: './user-link-role.component.html',
  styleUrls: ['./user-link-role.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserLinkRoleComponent implements OnInit {

  //dialog的状态
  state: boolean;

  source: string[];
    
  target: string[];
  
  //菜单信息
  userInfo: UserInfo = new UserInfo();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.state = false;
  }

  //初始化源数据
  initSource(){
    const url = '/api/user-manager/find-unlinked-rolename/' + this.userInfo.userAccount;
    this.http.get(url).subscribe(
      (res) => {
        this.source = <string[]>res;
      }
    );
  }

  //初始化目标数据
  initTarget(){
    const url = '/api/user-manager/find-linked-rolename/' + this.userInfo.userAccount;
    this.http.get(url).subscribe(
      (res) => {
        this.target = <string[]>res;
      }
    );
  }

  //保存按钮事件
  save(){
    const url = '/api/user-manager/userlinkrole/' + this.userInfo.userAccount;
    this.http.post(url, this.target).subscribe(
      (res) => {
        this.cancel();
      }
    );
  }

  //取消按钮事件
  cancel(){
    this.state = false;
  }

}
