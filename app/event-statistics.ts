export class EventStatistics {
    constructor() {
        this.max = 0;
        this.min = 0;
        this.lastValue = 0;
        this.average = 0;
    }

    // public average: number;
    // public current: Number;
    // public dataName : string ;
    // public max : number ;
    // public min : number ;
    // public nodeName : string ;
    // public std : number ;
    // public total : number ;
    // public units : number ;


    public max: number;
    public min: number;
    public average: number;
    public std: number;
    public ciName: string; //nodeName
    public nodeDisplayName: string;
    public dataName: string; //measureName
    private _units: string;
    public count: number;
    public total: number;
    public current: number;
    public start: number;
    public end: number;
    public startTime: Date;
    public endTime: Date;
    public lastValue: number; //current label
    public designValue: number;

    public color: string;
    public maxDisplay: string;
    public minDisplay: string;
    public averageDisplay: string;
    public lastValueDisplay: string;
    public currentDisplay: string;
    public unitDisplay: string;
    public totalDisplay: string;
    public index: number;
    public date: Date;
    public dateStr: string;
    public timestamp: number = 0;
    public floorArea: number;
    public capacity: number;
    public childEventStatistics: any[];
    public systemStableDays: number;

    public tagName: string;

    set units(_units: string) {
        this._units = _units;
    }
    get units() {
        if (this._units == "None") {
            this._units = "";
        }
        
        if (this._units == "C") {
            this._units = String.fromCharCode(176) + "C";
        }
        return this._units;
    }

}
