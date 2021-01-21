import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormatDateService } from 'src/app/service/format-date.service';
import { MenuClickService } from 'src/app/service/menu-click.service';

@Component({
  selector: 'app-pageview',
  templateUrl: './pageview.component.html',
  styleUrls: ['./pageview.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PageviewComponent implements OnInit {

  //当前日期
  currentDate: string;

  cols = [];
  
  data = [];

  constructor(private http: HttpClient, private format: FormatDateService, private router: Router, private mcs: MenuClickService) {
    this.mcs.menuClick(this.router.url);
  }
  
  ngOnInit() {
    //初始化日期
    this.currentDate = this.format.formatYearMonth(new Date());
    this.loadData();
  }


  //获取每页的数据
  loadData(){
    const url = '/api/log-manage/pageview/' + this.currentDate;
    this.http.get(url).subscribe(
      res => {
        this.cols = [];
        for(let col of <any[]>res['cols']){
          const option = {
             field: col,
             header: col
          }
          this.cols.push(option);
        }
        this.data = res['data'];
      }
    )
  }

  //查询按钮事件
  queryClickMethod(){
    this.loadData();
  }

  //日期点击事件
  dateClickHandle(event) {
    this.currentDate = event;
}

}
