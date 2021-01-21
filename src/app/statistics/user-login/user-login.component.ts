import { Component, OnInit, ViewChild } from '@angular/core';
import { UserLoginInfo } from '../model/user-login-info';
import { Paginator } from 'primeng/primeng';
import { ApiService } from 'bidm-web';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userAccount: string = "";
  userName: string = "";
  userLoginInfoList: UserLoginInfo[];
  startTime: Date;
  endTime: Date;
  userLoginInfo = {};
  report1_loadTime: string = "";
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
    this.getUserLoginInfo();
  }

  getUserLoginInfo() {
    let http_startTime = new Date();
    this.getPageCount();
    const options = {
      // headers:this.service.getHeaders(),
      params: {
        userAccount: this.userAccount,
        userName: this.userName,
        startTime: this.startTime.getTime(),
        endTime: this.endTime.getTime(),
        pageRow: this.pageInfo['pageRow'],
        startRow: this.pageInfo['startRow'],
        log_reportName: 'test',
        log_menuId: 'userlogin'
      }
    };
    this.service.get('/userlog/tbload/userlogin/pagenate', options).subscribe(
      (res) => {
        this.userLoginInfoList = <UserLoginInfo[]>res;
        let http_endTime = new Date();
        this.report1_loadTime = (http_endTime.getTime() - http_startTime.getTime()) / 1000 + "s";
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getPageCount() {
    const url = '/userlog/userlogin/count';
    const options = {
      params: {
        startTime: this.startTime.getTime(),
        endTime: this.endTime.getTime(),
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
    this.getUserLoginInfo();
  }

  search(page) {
  }

}
