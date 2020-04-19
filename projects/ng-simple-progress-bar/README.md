# ng-simple-progress-bar

Angular 9 'ng-simple-progress-bar' is an easy-to-use, customizable component, which can show both dynamic loading and static progress.

##Installation

`npm install ng-simple-progress-bar --save`

##Demo app

An example app is available [here](https://zsuzsabenko.github.io/ng-simple-progress-bar)

##Usage

1. Install the library via npm

2. Import `NgSimpleProgressBarModule` into your AppModule:

        ```
         import {BrowserModule} from '@angular/platform-browser';
         import {NgModule} from '@angular/core';
         
         import {AppComponent} from './app.component';
         import {NgSimpleProgressBarModule} from 'ng-simple-progress-bar';
         
         @NgModule({
             declarations: [
                 AppComponent
             ],
             imports: [
                 BrowserModule,
                 NgSimpleProgressBarModule
             ],
             providers: [],
             bootstrap: [AppComponent]
         })
         export class AppModule {
         }
        ```

3. Use `<ng-simple-progress-bar>` in your component's template and customize it as you prefer:

        ```
        <div class="container">
            <ng-simple-progress-bar [percent]="percent"
                                    [color]="color"
                                    [backgroundColor]="backgroundColor"
                                    [height]="height"
                                    [progressBarType]="progressBarType"
                                    [isStatic]="false"
                                    (percentChange)="onPercentChange($event)">
            </ng-simple-progress-bar>
        </div>
        ```
    Don't forget to set the width of the container div as the full length of the progress bar fits its container.

4. You can inject `NgSimpleProgressBarService` into your component and use its methods for dynamic loading functionality:

        ```
        import {Component, OnInit} from '@angular/core';
        import {NgSimpleProgressBarService} from 'ng-simple-progress-bar';
                
        @Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
        export class AppComponent implements OnInit {
            percent: number;
            speed: number;
        
            constructor(private progressBarService: NgSimpleProgressBarService) {
            }
        
            ngOnInit(): void {
                this.percent = 50;
                this.speed = 100;
            }
        
            start() {
                this.progressBarService.startProgress(this.percent, this.speed);
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
                this.percent = changedPercent;
            }
        }

        ```
    When the above service methods are used, `NgSimpleProgressBarComponent`'s `percentChange` event is emitted to give feedback to the host component about the updated value of the percent.

##Customization

You can set the following properties of the progress bar:

- percent: by default 0, it shows the current state of progress by setting the inner bar's width

- isStatic: by default `true`, its value describes whether the service's methods are blocked; set it to `false` to allow the service methods to change the percent dynamically

- progressBarType: there are 3 types of progress bar designs available:
  - classic: default, outer bar with padding, rounded edges
  - rounded: inner bar's height is the same as the outer bar's, rounded edges
  - square: inner bar's height is the same as the outer bar's, no rounding
  
- color: the background color of the inner bar, default: #4d94f7

- background color: the background color of the outer bar, default: #efefef; with rounded/square designs you can set it to transparent to hide the full length of the progress bar

- height: the outer bar's height (defaults: 22px for classic, 12px for rounded, 5px for square)

##NgSimpleProgressBarService methods

`NgSimpleProgressBarService` internally uses `interval` from `rxjs`: when we launch the progress, we can set the initial percent from which to start out as well as the 'speed', that is, the number of milliseconds at which rate `interval` emits its next number and our percent is increased by 1.
Default percent is 0; default speed is 50 milliseconds. Thus the method startProgress() can have 0, 1 or 2 parameters:
    `startProgress()` / `startProgress(percent)` / `startProgress(percent, speed)`

The method `stopProgress()` stops the progress and the last percent value is preserved.

The method `resetProgress()` sets the percent to 0; if not stopped, the increase of percents resumes.

The method `completeProgress()` speeds up the progress (1 percent increase every 5 milliseconds) and the progress stops at 100%.

