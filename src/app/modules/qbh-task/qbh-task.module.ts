import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QBHTaskRoutingModule } from './qbh-task-routing.module';
import { ComponentAComponent } from './component-a/component-a.component';
import { ComponentBComponent } from './component-b/component-b.component';
import { ComponentCComponent } from './component-c/component-c.component';
import { ComponentDComponent } from './component-d/component-d.component';
import { ComponentEComponent } from './component-e/component-e.component';
import { ComponentFComponent } from './component-f/component-f.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TableComponent } from './table/table.component';


@NgModule({
  declarations: [
    ComponentAComponent,
    ComponentBComponent,
    ComponentCComponent,
    ComponentDComponent,
    ComponentEComponent,
    ComponentFComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    QBHTaskRoutingModule,
    SharedModule,
  ]
})
export class QBHTaskModule { }
