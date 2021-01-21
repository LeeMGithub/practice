import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogManageRoutingModule } from './log-manage-routing.module';
import { LoginAnalysisComponent } from './login-analysis/login-analysis.component';
import { LoginInfoComponent } from './login-info/login-info.component';
import { MenuClickInfoComponent } from './menu-click-info/menu-click-info.component';
import { PageviewComponent } from './pageview/pageview.component';
import { FormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, CalendarModule, ProgressSpinnerModule } from 'primeng/primeng';
import { TableModule } from 'primeng/table';
// import { CommonComponentModule } from '../common-component/common-component.module';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [LoginAnalysisComponent, LoginInfoComponent, MenuClickInfoComponent, PageviewComponent],
  imports: [
    CommonModule,
    LogManageRoutingModule,
    FormsModule,
    PanelModule,
    ButtonModule,
    PaginatorModule,
    CalendarModule,
    TableModule,
    ProgressSpinnerModule,
    // CommonComponentModule,
    NgxEchartsModule
  ]
})
export class LogManageModule { }
