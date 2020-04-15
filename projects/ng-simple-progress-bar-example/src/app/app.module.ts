import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgSimpleProgressBarModule} from '../../../ng-simple-progress-bar/src/lib/ng-simple-progress-bar.module';

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
