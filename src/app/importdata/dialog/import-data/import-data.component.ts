import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { ApiService } from 'bidm-web';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit {
  //dialog的可视状态
  // @Input() url:string
  @Output() onPassData= new EventEmitter()
  state: boolean;
  selectedFileName="";
  uploadedFiles: any[] = [];

  value;

  constructor(private apiService: ApiService, private http: HttpClient) { }

  ngOnInit() {
  }
  test(e){
    console.log(e);

  }

  onSelect(event){
    this.uploadedFiles = [];
    for(let file of event.files) {
      this.uploadedFiles.push(file);
  }
  }

  onUpload(event) {
    // console.log(JSON.stringify(event.originalEvent.body));
    if(event.originalEvent.status==200){
      alert("导入成功！");
      this.onPassData.emit(event.originalEvent.body)
    }else{
      alert("导入失败！");
    }
    this.state = false;
  }

  selectedFileOnChanged(event) {
    // 这里是文件选择完成后的操作处理
    var files = event.currentTarget.files;
    for(let file of files) {
        this.selectedFileName = file.name;
    }
  }
}
