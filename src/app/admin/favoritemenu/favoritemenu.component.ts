import { Component, OnInit } from '@angular/core';
import { MenuInfo } from '../model/MenuInfo';
import { ApiService } from 'bidm-web';

@Component({
  selector: 'app-favoritemenu',
  templateUrl: './favoritemenu.component.html',
  styleUrls: ['./favoritemenu.component.css']
})
export class FavoritemenuComponent implements OnInit {

  userAccount:string = "";
  tip_:string = "";
  selectedValues: string[] = [];
  menuInfoList: MenuInfo[] = [];    
  selectMenuInfoList: MenuInfo[] = [];
  unSelectList:MenuInfo[] = [];
  selectList: MenuInfo[] = [];

 

  constructor(private service: ApiService) { }

  ngOnInit() {
    this.userAccount = JSON.parse(localStorage.getItem("currentUser")).userCode;
    this.setPickList();
  }



  
  setPickList() {
    const options = {
      params: {
        userAccount:this.userAccount
      }
    };
    this.service.get("/menuinfo/getMenuByuser_favorite",options).subscribe(
      (data) => {
        this.menuInfoList = <MenuInfo[]>data;
        this.getSelectList();//初始化已选择菜单        
      }
    );
  }

  getUnSelectList(){
    const array_ = new Array<string>();
    this.selectMenuInfoList.forEach((menu)=>{
       array_.push(menu.menuId);
    });
 
    this.unSelectList = this.menuInfoList.filter(function(menu){
           return !array_.includes(menu.menuId);
      });
  }

  getSelectList() {
   
 
    const options = {
      params: {
        userAccount:this.userAccount
      }
    };
    this.service.get("/menuinfo/getFavoriteMenuByuser", options).subscribe(
      (res) => {
         this.selectMenuInfoList = <MenuInfo[]>res;
         this.selectList = this.selectMenuInfoList.slice();
         this.getUnSelectList();
       }
    );
  }

 
   
  save() {
 
    const options = {
      "selectMenu_cache":this.selectList,"selectMenuInfoList":this.selectMenuInfoList,"userAccount":this.userAccount
   };
     this.service.put('/menuinfo/update/saveChange',options).subscribe(
     (res) => { 
         if(<any>res == 0){
           this.tip_ = "保存成功";
           setTimeout(()=>{this.tip_=""},3000);
         }
     },
     (error) => {    
        this.tip_ = "保存失败，请刷新页面后重新提交";
        setTimeout(()=>{this.tip_=""},3000);
     }
   ) 
  }

}
