import { Injectable } from '@angular/core';
import { environment} from 'src/environments/environment';

@Injectable()
export class LoginService {

    // private user = JSON.parse(localStorage.getItem('currentUser'));
    private userName;
    private userId;
    private userGroupName;
    private siteName;
    private uiName;
    private userFactory;
    private userDepartment;
    private permission:Map<string,string> = new Map<string,string>();

    getUserName(): string {
        return this.userName == null ? JSON.parse(localStorage.getItem(environment.currentUser)).userName : this.userName;
    }

    getUserId(): string {
        return this.userId == null ? JSON.parse(localStorage.getItem(environment.currentUser)).userID : this.userId;
    }

    getUserGroup(): string {
        return this.userGroupName == null ? JSON.parse(localStorage.getItem(environment.currentUser)).userGroupName : this.userGroupName;
    }

    getSiteName(): string {
        return this.siteName == null ? JSON.parse(localStorage.getItem(environment.currentUser)).userSiteName : this.siteName;
    }

    getUiName(): string {
        return this.uiName == null ? JSON.parse(localStorage.getItem(environment.currentUser)).uiName : this.uiName;
    }

    getUserFactory(): string {
        return this.userFactory == null ? JSON.parse(localStorage.getItem(environment.currentUser)).userFactory : this.userFactory;
    }

    getUserDepartment(): string {
        return this.userDepartment == null ? JSON.parse(localStorage.getItem(environment.currentUser)).userDepartment : this.userDepartment;
    }

    //key值是menu表中caption列的值
    getPermission(key:string):string{
        let result = localStorage.getItem("permission");
        if(result == null){
            result = "000000000000000";
        }else{
            result = JSON.parse(localStorage.getItem("permission"))[key]||"000000000000000";
        }
        return result;
    }

    setPermission(key:string,value:string){
        this.permission = localStorage.getItem("permission") == null?this.permission:JSON.parse(localStorage.getItem("permission"));
        this.permission[key] = value;
        localStorage.setItem("permission",JSON.stringify(this.permission));
    }
}
