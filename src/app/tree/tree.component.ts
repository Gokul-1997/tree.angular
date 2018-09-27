import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Routes, RouterModule, Router, ActivatedRoute } from "@angular/router";
import { TreeComponent } from 'angular-tree-component';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { FormControl } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import 'rxjs/add/operator/map';
import { ExcelService } from './excel.service'; 
import { NgxSpinnerService } from 'ngx-spinner';

const URL = 'http://182.72.104.66:3050/details_upload';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css']
})
export class TreestructureComponent implements OnInit {

    ngOnInit() {
  }

  data: any[];
  excel_data:any;

public uploader:FileUploader = new FileUploader({url: URL,method: 'POST',itemAlias: 'file',allowedMimeType: ['image/png','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],maxFileSize: 50*1024*1024})

afuConfig = {
    multiple: false,
    formatsAllowed: ".xlsx",
    maxSize: "50",
    uploadAPI:  {
      url:"http://182.72.104.66:3050/users",
      headers: {
     "Content-Type" : "text/xlsx; charset=utf-8",
      }
    },
    hideProgressBar: false,
    hideResetBtn: true
};

nodes: any;
options: any;
parent: any;
search_term: any;

@ViewChild("tree") public tree: TreeComponent

constructor(public dialog: MatDialog,private http: Http,private router: Router,private spinner: NgxSpinnerService) {
 this.http.get('http://192.168.1.53:3000/trees').subscribe(res => {
   this.data = res.json()
});

this.taxonomy = [];
this.tax_split = [];
// useTriState: true
this.options = {
     useCheckbox: true,
     useTriState: true,
     animateExpand: true,
     animateSpeed: 30,
     animateAcceleration: 1.2
  };
}

ngAfterViewInit() {
    //this.tree.treeModel.expandAll();
  }

tax(){
  console.log(this.taxonomy.join(' ~ '));

  this.router.navigate(["mscdata", { taxonomy: this.taxonomy.join(' ~ ') }]);
}

search_tax(search){
console.log(search);
  this.router.navigate(["search", { data: search }]);
}

expand(event){
if(event.isExpanded && event.node.data.children.length == 0) {
this.parent = event.node.data.name;
 this.http.get('http://192.168.1.53:3000/trees/'+this.parent).subscribe(res => {
  for (let datum of res.json()) {
   //this.data[event.node.index].children.push(datum)
    event.node.data.children.push(datum)
}
  this.tree.treeModel.update()
});
}
}

is_ok: boolean;
tax_split: any[] = [];
taxonomy: any[]= [];
id_a: boolean;


event(event){
//console.log(event);
if(event.eventName == "deselect"){
for (var _i = 0; _i < this.taxonomy.length; _i++) {
    var num = this.taxonomy[_i];
 console.log(this.taxonomy[_i].split('>')[0]);
if(this.taxonomy[_i].split('>')[0] == event.node.data.name)
  console.log(event.node.data.name)
  this.taxonomy.splice(_i, 1);
}
}
}

focus(event){
this.tax_split = [];
this.is_ok = true;
//console.log(event);
//console.log(event.node.data.name);
this.tax_split.push(event.node.data.name);
if(this.is_ok){
if(event.node.parent.parent !=  null && this.is_ok){
console.log(event.node.parent.data.name);
this.tax_split.push(event.node.parent.data.name);
}else{
this.is_ok = false;
}
}

if(this.is_ok){
if(event.node.parent.parent.parent !=  null && this.is_ok){
//console.log(event.node.parent.parent.data.name);
this.tax_split.push(event.node.parent.parent.data.name);
}else{
this.is_ok = false;
}
}

if(this.is_ok){
if(event.node.parent.parent.parent.parent !=  null && this.is_ok){
//console.log(event.node.parent.parent.parent.data.name);
this.tax_split.push(event.node.parent.parent.parent.data.name);
}else{
this.is_ok = false;
}
}

if(this.is_ok){
if(event.node.parent.parent.parent.parent.parent !=  null && this.is_ok){
//console.log(event.node.parent.parent.parent.parent.data.name);
this.tax_split.push(event.node.parent.parent.parent.parent.data.name);
}else{
this.is_ok = false;
}
}

if(this.is_ok){
if(event.node.parent.parent.parent.parent.parent.parent !=  null && this.is_ok){
//console.log(event.node.parent.parent.parent.parent.parent.data.name);
this.tax_split.push(event.node.parent.parent.parent.parent.parent.data.name);
}else{
this.is_ok = false;
}
}

//if(!this.taxonomy.includes(this.tax_split.reverse().join('>'))){
this.taxonomy.push(this.tax_split.reverse().join('>'));
//console.log(this.taxonomy);
//}
//console.log(event.treeModel.selectedLeafNodeIds);
//console.log(this.tree.treeModel.getNodeById(event.treeModel.selectedLeafNodeIds));
}

blur(event){
//console.log(event);
}

 on_edit(event, eventName: string): void {
   // console.log(eventName, event);
  }

 on_edit_confirm(event, eventName: string): void {
    //console.log(eventName, event);
  }

  onFilterChange($event){
  // console.log($event);
  }

   onSelectedChange($event){
   //console.log($event);
   //console.log($event.treeModel.selectedLeafNodeIds);
  }

  export():void{
  /*this.spinner.show();
    this.http.get('http://192.168.1.53:3000/details/export').subscribe(res => {
       this.excel_data = res.json()
       this.excelService.exportAsExcelFile(this.excel_data, 'sample');
       this.spinner.hide();
    });*/
  }


}
