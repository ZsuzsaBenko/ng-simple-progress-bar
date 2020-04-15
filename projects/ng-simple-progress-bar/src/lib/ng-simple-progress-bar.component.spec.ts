import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NgSimpleProgressBarComponent} from './ng-simple-progress-bar.component';

describe('NgSimpleProgressBarComponent', () => {
    let component: NgSimpleProgressBarComponent;
    let fixture: ComponentFixture<NgSimpleProgressBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NgSimpleProgressBarComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NgSimpleProgressBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
