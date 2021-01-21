import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuClickInfo } from '../model/menu-click-info';
import { Paginator } from 'primeng/primeng';
import { ApiService } from 'bidm-web';

@Component({
  selector: 'app-menu-click',
  templateUrl: './menu-click.component.html',
  styleUrls: ['./menu-click.component.css']
})
export class MenuClickComponent implements OnInit {
  menuClickInfo = {};
  menuId: string = "";
  userAccount: string = "";
  userName: string = "";
  menuClickInfoList: MenuClickInfo[];
  startTime: Date;
  endTime: Date;
  //
  @ViewChild('p') paginator: Paginator;
  rows = 6;
  totalRecords = 0;
  rowsPerPageOptions = [6, 10, 20];
  pageInfo = { pageRow: this.rows, startRow: 0 };

  constructor(private service: ApiService) {

    this.endTime = new Date();
    this.startTime = new Date(this.endTime.getTime() - 60 * 60 * 24 * 1000);
  }

  ngOnInit() {
    this.getMenuClickInfo();
  }

  getMenuClickInfo() {
    this.getPageCount();

    const options = {
      params: {
        menuId: this.menuId,
        userAccount: this.userAccount,
        userName: this.userName,
        startTime: this.startTime.getTime(),
        endTime: this.endTime.getTime(),
        pageRow: this.pageInfo['pageRow'],
        startRow: this.pageInfo['startRow']
      }
    };
    this.service.get('/userlog/menuclick/pagenate', options).subscribe(
      (res) => {
        this.menuClickInfoList = <MenuClickInfo[]>res;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getPageCount() {
    const url = '/userlog/menuclick/count';
    const options = {
      params: {
        startTime: this.startTime.getTime(),
        endTime: this.endTime.getTime(),
        menuId: this.menuId,
        userAccount: this.userAccount,
        userName: this.userName
      }
    };
    this.service.get(url, options).subscribe(
      (res) => {
        this.totalRecords = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  paginate(event) {
    this.pageInfo.pageRow = event['rows'];
    this.pageInfo.startRow = event['first'];
    this.search(event.page + 1);
    this.getMenuClickInfo();
  }

  search(page) {
  }

}
