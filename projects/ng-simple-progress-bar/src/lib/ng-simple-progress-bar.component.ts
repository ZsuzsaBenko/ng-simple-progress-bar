import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NgSimpleProgressBarService, ProgressBarEvent} from './ng-simple-progress-bar.service';
import {Observable, Subscription} from 'rxjs';

export enum ProgressBarType {
    CLASSIC = 'classic',
    ROUNDED = 'rounded',
    SQUARE = 'square'
}

@Component({
    selector: 'ng-simple-progress-bar',
    template: `
        <div [ngClass]="progressBarType" class="outer-bar" [ngStyle]="{backgroundColor: backgroundColor, height: height}">
            <div class="inner-bar" [ngStyle]="{backgroundColor: color, width: width}"></div>
        </div>
    `,
    styleUrls: ['./ng-simple-progress-bar.component.css']
})
export class NgSimpleProgressBarComponent implements OnInit, OnDestroy {
    private DEFAULT_COLOR = '#4d94f7';
    private DEFAULT_BACKGROUND_COLOR = '#efefef';
    private CLASSIC_HEIGHT = '22px';
    private ROUND_HEIGHT = '12px';
    private SQUARE_HEIGHT = '5px';
    private progressBarEvents: Observable<ProgressBarEvent> = null;
    private progressBarSubscription: Subscription = null;
    @Input() progressBarType = ProgressBarType.CLASSIC;
    @Input() color = this.DEFAULT_COLOR;
    @Input() backgroundColor = this.DEFAULT_BACKGROUND_COLOR;
    @Input() height: string;
    @Input() percent = 0;
    @Input() isStatic = true;
    @Output() percentChange = new EventEmitter<number>();
    width: string;

    constructor(private progressBarService: NgSimpleProgressBarService) {
    }

    ngOnInit(): void {
        this.width = `${this.percent}%`;
        this.setHeight();

        if (!this.isStatic) {
            this.progressBarEvents = this.progressBarService.progressEvent.asObservable();
            this.progressBarSubscription = this.progressBarEvents.subscribe((event) => {
                this.percent = event.percent;
                this.width = `${this.percent}%`;
                this.percentChange.emit(this.percent);
            });
        }
    }

    ngOnDestroy(): void {
        if (this.progressBarSubscription) {
            this.progressBarSubscription.unsubscribe();
        }
    }

    private setHeight(): void {
        if (this.height) {
            return;
        } else if (ProgressBarType.CLASSIC === this.progressBarType) {
            this.height = this.CLASSIC_HEIGHT;
        } else if (ProgressBarType.ROUNDED === this.progressBarType) {
            this.height = this.ROUND_HEIGHT;
        } else {
            this.height = this.SQUARE_HEIGHT;
        }
    }

}
