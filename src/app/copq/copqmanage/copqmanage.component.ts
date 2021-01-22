import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormatDateService } from '../../service/format-date.service';
import { MenuClickService } from 'src/app/service/menu-click.service';
import { dpr } from '../../common/utils/index';
import { setOption4,setOption44 } from '../../common/utils/Mosaic';
@Component({
    selector: 'app-copqmanage',
    templateUrl: './copqmanage.component.html',
    styleUrls: ['./copqmanage.component.css']
})

export class CopqmanageComponent implements OnInit {
    echartTheme: any;
    option2: object = {};
    option3: object = {};
    option4: object = {};
    option6: object = {};
    option7: object = {};
    detailCols: any[];
    DetailTrendData: any[] = [];
    cn: any
    date: any
    cols: any
    products: any
    tableTarget: any[] = ['COPQ目标', 'COPQ实绩', 'Gap']
    detailTable: any[] = []
    defaultoption: object
    constructor(private mcs: MenuClickService, private http: HttpClient, private format: FormatDateService, private router: Router,) {
        this.mcs.menuClick(this.router.url);//记录菜单点击情况
    }

    ngOnInit() {
        this.defaultoption = {
            title: {
                text: '暂无数据',
                show: true,
                textStyle: {
                    color: '#ffffff',
                    fontSize: dpr(20),
                    align: 'center'
                },
                top: 'center',
                left: 'center'
            },
        }
        this.date = new Date()
        this.cn = {
            firstDayOfWeek: 0,
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: '今日',
            clear: '清除'
        };
        this.echartTheme = environment.echartTheme;
        this.getSiteData();
        this.getBUData()
        this.getDetailData()
    }

