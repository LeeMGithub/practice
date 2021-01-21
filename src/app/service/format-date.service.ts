import { Injectable } from '@angular/core';
import { subMonths, format, subDays } from 'date-fns';

//npm install --save date-fns
@Injectable()
export class FormatDateService {

  constructor() { }

  //构建当前月份的第一天
  buildFisrtDayOfMonth(date: Date): Date{
    date.setDate(1);
    return date;
  }

  //获取当前日期的前一天
  buildPreDayOfMonth(): Date{
    //let date = new Date();
    //date.setDate(date.getDate() - 1);
    return subDays(new Date(), 1);
  }
  //获取当前日期的前前一天
  buildPrePreDayOfMonth(): Date{
    //let date = new Date();
    //date.setDate(date.getDate() - 1);
    return subDays(new Date(), 2);
  }
  //获取当前日期的前一月
  buildPreMonth(): Date{
    //let date = new Date();
    //date.setMonth(date.getMonth() - 1);
    return subMonths(new Date(), 1);
  }
  //获取当前日期的上上个月
  buildPrePreMonth(): Date{
    //let date = new Date();
    //date.setMonth(date.getMonth() - 1);
    return subMonths(new Date(), 2);
  }
  //将当前日期格式化为字符串
  formatDate(date: Date): string{
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    // const day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    // if(separator == null)
    //   separator = '-';
    // return year + separator + month + separator + day;
    return format(date, 'YYYY-MM-DD');
  }

  //将当前日期格式化为字符串2020-01
  formatYearMonth(date: Date): string{
    // const year = date.getFullYear();
    // const month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    // if(separator == null)
    //   separator = '-';
    // return year + separator + month;
    return format(date, 'YYYY-MM');
  }
  //将当前日期格式化为字符串202001
  formatYearMonthS(date: Date): string{

    return format(date, 'YYYYMM');
  }
}
