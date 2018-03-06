import { Measure } from './measure';
import { Unit } from 'app/unit';
export class MeasureExtend extends Measure {
    link: string;
    private _lastValue: Number;
    public unit: Unit = new Unit();
    private _active: boolean;
    constructor(measure: Measure) {
        super(measure.name,measure.unit);
        if (this.name.toLocaleLowerCase() == "Temperature".toLocaleLowerCase()) {
            this.link = "./assets/image/measure01-s.svg";
        }
        else if (this.name.toLocaleLowerCase() == "Humidity".toLocaleLowerCase()) {
            this.link = "./assets/image/measure02-s.svg";
        }
        else if (this.name.toLocaleLowerCase() == "Lighting".toLocaleLowerCase()) {
            this.link = "./assets/image/measure03-s.svg";
        }
        else if (this.name.toLocaleLowerCase() == "Sound".toLocaleLowerCase()) {
            this.link = "./assets/image/measure04-s.svg";
        }
        else if (this.name.toLocaleLowerCase() == "Atmospheric Pressure".toLocaleLowerCase()){
            this.link = "./assets/image/measure-pressure.svg";
        }
        else if (this.name.toLocaleLowerCase() == "noise".toLocaleLowerCase()){
            this.link = "./assets/image/measure-acoustic-noise.svg";
        }
        else if (this.name.toLocaleLowerCase() == "Lux".toLocaleLowerCase()){
            this.link = "./assets/image/measure-digital-light.svg";
        }
        else if(this.name.toLocaleLowerCase() == "AccX".toLocaleLowerCase()){
            this.link = "./assets/image/measure-accelerometer-X.svg"
        }
        else if(this.name.toLocaleLowerCase() == "AccY".toLocaleLowerCase()){
            this.link = "./assets/image/measure-accelerometer-Y.svg"
        }
        else if(this.name.toLocaleLowerCase() == "AccZ".toLocaleLowerCase()){
            this.link = "./assets/image/measure-accelerometer-Z.svg"
        }
        else if(this.name.toLocaleLowerCase() == "GyroX".toLocaleLowerCase()){
            this.link = "./assets/image/measure-gyroscope-X.svg"
        }
        else if(this.name.toLocaleLowerCase() == "GyroY".toLocaleLowerCase()){
            this.link = "./assets/image/measure-gyroscope-Y.svg"
        }
        else if(this.name.toLocaleLowerCase() == "GyroZ".toLocaleLowerCase()){
            this.link = "./assets/image/measure-gyroscope-Z.svg"
        }
        else if(this.name.toLocaleLowerCase() == "MagX".toLocaleLowerCase()){
            this.link = "./assets/image/Measure-magnetometer-X.svg"
        }
        else if(this.name.toLocaleLowerCase() == "MagY".toLocaleLowerCase()){
            this.link = "./assets/image/Measure-magnetometer-Y.svg"
        }
        else if(this.name.toLocaleLowerCase() == "MagZ".toLocaleLowerCase()){
            this.link = "./assets/image/Measure-magnetometer-Z.svg"
        }
        else {
            this.link = "./assets/image/measure00.svg";
        }

    }

    get lastValue() {
        return this._lastValue;
    }
    set lastValue(_lastValue: Number) {
        this._lastValue = _lastValue;
    }
    // get unit() {
    //     return this._unit;
    // }
    // set unit(_unit: Unit) {
    //     this._unit = _unit;
    // }

    set active(_active: boolean) {
        this._active = _active;
    }

    get active() {
        return this._active;
    }

    checkActive(measureConfig: Array<MeasureExtend>) {
        if (measureConfig == null || measureConfig.length == 0) {
            return;
        }
        for (let item of measureConfig) {
            if (item.name == this.name) {
                this._active = true;
                break;
            }
        }
    }

