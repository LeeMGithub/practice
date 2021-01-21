import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomeManagerComponent } from './custome-manager/custome-manager.component';
import { RoleManagerComponent } from './role-manager/role-manager.component';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';

const routes: Routes = [
  {
    path: 'userview',
    component: UserManagerComponent,
    data: {
      tabLabel: '用户管理',
      destroy:true
    }
  },
  {
    path: 'menuview',
    component: MenuManagerComponent,
    data: {
      tabLabel: '菜单管理',
      destroy:true
    }
  },
  {
    path: 'roleview',
    component: RoleManagerComponent,
    data: {
      tabLabel: '角色管理',
      destroy:true
    }
  },
  {
    path: 'custommenuview',
    component: CustomeManagerComponent,
    data: {
      tabLabel: '自定义快捷菜单管理',
      destroy:true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
