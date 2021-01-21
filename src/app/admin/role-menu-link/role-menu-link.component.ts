import { Component, OnInit } from '@angular/core';
import { RoleMenuLink } from '../model/RoleMenuLink';
// import { ApiService } from '../../common/service/api/api.service';
// import { BreadcrumbService } from '@breadcrumb/service/breadcrumb.service';
// import { TabService } from 'core/layout/retab/service/tab.service';
import { MenuInfo } from '../model/MenuInfo';
import { SelectItem } from 'primeng/api';
import { ApiService } from 'bidm-web';

@Component({
  selector: 'app-role-menu-link',
  templateUrl: './role-menu-link.component.html',
  styleUrls: ['./role-menu-link.component.css']
})
export class RoleMenuLinkComponent implements OnInit {

  dropdown_roleId:string="";
  roleMenuLinkList:RoleMenuLink[];
  display:boolean;
  roleList:SelectItem[];
  allMenu:MenuInfo[];
  unAsignMenuList:MenuInfo[];
  asignMenuList:MenuInfo[];
  asignMenuList_:MenuInfo[];//cash asign menu for unpdate
 
  // tips
  tip_:string;
  
  constructor(private service: ApiService) {}

  ngOnInit() {      
    this.setAllMenu();
  }  
//role list
  getAllRole(){
       this.service.get('/userrolelink/getRoleList/').subscribe(
        (res) => {
          this.roleList = <SelectItem[]>res;
          const params = {"label":"Select","value":"Select"};

          this.roleList.unshift(<SelectItem>params);
        },
        (error) => {
          console.log(error);
        }
      );
   }

// cash menu list
  setAllMenu(){
    if(this.allMenu == undefined){
      this.service.get('/menuinfo/getAllAvalidMenu/').subscribe(
        (res) => {
          this.allMenu = <MenuInfo[]>res;
         },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  getAllMenu(){
    return this.allMenu;
  }
  // dropdown event
  selectHandle(){
    //获取右侧列表
    const options = {
      params:{"roleId":this.dropdown_roleId}
    };
    this.service.get('/rolemenulink/getSignedMenu',options).subscribe(
        (res) => {
          this.asignMenuList = <MenuInfo[]>res;
          this.asignMenuList_ = this.asignMenuList.slice();
          //获取左侧列表
           this.getUNAsignMenuList();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getUNAsignMenuList(){
    const array_ = new Array<string>();
    this.asignMenuList.forEach((menu)=>{
      array_.push(menu.menuId);
    });

      this.unAsignMenuList = this.allMenu.filter(function(menu){
          return !array_.includes(menu.menuId);
      });
       
  }

  showDialog(){
    this.display = !this.display; 

    this.getAllRole();
    this.setAllMenu();
  }

  saveChange(){
     const options = {
       "asignMenuList_":this.asignMenuList_,"asignMenu":this.asignMenuList,"roleId":this.dropdown_roleId
    };
      this.service.put('/rolemenulink/update/saveChange',options).subscribe(
      (res) => { 
          if(res==0){
            this.tip_ = "保存成功";
            setTimeout(()=>{this.tip_=""},3000);
           }
      },
      (error) => {    
      }
    ) 
  }

}
