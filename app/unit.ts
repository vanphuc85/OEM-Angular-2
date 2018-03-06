export class Unit {
    private _id: number;
    private _name: string;

    set name(_name) {
        if (_name == "None") {
            _name = "";
        }
        if (_name == "C") {
            _name = String.fromCharCode(176) + "C";
        }
        this._name = _name;
    }
    get name() {
        return this._name;
    }

    set id(_id) {
        this._id = _id;
    }
    get id() {
        return this._id;
    }
}
