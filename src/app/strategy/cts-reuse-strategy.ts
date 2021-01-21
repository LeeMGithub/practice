import { RouteReuseStrategy, DetachedRouteHandle, ActivatedRouteSnapshot } from "@angular/router";
import { RetabService } from "bidm-web";
import { ComponentRef } from "@angular/core";
//https://blog.csdn.net/zgrbsbf/article/details/93304005
export class CtsReuseStrategy implements RouteReuseStrategy {

    public static handlers: { [key: string]: DetachedRouteHandle } = {};
    public static destroys: string[] = [];

    constructor(public service: RetabService) { }

    public static deleteRouteSnapshot(name: string) {
        name = name.replace(/\//g, '_');
        if (CtsReuseStrategy.handlers[name]) {
            if (CtsReuseStrategy.destroys.indexOf(name) != -1) {
                const componentRef: ComponentRef<any> = this.handlers[name]['componentRef'];
                if (componentRef) {
                    componentRef.destroy();
                }

                CtsReuseStrategy.destroys.splice(CtsReuseStrategy.destroys.indexOf(name), 1);
            }

            delete CtsReuseStrategy.handlers[name];
        }
    }

    /** 表示对所有路由允许复用 如果你有路由不想利用可以加一些业务逻辑判断
     * 离开当前页面的时候调用的方法，会比落地页面的构造函数先执行。如果返回true, 则会执行store方法
     */
    public shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (!route.routeConfig || route.routeConfig.loadChildren) {
            return false;
        }
        if (this.getRouteUrl(route).includes('_boe_')) {
            return true;
        }
        return false;
    }

    /** 当路由离开时会触发。按path作为key存储路由快照&组件当前实例对象 */
    public store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        CtsReuseStrategy.handlers[this.getRouteUrl(route)] = handle;
    }

    /** 若 path 在缓存中有，则认为允许还原路由
     * 在这里判断是否恢复之前store的路由；如果返回true的话，retrieve方法会被调用
     */
    public shouldAttach(route: ActivatedRouteSnapshot): boolean {
        //if(this.getRouteUrl(route).includes('_boe_') && route.data.tabLabel != undefined) {
        if (route.data.tabLabel != undefined) {
            let tabLabel: string = route.data.tabLabel + '';

            const keys: string[] = Object.keys(route.params);
            if (route.params !== undefined && keys.length > 0) {
                let params: string[] = [];
                for (let i = 0; i < keys.length; i++) {
                    params.push(route.params[keys[i]]);
                }

                tabLabel += '(';
                tabLabel += params.join('/');
                tabLabel += ')';
            }

            if (route.data.destroy && CtsReuseStrategy.destroys.indexOf(this.getRouteUrl(route)) == -1) {
                CtsReuseStrategy.destroys.push(this.getRouteUrl(route));
            }
            this.setTabItem(tabLabel, route);
        }
        return !!CtsReuseStrategy.handlers[this.getRouteUrl(route)];
    }

    /** 从缓存中获取快照，若无则返回 null
     * 返回之前存储RouteHandle，如果返回null的话则不起作用
    */
    public retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        if (!route.routeConfig) {
            return null;
        }
        if (route.routeConfig.loadChildren) return null;
        return CtsReuseStrategy.handlers[this.getRouteUrl(route)];
    }

    /** 进入路由触发，判断是否同一路由
     * 当要在路由之间导航的时候调用，调用这个方法并不代表一定会跳转到新的页面。
     * 如果返回true, 那么不会进行跳转；如果返回false，才会跳转并且执行其余的那几个方法。
    */
    public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }

    private getRouteUrl(route: ActivatedRouteSnapshot) {
        // return route['_routerState'].url.replace(/\//g, '_');
        return route['_routerState'].url.replace(/\//g, '_')
            + '_' + (route.routeConfig.loadChildren || route.routeConfig.component.toString().split('(')[0].split(' ')[1]);
    }

    private setTabItem(label: string, route: ActivatedRouteSnapshot) {
        let count: number = 0;
        count = Object.keys(route.params).length;

        let url = route['_routerState'].url;
        this.service.setItems(label, url);
    }

}
