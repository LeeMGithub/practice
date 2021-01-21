import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from 'src/app/system/model/user-info';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  //用户信息
  userInfo:UserInfo = new UserInfo();
  //现地名
  siteName = [];
  //用户状态
  enabled = [];

  //dialog的可视状态
  state: boolean;
 
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.siteName = [
      'B1','B2','B3','B4','B5',
      'B6','B7','B8','B9','B10',
      'B11','BMDT','TM1'
    ];
    this.enabled = ['启用','禁用'];
  }
  //保存按钮点击事件
  save(){
    this.http.put('/api/user-manager/userinfo/edituser',this.userInfo).subscribe(
      (res) => {
        this.cancel();
      },
      (error) => {
        console.log(error);
      }
    );
  }
  //取消按钮事件
  cancel(){
    this.state = false;
  }
}
