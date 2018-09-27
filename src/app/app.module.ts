import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { HttpModule } from '@angular/http';
import { TreestructureComponent } from './tree/tree.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreeviewModule } from 'ngx-treeview';
import { TreeModule } from 'angular-tree-component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';

/*import { ExcelService } from './msc-data/excel.service';
*/

const routes: Routes = [
      { path: '', component: TreestructureComponent, pathMatch: 'full' },
      { path: '**', component: TreestructureComponent },

    ];

@NgModule({
  declarations: [
    AppComponent,
    TreestructureComponent
  ],  
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    FileUploadModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    TreeviewModule.forRoot(),
    TreeModule.forRoot(),
    RouterModule.forRoot(routes, {useHash: true})

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
