import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbgmanageComponent } from './dbgmanage/dbgmanage.component';
import { ProductmanageComponent } from './productmanage/productmanage.component';
import { SitemanageComponent } from './sitemanage/sitemanage.component';
import { DetailmanageComponent } from './detailmanage/detailmanage.component';
const routes: Routes = [
  {
    path: 'dbgmanage',
    component: DbgmanageComponent,
    data: {
      tabLabel: 'DBG RMA管理',
      destroy:true
    }
  },
  {
    path: 'productmanage',
    component: ProductmanageComponent,
    data: {
      tabLabel: '产品RMA管理',
      destroy:true
    }
  },
  {
    path: 'sitemanage',
    component: SitemanageComponent,
    data: {
      tabLabel: '现地RMA管理',
      destroy:true
    }
  },
  {
    path: 'detailmanage',
    component: DetailmanageComponent,
    data: {
      tabLabel: '明细RMA管理',
      destroy:true
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RmaManageRoutingModule { }
