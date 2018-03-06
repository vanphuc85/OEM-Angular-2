export class AlertView {
    private _name: string;
    private _condition: string;
    private _ignore: number;
    private _dataName : string ;
    private _link : string ;

    set dataName(_dataName){
        this._dataName = _dataName ;
    }
    get dataName(){
        return this._dataName ;
    }
    set link(_link){
        this._link = _link ;
    }
    get link(){
        return this._link ;
    }

    set ignore(_ignore: number) {
        this._ignore = _ignore;
    }

    get ignore() {
        return this._ignore;
    }
    set name(_name: string) {
        this._name = _name;
    }
    get name() {
        return this._name;
    }
    set condition(_condition) {
        this._condition = _condition;
    }
    get condition() {
        return this._condition;
    }
}
