import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuInfo } from 'src/app/system/model/menu-info';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  //父菜单标识
  allParentIdIsNotLeaf: string[] = [];

  //dialog的可视状态
  state: boolean;

  //菜单信息
  menu: MenuInfo = new MenuInfo();
 
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getAllParentIdIsNotLeaf();
    this.state = false;
  }

  //保存按钮点击事件
  save(){
    this.http.put('/api/menu-manage/menuinfo/editmenu',this.menu).subscribe(
      (res) => {
        this.cancel();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //取消按钮事件
  cancel(){
    this.state = false;
    this.menu = new MenuInfo();
  }

  //获取所有的父菜单项
  getAllParentIdIsNotLeaf(){
    const url = '/api/menu-manage/menuinfo/allParentIdIsNotLeaf';
    this.http.get(url).subscribe(
      (res) => {
        this.allParentIdIsNotLeaf = <string[]>res;
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
