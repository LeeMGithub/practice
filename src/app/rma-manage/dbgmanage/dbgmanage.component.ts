import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormatDateService } from '../../service/format-date.service';
import { MenuClickService } from 'src/app/service/menu-click.service';
import { dpr } from '../../common/utils/index';
import { CasadeService } from '../../service/casade.service';
import { setOption4 } from '../../common/utils/Mosaic';
@Component({
  selector: 'app-dbgmanage',
  templateUrl: './dbgmanage.component.html',
  styleUrls: ['./dbgmanage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DbgmanageComponent implements OnInit {
  date: Date
  countries: any[];
  selectedCity1: any;
  option1: object
  option2: object
  option3: object
  echartTheme
  defaultoption
  option4
  option5

  cols
  products
  cols1
  cols2
  cols3
  property: string = 'test qwejowqejqojdqwo'
  constructor(private route: ActivatedRoute, private mcs: MenuClickService, private http: HttpClient, private format: FormatDateService, private router: Router, private casade: CasadeService) {
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
    this.echartTheme = environment.echartTheme
    this.option1 = this.setOption()
    this.option2 = this.setOption()
    this.option3 = this.setOption()
    const baseColorList = {
      'B1': '#046CFD',
      'B3': '#322BC6',
      'B4': '#2BA3C6',
      'B5': '#7D2BC6',
      'B6': '#2BC684',
      'B8': '#C8E573',
      'B9': '#CE7C81',
      'B10': '#FFC400',
      'BMDT': '#FF69B4',
      'B2': '#00FFFF',
      'TM1': '#D4F2E7',
      'B7': '#ADFF2F',
      'B11': '#FFFF00',
      'DAS': '#FF7F50',
    }
    // this.countries = this.casade.buildOption()
    this.countries = this.casade.buildOption2()
    console.log(this.countries);

    this.getBUData()


    this.cols = [
      { field: 'name', header: '产品类型' },
      { field: 'rating', header: '序号' },
      { field: 'category', header: '物权工厂' },
      { field: 'inventoryStatus', header: '客户' },
      { field: 'description', header: 'FG CODE' },
      { field: 'quantity', header: '数量' }
    ];
    this.cols1 = [
      { field: 'rating', header: '序号' },
      { field: 'inventoryStatus', header: '客户' },
      { field: 'name', header: '产品类型' },
      { field: 'quantity', header: '数量' }
    ]
    this.products = [
      {
        "id": "1000",
        "code": "f230fh0g3",
        "name": "Bamboo",
        "description": "Product Description",
        "image": "bamboo-watch.jpg",
        "price": 65,
        "category": "Accessories",
        "quantity": 24,
        "inventoryStatus": "INSTOCK",
        "rating": 5
      },
      {
        "id": "1001",
        "code": "nvklal433",
        "name": "Black",
        "description": "Product Description",
        "image": "black-watch.jpg",
        "price": 72,
        "category": "Accessories",
        "quantity": 61,
        "inventoryStatus": "INSTOCK",
        "rating": 4
      },
      {
        "id": "1002",
        "code": "zz21cz3c1",
        "name": "Blue",
        "description": "Product Description",
        "image": "blue-band.jpg",
        "price": 79,
        "category": "Fitness",
        "quantity": 2,
        "inventoryStatus": "LOWSTOCK",
        "rating": 3
      },
      {
        "id": "1003",
        "code": "244wgerg2",
        "name": "Blue",
        "description": "Product Description",
        "image": "blue-t-shirt.jpg",
        "price": 29,
        "category": "Clothing",
        "quantity": 25,
        "inventoryStatus": "INSTOCK",
        "rating": 5
      },
      {
        "id": "1004",
        "code": "h456wer53",
        "name": "Brace",
        "description": "Product Description",
        "image": "bracelet.jpg",
        "price": 15,
        "category": "Accessories",
        "quantity": 73,
        "inventoryStatus": "INSTOCK",
        "rating": 4
      },
      {
        "id": "1005",
        "code": "av2231fwg",
        "name": "Brown",
        "description": "Product Description",
        "image": "brown-purse.jpg",
        "price": 120,
        "category": "Accessories",
        "quantity": 0,
        "inventoryStatus": "OUTOFSTOCK",
        "rating": 4
      },
      {
        "id": "1006",
        "code": "bib36pfvm",
        "name": "Chakra",
        "description": "Product Description",
        "image": "chakra-bracelet.jpg",
        "price": 32,
        "category": "Accessories",
        "quantity": 5,
        "inventoryStatus": "LOWSTOCK",
        "rating": 3
      },
    ]
  }
  queryClickMethod() {
    console.log(this.selectedCity1);
  }
  gohome() { }
  setOption() {
    let option = {
      color: ['#046CFD', '#2BB88A', '#FFC400', '#2BA3C6', '#7D2BC6'],
      title: {
        text: ' OEE ',
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
        date: ['AE', 'PE', 'OEE', 'Target'],
        textStyle: {
          color: '#fff'
        }
      },
      xAxis: [
        {
          type: 'category',
          data: ['a', 'b', 'c'],
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
          axisLabel: {
            formatter: '{value} %',
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            lineStyle: { type: 'dashed', opacity: 0.9 }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: 'white',
            }
          }
        }
      ],
      series: [
        {
          name: 'AE',
          type: 'bar',
          stack: 'rma',
          label: {
            normal: {
              show: true,
              position: 'inside',
              textStyle: {
                color: '#fff'
              }
            }
          },
          barWidth: 20,
          itemStyle: {
            // color: '#046CFD'
          },
          data: [11, 22, 33]
        },
        {
          name: 'PE',
          type: 'bar',
          stack: 'rma',
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
            // color: '#2BB88A'
          },
          barWidth: 20,
          data: [10, 21, 34]
        },
        {
          name: 'OEE',
          type: 'line',
          symbolSize: '15',
          // smooth: true,
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: '{c}%',
              textStyle: {
                color: '#fff'
              }
            }
          },
          itemStyle: {
            // color: '#2BB88A'
          },
          data: [13, 15, 32]
        },
        {
          name: 'Target',
          type: 'line',
          // itemStyle: {
          //   normal: {
          //     // lineStyle: {
          //     //   width: 2,
          //     //   color: '#FFC400',
          //     //   // type: 'dashed'
          //     // },
          //     // color: 'red',
          //   }

          // },
          data: [25, 27, 34],
        },
      ],
    };
    return option
  }

  //TODO:BU别双坐标图
  getBUData() {
    const url = `api/copq/contrast/sbu?date=202010`
    // const url = 'api/copq/contrast/sbu?date=2020&terrain=B1'
    this.http.get(url).subscribe(res => {
      if (Object.keys(res).length) {
        let title = `DBG RMA比例 各产品类型整体趋势   物权工厂`
        let legend = ['COPQ']
        this.option4 = setOption4(res,title,legend)
        // this.setOption44(res)
      } else {
        this.option4 = this.defaultoption
      }
    })
  }
  // //TODO:拼接双坐标
  // setOption4(respText: object,title:string) {
  //   let { grids, xAxes, yAxes, series } = this.formateOption(respText)
  //   return {
  //     // color: ['#046CFD', '#2BB88A', '#FFC400', '#2BA3C6', '#7D2BC6'],
  //     title: {
  //       text: title,
  //       top: '2%',
  //       left:'center',
  //       textStyle: {
  //         color: '#ffffff',
  //         fontSize: dpr(16),
  //         rich: { a: { color: '#fd7502', fontSize: dpr(16), fontWeight: 'bold' } }
  //       }
  //     },
  //     tooltip: {
  //       trigger: 'axis',
  //       axisPointer: {            // 坐标轴指示器，坐标轴触发有效
  //         type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
  //       }
  //     },
  //     // legend: {
  //     //     data: ['copq'],
  //     //     right: '5%',
  //     //     itemWidth: 12,
  //     //     itemHeight: 6,
  //     //     textStyle: {
  //     //         color: '#ffffff',
  //     //         fontSize: 10,
  //     //     }
  //     // },
  //     grid: grids,
  //     xAxis: xAxes,
  //     yAxis: yAxes,
  //     series: series,
  //   };
  // }


  // updateRowGroupMetaData(params:any){
  //   this.rowGroupMetadata = {};
  //   if (this.data) {
  //       for (let i = 0; i < this.data.length; i++) {
  //           let rowData = this.data[i];
  //           let site = rowData[params];
  //           if (i == 0) {
  //               this.rowGroupMetadata[site] = { index: 0, size: 1 };
  //           }
  //           else {
  //               let previousRowData = this.data[i - 1];
  //               let previousRowGroup = previousRowData.site;
  //               if (site === previousRowGroup)
  //                   this.rowGroupMetadata[site].size++;
  //               else
  //                   this.rowGroupMetadata[site] = { index: i, size: 1 };
  //           }
  //       }
  //   }
  // }
}
