export interface Confirm {
    _isActive ? : boolean;
    _message ? : string;
    changeStatus(confirm: boolean);
}
