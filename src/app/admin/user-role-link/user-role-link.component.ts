import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { UserRoleLink } from '../model/UserRoleLink';
// import { ApiService } from '../../common/service/api/api.service';
import { RetabService, ApiService } from 'bidm-web';
//  import { BreadcrumbService } from '@breadcrumb/service/breadcrumb.service';
// import { TabService } from 'core/layout/retab/service/tab.service';
 
@Component({
  selector: 'app-user-role-link',
  templateUrl: './user-role-link.component.html',
  styleUrls: ['./user-role-link.component.css']
})

export class UserRoleLinkComponent implements OnInit {

  userList:SelectItem[];
  roleList:SelectItem[];
  seach_userAccount:string = "";
  seach_roleId:string = "";
  userRoleLink:UserRoleLink = new UserRoleLink();

  userRoleLinkList:UserRoleLink[];

  display:boolean;
 
  dialogUserRoleLink:UserRoleLink = new UserRoleLink();
  
  dropdown_userAccount:string;
  dropdown_roleId:string;

  constructor(private service: ApiService,
    // private breadcrumbService: BreadcrumbService, 
    public tService: RetabService
  ) {
    // this.breadcrumbService.setItems([
    //   { label: 'Admin' },
    //   { label: 'userrole' },
    // ]);

    //this.tService.setItems('Admin-userrole'); 
  }

  ngOnInit() {
    this.getUserRoleLink();
  }

  showDialog(){
    const params = {"label":"Select","value":"Select"};
    this.display = !this.display; 
    //init user , role
       this.service.get('/userrolelink/getUserList/').subscribe(
        (res) => {
           this.userList = <SelectItem[]>res;  
           this.userList.unshift(<SelectItem>params); 
        },
        (error) => {
          console.log(error);
        }
      )
       this.service.get('/userrolelink/getRoleList/').subscribe(
        (res) => {
          this.roleList = <SelectItem[]>res;
          this.roleList.unshift(<SelectItem>params);
        },
        (error) => {
          console.log(error);
        }
      );     
  }
  getUserRoleLink(){ 
 
    const options = {
      params:{"userAccount":this.seach_userAccount,"roleId":this.seach_roleId}
    };
    this.service.get('/userrolelink/selectUserRoleLink/',options).subscribe(
      (res) => {
        this.userRoleLinkList = <UserRoleLink[]>res;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  addUserRoleLink(){ 
    this.dialogUserRoleLink.roleId=this.dropdown_roleId;
    this.dialogUserRoleLink.userAccount = this.dropdown_userAccount;
    this.service.post('/userrolelink/insert/userRoleLink',this.dialogUserRoleLink).subscribe(
      (res) => { 
        //if(res == 1){
          this.userRoleLinkList.push(this.dialogUserRoleLink);          
          this.dialogHide();
        //}           
      },
      (error) => {    
      }
    ) 
  }

  dialogHide(){
    this.dialogUserRoleLink = null;
    this.dialogUserRoleLink = new UserRoleLink();
  }

   deleteData(obj) {
     this.actionDelete(obj);
  }

  actionDelete(obj) {
    const url = '/userrolelink/delete/deleteUserRoleLink';
    this.userRoleLink = obj;
    const data = { body: this.userRoleLink };
    this.service.delete(url, data).subscribe(
      (res) => {
        var index = this.userRoleLinkList.indexOf(obj);
        this.userRoleLinkList.splice(index,1);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

interface City {
  name: string;
  code: string;
}