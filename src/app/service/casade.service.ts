import { Injectable } from '@angular/core';
import { casadeOption } from '../rma-manage/model/casadeOption';
import { casadeOption2,children2 } from '../rma-manage/model/casadeOption';
@Injectable()
export class CasadeService {
    nowDate = new Date()
    constructor() { }
    //['year','halfyear','quarter','month']
    buildOption(type: string[] = ['year'], date: Date = this.nowDate) {
        //year  halfyear quarter month
        let option = []
        let year = date.getFullYear()
        let i = year - 2
        let yearList = []
        while (i < year + 2) {
            yearList.push(i.toString())
            i++
        }

        let data = yearList.map(item => {
            return { cname: item, code: item }
        })
        let yearOption:casadeOption = {
            name: "年",
            code: "year",
            children: data
        }
        option.push(yearOption)
        //halfyear
        let hlist = yearList.map(item => {
            return {
                name: item,
                cities: [
                    { cname: "上半年", code: `${item}-1H` },
                    { cname: "下半年", code: `${item}-2H` }
                ]
            }
        })
        let halfyearOption:casadeOption = {
            name: "半年",
            code: "halfyear",
            children: hlist
        }
        option.push(halfyearOption)
        //quarter
        let qlist = yearList.map(item=>{
            return {
                name: item,
                cities: [
                  { cname: "Q1", code: `${item}-Q1` },
                  { cname: "Q2", code: `${item}-Q2` },
                  { cname: "Q3", code: `${item}-Q3` },
                  { cname: "Q4", code: `${item}-Q4` }
                ]
              }
        })
        let quarterOption:casadeOption = {
            name: "季度",
            code: "quarter",
            children: qlist
          }
          option.push(quarterOption)
        //month
        let mlist = yearList.map(item=>{
            return {
                name: item,
                cities: [
                  { cname: "1月", code: `${item}-01` },
                  { cname: "2月", code: `${item}-02` },
                  { cname: "3月", code: `${item}-03` },
                  { cname: "4月", code: `${item}-04` },
                  { cname: "5月", code: `${item}-05` },
                  { cname: "6月", code: `${item}-06` },
                  { cname: "7月", code: `${item}-07` },
                  { cname: "8月", code: `${item}-08` },
                  { cname: "9月", code: `${item}-09` },
                  { cname: "10月", code: `${item}-10` },
                  { cname: "11月", code: `${item}-11` },
                  { cname: "12月", code: `${item}-12` }
                ]
              }
        })
        let monthOption:casadeOption ={
            name: "月",
            code: "month",
            children: mlist
          }
        option.push(monthOption)

        return option
    }
    /**
     * {
     * name:'',
     * code:''
     * }
     */
    buildOption2(typeList:any[]=['year','halfyear','quarter','month']){
        let option = []
        let year = new Date().getFullYear()
        let interval = 2
        let i = year - interval
        let yearList = []
        while(i<year){
            yearList.push(i.toString())
            i++
        }
        let list = {'year':this.buildYear,'halfYear':this.bulidHalfYear,'quarter':this.buildQuarter,'month':this.bulidMonth}
        typeList.forEach(item=>{
            if( Object.keys(list).includes(item)){
                option.push(list[item](yearList))
            }
        })
        return option
    }
    buildYear(yearList){
        let data = yearList.map(item => {
            return { label: item, value: item }
        })
        let yearOption:casadeOption2 = {
            label: "年",
            value: "year",
            children: data
        }
        return yearOption
    }
    bulidHalfYear(yearList){
        let hlist = yearList.map(item => {
            return {
                label: item,
                cChildren: [
                    { label: "上半年", value: `${item}-1H` },
                    { label: "下半年", value: `${item}-2H` }
                ]
            }
        })
        let halfyearOption:casadeOption2 = {
            label: "半年",
            value: "halfyear",
            children: hlist
        }
        return halfyearOption
    }
    buildQuarter(yearList){
        let qlist = yearList.map(item=>{
            return {
                label: item,
                cChildren: [
                  { label: "Q1", value: `${item}-Q1` },
                  { label: "Q2", value: `${item}-Q2` },
                  { label: "Q3", value: `${item}-Q3` },
                  { label: "Q4", value: `${item}-Q4` }
                ]
              }
        })
        let quarterOption:casadeOption2 = {
            label: "季度",
            value: "quarter",
            children: qlist
          }
          return quarterOption
    }
    bulidMonth(yearList){
        let mlist = yearList.map(item=>{
            return {
                label: item,
                cChildren: [
                  { label: "1月", value: `${item}-01` },
                  { label: "2月", value: `${item}-02` },
                  { label: "3月", value: `${item}-03` },
                  { label: "4月", value: `${item}-04` },
                  { label: "5月", value: `${item}-05` },
                  { label: "6月", value: `${item}-06` },
                  { label: "7月", value: `${item}-07` },
                  { label: "8月", value: `${item}-08` },
                  { label: "9月", value: `${item}-09` },
                  { label: "10月", value: `${item}-10` },
                  { label: "11月", value: `${item}-11` },
                  { label: "12月", value: `${item}-12` }
                ]
              }
        })
        let monthOption:casadeOption2 ={
            label: "月",
            value: "month",
            children: mlist
          }
          return monthOption
    }
    buildSite(){

    }
}