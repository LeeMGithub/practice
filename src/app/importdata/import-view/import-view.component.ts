import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuClickService } from 'src/app/service/menu-click.service';
import { FormatDateService } from 'src/app/service/format-date.service';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'bidm-web';
import { ImportDataComponent } from '../dialog/import-data/import-data.component';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-import-view',
  templateUrl: './import-view.component.html',
  styleUrls: ['./import-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImportViewComponent implements OnInit {

  @ViewChild(ImportDataComponent) importUpphChild: ImportDataComponent;
  //表格的列
  colsd: any[];
  colss: any[];
  colsq: any[];

  //表格数据
  datad: any;
  datas: any;
  dataq: any;

  //关键参数
  // currentDate;
  loading: boolean;
  index;
  cn: any
  date: Date = new Date()
  yearList: object
  selectedYear: string = '2020'
  constructor(private apiService: ApiService, private router: Router, private mcs: MenuClickService, private dateFormat: FormatDateService, private http: HttpClient) {
    this.mcs.menuClick(this.router.url);
  }

  ngOnInit() {
    this.yearList = [
      { label: '2018', value: '2018' },
      { label: '2019', value: '2019' },
      { label: '2020', value: '2020' },
      { label: '2021', value: '2021' }
    ]
    this.cn = {
      firstDayOfWeek: 0,
      dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
      dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
      monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
      today: '今日',
      clear: '清除'
    };
    this.loading = true;
    this.colsd = [
      { field: 'time', header: '时间 ' },
      { field: 'terrain', header: '现地' },
      { field: 'goal', header: '目标' }
    ];

    this.colss = [
      { field: 'year', header: '年份 ', width: '10%' },
      { field: 'quarter', header: '季度', width: '10%' },
      { field: 'month', header: '月份', width: '10%' },
      { field: 'terrain', header: '现地', width: '10%' },
      { field: 'oneSubject', header: '一级科目', width: '10%' },
      { field: 'twoSubject', header: '二级科目', width: '20%' },
      { field: 'threeSubject', header: '三级科目 ', width: '20%' },
      { field: 'amount', header: '三级科目金额(元)', width: '10%' }
    ];

    this.colsq = [
      { field: 'year', header: '年份 ', width: '10%' },
      { field: 'quarter', header: '季度', width: '10%' },
      { field: 'month', header: '月份', width: '10%' },
      { field: 'sbu', header: 'SBU', width: '20%' },
      { field: 'terrain', header: '现地', width: '20%' },
      { field: 'ratio', header: 'COPQ比例（%）', width: '20%' }
    ];

    this.index = 0;
    this.search()
  }
  //加载现地
  // loadconditionss() {
  // const url = '/api/getLinkedSite/' + this.mcs.buildRouterLink(this.router.url);
  // this.http.get(url).subscribe(
  //   res => {
  //     this.selectedSite = res['currentSite'];
  //     this.siteName = res['linkedSite'];
  //     let temp = [];
  //     for(let site of this.siteName){
  //       //if(site != 'B7' && site != 'B11'){
  //         temp.push(site);
  //       //}
  //     }
  //     this.siteName = temp;
  //     this.siteName = [];
  //     for(let item of temp){
  //       this.siteName.push({label: item,value: item});
  //     }
  //     this.search();
  //   }
  // )
  // }
  //日期
  // dateClickHandle(event) {
  //   this.currentDate = event;
  // }

  search() {
    this.loading = true;
    const url = '/copq/excel/list?year=2020';
    this.apiService.get(url).subscribe(
      (res) => {
        console.log(res);
        this.datad = res.goal
        this.datas = res.subject
        this.dataq = res.sbu
      }
    );
    this.loading = false;
  }

  onTabChange(event) {
    this.index = event.index;
    // this.search();
  }

  importClickMethod() {
    this.importUpphChild.state = true;
  }
  //导入返回数据
  onPassData(event) {
    //goal
    this.datad = event.goal
    //科目表 subject
    this.datas = event.subject
    this.dataq = event.sbu
    this.loading = false
  }

}
