import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from 'bidm-web';

@Component({
    selector:'app-batch-import',
    templateUrl:'./batch-import.component.html',
    styleUrls:['./batch-import.component.css']
})

export class BatchImportComponent implements OnInit{

    state:boolean;
    value;
    selectedFileName = "";
    uploadedFiles:any[]=[];
    @Output()
    reSearch:EventEmitter<boolean> = new EventEmitter();
    importprocessbar:boolean;

    constructor(private apiService:ApiService,private http:HttpClient){}

    ngOnInit(){
        this.state = false;
        this.importprocessbar = false;
        // document.getElementById('importprocessbar').hidden = true;
    }

    onBeforeUpload(event){
        document.getElementById('myfileupload').hidden = true;
        document.getElementById('importprocessbar').hidden = false;
    }

    onUpload(event){
        this.uploadedFiles = [];
        for(let e of event.files){
            this.uploadedFiles.push(e);
        }

        var b = event.originalEvent.body;

        if(true == b["success"]){
            alert("导入成功！");
        }else{
            alert("失败:"+b["msg"]);
        }

        this.reSearch.emit(this.state);
        this.state = false;
        this.importprocessbar = false;
        document.getElementById('importprocessbar').hidden = true;
        document.getElementById('myfileupload').hidden = false;
    }

    selectedFileOnChanged(event){
        var files = event.currentTarget.file;
        for(let file of files){
            this.selectedFileName = file.name;
        }
    }
}
