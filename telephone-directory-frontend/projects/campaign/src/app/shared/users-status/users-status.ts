export interface  UserStatus {
    name: string;
    status: string;
    className: string;
}

export class UsersStatuses {
    static readonly ACTIVE: UserStatus = {
        name: 'ACTIVE',
        status: 'Y',
        className: 'badge badge--active'
    };
    static readonly INACTIVE: UserStatus = {
        name: 'INACTIVE',
        status: 'N',
        className: 'badge badge--delection'
    };
}