    //TODO:现地别COPQ对比
    getSiteData() {
        const url = 'api/copq/contrast/terrain?date=' + this.format.formatYearMonthS(this.date)
        this.http.get(url).subscribe(res => {
            this.option2 = res['terrain'].length ? this.setSiteOption(res) : this.defaultoption
            //表格
            this.cols = res['terrain']
            this.products = ['copqGoal', 'copq', 'gap'].map(items => {
                let data = {}
                res['terrain'].map((item: string | number, index: string | number) => {
                    data[item] = res[items][index]
                })
                return data
            })
        })
    }
    setSiteOption(data: Object) {
        return {
            title: {
                text: `{a| DBG  ${this.date.getMonth() + 1}月}现地别COPQ对比 `,
                // left: '2%',
                top: '2%',
                left:'center',
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
                data: ['内失比例', '外失比例', 'COPQ比例', 'COPQ比例目标'],
                right: '5%',
                itemWidth: 12,
                itemHeight: 6,
                textStyle: {
                    color: '#ffffff',
                    fontSize: dpr(10),
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    axisLabel: {
                        color: '#ffffff',
                        textStyle: {
                            fontSize: dpr(10),
                            color: '#ffffff'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ffffff'
                        }
                    },
                    axisTick: {
                        show: false,
                        inside: false
                    },
                    data: data['terrain']
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    min: 0,
                    splitNumber: 3,
                    axisLabel: {
                        formatter: '{value}%',
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
            series: [
                {
                    name: '内失比例',
                    type: 'bar',
                    stack: 'Loss',
                    barWidth: '30',
                    label: {
                        show: true,
                        position: 'inside',
                        fontSize: dpr(10),
                        formatter:'{c}%'
                    },
                    itemStyle: {
                        color: '#046CFD'
                    },
                    data: data['internalLoss'].map((item: string) => {
                        return parseFloat(item)
                    })
                },
                {
                    name: '外失比例',
                    type: 'bar',
                    stack: 'Loss',
                    barWidth: '30',
                    label: {
                        show: true,
                        position: 'inside',
                        fontSize: dpr(10),
                        formatter:'{c}%'
                    },
                    itemStyle: {
                        color: '#2BB88A'
                    },
                    data: data['externalLoss'].map((item: string) => {
                        return parseFloat(item)
                    })
                },
                {
                    name: 'COPQ比例',
                    type: 'line',
                    // yAxisIndex: 1,
                    label: {
                        show: true,
                        position: 'top',
                        fontSize: dpr(10),
                        formatter:'{c}%',
                        textStyle: {
                            color: '#ffffff'
                        }

                    },
                    itemStyle: {
                        color: '#F76B1C'
                    },
                    data: data['copq'].map((item: string) => {
                        return parseFloat(item)
                    })
                },
                {
                    name: 'COPQ比例目标',
                    type: 'line',
                    // yAxisIndex: 1,
                    label: {
                        show: true,
                        position: 'top',
                        fontSize: dpr(10),
                        formatter:'{c}%',
                        textStyle: {
                            color: '#ffffff'
                        }

                    },
                    itemStyle: {
                        color: '#66ff66',
                    },
                    lineStyle: { type: 'dashed' },
                    data: data['copqGoal'].map((item: string) => {
                        return parseFloat(item)
                    })
                },
            ]
        };
    }
    //TODO:BU别双坐标图
    getBUData() {
        const url = `api/copq/contrast/sbu?date=${this.format.formatYearMonthS(this.date)}`
        // const url = 'api/copq/contrast/sbu?date=2020&terrain=B1'
        this.http.get(url).subscribe(res => {
            if (Object.keys(res).length) {
                let data = {
                    data:res,
                    eType:[
                      // {type:'bar',yname:'比例1',data:''},
                      // {type:'bar',yname:'比例2',data:[20, 45, 46, 43]},
                      {type:'line',yname:'COPQ',data:'rate'}],
                    title:`{a| DBG  ${this.date.getMonth() + 1}月}BU别COPQ对比`,
                    legend:['COPQ']
                  }
                //   this.option4 = setOption4(data)
                  this.option4 = setOption44(res,'')
            } else {
                this.option4 = this.defaultoption
            }
        })
    }
    //TODO:拼接双坐标
    setOption4(respText: object,title:string) {
        let { grids, xAxes, yAxes, series } = this.formateOption(respText)
        return {
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
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            // legend: {
            //     data: ['copq'],
            //     right: '5%',
            //     itemWidth: 12,
            //     itemHeight: 6,
            //     textStyle: {
            //         color: '#ffffff',
            //         fontSize: 10,
            //     }
            // },
            grid: grids,
            xAxis: xAxes,
            yAxis: yAxes,
            series: series,
        };
    }
    //TODO:格式化生成option部分选项，拼接图
    formateOption(respText: object) { //max  interval调整
        //处理返回的数据
        let xKeys = Object.keys(respText)
        let arr = xKeys.map(item => {
            return respText[item]
        })
        let sitelist=[]
        xKeys.forEach((item,index)=> {
            sitelist.push(...respText[item]['site'])
          })
        let sitenums: number = xKeys.length;
        let grids: any[] = [], xAxes: any[] = [], yAxes: any[] = [], series: any[] = []
        let len = 0
        for (let i = 0; i < sitenums; i++) {

            let width: number, left: number, right: number, defVal: number = 4;
            let a = 100 - defVal
            let b = 100 - defVal * 2
            let c = (1/sitelist.length)*arr[i]['site'].length*b

            //处理grid 宽  left right
            if (i === 0) {
                left = defVal;
                right =a - c ;
                width = c;
            } else if (i === (sitenums - 1)) {
                width = c;
                right = defVal;
                left = a - c;
            } else {
                width = c;
                left = defVal +(1/sitelist.length)*len*b
                right = a - i * c - c
            }
            len = len+arr[i]['site'].length
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
                        fontSize:dpr(10)
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
                    color: '#fff'
                },
                nameGap: -5,
                offset: 30,
                data: [''],

                axisTick: {
                    length: 30,
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
                // yAxes.push({
                //     gridIndex: i,
                //     type: 'value',
                //     splitNumber: 2,
                //     // interval: 100,
                //     // max: 500,
                //     // max: function (params) {
                //     //   return (1 * params.max).toFixed(0);
                //     // },
                //     min: 0,
                //     axisTick: {
                //         show: false
                //     },
                //     axisLine: {
                //         show: false,
                //         onZero: true
                //     },
                //     splitLine: {
                //         show: false
                //     },
                //     axisLabel: {
                //         show: false,
                //         textStyle: {
                //             color: '#fff'
                //         }
                //     }
                // });
            } else {
                if (i == (sitenums - 1)) {
                    // yAxes.push({
                    //     gridIndex: i,
                    //     type: 'value',
                    //     splitNumber: 4,
                    //     max: function (value) {
                    //         return parseInt(value.max) + 100
                    //     },
                    //     min: 0,
                    //     splitLine: {
                    //         show: false
                    //     },
                    //     axisTick: {//坐标轴刻度线
                    //         show: false
                    //     },
                    //     axisLine: {
                    //         show: false,
                    //         onZero: true
                    //     },
                    //     axisLabel: {
                    //         show: false,
                    //         textStyle: {
                    //             color: '#fff'
                    //         }
                    //     }
                    // });
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
                    // yAxes.push({
                    //     gridIndex: i,
                    //     type: 'value',
                    //     splitNumber: 2,
                    //     min: 0,
                    //     splitLine: {
                    //         show: false
                    //     },
                    //     axisTick: {
                    //         show: false
                    //     },
                    //     axisLine: {
                    //         show: false,
                    //         onZero: true
                    //     },
                    //     axisLabel: {
                    //         show: false,
                    //         textStyle: {
                    //             color: '#fff'
                    //         }
                    //     }
                    // });
                }
            }
            series.push({
                xAxisIndex: i * 2,
                yAxisIndex: i,
                name: 'COPQ',
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
            });
        }

        return { grids, xAxes, yAxes, series }
    }
    //TODO:COPQ明细
    getDetailData() {
        const url = `api/copq/expenditure/pattern?date=${this.format.formatYearMonthS(this.date)}`
        this.http.get(url).subscribe(res => {
            // console.log(res);

            this.setOption3(res['lossRatioTotal'])
            this.option6 = res['ILDetail']['site'].length ? this.setOption6(res['ILDetail']) : this.defaultoption
            this.option7 = res['ELDetail']['site'].length ? this.setOption6(res['ELDetail']) : this.defaultoption
            this.setDetailTable(res)
        })
    }
    //TODO:左下角图
    setOption3(data: any[]) {
        let obj = [
            { name: '内失', value: data['internalLoss'], itemStyle: { color: '#046CFD' } },
            { name: '外失', value: data['externalLoss'], itemStyle: { color: '#2BB88A' } }

        ]
        this.option3 = {
            title: {
                text: `{a| DBG  ${this.date.getMonth() + 1}月}COPQ明细 `,
                // left: '2%',
                top: '2%',
                textStyle: {
                    color: '#ffffff',
                    fontSize: dpr(16),
                    rich: { a: { color: '#fd7502', fontSize: dpr(16), fontWeight: 'bold' } }
                }
            },
            // tooltip: {
            //     trigger: 'item',
            //     formatter: '{a} <br/>{b} : {c} ({d}%)'
            // },
            grid: {
                left: 50,
            },
            series: [
                {
                    name: 'COPQ 明细',
                    type: 'pie',
                    radius: ['30%', '50%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: true,
                        position: 'center'
                    },
                    itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                position: 'outside',
                                color: '#fff',
                                fontSize: dpr(10),
                                formatter: function (params: { name: any; value: any; percent: any; }) {
                                    return ` ${params.name}, \n ${params.value},\n ${Math.round(params.percent)}%`
                                }
                            },
                            labelLine: {
                                show: true
                            }
                        }
                    },
                    data: obj
                },
            ]
        };

    }
    setOption6(data: { [x: string]: any[]; }) {
        let option = {
            grid: {
                top: '2%',
                // width: '80%',
                bottom: 0,
                containLabel: true,
                left: '1%',
                right: "1%",
            },
            xAxis: {
                show: false,
                type: 'value',
                splitLine: {
                    show: false
                },
                max:Math.max(...data['rate'].map((item: string) => {
                    return parseFloat(item)
                }))+20
            },
            yAxis: {
                type: 'category',
                data: data['site'].map((item: string) => {
                    while (item.replace(/[^\u0000-\u00ff]/g, "aaa").length < 30) {
                        item = ' ' + item
                    }
                    return item
                }),
                axisLabel: { // 是否显示刻度签
                    interval: 0,
                    textStyle: {
                        color: '#ffffff',
                        fontSize: dpr(10)
                    }
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false,
                    inside: false
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0, 0, 0, 0)' // 线的颜色是透明的
                    }
                },
                z: 10
            },
            series: {
                type: 'bar',
                name: 'Mdoule',
                barWidth: 14,
                z: 3,
                label: {
                    normal: {
                        position: 'right',
                        show: true
                    }
                },
                data: data['rate'].map((item: string) => {
                    return parseFloat(item)
                }),
                itemStyle: {
                    normal: {
                        color: '#046CFD',
                        label: {
                            show: true,
                            position: 'outside',
                            color: '#fff',
                            fontSize: dpr(10),
                            // formatter:'{c}%'
                            formatter: function (params) {
                                // console.log(params);//dataIndex
                                return `${parseInt(data['value'][params.dataIndex])} , ${params.value.toFixed(1)}%`
                            },
                        },
                        labelLine: {
                            show: true
                        }
                    }
                },
            }
        }
        return option
    }
    //TODO:明细右下角表格
    setDetailTable(data: object) {
        this.detailTable = [
            { name: '销售额(百万)', col: 3, row: 1 },
            { name: 'COPQ金额(百万)', col: 3, row: 1 },
            { name: 'COPQ比例%', col: 3, row: 1 },

            { name: '内失%', col: 2, row: 1 },
            { name: '报废损失%', col: 2, row: 1 },
            { name: '降级损失%', col: 2, row: 1 },
            { name: 'Rework%', col: 2, row: 1 },
            { name: '供应商索赔挽回%', col: 2, row: 1 },
            { name: '内失其他费用%', col: 2, row: 1 },

            { name: '外失%', col: 2, row: 1 },
            { name: 'RMA不良品损失%', col: 2, row: 1 },
            { name: '外部Sorting%', col: 2, row: 1 },
            { name: 'RMA维修%', col: 2, row: 1 },
            { name: '客户索赔%', col: 2, row: 1 },
            { name: 'RMA产品回收%', col: 2, row: 1 },
            { name: '客户抱怨处理%', col: 2, row: 1 },
            { name: '外失挽回%', col: 2, row: 1 },
            { name: '外失其他费用%', col: 2, row: 1 },
        ]
        this.detailCols = data['dateList'].map((item: any) => {
            return { header: item, field: item }
        })

        this.DetailTrendData = data['table']
    }

    //TODO:返回首页
    gohome(event: object) {
        // window.location.href = "#/boe/"
         // this.router.navigate(['/boe/homepage'])
    }
    // TODO:查询按钮
    queryClickMethod() {
        this.getSiteData()
        this.getBUData()
        this.getDetailData()
    }
    //table 字体颜色变红
    lessThan(data: string) {
        return parseFloat(data) < 0
    }
    //TODO:echart点击向下跳转
    onChartClick(event: { name: any; }) {
        this.router.navigate(['/boe/copqmanage/sitemanage'], {
            queryParams: {site: event.name},
            skipLocationChange: true
        });
    }
}
