import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChartAComponent} from './chart-a/chart-a.component';
import { HomeComponent} from './home/home.component'
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      tabLabel: '首页看板',
      destroy:true
    }
  },
  {
    path: 'charta',
    component: ChartAComponent,
    data: {
      tabLabel: 'charta',
      destroy:true
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
