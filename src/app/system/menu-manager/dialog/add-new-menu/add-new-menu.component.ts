import { MenuInfo } from './../../../model/menu-info';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-new-menu',
  templateUrl: './add-new-menu.component.html',
  styleUrls: ['./add-new-menu.component.css']
})
export class AddNewMenuComponent implements OnInit {

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
    this.http.post('/api/menu-manage/menuinfo/addmenu',this.menu).subscribe(
      (res) => {
        if(res['result'] == false){
          alert("该菜单标识已注册,请输入新的菜单标识");
        }
        else{
          this.cancel();
        }
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
