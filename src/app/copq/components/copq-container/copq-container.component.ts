import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-copq-container",
  templateUrl: "./copq-container.component.html",
  styleUrls: ["./copq-container.component.css"],
})
export class CopqContainerComponent implements OnInit {
  @Input() headTitle: string; // 标题名称
  constructor() {}

  ngOnInit() {}

  // todo 返回首页
  goBack() {}
}
