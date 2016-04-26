import {Component, OnInit, NgZone} from "angular2/core";
import {AppService} from "./app.services.ts";
import {CanReuse, ComponentInstruction} from "angular2/router";

@Component({
    selector: 'my-second',
    template: `
<div>
    <ul>
        <li *ngFor="#s of someStrings">
           a string: {{ s }}
        </li>
    </ul>
 </div>`
})
export class SecondComponent implements OnInit, CanReuse {

    zone:NgZone;

    constructor(private appService:AppService) {
        console.log('constructor', 'second');
        this.zone = new NgZone({enableLongStackTrace: false});
    }

    someStrings:string[] = [];

    ngOnInit() {
        console.log('ngOnInit', 'second');
        this.appService.refCounted.subscribe(
            theStrings=> {
                this.zone.run(() =>this.someStrings.push(...theStrings));
            },
            error=>console.log(error)
        );
    }

    routerCanReuse(next:ComponentInstruction, prev:ComponentInstruction) {
        return true;
    }
}
