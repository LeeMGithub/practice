import { Injectable } from "@angular/core";
import { dpr } from "../common/utils";

@Injectable()
export class EchartsOptionService {
  constructor() {}

  // 获取饼图的option
  getPieOption(title, dimensions, data) {
    const option = {
      //  标题
      title: {
        text: title,
        left: "5",
        padding: [dpr(5), dpr(10)],
        textStyle: {
          color: "#fff",
          fontSize: dpr(14),
        },
        backgroundColor: "rgba(42,64,142,0.30)",
      },
      //  图例设置
      legend: {
        show: true,
        itemGap: dpr(2),
        itemWidth: dpr(20),
        itemHeight: dpr(10),
        textStyle: {
          fontSize: dpr(10),
        },
        orient: "horizontal",
        right: "1%",
        backgroundColor: "rgba(42,64,142,0.30)",
      },
      //  提示框
      tooltip: {
        trigger: "item",
        formatter: "{b}:{d}%",
      },
      //  数据设置
      dataset: {
        dimensions: dimensions,
        source: data,
      },
      //  图形
      series: [
        {
          name: title,
          type: "pie",
          radius: ["20%", "56%"],
          center: ["35%", "55%"],
          label: {
            color: "#fff",
            formatter: (params) => {
              return params.name + ":" + params.percent.toFixed(0) + "%";
            },
          },
          labelLine: {
            lineStyle: {
              color: "#ffffff",
            },
          },
          itemStyle: {
            color: function (data) {
              const colors = [
                "#3DC7AC",
                "#42D1FF",
                "#42AFFF",
                "#4278FF",
                "#5142FF",
                "#0E69F5",
                "#0C35EB",
                "#C1DA99",
                "#3B50C8",
              ];
              return colors[data.dataIndex];
            },
          },
          /* // 高亮
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          // 数据编码，对照
          encode: {
            itemName: "SUBECINAME",
            value: "ECIRATIO",
          }, */
        },
      ],
    };
    return option;
  }

  // 获取堆叠柱状图+折线图option
  getMixBarLine(legend, dimensions, data) {
    const length = legend.length;
    const barSeries = legend.map((item, index) => {
      let barSerie = {};
      if (index === length - 1) {
        barSerie = {
          name: item,
          type: "line",
          symbol: "circle",
          symbolSize: dpr(8),
          lineStyle: {
            width: dpr(3),
          },
          yAxisIndex: 1,
          label: {
            show: true,
            color: "#fff",
            position: "top",
            formatter: "{@LOSSRATE}%",
          },
        };
      } else {
        barSerie = {
          stack: "1",
          name: item,
          type: "bar",
          barWidth: dpr(32),
          label: {
            show: true,
            position: "inside",
          },
        };
      }

      return barSerie;
    });

    const option = {
      grid: {
        left: "1%",
        bottom: "1%",
        right: "1%",
        containLabel: true,
      },
      legend: {
        right: "1%",
        data: legend,
        itemWidth: dpr(20),
        itemHeight: dpr(10),
        textStyle: {
          fontSize: dpr(10),
        },
      },
      tooltip: {},
      dataset: {
        dimensions: dimensions,
        source: data,
      },
      xAxis: {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#1D3A7B",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#ffffff",
        },
      },
      yAxis: [
        {
          type: "value",
          // name: "百万",
          nameTextStyle: {
            color: "#ffffff",
          },
          splitLine: {
            show: false,
            lineStyle: {
              color: ["#1D3A7B"],
            },
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#1D3A7B",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#ffffff",
          },
        },
        {
          type: "value",
          // name: "比率",
          show: false,
          nameTextStyle: {
            color: "#ffffff",
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#1D3A7B",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#ffffff",
          },
        },
      ],
      /* visualMap: {
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
      }, */
      series: barSeries,
    };
    return option;
  }
}
