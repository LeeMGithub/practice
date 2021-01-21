import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.css']
})
export class AddNewUserComponent implements OnInit {

  userAccount: string;

  //dialog的可视状态
  state: boolean;

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.state = false;
  }
  //保存按钮点击事件
  save(){
    this.http.post('/api/user-manager/userinfo/adduser',this.userAccount).subscribe(
      (res) => {
        if(res['result'] == false){
          alert("该账号已注册,请输入新的账号");
        }
        else{
          this.cancel();
        }
      }
    );
  }
  //取消按钮事件
  cancel(){
    this.state = false;
    this.userAccount = '';
  }
}
