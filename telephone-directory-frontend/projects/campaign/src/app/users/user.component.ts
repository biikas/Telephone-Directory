import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutingConstants } from '@core/navigation/routing-constants';
import { AlertData } from '@shared/alert';
import { UsersStatusService } from '@shared/users-status/users-status.service';
import { MessageType } from 'nucleus';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { UserDetail, UserService, ChangeStatusRequest, UserFilter } from '../core/user/user.service';
import { AlertService } from '../shared/alert/alert.service';
import { PageChangeEvent } from '../shared/pagination';

@Component({
    selector: 'campaign-list',
    templateUrl: 'user.component.html',
    host: {
        class: 'campaign'
    }
})

export class UserComponent implements OnInit {
    routeToCreateUser = '/' + [RoutingConstants.USERS] + '/' + [RoutingConstants.CREATE_USER];
    total = 5;
    pageSize = 5;
    page = 1;
    message: AlertData;
    searchForm: FormGroup;
    showSearch = false;
    users: UserDetail[] = [];
    isLoading = true;
    totalCount: number;
    pendingRequest: Subscription;
    userName: string;
    userSearchRequest: UserFilter;

    constructor(
        private usersStatus: UsersStatusService,
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private userService: UserService,
    ) {
        this.searchForm = this.formBuilder.group({
            username: [null],
            name: [null],
        });
    }

    ngOnInit() {
        this.searchSubmit(true);
    }

    getStatus(status: string) {
        return this.usersStatus.getStatus(status);
    }

    buildUserRequest() {
        const { name, username } = this.searchForm.value;
        this.userSearchRequest = {
            page: 0,
            search: [
                {
                    key: 'name',
                    value: name ? name : ''
                },
                {
                    key: 'username',
                    value: username ? username : ''
                }
            ],
            size: this.pageSize
        };
    }

    getAllUsers() {
        this.userService.getSearchUserList(this.userSearchRequest).pipe(finalize(() => this.isLoading = false)).subscribe((list) => {
            this.users = list.object;
            this.total = list.totalCount;
        }, (error) => {
            this.alertService.open({
                message: error.message,
                type: MessageType.ERROR
            });
        });
    }

    onChangePage(event: PageChangeEvent) {
        if (this.pageSize !== event.pageSize) {
            this.pageSize = event.pageSize;
            this.page = 1;
            this.userSearchRequest.page = this.page - 1;
            this.userSearchRequest.size = event.pageSize;
            this.isLoading = true;
            this.getAllUsers();
        } else if (this.page !== event.page) {
            this.page = event.page;
            this.userSearchRequest.page = event.page - 1;
            this.isLoading = true;
            this.getAllUsers();
        }
    }

    toggleSearch() {
        this.showSearch = !this.showSearch;
    }

    reset() {
        this.searchForm.reset();
    }

    searchSubmit(isValid: boolean) {
        if (!isValid) {
            return;
        }
        this.isLoading = true;
        this.buildUserRequest();
        this.getAllUsers();
        this.page = 1;
    }

    routeToResetPassword(user: UserDetail) {
        this.router.navigate([
            RoutingConstants.USERS,
            RoutingConstants.PASSWORD,
            RoutingConstants.RESET,
            user.id.toString()
        ], { state: user });
    }

    routeToModifyUser(user: UserDetail) {
        this.router.navigate([RoutingConstants.USERS, RoutingConstants.MODIFY_USER, user.id], { state: user });
    }

    viewDetails(id: number) {
        this.router.navigate([RoutingConstants.USERS + '/' + id]);
    }

    changeStatus(user: UserDetail) {
        const id = user.id;
        const changeRequest: ChangeStatusRequest = {
            active: user.active === 'Y' ? 'N' : 'Y'
        };
        this.userService.changeStatus(id, changeRequest).subscribe((response) => {
            const status = this.users.find((list) => list.id === id);
            status.active = status.active === 'Y' ? 'N' : 'Y';
            this.alertService.open({ message: response.message, type: MessageType.SUCCESS });
        }, (error) => {
            this.alertService.open({ message: error.message, type: MessageType.ERROR });
        });
    }

}