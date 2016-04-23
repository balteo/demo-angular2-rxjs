import {Component, OnInit} from 'angular2/core';
import 'rxjs/Rx';

@Component({
    selector: 'my-app',
    template: `<h1>My second Angular 2 App</h1>
    <ul>
        <li *ngFor="#s of someStrings">
           a string: {{ s }}
        </li>
    </ul>
    `
})
export class AppComponent implements OnInit {

    someStrings:string[] = [];

    ngOnInit() {
        let source = new EventSource('/interval-sse-observable');
        source.addEventListener('message', aString => this.someStrings.push(aString.data), false);
    }
}
