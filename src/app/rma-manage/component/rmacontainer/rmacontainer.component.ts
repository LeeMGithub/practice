import { Component, OnInit,Input } from '@angular/core';
// import { CasadeService } from 'src/app/service/casade.service';
import { CasadeService } from '../../../service/casade.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-rma-container',
  templateUrl: './rmacontainer.component.html',
  styleUrls: ['./rmacontainer.component.css']
})
export class RmaContainerComponent implements OnInit {
    @Input() headTitle:string
  constructor() { }

  ngOnInit() {
  }
}
