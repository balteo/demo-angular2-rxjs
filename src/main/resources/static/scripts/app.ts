import {bootstrap}    from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {AppComponent} from './app.component.ts';

bootstrap(AppComponent, [HTTP_PROVIDERS, ROUTER_PROVIDERS]);
