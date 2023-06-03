import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { XmlEditorComponent } from './xml-editor/xml-editor.component';
import { ToolListComponent } from './tool-list/tool-list.component';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'xmlEditor', component: XmlEditorComponent },
  { path: 'tools', component: ToolListComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
