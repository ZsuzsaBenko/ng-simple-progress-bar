import {Injectable} from '@angular/core';
import {interval, Observable, Subject} from 'rxjs';

export class ProgressBarEvent {
    constructor(public percent: number) {
    }
}

@Injectable({
    providedIn: 'root'
})
export class NgSimpleProgressBarService {
    progressEvent = new Subject<ProgressBarEvent>();
    private DEFAULT_SPEED = 50;
    private COMPLETION_SPEED = 5;
    private MAX_PERCENT = 100;
    private MIN_PERCENT = 0;
    private percent: number;
    private speed: number;
    private counter: Observable<number>;
    private subscription = null;

    constructor() {
    }

    startProgress(percent = this.MIN_PERCENT, speed = this.DEFAULT_SPEED): void {
        this.percent = this.percent ? this.percent : percent;
        this.speed = speed;
        this.increasePercent();
    }

    stopProgress(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
    }

    resetProgress(): void {
        this.percent = 0;
        this.progressEvent.next(new ProgressBarEvent(this.percent));
    }


    completeProgress(): void {
        this.speed = this.COMPLETION_SPEED;
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.increasePercent();
    }

    private increasePercent(): Observable<void> {
        if (this.subscription || this.MAX_PERCENT === this.percent) {
            return;
        }
        this.counter = interval(this.speed);
        this.subscription = this.counter.subscribe(() => {
            this.percent++;
            this.progressEvent.next(new ProgressBarEvent(this.percent));
            if (this.MAX_PERCENT === this.percent) {
                this.stopProgress();
            }
        });
    }
}
