import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CopqmanageComponent } from "./copqmanage/copqmanage.component";
import { CopqsitemanageComponent } from "./copqsitemanage/copqsitemanage.component";
import { SortingFirstComponent } from "./sorting-first/sorting-first.component";
import { SortingSecondComponent } from "./sorting-second/sorting-second.component";
import { SortingThirdComponent } from "./sorting-third/sorting-third.component";
const routes: Routes = [
  {
    path: "manage",
    component: CopqmanageComponent,
    data: {
      tabLabel: "COPQ管理",
      destroy: true,
    },
  },
  {
    path: "sitemanage",
    component: CopqsitemanageComponent,
    data: {
      tabLabel: "COPQ现地管理",
      destroy: true,
    },
  },
  {
    path: "sorting/first",
    component: SortingFirstComponent,
    data: {
      tabLabel: "Sorting费用",
      destroy: true,
    },
  },
  {
    path: "sorting/second",
    component: SortingSecondComponent,
    data: {
      tabLabel: "Sorting二级费用",
      destroy: true,
    },
  },
  {
    path: "sorting/third",
    component: SortingThirdComponent,
    data: {
      tabLabel: "Sorting三级费用",
      destroy: true,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopqRoutingModule {}
