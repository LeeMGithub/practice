import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { DropdownModule, CalendarModule, ButtonModule, PanelModule } from 'primeng/primeng';
import { CascadeSelectModule } from '../common/components/casadeselect/cascadeselect'
import {InputTextareaModule} from 'primeng/inputtextarea';

import { RmaManageRoutingModule } from './rma-manage-routing.module';
import { DbgmanageComponent } from './dbgmanage/dbgmanage.component';
import { ProductmanageComponent } from './productmanage/productmanage.component';
import { SitemanageComponent } from './sitemanage/sitemanage.component';
import { DetailmanageComponent } from './detailmanage/detailmanage.component';
import { RmaContainerComponent } from './component/rmacontainer/rmacontainer.component';

@NgModule({
  declarations: [RmaContainerComponent,DbgmanageComponent, ProductmanageComponent, SitemanageComponent, DetailmanageComponent],
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    NgxEchartsModule,
    RmaManageRoutingModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    InputTextareaModule,
    CascadeSelectModule,
    PanelModule
  ]
})
export class RmaManageModule { }
