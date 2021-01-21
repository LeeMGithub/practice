import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { CustomeManagerComponent } from './custome-manager/custome-manager.component';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { AddNewMenuComponent } from './menu-manager/dialog/add-new-menu/add-new-menu.component';
import { EditMenuComponent } from './menu-manager/dialog/edit-menu/edit-menu.component';
import { MenuLinkRoleComponent } from './menu-manager/dialog/menu-link-role/menu-link-role.component';
import { RoleManagerComponent } from './role-manager/role-manager.component';
import { AddNewRoleComponent } from './role-manager/dialog/add-new-role/add-new-role.component';
import { EditRoleComponent } from './role-manager/dialog/edit-role/edit-role.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { AddNewUserComponent } from './user-manager/dialog/add-new-user/add-new-user.component';
import { EditUserComponent } from './user-manager/dialog/edit-user/edit-user.component';
import { UserLinkMenuComponent } from './user-manager/dialog/user-link-menu/user-link-menu.component';
import { UserLinkMenuSiteComponent } from './user-manager/dialog/user-link-menu-site/user-link-menu-site.component';
import { UserLinkMenuSiteFactoryComponent } from './user-manager/dialog/user-link-menu-site-factory/user-link-menu-site-factory.component';
import { UserLinkRoleComponent } from './user-manager/dialog/user-link-role/user-link-role.component';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule, DialogModule, TreeModule, PickListModule,FileUploadModule} from 'primeng/primeng';
// import { CommonComponentModule } from '../common-component/common-component.module';
import { BatchImportComponent } from './user-manager/dialog/batch-import/batch-import.component';

@NgModule({
  declarations: [CustomeManagerComponent, MenuManagerComponent, AddNewMenuComponent, EditMenuComponent, MenuLinkRoleComponent, RoleManagerComponent, AddNewRoleComponent, EditRoleComponent, UserManagerComponent, AddNewUserComponent, EditUserComponent, UserLinkMenuComponent, UserLinkMenuSiteComponent, UserLinkMenuSiteFactoryComponent, UserLinkRoleComponent,BatchImportComponent],
  imports: [
    CommonModule,
    SystemRoutingModule,
    PanelModule,
    FormsModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    DialogModule,
    TreeModule,
    PickListModule,
    FileUploadModule,
    // CommonComponentModule,
  ]
})
export class SystemModule { }
