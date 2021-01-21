import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportdataRoutingModule } from './importdata-routing.module';
import { ImportViewComponent } from './import-view/import-view.component';
import { BlockUIModule, PickListModule, ButtonModule, DropdownModule, CalendarModule, ProgressSpinnerModule, PaginatorModule, DialogModule, MultiSelectModule, PanelModule, FileUploadModule, SidebarModule, TabViewModule } from 'primeng/primeng';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ImportDataComponent } from './dialog/import-data/import-data.component';
@NgModule({
  declarations: [ImportViewComponent,ImportDataComponent],
  imports: [
    CommonModule,
    ImportdataRoutingModule,
    BlockUIModule,PickListModule,ButtonModule,DropdownModule,FormsModule,CalendarModule,TableModule,
    ProgressSpinnerModule,PaginatorModule,DialogModule,MultiSelectModule,
    PanelModule,FileUploadModule,SidebarModule,TabViewModule
  ]
})
export class ImportdataModule { }
