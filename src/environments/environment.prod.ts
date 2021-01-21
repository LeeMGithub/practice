export interface IEnv {
  production: boolean;
  apiPath?: string;
  appPath?: string;
  aliveTime?: number;
  tabLayout?: boolean;
  tabTooltip?: boolean;
  unifiedAuth?: boolean;
  defaultTabRouter?: string;
  echartTheme?: string;
  boePath?: string;
  currentUser?: string;
  encrypt?: boolean;
  domain?: string;
}

export const environment: IEnv = {
  production: true
};
