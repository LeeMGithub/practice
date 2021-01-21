import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuInfo } from '../model/menu-info';
import { AddNewMenuComponent } from './dialog/add-new-menu/add-new-menu.component';
import { EditMenuComponent } from './dialog/edit-menu/edit-menu.component';
import { MenuLinkRoleComponent } from './dialog/menu-link-role/menu-link-role.component';
import { Router } from '@angular/router';
import { MenuClickService } from 'src/app/service/menu-click.service';

@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuManagerComponent implements OnInit {

  @ViewChild(AddNewMenuComponent) addNewMenuChild: AddNewMenuComponent;
  @ViewChild(EditMenuComponent) editMenuChild: EditMenuComponent;
  @ViewChild(MenuLinkRoleComponent) menuLinkRoleChild: MenuLinkRoleComponent;

  //每页的菜单信息
  pageData: MenuInfo[];

  //在输入框中输入的菜单名称
  menuId: string;
  
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
  selectedMenu: MenuInfo;

  constructor(private http: HttpClient, private router: Router, private mcs: MenuClickService) { 
    this.mcs.menuClick(this.router.url);
  }
  
  ngOnInit() {

    this.cols = [
      { field: 'menuId', header: '菜单标识', width: '20%'},
      { field: 'chinese', header: '中文菜单', width: '12%'},
      { field: 'routerLink', header: '菜单URL', width: '18%'},
      { field: 'parentId', header: '父菜单标识', width: '16%'},
      { field: 'icon', header: '菜单图标', width: '10%'},
      { field: 'sort', header: '排序字段', width: '10%'},
      { field: 'desc', header: '备注', width: '14%'}
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
    this.selectedMenu = event.data;
    this.editMenuChild.menu = event.data;
    this.menuLinkRoleChild.menu = event.data;
  }

  //tabel取消选中事件
  onRowUnselect(event){
    this.isTableSelected = true;
  }

  //获取每页的数据
  getDataPerPage(index: number, rows: number){
    this.isTableSelected = true;
    const url = '/api/menu-manage/menuinfo/pagedata/' + index + '/' + rows;
    this.http.get(url).subscribe(
      (res) => {
        this.pageData = <MenuInfo[]>res;
      }
    );
  }

  //获取全部记录数
  getTotalRecords(){
    this.http.get('/api/menu-manage/menuinfo/totalrecords').subscribe(
      (res) => {
        this.totalRecords = res;
      }
    );
  }

  //查询按钮事件
  queryClickMethod(){
    if(this.menuId == '' || this.menuId == null){
      this.totalRecords = this.getTotalRecords();
      this.getDataPerPage(0, 25);
    }
    else{
      this.isTableSelected = true;
      const url = '/api/menu-manage/menuinfo/menuid/' + this.menuId;
      this.http.get(url).subscribe(
        (res) => {
          if(res != null){
            this.pageData = [];
            this.pageData.push(<MenuInfo>res);
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
    this.addNewMenuChild.state = true;
  }

  //编辑按钮事件
  editClickMethod(){
    this.editMenuChild.state = true;
  }

  //删除按钮事件
  deleteClickMethod(){
    const url = '/api/menu-manage/menuinfo/deletemenu/' + this.selectedMenu.menuId;
    this.http.delete(url).subscribe(
      (res) => {
        this.init();
      }
    );
  }

  //关联用户按钮事件
  menuLinkRoleMethod(){
    this.menuLinkRoleChild.state = true;
    this.menuLinkRoleChild.initSource();
    this.menuLinkRoleChild.initTarget();
  }
}
