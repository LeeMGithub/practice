import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.css']
})
export class ChartContainerComponent implements OnInit {
  @Input() chartTitle: string; // 标题名称
  @Input() width: string; // 宽
  @Input() height: string; // 高
  constructor() { }

  ngOnInit() {
  }

}
