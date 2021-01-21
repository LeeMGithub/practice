import { MenuClickService } from 'src/app/service/menu-click.service';

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormatDateService } from 'src/app/service/format-date.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-custome-manager',
  templateUrl: './custome-manager.component.html',
  styleUrls: ['./custome-manager.component.css']
})
export class CustomeManagerComponent implements OnInit {
  option = {};
  monthList = [];
  echartTheme;

  loading: boolean = true;

  //日期
  date: Date;

  //现地
  siteName = [];
  selectedSite: string;
  //数据
  data;
  monthlist: any[];


  constructor(private router: Router, private mcs: MenuClickService,
    private http: HttpClient, private format: FormatDateService) {
    this.mcs.menuClick(this.router.url);
  }

  ngOnInit() {
    this.echartTheme = environment.echartTheme;
    this.loadData();
  }
  //加载数据
  loadData() {
    const url = 'api/ssTest/getSSTest/'
    this.http.get(url).subscribe(
      res => {
        if (res != null) {
          this.data = res;
        }
      }
    );
  }
  queryClickMethod() {
    this.loading = true;
    this.loadData();
  }

}
