import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { FullscreenComponent } from 'bidm-web';
import { LoginComponent } from './login/login.component';
// import { HomepageComponent } from './homepage/homepage.component';
// import { HomepageNewComponent } from './homepagenew/homepagenew.component';
import { AuthGuard } from './guards/auth.guard';
// import { BoPortalComponent } from './bo-portal/bo-portal.component';
// import { WebsysComponent } from './websys/websys.component';
import { SsoComponent } from './sso/sso.component';

export const routes: Routes = [
  { path: '', redirectTo: 'boe', pathMatch: 'full' },
  {
    path: 'boe',
    component: AppComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
      },
      {
        path: 'log',
        loadChildren: './statistics/statistics.module#StatisticsModule'
      },
      {
        path: 'homepage',
        loadChildren: './homepage/homepage.module#HomepageModule'
      },
      // {
      //   path: 'homepagenew',
      //   component: HomepageNewComponent,
      //   data: {
      //     tabLabel: '首页',
      //     destroy: true
      //   }
      // },
      {
        path: 'emcsystemmanage',
        loadChildren: './system/system.module#SystemModule'
      },
      {
        path: 'emclogmanage',
        loadChildren: './log-manage/log-manage.module#LogManageModule'
      },
      {
        path: 'statistics',
        loadChildren: './statistics/statistics.module#StatisticsModule'
      },
      {
        path: 'import',
        loadChildren: './importdata/importdata.module#ImportdataModule'
      },
      {
        path: 'copqmanage',
        loadChildren: './copq/copq.module#CopqModule'
      },
      {
        path: 'rmamanage',
        loadChildren: './rma-manage/rma-manage.module#RmaManageModule'
      },
      // {
      //   path: 'outersys/BoPortal',
      //   component: BoPortalComponent,
      //   data: {
      //     tabLabel: 'BoPortal',
      //     destroy: true
      //   }
      // },
      // {
      //   path: 'outersys/Websys',
      //   component: WebsysComponent,
      //   data: {
      //     tabLabel: '透明化平台',
      //     destroy: true
      //   }
      // },

    ],
  },
  {
    path: 'login',
    component: FullscreenComponent,
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'sso',
    component: FullscreenComponent,
    children: [
      { path: '', component: SsoComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);
