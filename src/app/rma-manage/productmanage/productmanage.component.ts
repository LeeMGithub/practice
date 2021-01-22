import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { CasadeService } from '../../service/casade.service';
import { setOption4,setStackOption } from '../../common/utils/Mosaic';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormatDateService } from '../../service/format-date.service';
import { MenuClickService } from 'src/app/service/menu-click.service';
@Component({
  selector: 'app-productmanage',
  templateUrl: './productmanage.component.html',
  styleUrls: ['./productmanage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductmanageComponent implements OnInit {
  title:string='Mobile RMA比例数据'
  date: Date
  countries: any[];
  selectedCity1: any;
  echartTheme
  defaultoption
  option4
  option1
  cols
  products
  constructor( private format: FormatDateService,private router:Router,private casade:CasadeService,private http:HttpClient,private mcs: MenuClickService,) {
    this.mcs.menuClick(this.router.url);//记录菜单点击情况
   }

  ngOnInit() {
    this.countries = this.casade.buildOption2()
    this.getBUData()
    this.getData()
  }
    //TODO:BU别双坐标图
    getBUData() {
      const url = `api/copq/contrast/sbu?date=202010`
      // const url = 'api/copq/contrast/sbu?date=2020&terrain=B1'
      this.http.get(url).subscribe(res => {
        if (Object.keys(res).length) {
          let data = {
            data:res,
            eType:[
              // {type:'bar',yname:'比例1',data:''},
              // {type:'bar',yname:'比例2',data:[20, 45, 46, 43]},
              {type:'line',yname:'COPQ',data:'rate'}],
            title:`DBG RMA比例 各产品类型整体趋势   物权工厂`,
            legend:['比例1','比例2','COPQ']
          }
          this.option4 = setOption4(data)
          // console.log(this.option4);
        } else {
          this.option4 = this.defaultoption
        }
      })
    }
    //TODO:堆叠图
    getData(){
      let data = {
        "month": [
            {
                "product": "202008",
                "target": 28500,
                "rmaNum": 96408,
                "shipNum": 1429944,
                "rmaRatio": 1341,
                "TLCM": 22897,
                "TFOS": 1454,
                "OpenCell": 24171,
                "FOB": 2497,
                "LCM": 45389
            },
            {
                "product": "202009",
                "target": 28500,
                "rmaNum": 90687,
                "shipNum": 3966976,
                "rmaRatio": 124,
                "TLCM": 20406,
                "TFOS": 91,
                "OpenCell": 24586,
                "FOB": 542,
                "LCM": 45062
            },
            {
                "product": "202010",
                "target": 27200,
                "rmaNum": 96460,
                "shipNum": 18073800,
                "rmaRatio": 109,
                "TLCM": 13995,
                "TFOS": 796,
                "OpenCell": 37886,
                "FOB": 1653,
                "LCM": 42130
            },
            {
                "product": "202011",
                "target": 27200,
                "rmaNum": 141589,
                "shipNum": 2109720,
                "rmaRatio": -68,
                "TLCM": 24811,
                "TFOS": 746,
                "OpenCell": 38451,
                "FOB": 2081,
                "LCM": 75500
            },
            {
                "product": "202012",
                "target": 27200,
                "rmaNum": 131187,
                "shipNum": 3063124,
                "rmaRatio": -638,
                "TLCM": 37931,
                "TFOS": 306,
                "OpenCell": 29141,
                "FOB": 3644,
                "LCM": 60165
            },
        ],
        "year": [
            {
                "product": "2020",
                "target": 0,
                "rmaNum": 1775338,
                "shipNum": 150103012,
                "rmaRatio": 10,
                "TLCM": 375716,
                "TFOS": 28755,
                "FOGA": 12,
                "OpenCell": 586888,
                "FOB": 16763,
                "TDDI": 3,
                "TTLCM": 6098,
                "LCM": 761103
            },
            {
                "product": "2021",
                "target": 0,
                "rmaNum": 0,
                "shipNum": null,
                "rmaRatio": 0
            },
            {
                "product": "20202H",
                "target": 0,
                "rmaNum": 724928,
                "shipNum": 44445309,
                "rmaRatio": -20,
                "TLCM": 144230,
                "TFOS": 5942,
                "OpenCell": 209530,
                "FOB": 12262,
                "TTLCM": 797,
                "LCM": 352167
            },
            {
                "product": "20211H",
                "target": 0,
                "rmaNum": 0,
                "shipNum": null,
                "rmaRatio": 0
            }
        ],
        "quarter": [
            {
                "product": "2020/Q2",
                "target": 29900,
                "rmaNum": 592073,
                "shipNum": 56387229,
                "rmaRatio": -11,
                "TLCM": 145779,
                "TFOS": 2130,
                "OpenCell": 185391,
                "FOB": 3820,
                "TTLCM": 5301,
                "LCM": 249652
            },
            {
                "product": "2020/Q3",
                "target": 28500,
                "rmaNum": 355692,
                "shipNum": 21198665,
                "rmaRatio": -37,
                "TLCM": 67493,
                "TFOS": 4094,
                "OpenCell": 104052,
                "FOB": 4884,
                "TTLCM": 797,
                "LCM": 174372
            },
            {
                "product": "2020/Q4",
                "target": 27200,
                "rmaNum": 369236,
                "shipNum": 23246644,
                "rmaRatio": -5,
                "TLCM": 76737,
                "TFOS": 1848,
                "OpenCell": 105478,
                "FOB": 7378,
                "LCM": 177795
            },
            {
                "product": "2021/Q1",
                "target": 0,
                "rmaNum": 0,
                "shipNum": null,
                "rmaRatio": 0
            }
        ]
    }
      let option = {
        data:data['month'],
        dimensions:['product','target','rmaNum','shipNum','rmaRatio','TLCM','TFOS','OpenCell'],//对比维度
        eType:['bar','bar','bar','line','line'],
        title:'',
        legend:'',

      }
      this.option1 = setStackOption(option)
    }

}
