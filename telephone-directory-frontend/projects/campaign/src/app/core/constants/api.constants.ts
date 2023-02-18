import { environment } from '@env/environment';

export class ApiConstants {
    static readonly WEB_PATH = environment.WEB_ENDPOINT;
    static readonly AUTHENTICATION = 'auth/login';

    static readonly APP_DATA = 'applicationData';
    static readonly BANK_LIST = 'fonepayMerchantBanks';

    static readonly BANK = 'bank';
    static readonly PRODUCTS = 'products';
    static readonly CATEGORY = 'category';

    static readonly LOAN = 'loan';
    static readonly ACKNOWLEDGE = 'acknowledge';
    static readonly CARD = 'card';
    static readonly ACCOUNT = 'account';
    static readonly REQUEST = 'request';
    static readonly OFFER = 'offer';
    static readonly CAMPAIGNS = 'campaign';
    static readonly MODIFY = 'modify';
    static readonly NOTIFICATION = 'notification';
    static readonly SEND = 'send';
    static readonly IMAGE = 'image';
    static readonly UPLOAD = 'upload';
    static readonly SINGLE = 'single';
    static readonly CREATE = 'create';
    static readonly MODE = 'mode';
    static readonly PROFILE = 'profile';
    static readonly TRANSACTION = 'transaction';
    static readonly SERVICE = 'service';
    static readonly SEARCH = 'search';
    static readonly REPORT = 'report';
    static readonly REGISTRATION = 'registration';
    static readonly PROVIDER = 'provider';
    static readonly MANUAL = 'manual';
    static readonly REDEEM = 'redeem';
    static readonly ACCEPT = 'accept';
    static readonly RECENT = 'recent';
    static readonly EXCEL = 'excel';

    static readonly LIST = 'list';
    static readonly USERS = 'users';
    static readonly STATUS = 'status';
    static readonly TOKEN = 'token';
    static readonly DELETE = 'delete';
    static readonly REGISTER = 'register';
    static readonly REJECT = 'reject';
    static readonly APPLY = 'apply';
    static readonly DETAIL = 'detail';
    static readonly GIFT_CARD = 'gift-card';
    static readonly GIFT_CARD_PROVIDER = 'provider';
    static readonly CUSTOM_CBS_QUERY = 'custom-cbs-query';
    static readonly CUSTOM_CBS_CONNECTION = 'custom-cbs-connection';

    static readonly ADD = 'add';
    static readonly REMARKS = 'remarks';

    static readonly DIGITAL = 'digital';
    static readonly COUNTER = 'counter';
    static readonly CHEQUE = 'cheque';
    static readonly CUSTOMER = 'customer';
    static readonly DETAILS = 'details';
    static readonly TRANSFER = 'transfer';
    static readonly FUND = 'fund';
    static readonly OTP = 'otp';
    static readonly VERIFY = 'verify';

    // EVOUCHER
    static readonly EVOUCHER = 'evoucher';

    static readonly CHANGE = 'change';
    static readonly PASSWORD = 'password';
    static readonly RESET = 'reset';
    static readonly POLICIES = 'policies';
    static readonly EXECUTE = 'execute';

    // Event-Type
    static readonly EVENT_TYPE = 'event-type';

    // Custom Event View type
    static readonly CUSTOM_EVENT_VIEW = 'event-type/custom';



    static readonly CREATE_CONTACT = 'contact/create';
    static readonly MODIFY_CONTACT = 'contact/modify';
    static readonly CONTACT_LIST = 'contact/list';
    static readonly CONTACT = 'contact';


    static generateWebPath(...sections: string[]) {
        return sections.reduce((path, section) => `${path}/${section}`, this.WEB_PATH);
    }
}
