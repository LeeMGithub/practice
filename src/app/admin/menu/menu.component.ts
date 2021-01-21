import { MenuInfo } from '../model/MenuInfo';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { BreadcrumbService } from '@breadcrumb/service/breadcrumb.service';
// import { ApiService } from '../../common/service/api/api.service';
import { HttpClient } from '@angular/common/http';
// import { TabService } from 'core/layout/retab/service/tab.service';
import { AdminUtilService } from '../../common/service/admin/admin-util.service';
import { ConfirmationService } from 'primeng/api';
import { RetabService, ApiService } from 'bidm-web';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  //valid
  //_length_one: RegExp = /^\bN\b|\bY\b$/;
  //
  searchCol;
  menuId: string = "";
  menuInfoList: MenuInfo[];
  menuInfo: MenuInfo;

  dialogMenuInfo: MenuInfo = new MenuInfo();
  display: boolean;
  //
  rows = 10;
  totalRecords = 0;
  rowsPerPageOptions = [10, 15, 20];
  pageInfo = { pageRow: this.rows, startRow: 0 };

  searchConditions: any[];

  constructor(private service: ApiService, private http: HttpClient, private confirmationService: ConfirmationService,
    private changeDetectorRef: ChangeDetectorRef,
    // private breadcrumbService: BreadcrumbService,
    public tService: RetabService
  ) {
    // this.breadcrumbService.setItems([
    //   { label: 'Admin' },
    //   { label: 'menu' },
    // ]);
  }
  ngOnInit() {
    this.searchConditions = [
      {
        label: "admin.menuId",
        type: "text",
        placeholder: "",
        id: "menuId",
        model: "menuId"
      }
    ];

    this.getMenuInfo();
  }

  getMenuInfo() {
    this.getPageCount();
    const options = {
      params: {
        menuId: this.menuId,
        pageRow: this.pageInfo['pageRow'],
        startRow: this.pageInfo['startRow']
      }
    };
    this.service.get('/menuinfo/pagenate', options).subscribe(
      (res) => {
        this.menuInfoList = <MenuInfo[]>res['data'];
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    )
  }

  showDialog() {
    this.display = !this.display;
  }

  updateMenuInfo(obj) {
    this.service.put('/menuinfo/update/updateMenuInfo', obj).subscribe(
      (res) => {
      },
      (error) => {
      }
    )
  }

  addMenuInfo() {
    this.dialogMenuInfo.state = true;
    this.service.post('/menuinfo/insert/menuInfo', this.dialogMenuInfo).subscribe(
      (res) => {
        if (res != null) { //res ==1
          this.menuInfoList.push(this.dialogMenuInfo);
          this.dialogHide();
          this.totalRecords = this.totalRecords + 1;
          this.changeDetectorRef.detectChanges();
        }
      },
      (error) => {
      }
    )
  }

  dialogHide() {
    this.dialogMenuInfo = null;
    this.dialogMenuInfo = new MenuInfo();
  }

  deleteData(obj) {
    this.confirmationService.confirm({
      message: '确定要删除菜单 ' + obj.menuId + ' 吗?',
      accept: () => {
        this.actionDelete(obj);
      }
    });
  }

  actionDelete(obj) {
    const url = '/menuinfo/delete/deleteMenuInfo';
    this.menuInfo = obj;
    const data = { body: this.menuInfo };
    this.service.delete(url, data).subscribe(
      (res) => {
        var index = this.menuInfoList.indexOf(obj);
        this.menuInfoList.splice(index, 1);
        this.totalRecords = this.totalRecords - 1;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPageCount() {
    const url = '/menuinfo/getcount';
    const options = {
      params: {
        menuId: this.menuId
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
    this.getMenuInfo();
  }

  searchClick(event) {
    this.menuId = event['menuId'];
    this.getMenuInfo();
  }
}
