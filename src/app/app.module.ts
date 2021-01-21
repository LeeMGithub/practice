import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { CommonToolsService } from './common/service/common.tools.service';
import { LayoutModule, DefaultComponent, PageReuseStrategy, RetabService, AuthGuard, ApiService, EnvService, BidmService, CookieService, AuthenticationService, Md5Service } from 'bidm-web';
import { AppRoutes } from './app.routes';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { FormatDateService } from './service/format-date.service';
import { MenuClickService } from './service/menu-click.service';
import { CasadeService } from './service/casade.service';
// import { CommonComponentModule } from './common-component/common-component.module';
import { NgxEchartsModule } from 'ngx-echarts';
import { CtsReuseStrategy } from './strategy/cts-reuse-strategy';


import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService, ConfirmDialogModule, DialogService, ScrollPanelModule, TabViewModule, DropdownModule, InputTextModule, TabMenuModule, ContextMenuModule, GrowlModule, PanelMenuModule, MenuModule, TooltipModule, ToolbarModule, SplitButtonModule, TieredMenuModule, CalendarModule, ButtonModule, RadioButtonModule, PanelModule } from 'primeng/primeng';


import { AppComponent } from './app.component';
import { SsoComponent } from './sso/sso.component';
import { LoginComponent } from './login/login.component';
// import { WebsysComponent } from './websys/websys.component';
// import { HomepageComponent } from './homepage/homepage.component';
// import { BoPortalComponent } from './bo-portal/bo-portal.component';
// import { HomepageNewComponent } from './homepagenew/homepagenew.component';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/language/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // HomepageComponent,
    // HomepageNewComponent,
    // BoPortalComponent,
    // WebsysComponent,
    SsoComponent,
  ],
  imports: [
    AppRoutes,
    BrowserModule,
    FormsModule,
    InputTextareaModule,
    ToastModule,
    DialogModule,
    ConfirmDialogModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    DynamicDialogModule,
    ScrollPanelModule,
    TabViewModule,
    DropdownModule,
    InputTextModule,
    TabMenuModule,
    ContextMenuModule,
    GrowlModule,
    PanelMenuModule,
    MenuModule,
    TooltipModule,
    ToolbarModule,
    NgxEchartsModule,
    SplitButtonModule,
    TieredMenuModule,
    CalendarModule,
    TableModule,
    ButtonModule,
    RadioButtonModule,
    PanelModule,
    // CommonComponentModule,
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      // useClass: PageReuseStrategy,
      useClass: CtsReuseStrategy,
      deps: [RetabService]
    },
    // LangService,
    TranslateService,
    ConfirmationService,
    CommonToolsService,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: AuthGuard,
      useFactory: (router: Router, api: ApiService, env: EnvService, bidm: BidmService, cookie: CookieService) => {
        return new AuthGuard(router, api, env, bidm, cookie);
      },
      deps: [Router, ApiService, EnvService, BidmService, CookieService]
    },
    {
      provide: AuthenticationService,
      useFactory: (http: HttpClient, api: ApiService, md5: Md5Service, bidm: BidmService, cookie: CookieService) => {
        let auth: AuthenticationService = new AuthenticationService(http, api, md5, bidm, cookie);
        auth.env = environment;
        return auth;
      },
      deps: [HttpClient, ApiService, Md5Service, BidmService, CookieService]
    },
    {
      provide: EnvService,
      useFactory: () => {
        let envService: EnvService = new EnvService();
        envService.setEnv(environment);
        return envService;
      }
    },
    {
      provide: ApiService,
      useFactory: (http: HttpClient) => {
        let api: ApiService = new ApiService(http);
        api.appPath = environment.appPath;
        return api;
      },
      deps: [HttpClient]
    },
    {
      provide: CookieService,
      useFactory: () => {
        let cookie: CookieService = new CookieService();
        cookie.domain = environment.domain;
        return cookie;
      }
    },
    DialogService,
    FormatDateService,
    CasadeService,
    MenuClickService
  ],
  bootstrap: [DefaultComponent],
})
export class AppModule { }
