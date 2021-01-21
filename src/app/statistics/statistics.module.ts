import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticsRoutingModule } from './statistics-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { ReportLoadComponent } from './report-load/report-load.component';
import { MenuClickComponent } from './menu-click/menu-click.component';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';
import { TableModule } from 'primeng/table';
import { InputTextModule, ButtonModule, PanelModule, PaginatorModule, CalendarModule, ChartModule } from 'primeng/primeng';
import { TranslateModule } from '@ngx-translate/core';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [UserLoginComponent, ReportLoadComponent, MenuClickComponent, AnalysisPageComponent],
  imports: [
    CommonModule,
    StatisticsRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    TranslateModule,
    PaginatorModule,
    CalendarModule,
    ChartModule,
    NgxEchartsModule
  ]
})
export class StatisticsModule { }
