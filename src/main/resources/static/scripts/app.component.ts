import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {FirstComponent} from './app.first-component.ts';
import {SecondComponent} from './app.second-component.ts';
import {AppService} from "./app.services.ts";


@Component({
    selector: 'my-app',
    providers: [AppService],
    directives: [FirstComponent, SecondComponent, ROUTER_DIRECTIVES],
    template: `<h1>An Angular 2 App</h1>
               <a [routerLink]="['First']">first-default</a> 
               <a [routerLink]="['Second']">second</a> 
               <router-outlet></router-outlet>`
})
@RouteConfig([
    {path: '/', name: 'First', component: FirstComponent, useAsDefault: true},
    {path: '/second', name: 'Second', component: SecondComponent}
])
export class AppComponent {
}
