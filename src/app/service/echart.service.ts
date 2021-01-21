import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs/Subject';
import "assets/echartTheme/dark.js";
import "assets/echartTheme/infographic.js";
import "assets/echartTheme/macarons.js";
import "assets/echartTheme/roma.js";
import "assets/echartTheme/shine.js";
import "assets/echartTheme/vintage.js";
import * as echarts from 'echarts';
import { Subject } from '../../../node_modules/rxjs';

@Injectable()
export class EchartService {

  //菜单布局状态, static时为true,overlay时为false;
  private layoutState = new Subject<boolean>();

  //将itemsSource作为一个被观察者
  itemsHandler = this.layoutState.asObservable();


  constructor() { }

  //初始化echart
  init(dom: HTMLElement) {
    const theme = window.localStorage.getItem('echartTheme');
    if (theme != null) {
      return echarts.init(<HTMLDivElement>dom, theme);
    }
    return echarts.init(<HTMLDivElement>dom, 'macarons');
  }

  setState(state: boolean) {
    //向观察者发布变动
    this.layoutState.next(state);
  }
}
