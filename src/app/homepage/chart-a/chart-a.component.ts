import { Component, OnInit,Input } from '@angular/core'
import '../../../assets/js/china'
import '../../../assets/js/world_new'
@Component({
  selector: 'app-chart-a',
  templateUrl: './chart-a.component.html',
  styleUrls: ['./chart-a.component.css']
})
export class ChartAComponent implements OnInit {
  @Input() area:string
  switchCase:boolean=true
  geoCoordMap: {}
  XAData: any
  XNData: any
  YCData: any
  echartOption: any
  // worldOption:any
  countries: any[];

  selectedCity1: any;
  constructor() { }


  ngOnInit() {
    this.countries = [
      {
        name: "Australia",
        code: "AU",
        states: [
          {
            name: "New South Wales",
            cities: [
              { cname: "Sydney", code: "A-SY" },
              { cname: "Newcastle", code: "A-NE" },
              { cname: "Wollongong", code: "A-WO" }
            ]
          },
          {
            name: "Queensland",
            cities: [
              { cname: "Brisbane", code: "A-BR" },
              { cname: "Townsville", code: "A-TO" }
            ]
          }
        ]
      },
      {
        name: "Canada",
        code: "CA",
        states: [
          {
            name: "Quebec",
            cities: [
              { cname: "Montreal", code: "C-MO" },
              { cname: "Quebec City", code: "C-QU" }
            ]
          },
          {
            name: "Ontario",
            cities: [
              { cname: "Ottawa", code: "C-OT" },
              { cname: "Toronto", code: "C-TO" }
            ]
          }
        ]
      },
      {
        name: "United States",
        code: "US",
        states: [
          {
            name: "California",
            cities: [
              { cname: "Los Angeles", code: "US-LA" },
              { cname: "San Diego", code: "US-SD" },
              { cname: "San Francisco", code: "US-SF" }
            ]
          },
          {
            name: "Florida",
            cities: [
              { cname: "Jacksonville", code: "US-JA" },
              { cname: "Miami", code: "US-MI" },
              { cname: "Tampa", code: "US-TA" },
              { cname: "Orlando", code: "US-OR" }
            ]
          },
          {
            name: "Texas",
            cities: [
              { cname: "Austin", code: "US-AU" },
              { cname: "Dallas", code: "US-DA" },
              { cname: "Houston", code: "US-HO" }
            ]
          }
        ]
      }
    ];
    // this.XAData = [
    //   [{ name: "长沙" }, { name: "北京", value: 100 }],
    //   [{ name: "长沙" }, { name: "上海", value: 100 }],
    //   [{ name: "长沙" }, { name: "广州", value: 100 }],
    //   [{ name: "长沙" }, { name: "深圳", value: 100 }],
    //   [{ name: "长沙" }, { name: "西安", value: 100 }]
    // ]
    this.XNData = [
      [{ name: "长沙" }, { name: "西宁", value: 100 }],
      [{ name: "长沙" }, { name: "拉萨", value: 100 }],
      [{ name: "长沙" }, { name: "哈尔滨", value: 100 }],
      [{ name: "长沙" }, { name: "成都", value: 100 }],
      [{ name: "长沙" }, { name: "重庆", value: 100 }]
    ]
    this.YCData = [
      [{ name: "北京" }, { name: "长沙", value: 100 }],
      [{ name: "北京" }, { name: "贵阳", value: 100 }],
      [{ name: "北京" }, { name: "杭州", value: 100 }]
    ]
    if(this.area == 'china'){
      this.echartOption = this.getChinaEchart()

    }else{
      this.echartOption = this.getWorldEchart()
    }
  }

