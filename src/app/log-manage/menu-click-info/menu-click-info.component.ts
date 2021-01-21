import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MenuClickInfo } from '../model/menu-click-info';
import { Router } from '@angular/router';
import { FormatDateService } from 'src/app/service/format-date.service';
import { MenuClickService } from 'src/app/service/menu-click.service';

@Component({
  selector: 'app-menu-click-info',
  templateUrl: './menu-click-info.component.html',
  styleUrls: ['./menu-click-info.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuClickInfoComponent implements OnInit {

  //每页的日志信息
  pageData: MenuClickInfo[];

  //用户名
  account: string; 
  //开始日期
  startDate: Date;
  //结束日期
  endDate: Date;

  //table的列信息
  cols;
  //table每页的行数
  rows;
  //table的总记录数
  totalRecords;

  //页数改变时的策略
  strategy: string;

  constructor(private http: HttpClient, private format: FormatDateService, private router: Router, private mcs: MenuClickService) {
    this.mcs.menuClick(this.router.url);
  }
  
  ngOnInit() {
    this.cols = [
      { field: 'userAccount', header: '用户账号'},
      { field: 'menuname', header: '菜单名'},
      { field: 'clickDate', header: '点击时间'}
    ];
    this.init();
  }

  //页面初始化
  init(){
    this.strategy = null;
    this.rows = 25;   
    this.startDate = this.format.buildFisrtDayOfMonth(new Date());
    this.endDate = new Date();
    this.getTotalRecords(null);
    this.getDataPerPage(null, 0, 25);
  }

  // table页数改变事件
  onPageChange(event) {
    this.getDataPerPage(this.strategy, event.first, event.rows);
  }

  //获取每页的数据
  getDataPerPage(account: string, index: number, rows: number){
    const start = this.format.formatDate(this.startDate);
    const end = this.format.formatDate(this.endDate);
    const params = {
      account: account,
      startDate: start,
      endDate: end
    }
    const url = '/api/log-manage/menuclick/pagedata/' + index + '/' + rows;
    this.http.post(url, params).subscribe(
      (res) => {
        this.pageData = <MenuClickInfo[]>res;
      }
    );
  }

  //获取全部记录数
  getTotalRecords(account: string){
    const start = this.format.formatDate(this.startDate);
    const end = this.format.formatDate(this.endDate);
    const params = {
      account: account,
    }
    const url = '/api/log-manage/menuclick/totalrecords/' + start + '/' + end;
    this.http.post(url, params).subscribe(
      (res) => {
        this.totalRecords = res;
      }
    );
  }

  //查询按钮事件
  queryClickMethod(){
    if(this.account == '' || this.account == null){
      this.strategy = null;
      this.totalRecords = this.getTotalRecords(null);
      this.getDataPerPage(null, 0, 25);
    }
    else{
      this.strategy = this.account;
      this.totalRecords = this.getTotalRecords(this.account);
      this.getDataPerPage(this.account, 0, 25);
    }
  }
}
