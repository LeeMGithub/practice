import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MenuClickService {

  constructor(private http: HttpClient) { }

  menuClick(router: string){
    let routerLink = this.buildRouterLink(router);
    const url = '/api/log-manage/menuclick/add-new-menuclickinfo';
    const params = {
      routerLink: routerLink
    }
    this.http.post(url, params).subscribe();
  }

  buildRouterLink(router: string){
    return router.substring(router.lastIndexOf('/') + 1);
  }
}
