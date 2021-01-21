import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RoleInfo } from 'src/app/system/model/role-info';

@Component({
  selector: 'app-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

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
    this.http.put('/api/role-manage/roleinfo/editrole',this.role).subscribe(
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
    this.role = new RoleInfo();
  }

}