    activeImage() {
        if (this.name.toLocaleLowerCase() == "Temperature".toLocaleLowerCase()) {
            this.link = "./assets/image/measure01-s-white.svg";
        }
        else if (this.name.toLocaleLowerCase() == "Humidity".toLocaleLowerCase()) {
            this.link = "./assets/image/measure02-s-white.svg";
        }
        else if (this.name.toLocaleLowerCase() == "Lighting".toLocaleLowerCase()) {
            this.link = "./assets/image/measure03-s-white.svg";
        }
        else if (this.name.toLocaleLowerCase() == "Sound".toLocaleLowerCase()) {
            this.link = "./assets/image/measure04-s-white-white.svg";
        }
        else if (this.name.toLocaleLowerCase() == "Atmospheric Pressure".toLocaleLowerCase()){
            this.link = "./assets/image/measure-pressure-white.svg";
        }
        else if (this.name.toLocaleLowerCase() == "noise".toLocaleLowerCase()){
            this.link = "./assets/image/measure-acoustic-noise-white.svg";
        }
        else if (this.name.toLocaleLowerCase() == "Lux".toLocaleLowerCase()){
            this.link = "./assets/image/measure-digital-light-white.svg";
        }
        else if(this.name.toLocaleLowerCase() == "AccX".toLocaleLowerCase()){
            this.link = "./assets/image/measure-accelerometer-X-white.svg"
        }
        else if(this.name.toLocaleLowerCase() == "AccY".toLocaleLowerCase()){
            this.link = "./assets/image/measure-accelerometer-Y-white.svg"
        }
        else if(this.name.toLocaleLowerCase() == "AccZ".toLocaleLowerCase()){
            this.link = "./assets/image/measure-accelerometer-Z-white.svg"
        }
        else if(this.name.toLocaleLowerCase() == "GyroX".toLocaleLowerCase()){
            this.link = "./assets/image/measure-gyroscope-X-white.svg"
        }
        else if(this.name.toLocaleLowerCase() == "GyroY".toLocaleLowerCase()){
            this.link = "./assets/image/measure-gyroscope-Y-white.svg"
        }
        else if(this.name.toLocaleLowerCase() == "GyroZ".toLocaleLowerCase()){
            this.link = "./assets/image/measure-gyroscope-Z-white.svg"
        }
        else if(this.name.toLocaleLowerCase() == "MagX".toLocaleLowerCase()){
            this.link = "./assets/image/Measure-magnetometer-X-white.svg"
        }
        else if(this.name.toLocaleLowerCase() == "MagY".toLocaleLowerCase()){
            this.link = "./assets/image/Measure-magnetometer-Y-white.svg"
        }
        else if(this.name.toLocaleLowerCase() == "MagZ".toLocaleLowerCase()){
            this.link = "./assets/image/Measure-magnetometer-Z-white.svg"
        }
        else {
            this.link = "./assets/image/measure00-white.svg";
        }
    }

    public inActiveImage() {
        
        if (this.link == "./assets/image/measure01-s-white.svg") {
            this.link = "./assets/image/measure01-s.svg";
        }
        else if (this.link == "./assets/image/measure02-s-white.svg") {
            this.link = "./assets/image/measure02-s.svg";
        }
        else if (this.link == "./assets/image/measure03-s-white.svg") {
            this.link = "./assets/image/measure03-s.svg";
        }
        else if (this.link == "./assets/image/measure04-s-white.svg") {
            this.link = "./assets/image/measure04-s.svg";
        }
        else if (this.link == "./assets/image/measure00-white.svg") {
            this.link = "./assets/image/measure00.svg";
        }
        else if (this.link == "./assets/image/measure-pressure-white.svg") {
            this.link = "./assets/image/measure-pressure.svg";
        }
        else if (this.link == "./assets/image/measure-acoustic-noise-white.svg") {
            this.link = "./assets/image/measure-acoustic-noise.svg";
        }
        else if (this.link == "./assets/image/measure-digital-light-white.svg") {
            this.link = "./assets/image/measure-digital-light.svg";
        }
        else if (this.link == "./assets/image/measure-accelerometer-X-white.svg") {
            this.link = "./assets/image/measure-accelerometer-X.svg";
        }
        else if (this.link == "./assets/image/measure-accelerometer-Y-white.svg") {
            this.link = "./assets/image/measure-accelerometer-Y.svg";
        }
        else if (this.link == "./assets/image/measure-accelerometer-Z-white.svg") {
            this.link = "./assets/image/measure-accelerometer-Z.svg";
        }
        else if (this.link == "./assets/image/measure-gyroscope-X-white.svg") {
            this.link = "./assets/image/measure-gyroscope-X.svg";
        }
        else if (this.link == "./assets/image/measure-gyroscope-Y-white.svg") {
            this.link = "./assets/image/measure-gyroscope-Y.svg";
        }
        else if (this.link == "./assets/image/measure-gyroscope-Z-white.svg") {
            this.link = "./assets/image/measure-gyroscope-Z.svg";
        }
        else if (this.link == "./assets/image/Measure-magnetometer-X-white.svg") {
            this.link = "./assets/image/Measure-magnetometer-X.svg";
        }
        else if (this.link.indexOf("./assets/image/Measure-magnetometer-Y-white.svg") != -1) {
            this.link = "./assets/image/Measure-magnetometer-Y.svg";
        }
        else if (this.link.indexOf("./assets/image/Measure-magnetometer-Z-white.svg") != -1) {
            this.link = "./assets/image/Measure-magnetometer-Z.svg";
        }
        
      }

}
