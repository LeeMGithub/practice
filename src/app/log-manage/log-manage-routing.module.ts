import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageviewComponent } from './pageview/pageview.component';
import { LoginAnalysisComponent } from './login-analysis/login-analysis.component';
import { MenuClickInfoComponent } from './menu-click-info/menu-click-info.component';
import { LoginInfoComponent } from './login-info/login-info.component';

const routes: Routes = [
  {
    path: 'logininfo',
    component: LoginInfoComponent,
    data: {
      tabLabel: '登录日志',
      destroy:true
    }
  },
  {
    path: 'menuclickinfo',
    component: MenuClickInfoComponent,
    data: {
      tabLabel: '菜单点击日志',
      destroy:true
    }
  },
  {
    path: 'loginanalysisview',
    component: LoginAnalysisComponent,
    data: {
      tabLabel: '登录分析',
      destroy:true
    }
  },
  {
    path: 'pageview',
    component: PageviewComponent,
    data: {
      tabLabel: '菜单访问量',
      destroy:true
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogManageRoutingModule { }
