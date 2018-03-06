import { Measure } from "app/vo/measure";

export class NodeTreeDatas {
    hasCallibrator: boolean;
    isRoot: number;
    isActual: number;
    channel: number;
    title: string;
    parentId: number;
    nodes: NodeTreeDatas[];
    hasChild: number;
    name: string;
    id: number;
    isVirtual: number;
    device: string;
    subChanel: string;
    measures: string;
    measuresList : Array<Measure> ;

    getImageForDevice() {
        let image = "";
        if (this.measures.indexOf("AccX,AccY,AccZ,GyroX,GyroY,GyroZ") != -1) {
            image = "./assets/image/measure-inertial-measurement-unit.svg";
        }
        else if (this.measures.indexOf("AccX,AccY,AccZ") != -1) {
            image = "./assets/image/measure-accelerometer.svg";
        }
        else if (this.measures.indexOf("GyroX,GyroY,GyroZ") != -1) {
            image = "./assets/image/measure-gyroscope.svg";
        }
        else if (this.measures.indexOf("MagX,MagY,MagZ") != -1) {
            image = "./assets/image/Measure-magnetometer.svg";
        }

        else if (this.measures.indexOf("Atmospheric Pressure,Humidity,Temperature") != -1) {
            image = "./assets/image/measure-HPT.svg";
        }
        else if (this.measures.indexOf("Noise") != -1) {
            image = "./assets/image/measure-acoustic-noise.svg";
        }
        else if (this.measures.indexOf("Lux") != -1) {
            image = "./assets/image/measure-digital-light.svg";
        }
        else if (this.measures.indexOf("Relay Status") != -1) {
            image = "./assets/image/measure-button.svg";
        }
        else {
            image = "./assets/image/device_icon.svg";
        }
        return image;

    }


}
