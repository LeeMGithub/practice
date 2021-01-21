import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from '../../app.component';

@Injectable()
export class CommonToolsService {

    app:AppComponent;
    constructor(
        private confirmationService: ConfirmationService,
        public translateService: TranslateService) { }

    // Date Format
    formatDate(date: Date, fmt: string): string {
        // const current = new Date();

        var o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };

        const week = {
            "0": "日",
            "1": "一",
            "2": "二",
            "3": "三",
            "4": "四",
            "5": "五",
            "6": "六"
        };

        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));

        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "星期" : "周") : "") + week[date.getDay() + ""]);
        }

        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

        return fmt;
    }

    compareAsc(property) {
        return (obj1, obj2) => {
            let val1 = obj1[property];
            let val2 = obj2[property];
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    getFromDate(day: number, format: string): string {
        let today: Date = new Date();
        let nowTime: number = today.getTime();
        today.setTime(nowTime - day * 24 * 60 * 60 * 1000);
        return this.formatDate(today, format);
    }

    getToDate(day: number, format: string): string {
        let today: Date = new Date();
        let nowTime: number = today.getTime();
        today.setTime(nowTime + day * 24 * 60 * 60 * 1000);
        return this.formatDate(today, format);
    }

    showMsg(header: string, message: string) {
        this.confirmationService.confirm({
            header: this.translateService.instant(header),
            message: this.translateService.instant(message),
            rejectVisible: false
        });
    }

    showMsgExtra(header: string, message: string, extraMsg: string) {
        this.confirmationService.confirm({
            header: this.translateService.instant(header),
            message: this.translateService.instant(message) + '<br/>' + extraMsg,
            rejectVisible: false
        });
    }

    maskLayer(flag:boolean){
        this.app.blocked = flag;
    }
    public initApp(appComponent:AppComponent){
        this.app = appComponent;
    }
}
