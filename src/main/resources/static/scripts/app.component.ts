import {Component} from 'angular2/core';
import {FirstComponent} from './app.first-component.ts';
import {SecondComponent} from './app.second-component.ts';
import {AppService} from "./app.services.ts";


@Component({
    selector: 'my-app',
    providers: [AppService],
    directives: [FirstComponent, SecondComponent],
    template: `<h1>An Angular 2 App</h1>
               <my-first></my-first>
               <my-second></my-second>`
})
export class AppComponent {
}
