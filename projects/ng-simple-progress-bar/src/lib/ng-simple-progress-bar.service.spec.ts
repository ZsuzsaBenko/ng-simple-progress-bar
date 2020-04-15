import {TestBed} from '@angular/core/testing';

import {NgSimpleProgressBarService} from './ng-simple-progress-bar.service';

describe('NgSimpleProgressBarService', () => {
    let service: NgSimpleProgressBarService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgSimpleProgressBarService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
