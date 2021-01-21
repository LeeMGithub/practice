import { RoleInfo } from './../../../model/role-info';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-new-role',
  templateUrl: './add-new-role.component.html',
  styleUrls: ['./add-new-role.component.css']
})
export class AddNewRoleComponent implements OnInit {

  //dialog的可视状态
  state: boolean;

  //角色信息
  role: RoleInfo = new RoleInfo();
 
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.state = false;
  }

  //保存按钮点击事件
  save(){
    this.http.post('/api/role-manage/roleinfo/addrole',this.role).subscribe(
      (res) => {
        if(res['result'] == false){
          alert("该角色已注册,请输入新的角色");
        }
        else{
          this.cancel();
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //取消按钮事件
  cancel(){
    this.state = false;
    this.role = new RoleInfo();
  }

}
