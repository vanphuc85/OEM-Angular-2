
export class AlertCondition {
    id: number;
    _units: string;
    measureValue: number;
    relationOp: number = 1;
    logicalOp: number;
    totalize: number;
    actual: number;
    dataName: string;
    conditionIndex: number;
    _relationOpConvert: string;
    _link: string;



    set relationOpConvert(_relationOpConvert) {
        this._relationOpConvert = _relationOpConvert;
    }
    get relationOpConvert() {
        return this._relationOpConvert;
    }

    public convertRelationOp(): string {
        if (this.relationOp == 1) {
            this._relationOpConvert = ">";
        }
        else if (this.relationOp == 2) {
            this._relationOpConvert = "<"
        }
        else if (this.relationOp == 3) {
            this._relationOpConvert = "!=";
        }
        else if (this.relationOp == 4) {
            this._relationOpConvert = "=";
        }
        return this._relationOpConvert;
    }
    public convertLogicalOp(): string {
        let result = "";
        if (this.logicalOp == -1) {
            result = "";
        }
        else if (this.logicalOp == 1) {
            result = "AND"
        }
        else if (this.logicalOp == 2) {
            result = "OR"
        }

        return result;
    }
    public convertAll(): string {
        return this.dataName + " " + this.convertRelationOp() + " " + this.measureValue + " " + this._units + " " + this.convertLogicalOp();
    }
    public convertAllOneCondition(): string {
        return this.dataName + " " + this.convertRelationOp() + " " + this.measureValue + " " + (this._units == undefined ? "" : this._units);
    }

    constructor(alertCondition?: AlertCondition) {
        if (alertCondition) {
            this.id = alertCondition.id;
            this._units = alertCondition._units;
            this.measureValue = alertCondition.measureValue;
            this.relationOp = alertCondition.relationOp;
            this.logicalOp = alertCondition.logicalOp;
            this.totalize = alertCondition.totalize;
            this.actual = alertCondition.actual;
            this.dataName = alertCondition.dataName;
            this.conditionIndex = alertCondition.conditionIndex;

            this.convertRelationOp();
            this.convertLogicalOp();
        }
    }
    toJSON() {
        return {
            id: this.id,
            units: this._units,
            measureValue: Number(this.measureValue),
            relationOp: this.relationOp,
            logicalOp: this.logicalOp,
            totalize: this.totalize,
            actual: this.actual,
            dataName: this.dataName,
            conditionIndex: this.conditionIndex
        };
    }
    set units(_units) {
        if (_units == null || _units == undefined)
            _units = "";
        
        this._units = _units;
    }
    get units() {
        return this._units;
    }
    set link(_link) {
        this._link = _link;
    }
    get link() {
        if (this.dataName.toLocaleLowerCase() == "Temperature".toLocaleLowerCase()) {
            this.link = "./assets/image/measure01-s.svg";
        }
        else if (this.dataName.toLocaleLowerCase() == "Humidity".toLocaleLowerCase()) {
            this.link = "./assets/image/measure02-s.svg";
        }
        else if (this.dataName.toLocaleLowerCase() == "Lighting".toLocaleLowerCase()) {
            this.link = "./assets/image/measure03-s.svg";
        }
        else if (this.dataName.toLocaleLowerCase() == "Sound".toLocaleLowerCase()) {
            this.link = "./assets/image/measure04-s.svg";
        }
        else if (this.dataName.toLocaleLowerCase() == "Atmospheric Pressure".toLocaleLowerCase()) {
            this.link = "./assets/image/measure-pressure.svg";
        }
        else if (this.dataName.toLocaleLowerCase() == "noise".toLocaleLowerCase()) {
            this.link = "./assets/image/measure-acoustic-noise.svg";
        }
        else if (this.dataName.toLocaleLowerCase() == "Lux".toLocaleLowerCase()) {
            this.link = "./assets/image/measure-digital-light.svg";
        }
        else if (this.dataName.toLocaleLowerCase() == "AccX".toLocaleLowerCase()) {
            this.link = "./assets/image/measure-accelerometer-X.svg"
        }
        else if (this.dataName.toLocaleLowerCase() == "AccY".toLocaleLowerCase()) {
            this.link = "./assets/image/measure-accelerometer-Y.svg"
        }
        else if (this.dataName.toLocaleLowerCase() == "AccZ".toLocaleLowerCase()) {
            this.link = "./assets/image/measure-accelerometer-Z.svg"
        }
        else if (this.dataName.toLocaleLowerCase() == "GyroX".toLocaleLowerCase()) {
            this.link = "./assets/image/measure-gyroscope-X.svg"
        }
        else if (this.dataName.toLocaleLowerCase() == "GyroY".toLocaleLowerCase()) {
            this.link = "./assets/image/measure-gyroscope-Y.svg"
        }
        else if (this.dataName.toLocaleLowerCase() == "GyroZ".toLocaleLowerCase()) {
            this.link = "./assets/image/measure-gyroscope-Z.svg"
        }
        else if (this.dataName.toLocaleLowerCase() == "MagX".toLocaleLowerCase()) {
            this.link = "./assets/image/Measure-magnetometer-X.svg"
        }
        else if (this.dataName.toLocaleLowerCase() == "MagY".toLocaleLowerCase()) {
            this.link = "./assets/image/Measure-magnetometer-Y.svg"
        }
        else if (this.dataName.toLocaleLowerCase() == "MagZ".toLocaleLowerCase()) {
            this.link = "./assets/image/Measure-magnetometer-Z.svg"
        }
        else {
            this.link = "./assets/image/measure00.svg";
        }

        return this._link;
    }


}
