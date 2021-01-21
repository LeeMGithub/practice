import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormatDateService } from '../../service/format-date.service';
import { MenuClickService } from 'src/app/service/menu-click.service';
import { dpr } from '../../common/utils/index';

@Component({
    selector: 'app-copqsitemanage',
    templateUrl: './copqsitemanage.component.html',
    styleUrls: ['./copqsitemanage.component.css']
})
export class CopqsitemanageComponent implements OnInit {
    echartTheme: any;
    option2: object = {};
    option3: object = {};
    detailCols: any[];
    dateCols: any[];
    option6: object = {};
    option7: object = {};
    DetailTrendData: any[] = [];
    cn: object
    date: Date
    siteName: any[]
    selectedSite:string='B1'
    detailTable: any[] = []
    defaultoption: object
    constructor(private route:ActivatedRoute, private mcs: MenuClickService, private http: HttpClient, private format: FormatDateService, private router: Router,) {
        this.mcs.menuClick(this.router.url);//记录菜单点击情况
    }

    ngOnInit() {
        this.date = new Date()
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
        this.loadSiteName()
    }
    //TODO:加载有权限的现地名称
    loadSiteName() {
        const url = '/api/getLinkedSite/' + this.mcs.buildRouterLink(this.router.url);
        this.http.get(url).subscribe(
            res => {
                this.selectedSite = res['currentSite'];
                this.siteName = [];
                for (const site of res['linkedSite']) {
                    this.siteName.push({ label: site, value: site });
                }
                let site = this.route.snapshot.queryParams['site']
                if ( site !== undefined) {
                  this.selectedSite = site;
                }
                this.getSiteData()
                this.getDetailData()
                // window.location.href = '#/boe/copqmanage/sitemanage';
            }
        );

    }

    //TODO:现地别COPQ趋势
    getSiteData() {
        const url = `api/copq/terrain/trend?date=${this.format.formatYearMonthS(this.date)}&terrain=${this.selectedSite}`
        this.http.get(url).subscribe(res => {
           this.option2 =  res['time'].length? this.setSiteOption(res):this.defaultoption
        })
    }
    setSiteOption(data) {
        let first = data['time']
        return {
            title: {
                text: `{a| DBG  ${this.date.getMonth() + 1}}月COPQ趋势 `,
                // left: '2%',
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
                    data: data['time']
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
            visualMap: {
                show: false,
                dimension: 0,
                pieces: [ {
                    gt: 1,
                    lt: 2
                },{
                    gt: 4,
                    lt: 5
                }
                ]
                ,outOfRange:{opacity:1}
                ,inRange:{opacity:0}
            },
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
                        formatter: (param) => {
                            return param.value + '%';
                        },
                    },
                    itemStyle: {
                        color: '#046CFD'
                    },
                    data: data['internalLoss'].map(item => {
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
                        formatter: (param) => {
                            return param.value + '%';
                        },
                    },
                    itemStyle: {
                        color: '#2BB88A'
                    },
                    data: data['externalLoss'].map(item => {
                        return parseFloat(item)
                    })
                },
                {
                    name: 'COPQ比例',
                    type: 'line',
                    label: {
                        show: true,
                        position: 'top',
                        fontSize: dpr(10),
                        formatter: (param) => {
                            return param.value + '%';
                        },
                        textStyle: {
                            color: '#ffffff'
                        }

                    },
                    itemStyle: {
                        color: '#F76B1C'
                    },
                    data: data['copq'].map(item => {
                        return parseFloat(item)
                    })
                },
                {
                    name: 'COPQ比例目标',
                    type: 'line',
                    label: {
                        show: true,
                        position: 'top',
                        fontSize: dpr(10),
                        formatter: (param) => {
                            return param.value + '%';
                        },
                        textStyle: {
                            color: '#ffffff'
                        }

                    },
                    itemStyle: {
                        color: '#66ff66',
                    },
                    lineStyle: { type: 'dashed' },
                    data: data['copqGoal'].map(item => {
                        return parseFloat(item)
                    })
                },
            ]
        };

    }

    //COPQ明细
    getDetailData() {
        const url = `api/copq/terrain/detail?date=${this.format.formatYearMonthS(this.date)}&terrain=${this.selectedSite}`
        this.http.get(url).subscribe(res => {
            this.setOption3(res['lossRatioTotal'])
            this.setDetailTable(res)
            this.option6 =res['ILDetail']['site'].length? this.setOption6(res['ILDetail']):this.defaultoption
            this.option7 =res['ELDetail']['site'].length? this.setOption6(res['ELDetail']):this.defaultoption
        })
    }
    //TODO:左下角环状图
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
    //TODO:左下角内失外失柱状图
    setOption6(data: { [x: string]: any[]; }) {
        let option = {
            grid: {
                top: '2%',
                // width: '90%',
                bottom: 0,
                containLabel: true,
                left: '2%',
                right: "2%",
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
                data:data['site'].map((item: string)=>{
                            while (item.replace(/[^\u0000-\u00ff]/g,"aaa").length<30) {
                                item = ' '+item
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
                data: data['rate'].map((item: string)=>{
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
        // this.detailTable = [
        //     { name: '销售额(百万)', col: 3, row: 1 },
        //     { name: 'COPQ金额(百万)', col: 3, row: 1 },
        //     { name: 'COPQ比例', col: 3, row: 1 },
        //     { name: '不良品损失费', col: 2, row: 1 },
        //     { name: '降级损失费', col: 2, row: 1 },
        //     { name: 'Rework费用', col: 2, row: 1 },
        //     { name: '内失挽回费', col: 2, row: 1 },
        //     { name: '内失其他费用', col: 2, row: 1 },
        //     { name: '索赔费', col: 2, row: 1 },
        //     { name: 'RMA不良品损失费', col: 2, row: 1 },
        //     { name: 'RMA维修费', col: 2, row: 1 },
        //     { name: 'RMA产品回收费', col: 2, row: 1 },
        //     { name: '客户端品质异常处理费', col: 2, row: 1 },
        //     { name: '客户抱怨处理费', col: 2, row: 1 },
        //     { name: '外失挽回费', col: 2, row: 1 },
        //     { name: '外失其他费用', col: 2, row: 1 },
        // ]
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
        this.detailCols = data['dateList'].map(item => {
            return { header: item, field: item }
        })
        this.DetailTrendData = data['table']
    }

    //TODO:返回首页
    gohome(event: object) {
        // window.location.href = "#/boe/chartboard/dasManufactureBoard"
        // this.router.navigate(['/boe/homepage'])
    }
    // TODO:查询按钮
    queryClickMethod() {
        this.getSiteData()
        this.getDetailData()
    }
    lessThan(data) {
        return parseFloat(data) < 0
    }
}
