import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentAComponent } from './component-a/component-a.component';
import { ComponentBComponent } from './component-b/component-b.component';
import { ComponentCComponent } from './component-c/component-c.component';
import { ComponentDComponent } from './component-d/component-d.component';
import { ComponentEComponent } from './component-e/component-e.component';
import { ComponentFComponent } from './component-f/component-f.component';

const routes: Routes = [
  {path:'',redirectTo:'component-C',pathMatch:'full'},
  {
    path:'component-A',component:ComponentAComponent
  },
  {
    path:'component-B',component:ComponentBComponent
  },
  {
    path:'component-C',component:ComponentCComponent
  },
  {
    path:'component-D',component:ComponentDComponent
  },
  {
    path:'component-E',component:ComponentEComponent
  },
  {
    path:'component-F',component:ComponentFComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QBHTaskRoutingModule { }
