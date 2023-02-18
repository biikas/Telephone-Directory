export class RoutingConstants {
    /**
     * Root
     */
    static readonly LOGIN = 'login';
    static readonly DASHBOARD = 'dashboard';
    static readonly LOAN = 'loan';
    static readonly CARD = 'card';
    static readonly SAVINGS = 'savings';
    static readonly CHANGE_PASSWORD = 'change-password';
    static readonly CREATE_USER = 'create-user';
    static readonly MODIFY_USER = 'modify';
    static readonly PASSWORD = 'password';
    static readonly RESET = 'reset';
    static readonly CREATE = 'create';

    static readonly USER_PROFILE = 'user-profile';
    static readonly STATEMENT = 'statement';
    static readonly ACCOUNT = 'account';
    static readonly DIGITAL_COUNTER = 'digital-counter';
    static readonly E_CASH = 'e-cash';
    static readonly E_VOUCHER = 'evoucher';
    static readonly CAMPAIGNS = 'campaigns';
    static readonly MODIFY = 'modify';
    static readonly NEW = 'new';
    static readonly USERS = 'users';
    static readonly TRANSACTIONS = 'transactions';
    static readonly REPORTS = 'reports';
    static readonly PACKAGE = 'package';
    static readonly GIFT_CARD = 'gift-card';
    static readonly REDEEM = 'redeem';
    static readonly SETTINGS = 'settings';
    static readonly CUSTOM_QUERY = 'custom-query';
    static readonly EXECUTE = 'execute';
    static readonly CUSTOM_CONNECTION = 'custom-connection';
    static readonly CONTACT = 'contact';

    /**
     * Common
     */
    static readonly ADD = 'add';
    static readonly DETAILS = 'details';

    /**
     * Dynamic Routes
     */
    static readonly ID = ':id';
    static readonly TYPE = ':type';
    static readonly COUNTER_ID = ':id';

    /**
     * Errors
     */
    static readonly SERVER_ERROR = 'server-error';
    static readonly NOT_FOUND = 'page-not-found';

    /**
     * @returns string - path seperated by '/'
     */
    static generatePath(...sections: string[]): string {
        return sections.reduce((path, section) => `${path}/${section}`, '');
    }
}
