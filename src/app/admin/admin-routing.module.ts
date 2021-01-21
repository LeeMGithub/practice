import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { MenuComponent } from './menu/menu.component';
import { RoleComponent } from './role/role.component';
import { UserRoleLinkComponent } from './user-role-link/user-role-link.component';
import { RoleMenuLinkComponent } from './role-menu-link/role-menu-link.component';
import { FavoritemenuComponent } from './favoritemenu/favoritemenu.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    data: {
      tabLabel: 'home',
      destroy:false
    }
  },
  {
    path: 'user',
    component: UserComponent,
    data: {
      tabLabel: 'user',
      destroy:true
    }
  },
  {
    path: 'menu',
    component: MenuComponent,
    data: {
      tabLabel: 'menu',
      destroy:true
    }
  },
  {
    path: 'role',
    component: RoleComponent,
    data: {
      tabLabel: 'role',
      destroy:true
    }
  },
  {
    path: 'favoritemenu',
    component: FavoritemenuComponent,
    data: {
      tabLabel: 'favoritemenu',
      destroy:true
    }
  },
  {
    path: 'userRoleLink',
    component: UserRoleLinkComponent,
    data: {
      tabLabel: 'Admin - userRoleLink',
      destroy:true
    }
  },
  {
    path: 'roleMenuLink',
    component: RoleMenuLinkComponent,
    data: {
      tabLabel: 'Admin - roleMenuLink',
      destroy:true
    }
  }  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
