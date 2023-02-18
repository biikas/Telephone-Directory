import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthenticationService } from './authentication.service';
import { Credentials, CredentialsService } from './credentials.service';
import { Router } from '@angular/router';

export class MockCredentialsService {
    credentials: Credentials | null = {
        username: 'test',
        token: '123'
    };

    isAuthenticated(): boolean {
        return !!this.credentials;
    }

    setCredentials(credentials?: Credentials) {
        this.credentials = credentials || null;
    }
}

// tslint:disable-next-line
export class MockRouter {
    navigateByUrl() { }
}

describe('AuthenticationService', () => {
    let authenticationService: AuthenticationService;
    let credentialsService: MockCredentialsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: CredentialsService,
                    useClass: MockCredentialsService
                },
                {
                    provide: Router,
                    useClass: MockRouter
                },
                AuthenticationService,
            ]
        });

        authenticationService = TestBed.get(AuthenticationService);
        credentialsService = TestBed.get(CredentialsService);
        credentialsService.credentials = null;
        httpMock = TestBed.get(HttpTestingController);
        spyOn(credentialsService, 'setCredentials').and.callThrough();
    });

    afterEach(() => {
        httpMock.verify();
    });

    describe('login', () => {
        it('should return credentials', fakeAsync(() => {
            // Act
            const request = authenticationService.login({
                username: 'toto',
                password: '123'
            });

            // Assert
            request.subscribe((credentials) => {
                expect(credentials).toBeDefined();
                expect(credentials.message).toBe('Successful Login');
            });

            const req = httpMock.expectOne('/authentication');
            expect(req.request.method).toBe('POST');
            req.flush({
                message: 'Successful Login'
            });
        }));
    });

    describe('logout', () => {
        it('should clear user authentication', fakeAsync(() => {
            // Act
            credentialsService.credentials = {
                token: '123',
                username: 'a'
            };

            expect(credentialsService.isAuthenticated()).toBe(true);
            authenticationService.logout();
            tick();

            expect(credentialsService.isAuthenticated()).toBe(false);
            expect(credentialsService.credentials).toBeNull();
        }));
    });
});
