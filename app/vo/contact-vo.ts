export class ContactVo {
    userName: string;
    phone: string;
    _email: string;
    _image: string;
    _active: boolean = true;

    _activeEmail: boolean = false;

    _activePhone: boolean = false;

    set activeEmail(_activeEmail) {
        this._activeEmail = _activeEmail;
    }
    get activeEmail() {
        return this._activeEmail;
    }
    set activePhone(_activePhone) {
        this._activePhone = _activePhone;
    }
    get activePhone() {
        return this._activePhone;
    }

    set image(_image) {
        this._image = _image;
    }
    get image() {
        return this._image;
    }

    set email(_email) {
        this._email = _email;
    }
    get email() {
        return this._email;
    }
    set active(_active) {
        this._active = _active;
    }
    get active() {
        return this._active;
    }
}

