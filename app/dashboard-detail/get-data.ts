import { OemService } from './../service/oemservice.service';
import { BasePage } from './../base-page';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from './../data.service';
import { Injectable } from '@angular/core';
import { EventBean } from './../event-bean';
import { DataBean } from './../data-bean';
import { DetailData } from './../detail-data';
import { BinEnum } from './../bin-enum';
import { EventStatistics } from './../event-statistics';
import { Observable } from 'rxjs/Rx';
import { Statistic } from '../statistic';


@Injectable()
export class GetData extends BasePage {
    private _timeMode: string;
    private _beginTime: Date;
    private _endTime: Date;
    private _displayMode: string;
    private _nodeName: string;
    private _dataName: string;
    private _binEnum: number;
    private _detailData: DetailData;
    constructor(
        protected _dataService: DataService,
        protected router: Router,
        protected oemService: OemService,
    ) {
        super(_dataService, router);
        if (this._displayMode == "detail") {
            this.setTimeDetail();
            this._timeMode = "H";
            this._binEnum = BinEnum.HOUR;
        } else {
            this.setTime();
            this._timeMode = "m";
            this._binEnum = BinEnum.MINUTE;
        }

    }
    set timeMode(_timeMode) {
        this._timeMode = _timeMode;
    }
    get timeMode() {
        return this._timeMode;
    }
    set displayMode(_displayMode: string) {
        this._displayMode = _displayMode;
    }

    get displayMode() {
        return this._displayMode;
    }

    set binEnum(_binEnum) {
        this._binEnum = _binEnum;
    }
    get binEnum() {
        return this._binEnum;
    }

    set detailData(_detailData: DetailData) {
        this._detailData = _detailData;
    }
    get detailData() {
        return this._detailData;
    }


    public getData(nodeName: string, dataName: string): Observable<Array<DataBean>> {
        return this.oemService.getBinnedEvents(this._beginTime.getTime(), this._endTime.getTime(), this._binEnum, dataName, nodeName)
            .map(
            data => {

                let result: Array<DataBean> = Array<DataBean>();
                let temp: Array<number> = Array<number>();
                let eventBean: Array<EventBean> = data.eventBean;
                if (eventBean.length == 0) {
                    return [];
                }
                for (let item of eventBean) {
                    let dataBean: DataBean = Object.assign(new DataBean(), item.dataBean[0]);
                    result.push(dataBean);
                }


                return result;
            }
            );
    }
    public getData_1(nodeName: string, dataName: string): Observable<Array<EventBean>> {
        return this.oemService.getBinnedEvents(this._beginTime.getTime(), this._endTime.getTime(), this._binEnum, dataName, nodeName)
            .map(
            data => {
                let result: Array<EventBean> = Array<EventBean>();
                result = data.eventBean;
                if (result.length == 0) {
                    return [];
                }
                return result;
            }
            );
    }


