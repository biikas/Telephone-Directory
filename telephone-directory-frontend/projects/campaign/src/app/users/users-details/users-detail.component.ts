import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../core/user/user.service';
import { AppConstants } from '@core/constants/app.constants';
import { AlertService } from '@shared/alert';
import { MessageType } from 'nucleus';
import { DetailResponse } from '@core/user/user-profile.service';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'users-detail',
    templateUrl: './users-detail.component.html'
})
export class UsersDetailComponent {
    details: DetailResponse;
    isLoading = true;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private userService: UserService,
        public appConstants: AppConstants,
        private alertServive: AlertService,
    ) {
        this.route.params.subscribe((param) => {
            if (param.id) {
                this.userService.getUserDetail(param.id).pipe(finalize(() => this.isLoading = false)).subscribe((response) => {
                    this.details = response;
                }, (error) => {
                    this.alertServive.open({
                        message: error.message,
                        type: MessageType.ERROR
                    });
                });
            }
        });
    }

    back() {
        this.location.back();
    }

}
