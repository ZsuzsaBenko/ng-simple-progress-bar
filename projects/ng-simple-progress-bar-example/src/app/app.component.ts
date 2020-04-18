import {Component, OnInit} from '@angular/core';
import {NgSimpleProgressBarService} from '../../../ng-simple-progress-bar/src/lib/ng-simple-progress-bar.service';
import {ProgressBarType} from '../../../ng-simple-progress-bar/src/lib/ng-simple-progress-bar.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    progressBarTypes: ProgressBarType[];
    progressBarType: ProgressBarType;
    color: string;
    backgroundColor: string;
    height: string;
    percent1: number;
    percent2: number;
    speed: number;

    constructor(private progressBarService: NgSimpleProgressBarService) {
    }

    ngOnInit(): void {
        this.progressBarTypes = Object.values(ProgressBarType);
        this.progressBarType = ProgressBarType.SQUARE;
        this.percent1 = 45;
        this.percent2 = 10;
        this.color = '#9904c2';
        this.backgroundColor = '#dcdcdc';
        this.height = '3px';
        this.speed = 100;
    }

    changeColor(color: string) {
        this.color = color;
    }

    changeBackgroundColor(bgColor: string) {
        this.backgroundColor = bgColor;
    }

    changeHeight(height: string) {
        this.height = `${height}px`;
    }

    changeType(barType: string) {
        this.progressBarType = this.progressBarTypes.find(type => type === barType);
    }

    start() {
        this.progressBarService.startProgress(this.percent2, this.speed);
    }

    stop() {
        this.progressBarService.stopProgress();
    }

    reset() {
        this.progressBarService.resetProgress();
    }

    complete() {
        this.progressBarService.completeProgress();
    }

    onPercentChange(changedPercent: number) {
        this.percent2 = changedPercent;
    }
}
