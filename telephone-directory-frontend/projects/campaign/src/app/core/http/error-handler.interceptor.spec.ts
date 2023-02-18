import { Location } from '@angular/common';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { CredentialsService } from '@core/authentication';
import { MockCredentialsService } from '@core/authentication/authentication.service.spec';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { MessageType } from 'nucleus';
import { AlertService } from '../../shared/alert';

class MockAlertService {
    open(options: { type: MessageType, message: string }) {
        return options.message;
    }
}

describe('ErrorHandlerInterceptor', () => {
    let http: HttpClient;
    let httpMock: HttpTestingController;
    let mockRouter: any;
    let mockLocation: any;
    let messageMock: AlertService;

    beforeEach(( ) => {
        mockRouter = {
            navigate: jasmine.createSpy('navigate')
        };
        mockLocation = {
            path: jasmine.createSpy('path')
        };
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                {
                    provide: Location,
                    useValue: mockLocation
                },
                {
                    provide: AlertService,
                    useClass: MockAlertService
                },
                {
                    provide: CredentialsService,
                    useClass: MockCredentialsService
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorHandlerInterceptor,
                    multi: true
                },
                {
                    provide: Router,
                    useValue: mockRouter
                }
            ]
        });

        http = TestBed.get(HttpClient);
        httpMock = TestBed.get(HttpTestingController);
        messageMock = TestBed.get(AlertService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should catch error and call error handler', () => {
        // Act
        http.get('/toto').subscribe(() => {
            fail('should error');
        }, (error) => {
            // Assert
            expect(error).toBeDefined();
            expect(error.header.status).toBe(404);
            expect(error.error.message).toBe('Page Not Found');
            expect(error.error.code).toBe(400);
        });

        httpMock.expectOne({}).flush({
            code: 404,
            message: 'Page Not Found'
        }, {
            status: 404,
            statusText: 'error'
        });
    });
});