    public setTime() {
        this._endTime = new Date();
        this._beginTime = new Date();

        if (this._timeMode == "m") {

            this._endTime.setSeconds(0);

            this._beginTime.setMinutes(this._beginTime.getMinutes() - 15);
            this._beginTime.setSeconds(0);
        }
        if (this._timeMode == "H") {
            this._endTime.setHours(this._endTime.getHours() + 1);
            this._endTime.setMinutes(0);
            this._endTime.setSeconds(0);

            this._beginTime.setHours(this._beginTime.getHours() - 14);
            this._beginTime.setMinutes(0);
            this._beginTime.setSeconds(0);
        }
        if (this._timeMode == "D") {
            this._endTime.setHours(24);
            this._endTime.setMinutes(0);
            this._endTime.setSeconds(0);

            this._beginTime.setDate(this._endTime.getDate() - 15);
            this._beginTime.setMinutes(0);
            this._beginTime.setSeconds(0);
            this._beginTime.setHours(0);
        }
        if (this._timeMode == "M") {
            this._endTime.setDate(1);
            this._endTime.setMonth(this._endTime.getMonth() + 2);
            this._endTime.setHours(12);
            this._endTime.setMinutes(0);
            this._endTime.setSeconds(0);


            this._beginTime.setMonth(this._beginTime.getMonth() - 14);
            this._beginTime.setHours(12);
            this._beginTime.setMinutes(0);
            this._beginTime.setSeconds(0);
            this._beginTime.setDate(1);
            console.log(this._beginTime);
            console.log(this._endTime);
        }
        if (this._timeMode == "Y") {
            this._endTime.setMinutes(0);
            this._endTime.setSeconds(0);

            this._beginTime.setFullYear(this._endTime.getFullYear() - 15);
        }
    }
    public setTimeDetail() {
        this._endTime = new Date();
        this._beginTime = new Date();
        if (this._timeMode == "H") {
            this._endTime.setHours(this._endTime.getHours() + 1);
            this._endTime.setMinutes(0);
            this._endTime.setSeconds(0);

            this._beginTime.setHours(this._beginTime.getHours());
            this._beginTime.setMinutes(0);
            this._beginTime.setSeconds(0);
        }
        if (this._timeMode == "D") {
            this._endTime.setHours(24);
            this._endTime.setMinutes(0);
            this._endTime.setSeconds(0);

            this._beginTime.setMinutes(0);
            this._beginTime.setSeconds(0);
            this._beginTime.setHours(0);
        }
        if (this._timeMode == "M") {
            this._endTime.setDate(1);
            this._endTime.setMonth(this._endTime.getMonth() + 1);
            this._endTime.setHours(12);
            this._endTime.setMinutes(0);
            this._endTime.setSeconds(0);


            this._beginTime.setMonth(this._beginTime.getMonth());
            this._beginTime.setHours(12);
            this._beginTime.setMinutes(0);
            this._beginTime.setSeconds(0);
            this._beginTime.setDate(1);
        }
        if (this._timeMode == "Y") {
            this._endTime.setHours(12);
            this._endTime.setMinutes(0);
            this._endTime.setSeconds(0);

            this._beginTime.setMonth(0);
            this._beginTime.setDate(1);
            this._beginTime.setHours(12);
            this._beginTime.setMinutes(0);
            this._beginTime.setSeconds(0);

        }
    }
    getCurrentValue(nodeName, dataName): Observable<Array<DataBean>> {
        return this.oemService.getInstantaneousEvents_new(nodeName, dataName, "callerID")
            .map(
            data => {
                let eventBean: Array<EventBean> = data.eventBeans;
                let dataBean: Array<DataBean> = Array<DataBean>();
                if(eventBean && eventBean[0]){
                    dataBean = eventBean[0].dataBean;
                }
                // let dataBean: Array<DataBean> = eventBean[0].dataBean;
                return dataBean;
            }
            );
    }
    getStatistics(nodeName, dataName): Observable<Statistic> {
        return this.oemService.getStatistics(nodeName, dataName, this._beginTime.getTime(), this._endTime.getTime())
            .map(
            data => {
                let statisticses: Array<Statistic> = data.statistic;
                return statisticses[0];
            }
            );
    }

    getDashBoardDetail(nodeName, dataName): Observable<DetailData> {
        return this.oemService.getBinnedEvents(this._beginTime.getTime(), this._endTime.getTime(), -1, dataName, nodeName)
            .map(
            data => {
                try {
                    let result: Array<any> = Array<any>();
                    let eventBean: EventBean = data.eventBean[0];
                    let dataBean: DataBean = eventBean.dataBean[0];
                    let statistics: Statistic = data.statistics[0];

                    this._detailData.current = statistics.current;
                    if (this._timeMode == "m") {
                        this._detailData.max = this._detailData.maxRealTime;
                        this._detailData.min = this._detailData.minRealTime;
                        this._detailData.average = this._detailData.averageRealTime;
                    } else {
                        this._detailData.max = Number(dataBean.max);
                        this._detailData.min = Number(dataBean.min);
                        this._detailData.average = statistics.average;
                    }
                    this._detailData.units = statistics.units;

                } catch (e) {
                    return undefined ;
                }

                return this._detailData;
            }
            );
    }

} 