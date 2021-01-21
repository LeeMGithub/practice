import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { HomepageRoutingModule } from './homepage-routing.module';
import { ChartAComponent } from './chart-a/chart-a.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { HomeComponent } from './home/home.component';
import { CascadeSelectModule } from '../common/components/casadeselect/cascadeselect'
@NgModule({
  declarations: [ChartAComponent, HomeComponent],
  imports: [
    CommonModule,
    NgxEchartsModule,
    CascadeSelectModule,
    FormsModule,
    HomepageRoutingModule
  ]
})
export class HomepageModule { }
