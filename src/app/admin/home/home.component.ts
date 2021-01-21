import { Component, OnInit } from '@angular/core';
import { MenuInfo } from '../model/MenuInfo';
import { environment } from 'src/environments/environment';
import { ApiService } from 'bidm-web';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userAccount:string;
  favoriteMenuList:MenuInfo[];
  topMenuInfoList:MenuInfo[];

  path_:string = environment.boePath;

  constructor(private service: ApiService) { }

  ngOnInit() {
    this.userAccount = JSON.parse(localStorage.getItem("currentUser")).userCode;
    this.getFavoriteMenu();
    this.getTop6MenuByuser();
  }

  getFavoriteMenu(){
    const options = {
      params: {
        userAccount:this.userAccount
      }
    };
    this.service.get('/menuinfo/getFavoriteMenuByuser/',options).subscribe(
      (res) => {
        this.favoriteMenuList = <MenuInfo[]>res;
      },
      (error) => {
        console.log(error);
      }
    )
  }

  getTop6MenuByuser(){
    const options = {
      params: {
        userAccount:this.userAccount
      }
    };
    this.service.get('/menuinfo/getTop6MenuByuser/',options).subscribe(
      (res) => {
        this.topMenuInfoList = <MenuInfo[]>res;
      },
      (error) => {
        console.log(error);
      }
    )
  }

}
