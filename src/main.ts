import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'echarts-gl';

import './assets/echartTheme/cts.js';
import './assets/echartTheme/darkPro.js';
import './assets/echartTheme/copq.js';
import 'echarts/theme/dark.js';
import 'echarts/theme/infographic.js';
import 'echarts/theme/macarons.js';
import 'echarts/theme/roma.js';
import 'echarts/theme/shine.js';
import 'echarts/theme/vintage.js';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