  convertData(data) { // 地图数据转换
    let res = [];
    for (let i = 0; i < data.length; i++) {
      let dataItem = data[i];
      let fromCoord = this.geoCoordMap[dataItem[0].name];
      let toCoord = this.geoCoordMap[dataItem[1].name];
      if (fromCoord && toCoord) {
        res.push({
          fromName: dataItem[0].name,
          toName: dataItem[1].name,
          coords: [fromCoord, toCoord],
          value: dataItem[1].value
        });
      }
    }
    return res;
  }
  getChinaEchart() { // 初始化地图数据

    this.geoCoordMap = {
      上海: [121.4648, 31.2891],
      东莞: [113.8953, 22.901],
      东营: [118.7073, 37.5513],
      中山: [113.4229, 22.478],
      临汾: [111.4783, 36.1615],
      临沂: [118.3118, 35.2936],
      丹东: [124.541, 40.4242],
      丽水: [119.5642, 28.1854],
      乌鲁木齐: [87.9236, 43.5883],
      佛山: [112.8955, 23.1097],
      保定: [115.0488, 39.0948],
      兰州: [103.5901, 36.3043],
      包头: [110.3467, 41.4899],
      北京: [116.4551, 40.2539],
      北海: [109.314, 21.6211],
      南京: [118.8062, 31.9208],
      南宁: [108.479, 23.1152],
      南昌: [116.0046, 28.6633],
      南通: [121.1023, 32.1625],
      厦门: [118.1689, 24.6478],
      台州: [121.1353, 28.6688],
      合肥: [117.29, 32.0581],
      呼和浩特: [111.4124, 40.4901],
      咸阳: [108.4131, 34.8706],
      哈尔滨: [127.9688, 45.368],
      唐山: [118.4766, 39.6826],
      嘉兴: [120.9155, 30.6354],
      大同: [113.7854, 39.8035],
      大连: [122.2229, 39.4409],
      天津: [117.4219, 39.4189],
      太原: [112.3352, 37.9413],
      威海: [121.9482, 37.1393],
      宁波: [121.5967, 29.6466],
      宝鸡: [107.1826, 34.3433],
      宿迁: [118.5535, 33.7775],
      常州: [119.4543, 31.5582],
      广州: [113.5107, 23.2196],
      廊坊: [116.521, 39.0509],
      延安: [109.1052, 36.4252],
      张家口: [115.1477, 40.8527],
      徐州: [117.5208, 34.3268],
      德州: [116.6858, 37.2107],
      惠州: [114.6204, 23.1647],
      成都: [103.9526, 30.7617],
      扬州: [119.4653, 32.8162],
      承德: [117.5757, 41.4075],
      拉萨: [91.1865, 30.1465],
      无锡: [120.3442, 31.5527],
      日照: [119.2786, 35.5023],
      昆明: [102.9199, 25.4663],
      杭州: [119.5313, 29.8773],
      枣庄: [117.323, 34.8926],
      柳州: [109.3799, 24.9774],
      株洲: [113.5327, 27.0319],
      武汉: [114.3896, 30.6628],
      汕头: [117.1692, 23.3405],
      江门: [112.6318, 22.1484],
      沈阳: [123.1238, 42.1216],
      沧州: [116.8286, 38.2104],
      河源: [114.917, 23.9722],
      泉州: [118.3228, 25.1147],
      泰安: [117.0264, 36.0516],
      泰州: [120.0586, 32.5525],
      济南: [117.1582, 36.8701],
      济宁: [116.8286, 35.3375],
      海口: [110.3893, 19.8516],
      淄博: [118.0371, 36.6064],
      淮安: [118.927, 33.4039],
      深圳: [114.5435, 22.5439],
      清远: [112.9175, 24.3292],
      温州: [120.498, 27.8119],
      渭南: [109.7864, 35.0299],
      湖州: [119.8608, 30.7782],
      湘潭: [112.5439, 27.7075],
      滨州: [117.8174, 37.4963],
      潍坊: [119.0918, 36.524],
      烟台: [120.7397, 37.5128],
      玉溪: [101.9312, 23.8898],
      珠海: [113.7305, 22.1155],
      盐城: [120.2234, 33.5577],
      盘锦: [121.9482, 41.0449],
      石家庄: [114.4995, 38.1006],
      福州: [119.4543, 25.9222],
      秦皇岛: [119.2126, 40.0232],
      绍兴: [120.564, 29.7565],
      聊城: [115.9167, 36.4032],
      肇庆: [112.1265, 23.5822],
      舟山: [122.2559, 30.2234],
      苏州: [120.6519, 31.3989],
      莱芜: [117.6526, 36.2714],
      菏泽: [115.6201, 35.2057],
      营口: [122.4316, 40.4297],
      葫芦岛: [120.1575, 40.578],
      衡水: [115.8838, 37.7161],
      衢州: [118.6853, 28.8666],
      西宁: [101.4038, 36.8207],
      西安: [109.1162, 34.2004],
      贵阳: [106.6992, 26.7682],
      连云港: [119.1248, 34.552],
      邢台: [114.8071, 37.2821],
      邯郸: [114.4775, 36.535],
      郑州: [113.4668, 34.6234],
      鄂尔多斯: [108.9734, 39.2487],
      重庆: [107.7539, 30.1904],
      金华: [120.0037, 29.1028],
      铜川: [109.0393, 35.1947],
      银川: [106.3586, 38.1775],
      镇江: [119.4763, 31.9702],
      长春: [125.8154, 44.2584],
      长沙: [113.0823, 28.2568],
      长治: [112.8625, 36.4746],
      阳泉: [113.4778, 38.0951],
      青岛: [120.4651, 36.3373],
      韶关: [113.7964, 24.7028]
    };

    let planePath = "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";

    let color = ["#fff", "#fff", "#fff"]; //航线的颜色
    let series = [];

    [
      // ["长沙", this.XAData],
      // ["长沙", this.XNData],
      // ["北京", this.YCData]
    ].forEach((item, i) => {
      series.push(
        {
          name: item[0] + " Top3",
          type: "lines",
          zlevel: 1,
          effect: {
            show: true,
            period: 6,
            trailLength: 0.7,
            color: "red", //arrow箭头的颜色
            symbolSize: 3
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 0,
              curveness: 0.2
            }
          },
          data: this.convertData(item[1])
        },
        {
          name: item[0] + " Top3",
          type: "lines",
          zlevel: 2,
          symbol: ["none", "arrow"],
          symbolSize: 10,
          effect: {
            show: true,
            period: 6,
            trailLength: 0,
            symbol: planePath,
            symbolSize: 15
          },
          lineStyle: {
            normal: {
              color: color[i],
              width: 1,
              opacity: 0.6,
              curveness: 0.2
            }
          },
          data: this.convertData(item[1])
        },
        {
          name: item[0] + " Top3",
          type: "effectScatter",
          coordinateSystem: "geo",
          zlevel: 2,
          rippleEffect: {
            brushType: "stroke"
          },
          label: {
            normal: {
              show: true,
              position: "right",
              formatter: "{b}"
            }
          },
          symbolSize: (val) => {
            return val[2] / 8;
          },
          itemStyle: {
            normal: {
              color: color[i]
            },
            emphasis: {
              areaColor: "#2B91B7"
            }
          },
          data: item[1].map((dataItem) => {
            return {
              name: dataItem[1].name,
              value: this.geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
            };
          })
        }
      );
    });

