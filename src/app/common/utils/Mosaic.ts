import { dpr } from './index';
//第一种拼接图
const baseColorList = [
  '#046CFD',
  '#2BB88A',
  '#322BC6',
  '#2BA3C6',
  '#7D2BC6',
  '#2BC684',
  '#C8E573',
  '#CE7C81',
  '#FFC400',
  '#FF69B4',
  '#00FFFF',
  '#D4F2E7',
  '#ADFF2F',
  '#FFFF00',
  '#FF7F50',
]
export function setOption4(data: object) {
  let { grids, xAxes, yAxes, series } = formateOption(data)
  return {
    // color: ['#046CFD', '#2BB88A', '#FFC400', '#2BA3C6', '#7D2BC6'],
    title: {
      text: data['title'],
      top: '2%',
      left: 'center',
      textStyle: {
        color: '#ffffff',
        fontSize: dpr(16),
        rich: { a: { color: '#fd7502', fontSize: dpr(16), fontWeight: 'bold' } }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: data['legend'],
      right: '5%',
      itemWidth: 12,
      itemHeight: 6,
      textStyle: {
        color: '#ffffff',
        fontSize: 10,
      }
    },
    grid: grids,
    xAxis: xAxes,
    yAxis: yAxes,
    series: series,
  };
}
//TODO:格式化生成option部分选项，拼接图
function formateOption(data: object) { //max  interval调整
  //处理返回的数据
  let respText = data['data']
  let echartType = data['eType']
  let xKeys = Object.keys(respText)
  let sitelist = []
  let arr = xKeys.map(item => {
    sitelist.push(...respText[item]['site'])
    return respText[item]
  })
  let sitenums: number = xKeys.length;
  let grids: any[] = [], xAxes: any[] = [], yAxes: any[] = [], series: any[] = []
  let len = 0
  for (let i = 0; i < sitenums; i++) {
    let width: number, left: number, right: number, defVal: number = 4;
    let a = 100 - defVal
    let b = 100 - defVal * 2
    let c = (1 / sitelist.length) * arr[i]['site'].length * b
    // let randomstack = Math.random()
    //处理grid 宽  left right
    if (i === 0) {
      left = defVal;
      right = a - c;
      width = c;
    } else if (i === (sitenums - 1)) {
      width = c;
      right = defVal;
      left = a - c;
    } else {
      width = c;
      left = defVal + (1 / sitelist.length) * len * b;
      right = a - i * c - c
    }
    len = len + arr[i]['site'].length
    grids.push({
      right: right + '%',
      show: true,
      borderWidth: 0,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowBlur: 1,
      bottom: '20%',
      width: width + '%',
      //右边距right的位置：左边100%先减去第一个左移的距离，再减完的距离为起始的该grid的左边距(i/sitesnum*(100-4))，再减去宽度 (1/sitesnum*(100-4))+'%'
      left: left + '%'
    });

    xAxes.push({
      gridIndex: i,
      type: 'category',
      data: arr[i]['site'],
      axisTick: {
        alignWithLabel: false,
        color: '#1D3A7B',
      },
      textStyle: {
        fontSize: 8,
        color: 'red'
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#1D3A7B',
          // width:2
        }
      },
      axisLabel: {
        show: true,
        interval: 0,
        textStyle: {
          color: '#fff',
          fontSize: dpr(10)
        },
        margin: 4
      },
      position: 'bottom'
    });
    xAxes.push({
      gridIndex: i,
      type: 'category',
      position: 'bottom',
      name: xKeys[i],
      nameLocation: 'center',
      nameTextStyle: {
        fontWeight: 'bold',
        fontSize: dpr(12),
        color: '#fff'
      },
      nameGap: -5,
      offset: 30,
      data: [''],

      axisTick: {
        length: dpr(30),
        inside: true,
        lineStyle: {
          color: '#1D3A7B'
        }
      },
      axisLabel: {
        inside: true,
        show: true,
        textStyle: {
          color: '#fff'
        }
      },
      axisLine: {
        show: false,
        onZero: false
      }
    });
    if (i == 0) {
      yAxes.push({
        gridIndex: i,
        type: 'value',
        splitNumber: 4,
        // max: function (value) {
        //     return parseInt(value.max)+'%'
        // },
        min: 0,
        axisTick: {
          show: false,
          inside: false
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: false,
          onZero: true
        },
        axisLabel: {
          show: true,
          formatter: '{value}%',
          textStyle: {
            color: '#fff'
          }
        },
        // name: '百万',
        nameGap: 20,
        nameTextStyle: {
          color: 'white',
        },
        position: 'left'

      });
      yAxes.push({
        gridIndex: i,
        type: 'value',
        splitNumber: 2,
        // interval: 100,
        // max: 500,
        // max: function (params) {
        //   return (1 * params.max).toFixed(0);
        // },
        min: 0,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          onZero: true
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false,
          textStyle: {
            color: '#fff'
          }
        }
      });
    } else {
      if (i == (sitenums - 1)) {
        yAxes.push({
          gridIndex: i,
          type: 'value',
          splitNumber: 4,
          // max: function (value) {
          //   return parseInt(value.max) + 100
          // },
          min: 0,
          splitLine: {
            show: false
          },
          axisTick: {//坐标轴刻度线
            show: false
          },
          axisLine: {
            show: false,
            onZero: true
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        });
        yAxes.push({
          gridIndex: i,
          type: 'value',
          splitNumber: 2,
          min: 0,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false,
            inside: false
          },
          axisLine: {
            show: false,
            onZero: true
          },
          axisLabel: {
            show: false,
            formatter: '{value}',
            textStyle: {
              color: '#fff'
            }
          },
          // name: '元/m²',
          nameTextStyle: {
            color: 'white',
          },
          position: 'right'
        });
      } else {
        yAxes.push({
          gridIndex: i,
          type: 'value',
          splitNumber: 4,
          // max: function (value) {
          //     return parseInt(value.max) + 100
          // },
          min: 0,
          axisTick: {//坐标轴刻度线
            show: false
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: false,
            onZero: true
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        });
        yAxes.push({
          gridIndex: i,
          type: 'value',
          splitNumber: 2,
          min: 0,
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            onZero: true
          },
          axisLabel: {
            show: false,
            textStyle: {
              color: '#fff'
            }
          }
        });
      }
    }
    series.push(...buildSeries(echartType, i, arr))
  }
  return { grids, xAxes, yAxes, series }
}
function buildSeries(echartType: string[], i, arr) {

  let randomstack = Math.random()
  const barSeries = echartType.map((val, index) => {
    let barSerie = {};
    if (val['type'] === 'line') {
      barSerie = {
        xAxisIndex: i * 2,
        yAxisIndex: echartType.length === 1 ? i * 2 : i * 2 + 1,
        name: val['yname'],
        type: 'line',
        data: arr[i]['rate'].map((item: string) => {
          return parseFloat(item)
        }),
        color: '#F76B1C',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#fff'
          },
          rich: {
            a: {
              color: '#F76B1C',
              lineHeight: 10
            },
          },
          formatter: (param: { value: number; }) => {
            if (param.value > 0) {
              if (param.value > parseFloat(arr[i]['rate'][0])) {
                return `{a| ${param.value.toFixed(2)}%}`
              } else {
                return param.value.toFixed(2) + '%';
              }
            } else {
              return ''
            }
          }
        }
      }

    } else if (val['type'] === 'bar') {
      barSerie = {
        xAxisIndex: i * 2,
        yAxisIndex: i * 2,
        stack: randomstack,
        name: val['yname'],
        barWidth: dpr(20),
        type: 'bar',
        data: arr[i][val['data']].map((item: string) => {
          return parseFloat(item)
        }),
        // data:[1.2,1.1,1.3,1.4,1.5],
        barGap: '-100%',
        label: {
          show: true,
          position: 'top',
          color: '#ffffff',
          fontSize: dpr(10),
          formatter: (param) => {
            return parseFloat(param.value).toFixed(1);
          },
        },
        itemStyle: {
          normal: {
            color: baseColorList[index]
          }
        },
      }
    }

    return barSerie;
  });
  return barSeries
}
//第二种拼接图 问题点 分割点多了之后会出现阴影短线
export function setOption44(res, title) {
  let xKeys = Object.keys(res)
  let ratelist = []
  let sitelist = []
  let len = [0]
  let data = {
    xData: sitelist,
    yData: ratelist,
    len: [0]
  }
  xKeys.forEach((item, index) => {
    sitelist.push(...res[item]['site'])
    ratelist.push(...res[item]['rate'])
    len.push(res[item]['site'].length + len[index])
  })
  let arr = len.map(item => {
    return {
      gt: item - 1,
      lt: item
    }
  })
  let series = xKeys.map((item, index) => {
    let obj = {
      data: [{
        name: item,
        value: 1
      }],
      label: {
        show: true,
        position: 'inside',
        formatter: '{b}',
        offset: [0, 10],
        // textStyle: {
        //     color: '#777'
        // }
      },
      type: 'bar',
      barGap: 0,
      barWidth: (res[item]['site'].length / sitelist.length) * 100 + '%',
      itemStyle: {
        color: 'transparent'
      },
      xAxisIndex: 1,
      yAxisIndex: 1
    }
    return obj
  })
  let option4 = {
    title: {
      text: title,
      top: '2%',
      textStyle: {
        color: '#ffffff',
        fontSize: dpr(16),
        rich: { a: { color: '#fd7502', fontSize: dpr(16), fontWeight: 'bold' } }
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: [
      {
        top: 40,
        left: '3%',
        right: '3%',
        bottom: 76
      },
      {
        height: 45,
        left: '3%',
        right: '3%',
        bottom: 30
      }
    ],
    visualMap:
    {
      show: false,
      dimension: 0,
      pieces: arr,
      outOfRange: { opacity: 1 },
      inRange: { opacity: 0 }
    },
    xAxis: [
      {
        type: 'category',
        data: data.xData,
        gridIndex: 0,
        axisLabel: {
          color: '#ffffff',
          textStyle: {
            fontSize: dpr(8),
            color: '#ffffff'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#1D3A7B'
          }
        },
        axisTick: {
          length: dpr(40),
          interval: (index, value) => {
            // if (len.includes(index)) {
            //   return true;
            // }
            return len.includes(index)
          },
          lineStyle: {
            color: '#1D3A7B',
            fontSize: dpr(14)
          }
        },
        zlevel: 2
      },
      {
        type: 'category',
        gridIndex: 1,
        axisLine: {
          show: false
        },
        zlevel: 1
      }
    ],
    yAxis: [
      {
        type: 'value',
        gridIndex: 0,
        axisLabel: {
          color: '#fff'
        },
        splitLine: {
          show: false
          // lineStyle: {
          //     type: 'dashed'
          // }
        },
        axisLine: {
          lineStyle: {
            color: '#1D3A7B'
          }
        },
        axisTick: {
          lineStyle: {
            color: '#1D3A7B'
          }
        }
      },
      {
        type: 'value',
        gridIndex: 1,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      }],
    series: [
      {
        name: 'COPQ',
        type: 'line',
        data: data.yData.map(item => {
          return parseFloat(item)
        }),
        color: '#F76B1C',
        label: {
          show: true,
          position: 'top',
          textStyle: {
            color: '#fff'
          },
          rich: {
            a: {
              color: '#F76B1C',
              lineHeight: 10
            },
          },
          formatter: (param) => {
            // console.log(param.dataIndex);
            if (param.value > 0) {
              if (ratelist[param.dataIndex].includes('>')) {
                return `{a| ${param.value.toFixed(2)}%}`
              } else {
                return param.value.toFixed(2) + '%';
              }
            } else {
              return ''
            }
          }
        }
      },
      // {
      //   data: data.yData.map(item => {
      //     return parseFloat(item)
      //   }),
      //   type: 'line',
      //   label: {
      //     show: true,
      //     position: 'top',
      //     formatter: (param: { value: string; }) => {
      //       return parseFloat(param.value).toFixed(2) + '%';
      //     },
      //     textStyle: {
      //       color: '#fff'
      //     }
      //   },
      //   itemStyle: {
      //     color: '#F76B1C'
      //   },
      //   xAxisIndex: 0,
      //   yAxisIndex: 0
      // },
      ...series
    ]
  };
  return option4
}
//柱状堆叠图
export function setStackOption(params) {
  let series = buildStackSeries(params['data'])
  // setOption() {
  let option = {
    // color: ['#046CFD', '#2BB88A', '#FFC400', '#2BA3C6', '#7D2BC6'],
    title: {
      text: params['title'],
      textStyle: {
        color: '#ffffff'
      },
    },
    grid: {
      // top:'-50%',
      left: '2%',
      right: '5%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      textStyle: {
        color: '#fff'
      },
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    // visualMap: {
    //   show: false,
    //   dimension: 0,
    //   pieces: [{
    //     gt: 1,
    //     lt: 2
    //   }
    //   ]
    //   , outOfRange: { opacity: 1 }
    //   , inRange: { opacity: 0 }
    // },
    // toolbox: {
    //   show: true,
    //   iconStyle: {
    //     // color:'red',
    //     // borderColor:'#22bb22'
    //   },
    //   feature: {
    //     dataView: {
    //       show: true,
    //       readOnly: true,
    //       // textColor:'#fff',
    //       // backgroundColor :'#22bb22'
    //     },
    //     magicType: {
    //       show: true,
    //       type: ['line', 'bar']
    //     },
    //     restore: {
    //       show: true
    //     },
    //     saveAsImage: {
    //       show: true
    //     }
    //   },
    //   right: '20',
    //   orient: 'vertical'
    // },
    legend: {
      data: params['legend'],
      itemWidth: dpr(20),
      itemHeight: dpr(10),
      textStyle: {
        color: '#fff',
        fontSize: dpr(10),
      }
    },
    // legend:{},
    dataset: {
      // dimensions: params['dimensions'],
      dimensions: null,
      source: params['data'],
    },
    // xAxis: {type: 'category'},
    // yAxis: {},
    xAxis: [
      {
        type: 'category',
        axisPointer: {
          type: 'shadow'
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'white',
          }
        },
        axisLabel: {
          textStyle: {
            color: '#fff',
            fontSize: 10
          }
        },
        axisTick: {
          show: false,
          inside: false,
        },
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0,
        splitNumber: 3,
        axisLabel: {
            formatter: '{value}',
            color: '#ffffff',
            fontSize: dpr(10)
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(0, 0, 0, 0)' // 线的颜色是透明的
            }
        },
        axisTick: {
            show: false,
            inside: false
        },
        splitLine: {
            show: false    // 去掉网格线
        },
    },
    ],
    series: series
  };
  return option
  // }
}
function buildStackSeries(data) {
  let stack = Math.random()
  let arr = data.map((val,index)=>{
    if(index === data.length-1 || index ===data.length-2){
      return {
        type: 'line',
        stack: stack,
        label: {
          normal: {
            show: true,
            position: 'inside',
            textStyle: {
              color: '#fff'
            }
          }
        },
        itemStyle: {
          color: baseColorList[index]
        },
        // data: [11, 22, 33]
      }
    }else{
      return {
        type: 'bar',
        stack: stack,
        label: {
          normal: {
            show: true,
            position: 'inside',
            textStyle: {
              color: '#fff'
            }
          }
        },
        barWidth: dpr(20),
        itemStyle: {
          color: baseColorList[index]
        },
        // data: [11, 22, 33]
      }
    }

  })
  console.log(arr);

  return arr
}