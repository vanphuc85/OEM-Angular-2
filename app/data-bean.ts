export class DataBean {
    averageValue: number;
    dataType: number;
    name: string;
    private _units: string;
    value: number;
    min: number;
    max: number;
    // constructor(){

    // }

    set units(_units: string) {
        debugger
        if (_units == "None") {
            _units = "";
        }
        if (_units == "C") {
            _units = String.fromCharCode(176) + "C";
        }
        this._units = _units;
    }
    get units() {
        return this._units;
    }
}
