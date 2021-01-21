import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImportViewComponent} from './import-view/import-view.component'
const routes: Routes = [
  {
    path: 'importview',
    component: ImportViewComponent,
    data: {
      tabLabel: 'COPQ数据导入',
      destroy:true
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportdataRoutingModule { }
