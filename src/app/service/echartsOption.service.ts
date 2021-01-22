/*
 * @Author: xieyejian
 * @Date: 2021-01-21 13:18:19
 * @Description: 统一处理echarts的option，按照显示分类
 */
import { Injectable } from "@angular/core";
import { dpr } from "../common/utils";

@Injectable()
export class EchartsOptionService {
  constructor() {}

  /** 获取饼图的option，为实现sorting费用数据管理一级页面
   * @description:
   * @param {Array} data  数据源
   * @param {Array} dimensions  定义维度
   * @param {string} title  标题
   * @return {*}  返回echarts配置option
   */
  getPieOption(data: Array<any>, dimensions: Array<string>, title: string) {
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
        // backgroundColor: "rgba(42,64,142,0.30)",
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
        // backgroundColor: "rgba(42,64,142,0.30)",
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

  /**  获取堆叠柱状图+折线图option，为实现sorting费用数据管理二级页面
   * @description:
   * @param {Array} data  数据源
   * @param {Array} extendpars  非显示图形的字段
   * @param {Array} legend  图例数组，非必传，在确定显示字段时转换显示内容时使用
   * @return {*}  返回echarts配置option
   */
  getMixBarLine(
    data: Array<any>,
    extendpars: Array<string>,
    legend: Array<string> = []
  ) {
    // 不传legend时，通过data和extendpars获取serie的数组
    /* let length = legend.length;
    let temp;
    if (length == 0) {
      temp = Object.keys(data[0]).filter((item) => {
        return !extendpars.includes(item);
      });
      length = temp.length;
    } else {
      temp = legend;
    }
    const barSeries = temp.map((item, index) => {
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
          // yAxisIndex: 1,
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
    }); */

    const series = this.getSeries(data, extendpars, legend);

    const option = {
      grid: {
        left: "1%",
        bottom: "1%",
        right: "1%",
        containLabel: true,
      },
      legend: {
        right: "1%",
        itemWidth: dpr(20),
        itemHeight: dpr(10),
        textStyle: {
          fontSize: dpr(10),
        },
      },
      tooltip: {},
      dataset: {
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
      series: series,
    };
    return option;
  }

  /**  两个grid独立堆叠柱状图+折线图option，不共享纵坐标，为实现sorting费用数据管理一级页面
   * @description:
   * @param {Array} data1  数据源1
   * @param {Array} data2  数据源2
   * @param {Array} extendpars  非显示图形的字段
   * @param {Array} legend  图例数组，非必传，在确定显示字段时转换显示内容时使用
   * @return {*}  返回echarts配置option
   */
  getMultipleMixBarLine(
    data1: Array<any>,
    data2: Array<any>,
    extendpars: Array<string>,
    legend: Array<string> = []
  ) {
    const series1 = this.getSeries(data1, extendpars, legend);
    const series2 = this.getSeries(data2, extendpars, legend, 1);
    const series = [...series1, ...series2];

    const option = {
      grid: [
        {
          left: "1%",
          bottom: "1%",
          right: "64%",
          containLabel: true,
        },
        {
          left: "36%",
          bottom: "1%",
          right: "1%",
          containLabel: true,
        },
      ],
      legend: {
        right: "1%",
        itemWidth: dpr(20),
        itemHeight: dpr(10),
        textStyle: {
          fontSize: dpr(10),
        },
      },
      tooltip: {},
      // 多个dataset
      dataset: [
        {
          source: data1,
        },
        {
          source: data2,
        },
      ],
      xAxis: [
        {
          type: "category",
          gridIndex: 0,
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
        {
          type: "category",
          gridIndex: 1,
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
      ],
      yAxis: [
        {
          type: "value",
          gridIndex: 0,
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
          gridIndex: 1,
          position: "right",
          // show: false,
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
      series: series,
    };
    return option;
  }

  /**
   * @description: 不传legend时，通过data和extendpars获取serie的数组；传legend时使用legend，保证顺序
   * @param {Array} data  数据源
   * @param {Array} extendpars  非显示图形的字段
   * @param {Array} legend  图例数组，非必传，在确定显示字段时转换显示内容时使用
   * @param {number} axisIndex  对应的grid、坐标轴、dataset的index
   * @return {*}
   */
  getSeries(
    data: Array<any>,
    extendpars: Array<string>,
    legend: Array<string>,
    axisIndex: number = 0
  ) {
    let length = legend.length;
    let temp;
    if (length == 0) {
      temp = Object.keys(data[0]).filter((item) => {
        return !extendpars.includes(item);
      });
      length = temp.length;
    } else {
      temp = legend;
    }
    const series = temp.map((item, index) => {
      let serie = {};
      if (index === length - 1) {
        serie = {
          name: item,
          type: "line",
          symbol: "circle",
          symbolSize: dpr(8),
          lineStyle: {
            width: dpr(3),
          },
          xAxisIndex: axisIndex,
          yAxisIndex: axisIndex,
          datasetIndex: axisIndex,
          label: {
            show: true,
            color: "#fff",
            position: "top",
            formatter: "{@LOSSRATE}%",
          },
        };
      } else {
        serie = {
          stack: axisIndex + 1 + "",
          name: item,
          type: "bar",
          barWidth: dpr(32),
          xAxisIndex: axisIndex,
          yAxisIndex: axisIndex,
          datasetIndex: axisIndex,
          label: {
            show: true,
            position: "inside",
          },
        };
      }

      return serie;
    });
    return series;
  }

  // 获取分类堆叠柱状图+折线图option
  getCategoryMixBarLine1(
    data: Array<any>,
    extendpars: Array<string>,
    legend: Array<string> = []
  ) {
    const series = this.getSeries1(data, extendpars, legend);

    const option = {
      grid: [
        {
          left: "1%",
          bottom: dpr(60),
          right: "1%",
          // containLabel: true,
        },
        {
          left: "1%",
          height: dpr(50),
          bottom: dpr(10),
          right: "1%",
          // containLabel: true,
        },
      ],
      legend: {
        right: "1%",
        itemWidth: dpr(20),
        itemHeight: dpr(10),
        textStyle: {
          fontSize: dpr(10),
        },
      },
      tooltip: {},
      dataset: {
        source: data,
      },
      xAxis: [
        {
          type: "category",
          gridIndex: 0,
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
        {
          type: "category",
          gridIndex: 1,
          // position: "center",
          // data:['213','123'],
          axisLine: {
            show: false,
          },
          /* axisLabel: {
            color: "#fff",
          },
          axisTick: {
            inside: true,
            length: 60,
            lineStyle: {
              color: "#fff",
            },
          }, */
        },
      ],
      yAxis: [
        {
          type: "value",
          // name: "百万",
          gridIndex: 0,
          show: false,
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
          gridIndex: 0,
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
        {
          type: "value",
          // name: "比率",
          show: false,
          gridIndex: 1,
          // inverse: true,
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
      series: [
        ...series,
        {
          data: [
            {
              name: "idfa",
              value: 1,
            },
          ],
          type: "bar",
          barWidth: "40%",
          xAxisIndex: 1,
          yAxisIndex: 2,
          // outerAxis: 1,
          barGap: "0%",
          cursor: "pointer",
          label: {
            show: true,
            color: "#fff",
            position: "insideBottom",
            textStyle: {
              color: "#fff",
              fontSize: "12",
            },
            formatter: "xyj",
          },
          /* itemStyle:{
            color:'transparent'
          } */
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#1D3A7B", // 0% 处的颜色
                },
                {
                  offset: 0.002,
                  color: "#1D3A7B", // 0% 处的颜色
                },
                {
                  offset: 0.002,
                  color: "transparent", // 0% 处的颜色
                },
                {
                  offset: 0.999,
                  color: "transparent", // 0% 处的颜色
                },
                {
                  offset: 0.999,
                  color: "#1D3A7B", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#1D3A7B", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            // borderColor:'#fff',
          },
        },
        {
          data: [
            {
              name: "imei",
              value: 1,
            },
          ],
          type: "bar",
          barWidth: "60%",
          xAxisIndex: 1,
          yAxisIndex: 2,
          // outerAxis: 1,
          barGap: "0%",
          cursor: "pointer",
          label: {
            show: true,
            color: "#fff",
            position: "insideBottom",
            textStyle: {
              color: "#fff",
              fontSize: "12",
            },
            formatter: "xieyejian",
          },
          /* itemStyle:{
            color:'transparent'
          } */
          itemStyle: {
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "#1D3A7B", // 0% 处的颜色
                },
                {
                  offset: 0.001,
                  color: "#1D3A7B", // 0% 处的颜色
                },
                {
                  offset: 0.001,
                  color: "transparent", // 0% 处的颜色
                },
                {
                  offset: 0.998,
                  color: "transparent", // 0% 处的颜色
                },
                {
                  offset: 0.998,
                  color: "#1D3A7B", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#1D3A7B", // 100% 处的颜色
                },
              ],
              global: false, // 缺省为 false
            },
            // borderColor:'#fff',
          },
        },
      ],
    };
    return option;
  }

  getSeries1(
    data: Array<any>,
    extendpars: Array<string>,
    legend: Array<string>
  ) {
    let length = legend.length;
    let temp;
    if (length == 0) {
      temp = Object.keys(data[0]).filter((item) => {
        return !extendpars.includes(item);
      });
      length = temp.length;
    } else {
      temp = legend;
    }
    const series = temp.map((item, index) => {
      let serie = {};
      if (index === length - 1) {
        serie = {
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
        serie = {
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

      return serie;
    });
    return series;
  }

  // 获取分类堆叠柱状图+折线图option
  getCategoryMixBarLine(
    data: Array<any>,
    extendpars: Array<string>,
    legend: Array<string> = []
  ) {
    const count = data.length;
    const arr = Array(count).fill(1);
    const grid = arr.map((item, index) => {
      const obj = {
        left: (index / 6) * 100 + "%",
        right: ((count - index - 1) * 100) / 6 + "%",
        containLabel: true,
      };
      return obj;
    });

    const dataset = data.map((item, index) => {
      const obj = {
        source: item,
      };
      return obj;
    });

    const xAxis = arr.map((item, index) => {
      const obj = {
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
      };
      return obj;
    });

    const yAxis = [];
    arr.forEach(element => {
      
    });

    const series = this.getSeries(data, extendpars, legend);

    const option = {
      grid: grid,
      legend: {
        right: "1%",
        itemWidth: dpr(20),
        itemHeight: dpr(10),
        textStyle: {
          fontSize: dpr(10),
        },
      },
      tooltip: {},
      dataset: dataset,
      xAxis: xAxis,
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
      series: series,
    };
    return option;
  }
}
