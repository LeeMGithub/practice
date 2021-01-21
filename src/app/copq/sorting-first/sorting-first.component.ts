import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { EchartsOptionService } from "src/app/service/echartsOption.service";
import { dpr } from "src/app/common/utils";

@Component({
  selector: "app-sorting-first",
  templateUrl: "./sorting-first.component.html",
  styleUrls: ["./sorting-first.component.css"],
})
export class SortingFirstComponent implements OnInit {
  constructor(
    private Api: HttpClient,
    private echartsOption: EchartsOptionService
  ) {}
  chartData = [];
  chartOption: any = {};
  chartData1 = [];
  chartOption1: any = {};
  ngOnInit() {
    this.getInfo();
    this.chartData = [
      {
        UNIT: 56.4,
        MONTHDATE: "03月",
        ECIRATIO: 34,
        SUBECINAME: "UT",
      },
      {
        UNIT: 56.4,
        MONTHDATE: "03月",
        ECIRATIO: 16,
        SUBECINAME: "其他",
      },
      {
        UNIT: 56.4,
        MONTHDATE: "03月",
        ECIRATIO: 50,
        SUBECINAME: "工艺",
      },
    ];
    this.chartOption = this.echartsOption.getPieOption(
      "产品类型",
      ["SUBECINAME", "ECIRATIO"],
      this.chartData
    );

    this.chartData1 = [
      {
        XDATE: "2019",
        MDLLOSS: 12,
        LOSSRATE: 2.9,
        PNLLOSS: 10,
        SEQ: "1",
      },
      {
        XDATE: "2020Q1",
        MDLLOSS: 21,
        LOSSRATE: 2.3,
        PNLLOSS: 20,
        SEQ: "2",
      },
      {
        XDATE: "202001",
        MDLLOSS: 7,
        LOSSRATE: 2.4,
        PNLLOSS: 7,
        SEQ: "3",
      },
      {
        XDATE: "202002",
        MDLLOSS: 4,
        LOSSRATE: 2,
        PNLLOSS: 5,
        SEQ: "3",
      },
      {
        XDATE: "202003",
        MDLLOSS: 9,
        LOSSRATE: 2.5,
        PNLLOSS: 7,
        SEQ: "3",
      },
    ];
    const option1 = this.echartsOption.getMixBarLine(
      ["PNL Loss金额", "MDL Loss金额", "DBG LCD Loss率"],
      ["XDATE", "PNLLOSS", "MDLLOSS", "LOSSRATE"],
      this.chartData1
    );

    this.chartOption1 = {
      ...option1,
      visualMap: {
        type: "piecewise",
        show: false,
        dimension: 0,
        seriesIndex: 2,
        pieces: [
          {
            gt: 1,
            lt: 2,
          },
        ],
        outOfRange: { opacity: 1 },
        inRange: { opacity: 0 },
      },
    };
  }

  getInfo() {
    const url = "sorting/get-1-pie";
    this.Api.get(url).subscribe((res) => {
      // debugger
    });
  }
}
