import {NgModule} from '@angular/core';
import {NgSimpleProgressBarComponent} from './ng-simple-progress-bar.component';
import {CommonModule} from '@angular/common';


@NgModule({
    declarations: [NgSimpleProgressBarComponent],
    imports: [
        CommonModule
    ],
    exports: [NgSimpleProgressBarComponent]
})
export class NgSimpleProgressBarModule {
}
