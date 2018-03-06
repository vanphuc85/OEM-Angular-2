import { Unit } from "app/unit";

export class Measure {
    name : string ;
    id : number ;
    private _unit : Unit ;
    link : string ;
    constructor(_name :string, _unit : Unit){
        this.name = _name ;
        this._unit = _unit ;
    }

    set unit(_unit){
        this._unit = _unit;
    }
    get unit(){
        return this._unit;
    }
}
