import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CopqContainerComponent } from "./components/copq-container/copq-container.component";
import { ChartContainerComponent } from "./components/chart-container/chart-container.component";

import { CopqRoutingModule } from "./copq-routing.module";
import { CopqmanageComponent } from "./copqmanage/copqmanage.component";
import { CopqsitemanageComponent } from "./copqsitemanage/copqsitemanage.component";
import { SortingFirstComponent } from "./sorting-first/sorting-first.component";
import { SortingSecondComponent } from "./sorting-second/sorting-second.component";
import { SortingThirdComponent } from "./sorting-third/sorting-third.component";

import { EchartsOptionService } from "src/app/service/echartsOption.service";

import {
  DropdownModule,
  CalendarModule,
  ButtonModule,
  PanelModule,
} from "primeng/primeng";
import { TableModule } from "primeng/table";
import { FormsModule } from "@angular/forms";
import { NgxEchartsModule } from "ngx-echarts";
@NgModule({
  declarations: [
    CopqContainerComponent,
    ChartContainerComponent,
    CopqmanageComponent,
    CopqsitemanageComponent,
    SortingFirstComponent,
    SortingSecondComponent,
    SortingThirdComponent,
  ],
  imports: [
    CommonModule,
    CopqRoutingModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    PanelModule,
    TableModule,
    FormsModule,
    NgxEchartsModule,
  ],
  providers: [EchartsOptionService],
})
export class CopqModule {}
