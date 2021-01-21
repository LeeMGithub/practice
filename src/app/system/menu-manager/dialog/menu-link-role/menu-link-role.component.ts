import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuInfo } from 'src/app/system/model/menu-info';

@Component({
  selector: 'app-menu-link-role',
  templateUrl: './menu-link-role.component.html',
  styleUrls: ['./menu-link-role.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuLinkRoleComponent implements OnInit {

  //dialog的状态
  state: boolean;

  source: string[];
    
  target: string[];
  
  //菜单信息
  menu: MenuInfo = new MenuInfo();

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.state = false;
  }

  //初始化源数据
  initSource(){
    const url = '/api/menu-manage/find-unlinked-rolename/' + this.menu.menuId;
    this.http.get(url).subscribe(
      (res) => {
        this.source = <string[]>res;
      }
    );
  }

  //初始化目标数据
  initTarget(){
    const url = '/api/menu-manage/find-linked-rolename/' + this.menu.menuId;
    this.http.get(url).subscribe(
      (res) => {
        this.target = <string[]>res;
      }
    );
  }

  //保存按钮事件
  save(){
    const url = '/api/menu-manage/menulinkrole/' + this.menu.menuId;
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
