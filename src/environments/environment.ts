// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export interface IEnv {
  production: boolean;
  apiPath: string;
  appPath: string;
  aliveTime: number;
  tabLayout: boolean;
  tabTooltip: boolean;
  unifiedAuth: boolean;
  defaultTabRouter: string;
  echartTheme: string;
  boePath: string;
  currentUser: string;
  encrypt: boolean;
  domain: string;
}
export const environment: IEnv = {
  production: true,
  apiPath: '/api',
  appPath: '',
  aliveTime: 1800,
  tabLayout: true,
  tabTooltip: false,
  unifiedAuth: true,
  defaultTabRouter: '/boe/homepage',
  echartTheme: 'copq',
  boePath: '/boe',
  currentUser: 'currentUser',
  encrypt: true,
  domain: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
