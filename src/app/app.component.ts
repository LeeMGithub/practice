import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService} from 'primeng/api';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy, OnInit {
  title='DBG 品质看板'
  blocked: boolean = false;
  rippleInitListener: any;

  rippleMouseDownListener: any;

  layoutMode: string = "static";
  menuList: any[];
  topMenus: any[];
  sysMenus: any[];

  defaultTabRouter = environment.defaultTabRouter;
  unifiedAuth = environment.unifiedAuth;
  prod = environment.production;

  env: any = environment;
  display: boolean = false
  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private confirmationService: ConfirmationService
  ) {
    this.translate.setDefaultLang('en');
    this.translate.use(window.localStorage.getItem('language') || 'zh');
  }
  ngOnDestroy() {
    this.unbindRipple();
  }
  unbindRipple() {
    if (this.rippleInitListener) {
      document.removeEventListener('DOMContentLoaded', this.rippleInitListener);
    }
    if (this.rippleMouseDownListener) {
      document.removeEventListener('mousedown', this.rippleMouseDownListener);
    }
  }
  ngOnInit() {
    let url: string;
    if (environment.unifiedAuth) {
      url = "/api/getmenuitem";
    } else {
      url = "assets/menu/menu.json";
    }

    this.http.get(url).subscribe(
      (data) => {
        this.menuList = <any[]>data;
      }
    );
    this.topMenus = [];
    this.sysMenus = [];
    this.timeout()
  }
  timeout() {
        let _this = this
        /* 30分钟没有操作调回登录界面 */
        var maxTime = 60 * 30; // seconds
        // var maxTime = 20; // seconds
        var time = maxTime;
        window.addEventListener('mousemove', function (e) {
          time = maxTime; // reset
        });
        var intervalId = setInterval(function () {
          time--;
          if (time <= 0) {
            ShowInvalidLoginMessage();
            clearInterval(intervalId);
          }
        }, 1000)
        function ShowInvalidLoginMessage() {
          _this.confirmationService.confirm({
            message: '登录已超时，请重新登录。',
            accept: () => {
                //Actual logic to perform a confirmation
                window.localStorage.clear()
                window.location.href = '#/login';
            }
          });
        }
  }
}