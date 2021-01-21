import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { MenuClickComponent } from './menu-click/menu-click.component';
import { ReportLoadComponent } from './report-load/report-load.component';
import { AnalysisPageComponent } from './analysis-page/analysis-page.component';

const routes: Routes = [
  {
    path: 'userlogin',
    component: UserLoginComponent,
    data: {
      tabLabel: 'userlogin',
      destroy:true
    }
  },
  {
    path: 'menuclick',
    component: MenuClickComponent,
    data: {
      tabLabel: 'menuclick',
      destroy:true
    }
  },
  {
    path: 'reportload',
    component: ReportLoadComponent,
    data: {
      tabLabel: 'reportload',
      destroy:true
    }
  },
  {
    path: 'analysispage',
    component: AnalysisPageComponent,
    data: {
      tabLabel: 'analysispage',
      destroy:true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticsRoutingModule { }
