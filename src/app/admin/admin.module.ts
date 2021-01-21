import { AdminUtilService } from './../common/service/admin/admin-util.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UserComponent } from './user/user.component';
import { RoleComponent } from './role/role.component';
import { MenuComponent } from './menu/menu.component';
import { UserRoleLinkComponent } from './user-role-link/user-role-link.component';
import { RoleMenuLinkComponent } from './role-menu-link/role-menu-link.component';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { InputTextModule, DialogModule, ListboxModule, SelectButtonModule, InputSwitchModule, DropdownModule, MessageModule, MessagesModule, CardModule, PasswordModule } from 'primeng/primeng';
// import { ApiService } from '../common/service/api/api.service';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {PickListModule} from 'primeng/picklist';
import {KeyFilterModule} from 'primeng/keyfilter';
import { TranslateModule } from '@ngx-translate/core';
import {TreeModule} from 'primeng/tree';
import {PanelModule} from 'primeng/panel';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {PaginatorModule} from 'primeng/paginator';
import {ConfirmationService } from 'primeng/api';
import { ApiService, Md5Service, ComponentModule, LayoutModule } from 'bidm-web';
import { FavoritemenuComponent } from './favoritemenu/favoritemenu.component';
import { HomeComponent } from './home/home.component';
import { CommonToolsService } from '../common/service/common.tools.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    TableModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    DataTableModule,
    SharedModule,
    PickListModule ,
    ListboxModule,
    SelectButtonModule,
    InputSwitchModule,
    DropdownModule,
    KeyFilterModule,
    MessageModule,
    MessagesModule,
    TranslateModule,
    TreeModule,
    PanelModule,
    ConfirmDialogModule,
    PaginatorModule,
    CardModule,
    ComponentModule,
    PasswordModule,
    LayoutModule
  ],
  declarations: [UserComponent, RoleComponent, MenuComponent, UserRoleLinkComponent, RoleMenuLinkComponent, FavoritemenuComponent, HomeComponent],
  providers:[ApiService,AdminUtilService,ConfirmationService,CommonToolsService,Md5Service]
})
export class AdminModule { }
