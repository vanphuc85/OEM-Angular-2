export class DetailData {

    public static _minRealTime: number = 0;
    public static _maxRealTime: number = 0;
    public static _averageRealTime: number = 0;
    public static _sum: number = 0;
    private static _count: number = 0;
    private _min: number;
    private _max: number;
    private _current: number;
    private _average: number;
    private _units: string;

    constructor() {
        this._min = 0;
        this._max = 0;
        this._current = 0;
        this._average = 0;
        // DetailData._minRealTime = 0;
        // DetailData._maxRealTime = 0;
        // DetailData._averageRealTime = 0;
        // DetailData._sum = 0;
        // DetailData._count = 0;
    }
    set units(_units: string) {
        this._units = _units;
    }
    get units() {
        if (this._units == "None" || this._units == "undefined") {
            return "";
        }

        if (this._units == "C") {
            this._units = String.fromCharCode(176) + "C";
        }
        return this._units;
    }

    set min(_min: number) {


        this._min = _min;
    }
    get min() {
        if (typeof this._min == "undefined")
            return 0;
        return this._min;
    }
    set max(_max: number) {
        this._max = _max;
    }
    get max() {
        if (typeof this._max == "undefined")
            return 0;
        return this._max;
    }
    set current(_current: number) {
        DetailData._count++;
        DetailData._sum = DetailData._sum + _current;
        this._current = _current;
    }
    get current() {
        if (typeof this._current == "undefined")
            return 0;
        return this._current;
    }
    set average(_average: number) {
        this._average = _average;
    }
    get average() {
        if (typeof this._average == "undefined")
            return 0;
        return this._average;
    }

    set minRealTime(_minRealTime: number) {
        DetailData._minRealTime = _minRealTime;
    }
    get minRealTime() {
        if (DetailData._count == 1) {
            DetailData._minRealTime = this._current;
            return DetailData._minRealTime;
        }
        if (this._current <= DetailData._minRealTime) {
            DetailData._minRealTime = this._current;
        }
        return DetailData._minRealTime;
    }
    set maxRealTime(_maxRealTime: number) {
        DetailData._maxRealTime = _maxRealTime;
    }
    get maxRealTime() {
        if (DetailData._count == 1) {
            DetailData._maxRealTime = this._current;
            return DetailData._maxRealTime;
        }
        if (this._current >= DetailData._maxRealTime) {
            DetailData._maxRealTime = this._current;
        }
        return DetailData._maxRealTime;
    }
    
    get averageRealTime() {
        if (DetailData._sum == 0 && DetailData._count == 0) {
            return 0;
        }
        let average = (DetailData._sum / DetailData._count).toFixed(2);
        return parseFloat(average);
    }
    set averageRealTime(_averageRealTime) {
        DetailData._averageRealTime = _averageRealTime;
    }
    set sum(_sum) {
        DetailData._sum = _sum;
    }
    set count(_count) {
        DetailData._count = _count;
    }


}
