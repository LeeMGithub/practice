import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MenuClickService } from 'src/app/service/menu-click.service';
import { FormatDateService } from 'src/app/service/format-date.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login-analysis',
    templateUrl: './login-analysis.component.html',
    styleUrls: ['./login-analysis.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class LoginAnalysisComponent implements OnInit {

    //当前日期
    currentDate: string;

    echartTheme;

    option1 = {};
    option2 = {};
    option3 = {};
    option4 = {};

    loading1: boolean;
    loading2: boolean;
    loading3: boolean;
    loading4: boolean;

    constructor(private http: HttpClient, private router: Router, private mcs: MenuClickService, private dateFormat: FormatDateService) {
        this.mcs.menuClick(this.router.url);
    }

    ngOnInit() {
        
        this.echartTheme = environment.echartTheme;
        this.loading1 = true;
        this.loading2 = true;
        this.loading3 = true;
        this.loading4 = true;
        //初始化日期
        this.currentDate = this.dateFormat.formatYearMonth(new Date());

        //获取echart数据
        this.getLoginData1();
        this.getLoginData2();
        this.getLoginData3();
        this.getLoginData4();
    }

    //日期点击事件
    dateClickHandle(event) {
        this.currentDate = event;
    }

    //查询按钮点击事件
    queryClickMethod() {
        this.loading1 = true;
        this.loading2 = true;
        this.loading3 = true;
        this.loading4 = true;
        this.getLoginData1();
        this.getLoginData2();
        this.getLoginData3();
        this.getLoginData4();
    }

    //获取第一个echart的数据
    getLoginData1() {
        const url = '/api/log-manage/data-one/' + this.currentDate;
        this.http.get(url).subscribe(
            (res) => {
                const group: any = [];
                const data1: any = [];
                const data2: any = [];
                for (let item of <any[]>res) {
                    group.push(item['MONTHDATE']);
                    data1.push(item['CENTERNUM']);
                    data2.push(item['MNTNUM']);
                }
                this.option1 = {
                    title: {
                        text: '用户登录趋势统计',
                        x: 'center',
                        y: 10
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {      // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'  // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['中心组织', '管理者'],
                        x: 'center',
                        y: 40
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
                            data: group
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitLine:{
                                lineStyle:{	type:'dashed', opacity: 0.9}
                            }
                        }
                    ],
                    series: [
                        {
                            name: '中心组织',
                            type: 'bar',
                            data: data1
                        },
                        {
                            name: '管理者',
                            type: 'bar',
                            data: data2
                        }
                    ],
                    backgroundColor: 'white'
                };
                this.loading1 = false;
            }
        );
    }

    //获取第二个echart的数据
    getLoginData2() {
        const url = '/api/log-manage/data-two/' + this.currentDate;
        this.http.get(url).subscribe(
            (res) => {
                const data: any = [];
                for (let item of <any[]>res) {
                    const temp = {
                        value: item['COUNTS'],
                        name: item['MENUNAME']
                    }
                    data.push(temp);
                }
                this.option2 = {
                    title: {
                        text: '近1个月用户关注界面TOP5',
                        x: 'center',
                        y: 10
                    },
                    series: [
                        {
                            type: 'funnel',
                            left: '10%',
                            top: 60,
                            width: '80%',
                            height: 220,
                            minSize: '0%',
                            maxSize: '90%',
                            label: {
                                normal: {
                                    position: 'inside',
                                    formatter: '{b}{c}次',
                                    textStyle: {
                                        fontSize: 12,
                                        color: '#000000'
                                    }
                                }
                            },
                            data: data
                        }
                    ],
                    backgroundColor: 'white'
                };
                this.loading2 = false;
            }
        );
    }

    //获取第三个echart的数据
    getLoginData3() {
        const url = '/api/log-manage/data-three/' + this.currentDate;
        this.http.get(url).subscribe(
            (res) => {
                const group: any = [];
                const data1: any = [];
                const data2: any = [];
                for (let item of <any[]>res) {
                    group.push(item['SITENAME']);
                    data1.push(item['USERNUM']);
                    data2.push(item['LIVENUM']);
                }
                this.option3 = {
                    title: {
                        text: '近1个月活跃用户数',
                        x: 'center',
                        y: 10
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {      // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'  // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['登录人数', '注册人数'],
                        x: 'center',
                        y: 40
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
                            data: group
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            splitLine:{
                                lineStyle:{	type:'dashed', opacity: 0.9}
                            }
                        }
                    ],
                    series: [
                        {
                            name: '注册人数',
                            type: 'bar',
                            stack: 'active',
                            barWidth: 30,
                            data: data1
                        },
                        {
                            name: '登录人数',
                            type: 'bar',
                            stack: 'active',
                            barWidth: 30,
                            data: data2
                        }
                    ],
                    backgroundColor: 'white'
                };
                this.loading3 = false;
            }
        );
    }

    //获取第四个echart的数据
    getLoginData4() {
        const url = '/api/log-manage/data-four/' + this.currentDate;
        this.http.get(url).subscribe(
            (res) => {
                const data: any = [];
                for (let item of <any[]>res) {
                    const temp = {
                        name: item['USERNAME'],
                        value: item['COUNTS']
                    }
                    data.push(temp);
                }
                const datalist = [
                    {
                        offset: [63, 17],
                        symbolSize: 65,
                        color: '#5e333f'
                    }, {
                        offset: [32, 27],
                        symbolSize: 75,
                        color: '#ff7123'
                    }, {
                        offset: [65, 65],
                        symbolSize: 85,
                        color: '#ffc400'
                    }, {
                        offset: [37, 73],
                        symbolSize: 95,
                        color: '#7aabe2'
                    }, {
                        offset: [50, 40],
                        symbolSize: 120,
                        color: '#f467ce'
                    }];
                const datas = [];
                for (let i = 0; i < data.length; i++) {
                    const item = data[i];
                    const itemToStyle = datalist[i];
                    datas.push({
                        name: item.name + item.value + '次',
                        value: itemToStyle.offset,
                        symbolSize: itemToStyle.symbolSize,
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: 15
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: itemToStyle.color,
                                opacity: 1
                            }
                        },
                    });
                }
                this.option4 = {
                    title: {
                        text: '近1个月活跃用户TOP5',
                        x: 'center',
                        y: 10
                    },
                    grid: {
                        show: false,
                        top: 25,
                        bottom: 10
                    },
                    xAxis: [{
                        gridIndex: 0,
                        type: 'value',
                        show: false,
                        min: 0,
                        max: 100,
                        nameLocation: 'middle',
                        nameGap: 5
                    }],
                    yAxis: [{
                        gridIndex: 0,
                        min: 0,
                        show: false,
                        max: 100,
                        nameLocation: 'middle',
                        nameGap: 30
                    }],
                    series: [{
                        type: 'scatter',
                        symbol: 'circle',
                        symbolSize: 120,
                        label: {
                            normal: {
                                show: true,
                                formatter: '{b}',
                                color: '#fff',
                                textStyle: {
                                    fontSize: '20'
                                }
                            },
                        },
                        itemStyle: {
                            normal: {
                                color: '#00acea'
                            }
                        },
                        data: datas
                    }],
                    backgroundColor: 'white'
                };
                this.loading4 = false;
            }
        );
    }
}
