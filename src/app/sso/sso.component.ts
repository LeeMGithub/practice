import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { user } from './module/user';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { ssouser } from './module/ssouser';
import { environment } from '../../environments/environment';
import { AuthenticationService } from '../../../node_modules/bidm-web';

@Component({
    // selector: 'app-sso',
    //   moduleId: module.id,
    encapsulation: ViewEncapsulation.None,
    templateUrl: './sso.component.html',
    styleUrls: ['./sso.component.css']
})
export class SsoComponent implements OnInit {

    model: any = {};
    user: user;
    loading = false;
    returnUrl: string;

    languageList: any;
    selectLang: string = 'zh';

    hint: string;
    hintVisible: boolean = false;
    userName: String;
    errorMsg;

    ssouser = new ssouser();
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private translate: TranslateService,
        private http: HttpClient,
    ) {
        this.selectLang = window.localStorage.getItem('language') || 'zh';
        translate.setDefaultLang('en');
        translate.use(this.selectLang);
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.languageList = [
            { label: '中文（简体）', value: 'zh' },
            { label: 'English', value: 'en' }
        ];
        this.http.get(environment.apiPath + '/sso').subscribe(
            data => {
                if (data['success'] === "true") {
                    this.model.username = data['useraccount'];
                    this.model.password = "ssoAuthenctsloginpassword";
                    this.login(this.model.username, this.model.password);

                }
                else {
                    this.hintVisible = true;
                }
            })
    }

    login(name, password) {
        this.model.username = name;
        this.model.password = password;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
            data => {
                if (+data.code === 0) {
                    this.router.navigate([data.params.link]);
                } else {
                    this.errorMsg = data.message;
                }
            }
            );
    }

    langChanged() {
        this.translate.use(this.selectLang);
    }

}