    let option = {
      tooltip: {
        trigger: "item",
        formatter: (params, ticket, callback) => {
          if (params.seriesType == "effectScatter") {
            return "线路：" + params.data.name + "" + params.data.value[2];
          } else if (params.seriesType == "lines") {
            return (
              params.data.fromName +
              ">" +
              params.data.toName +
              "<br />" +
              params.data.value
            );
          } else {
            return params.name;
          }
        }
      },
      geo: {
        map: "china",
        label: {
          emphasis: {
            show: true,
            color: "#fff"
          }
        },
        roam: false,
        //   放大我们的地图
        zoom: 1.2,
        itemStyle: {
          normal: {
            areaColor: "rgba(43, 196, 243, 0.42)",
            borderColor: "rgba(43, 196, 243, 1)",
            borderWidth: 1
          },
          emphasis: {
            areaColor: "#2B91B7"
          }
        }
      },
      series: series
    }
    console.log(option);

    return option
  }
  getWorldEchart() {
    // var chart = echarts.init(document.getElementById("main"));
    let nameMap = {
      "Afghanistan": "阿富汗",
      "Albania": "阿尔巴尼亚",
      "Algeria": "阿尔及利亚",
      "Angola": "安哥拉",
      "Argentina": "阿根廷",
      "Armenia": "亚美尼亚",
      "Australia": "澳大利亚",
      "Austria": "奥地利",
      "Azerbaijan": "阿塞拜疆",
      "Bahamas": "巴哈马",
      "Bahrain": "巴林",
      "Bangladesh": "孟加拉国",
      "Belarus": "白俄罗斯",
      "Belgium": "比利时",
      "Belize": "伯利兹",
      "Benin": "贝宁",
      "Bhutan": "不丹",
      "Bolivia": "玻利维亚",
      "Bosnia and Herz.": "波斯尼亚和黑塞哥维那",
      "Botswana": "博茨瓦纳",
      "Brazil": "巴西",
      "British Virgin Islands": "英属维京群岛",
      "Brunei": "文莱",
      "Bulgaria": "保加利亚",
      "Burkina Faso": "布基纳法索",
      "Burundi": "布隆迪",
      "Cambodia": "柬埔寨",
      "Cameroon": "喀麦隆",
      "Canada": "加拿大",
      "Cape Verde": "佛得角",
      "Cayman Islands": "开曼群岛",
      "Central African Rep.": "中非共和国",
      "Chad": "乍得",
      "Chile": "智利",
      "China": "中国",
      "Colombia": "哥伦比亚",
      "Comoros": "科摩罗",
      "Congo": "刚果",
      "Costa Rica": "哥斯达黎加",
      "Croatia": "克罗地亚",
      "Cuba": "古巴",
      "Cyprus": "塞浦路斯",
      "Czech Rep.": "捷克共和国",
      "Côte d'Ivoire": "科特迪瓦",
      "Dem. Rep. Congo": "刚果民主共和国",
      "Dem. Rep. Korea": "朝鲜",
      "Denmark": "丹麦",
      "Djibouti": "吉布提",
      "Dominican Rep.": "多米尼加共和国",
      "Ecuador": "厄瓜多尔",
      "Egypt": "埃及",
      "El Salvador": "萨尔瓦多",
      "Equatorial Guinea": "赤道几内亚",
      "Eritrea": "厄立特里亚",
      "Estonia": "爱沙尼亚",
      "Ethiopia": "埃塞俄比亚",
      "Falkland Is.": "福克兰群岛",
      "Fiji": "斐济",
      "Finland": "芬兰",
      "Fr. S. Antarctic Lands": "所罗门群岛",
      "France": "法国",
      "Gabon": "加蓬",
      "Gambia": "冈比亚",
      "Georgia": "格鲁吉亚",
      "Germany": "德国",
      "Ghana": "加纳",
      "Greece": "希腊",
      "Greenland": "格陵兰",
      "Guatemala": "危地马拉",
      "Guinea": "几内亚",
      "Guinea-Bissau": "几内亚比绍",
      "Guyana": "圭亚那",
      "Haiti": "海地",
      "Honduras": "洪都拉斯",
      "Hungary": "匈牙利",
      "Iceland": "冰岛",
      "India": "印度",
      "Indonesia": "印度尼西亚",
      "Iran": "伊朗",
      "Iraq": "伊拉克",
      "Ireland": "爱尔兰",
      "Isle of Man": "马恩岛",
      "Israel": "以色列",
      "Italy": "意大利",
      "Jamaica": "牙买加",
      "Japan": "日本",
      "Jordan": "约旦",
      "Kazakhstan": "哈萨克斯坦",
      "Kenya": "肯尼亚",
      "Korea": "韩国",
      "Kuwait": "科威特",
      "Kyrgyzstan": "吉尔吉斯斯坦",
      "Lao PDR": "老挝",
      "Latvia": "拉脱维亚",
      "Lebanon": "黎巴嫩",
      "Lesotho": "莱索托",
      "Liberia": "利比里亚",
      "Libya": "利比亚",
      "Lithuania": "立陶宛",
      "Luxembourg": "卢森堡",
      "Macedonia": "马其顿",
      "Madagascar": "马达加斯加",
      "Malawi": "马拉维",
      "Malaysia": "马来西亚",
      "Maldives": "马尔代夫",
      "Mali": "马里",
      "Malta": "马耳他",
      "Mauritania": "毛利塔尼亚",
      "Mauritius": "毛里求斯",
      "Mexico": "墨西哥",
      "Moldova": "摩尔多瓦",
      "Monaco": "摩纳哥",
      "Mongolia": "蒙古",
      "Montenegro": "黑山共和国",
      "Morocco": "摩洛哥",
      "Mozambique": "莫桑比克",
      "Myanmar": "缅甸",
      "Namibia": "纳米比亚",
      "Nepal": "尼泊尔",
      "Netherlands": "荷兰",
      "New Caledonia": "新喀里多尼亚",
      "New Zealand": "新西兰",
      "Nicaragua": "尼加拉瓜",
      "Niger": "尼日尔",
      "Nigeria": "尼日利亚",
      "Norway": "挪威",
      "Oman": "阿曼",
      "Pakistan": "巴基斯坦",
      "Panama": "巴拿马",
      "Papua New Guinea": "巴布亚新几内亚",
      "Paraguay": "巴拉圭",
      "Peru": "秘鲁",
      "Philippines": "菲律宾",
      "Poland": "波兰",
      "Portugal": "葡萄牙",
      "Puerto Rico": "波多黎各",
      "Qatar": "卡塔尔",
      "Reunion": "留尼旺",
      "Romania": "罗马尼亚",
      "Russia": "俄罗斯",
      "Rwanda": "卢旺达",
      "S. Geo. and S. Sandw. Is.": "南乔治亚和南桑威奇群岛",
      "S. Sudan": "南苏丹",
      "San Marino": "圣马力诺",
      "Saudi Arabia": "沙特阿拉伯",
      "Senegal": "塞内加尔",
      "Serbia": "塞尔维亚",
      "Sierra Leone": "塞拉利昂",
      "Singapore": "新加坡",
      "Slovakia": "斯洛伐克",
      "Slovenia": "斯洛文尼亚",
      "Solomon Is.": "所罗门群岛",
      "Somalia": "索马里",
      "South Africa": "南非",
      "Spain": "西班牙",
      "Sri Lanka": "斯里兰卡",
      "Sudan": "苏丹",
      "Suriname": "苏里南",
      "Swaziland": "斯威士兰",
      "Sweden": "瑞典",
      "Switzerland": "瑞士",
      "Syria": "叙利亚",
      "Tajikistan": "塔吉克斯坦",
      "Tanzania": "坦桑尼亚",
      "Thailand": "泰国",
      "Togo": "多哥",
      "Tonga": "汤加",
      "Trinidad and Tobago": "特立尼达和多巴哥",
      "Tunisia": "突尼斯",
      "Turkey": "土耳其",
      "Turkmenistan": "土库曼斯坦",
      "U.S. Virgin Islands": "美属维尔京群岛",
      "Uganda": "乌干达",
      "Ukraine": "乌克兰",
      "United Arab Emirates": "阿拉伯联合酋长国",
      "United Kingdom": "英国",
      "United States": "美国",
      "Uruguay": "乌拉圭",
      "Uzbekistan": "乌兹别克斯坦",
      "Vanuatu": "瓦努阿图",
      "Vatican City": "梵蒂冈城",
      "Venezuela": "委内瑞拉",
      "Vietnam": "越南",
      "W. Sahara": "西撒哈拉",
      "Yemen": "也门",
      "Yugoslavia": "南斯拉夫",
      "Zaire": "扎伊尔",
      "Zambia": "赞比亚",
      "Zimbabwe": "津巴布韦"
    };
    var geoCoordMap = {
      北京: [116.28, 39.54],
      // 杭州: [120.10, 30.15],
      // 南宁: [108.479, 23.1152],
      // 广州: [113.5107, 23.2196],
      重庆: [107.7539, 30.1904],
      上海: [121.4648, 31.2891],
      尼日利亚: [-4.388361, 11.186148],
      洛杉矶: [-118.24311, 34.052713],
      香港: [114.195466, 22.282751],
      芝加哥: [-87.801833, 41.870975],
      加纳库马西: [-4.62829, 7.72415],
      曼彻斯特: [-1.657222, 51.886863],
      汉堡: [10.01959, 54.38474],
      阿拉木图: [45.326912, 41.101891],
      伊尔库茨克: [89.116876, 67.757906],
      巴西: [-48.678945, -10.493623],
      埃及: [31.815593, 31.418032],
      巴塞罗纳: [2.175129, 41.385064],
      柬埔寨: [104.88659, 11.545469],
      米兰: [9.189948, 45.46623],
      蒙得维的亚: [-56.162231, -34.901113],
      莫桑比克: [32.608571, -25.893473],
      阿尔及尔: [3.054275, 36.753027],
      阿联酋迪拜: [55.269441, 25.204514],
      布达佩斯: [17.108519, 48.179162],
      悉尼: [150.993137, -33.675509],
      加州: [-121.910642, 41.38028],
      墨尔本: [144.999416, -37.781726],
      墨西哥: [-99.094092, 19.365711],
      温哥华: [-123.023921, 49.311753]
    };
    var BJData1 = [[{
      name: "北京",
      value: 12580
    }], [{
      name: "重庆",
      value: 10000000
    }], [{
      name: "上海",
      value: 9100
    }], [{
      name: "尼日利亚",
      value: 9100
    }], [{
      name: "洛杉矶",
      value: 2370
    }], [{
      name: "香港",
      value: 3130
    }], [{
      name: "芝加哥",
      value: 2350
    }], [{
      name: "加纳库马西",
      value: 5120
    }], [{
      name: "曼彻斯特",
      value: 3110
    }], [{
      name: "汉堡",
      value: 6280
    }], [{
      name: "阿拉木图",
      value: 7255
    }], [{
      name: "伊尔库茨克",
      value: 8125
    }], [{
      name: "巴西",
      value: 3590
    }], [{
      name: "埃及",
      value: 3590
    }], [{
      name: "巴塞罗纳",
      value: 3590
    }], [{
      name: "柬埔寨",
      value: 3590
    }], [{
      name: "米兰",
      value: 3590
    }], [{
      name: "蒙得维的亚",
      value: 3590
    }], [{
      name: "莫桑比克",
      value: 3590
    }], [{
      name: "阿尔及尔",
      value: 31590
    }], [{
      name: "阿联酋迪拜",
      value: 13590
    }], [{
      name: "布达佩斯",
      value: 23590
    }], [{
      name: "悉尼",
      value: 3590
    }], [{
      name: "加州",
      value: 3590
    }], [{
      name: "墨尔本",
      value: 3590
    }], [{
      name: "墨西哥",
      value: 3590
    }], [{
      name: "温哥华",
      value: 3590
    }]];
    var BJData = []
    var series = [];
    [
      [, BJData]
    ].forEach(function (item, i) {
      series.push({
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          //涟漪特效
          period: 4, //动画时间，值越小速度越快
          brushType: "stroke", //波纹绘制方式 stroke, fill
          scale: 4
          //波纹圆环最大限制，值越大波纹越大
        },
        label: {
          normal: {
            show: true,
            position: "right", //显示位置
            offset: [5, 0], //偏移设置
            formatter: "{b}", //圆环显示文字
          },
          emphasis: {
            show: true
          }
        },
        symbol: "circle",
        symbolSize: function (val) {
          var level = 0;
          var state = Math.floor(val[2] / 5000);
          switch (state) {
            case 0: level = 0; break;
            case 1: level = 1; break;
            case 2: level = 2; break;
            case 3: level = 3; break;
            case 4: level = 4; break;
            case 5: level = 5; break;
            case 6: level = 6; break;
            case 7: level = 7; break;
            case 8: level = 8; break;
            case 9: level = 9; break;
            default: level = 10;
          }
          return 5 + level; //圆环大小
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[0].name/*+"\n"+dataItem[0].value*/,
            value: geoCoordMap[dataItem[0].name]
              .concat([dataItem[0].value])
          };
        })
      });
    });

    let option = {
      // backgroundColor: '#000',
      //悬浮提示
      // tooltip: {
      //     trigger: "item",
      //     backgroundColor: "#1540a1",
      //     borderColor: "#FFFFCC",
      //     showDelay: 0,
      //     hideDelay: 0,
      //    // enterable: true,
      //     transitionDuration: 0,
      //    // extraCssText: "z-index:100",formatter
      //     formatter: function (params, ticket, callback) {
      //         //根据业务自己拓展要显示的内容
      //         var res = "";
      //         var name = params.name;
      //         var value = params.value[params.seriesIndex + 1];
      //         res = "<span style='color:#fff;'>" + name.toString().split(' ')[0]
      //             + "</span><br/>爬虫：" + name.toString().split(' ')[1];
      //         return res;
      //     }
      // },
      // visualMap: {
      //     //图例值控制
      //     min: 0,
      //     max: 10000,
      //     text: ['High', 'Low'],
      //     show: false,
      //     calculable: true,
      //     //color: ["#0bc7f3"],
      //     color: ['orangered', 'yellow', 'lightskyblue']
      // },
      nameMap: nameMap,
      geo: {
        map: "world",
        label: {
          emphasis: {
            show: true,
            color: "#fff"
          }
        },
        roam: true, //是否允许缩放
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "180%",
        itemStyle: {
          normal: {
            areaColor: "rgba(43, 196, 243, 0.42)",
            borderColor: "rgba(43, 196, 243, 1)",
            borderWidth: 1
          },
          emphasis: {
            areaColor: "#2B91B7"
          }
        }
      },
      series: series
    };
    return option
  }
  change(current) {
    current? (this.echartOption=this.getChinaEchart()):(this.echartOption=this.getWorldEchart())
    this.switchCase = current;
  }
}
