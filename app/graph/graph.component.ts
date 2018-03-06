import { Component, OnInit, Input } from '@angular/core';
import { DataBean } from './../data-bean';
import * as moment from 'moment';
import { EventBean } from 'app/event-bean';
import { Timestamp } from 'app/timestamp';
import { timestamp } from 'rxjs/operator/timestamp';
declare var Highcharts: any;



@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  private _tableData: Array<DataBean>;
  private _eventBeans: Array<EventBean>;
  private _timeRange: Array<string> ;

  private _timeMode: string;
  private _dataName: string;

  public isActiveAlertBox : boolean = false ;
  public message : string = "No data available";

  @Input() set timeMode(_timeMode: string) {
    this._timeMode = _timeMode;

  }
  get timeMode(){
    return this._timeMode ;
  }

  @Input() set dataName(dataName: string) {
    this._dataName = dataName;
  }
  get dataName() {
    return this._dataName;
  }

  @Input() set eventBeans(_eventBeans: Array<EventBean>) {
    // if(_eventBeans == undefined || _eventBeans.length == 0){
    //   this.isActiveAlertBox = true ;
    //   return  ;
    // }
    this._eventBeans = new Array<EventBean>();
    this._timeRange  = new Array<string>();
    for (let item of _eventBeans) {
      let eventBean: EventBean = Object.assign(new EventBean(), item);
      this._eventBeans.push(eventBean);

      let time: string = Object.assign(new Timestamp(), item.timestamp).convertTime(this._timeMode);
      this._timeRange.push(time);
    }
    this.drawChart();
  }
  get eventBeans() {
    return this._eventBeans;
  }

  constructor() {

  }

  ngOnInit() {
  }

  drawChart() {
    console.log(this._timeRange);

    console.log(this._eventBeans);

    let tempData = Array<Number>();
    let pointFormat = "";
    for (let item of this._eventBeans) {
      tempData.push(parseFloat(Number(item.dataBean[0].value).toFixed(2)));
      if (item.dataBean[0].name == "Atmospheric Pressure") {
        pointFormat = this._dataName + ": " + "{point.y:.3f}";
      } else {
        pointFormat = this._dataName + ": " + "{point.y:.2f}";
      }
    }
    Highcharts.chart('container', {
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      exporting: { enabled: false },
      subtitle: {
        text: ''
      },

      yAxis: {
        title: {
          text: ''
        }
      },
      legend: {
        enabled: true,
        floating: true,
        verticalAlign: 'bottom',
        align: 'right',
        y: 40
      },
      xAxis: {
        categories: this._timeRange
      },
      tooltip: {
        pointFormat: pointFormat
      },

      series: [{
        name: " " + this._dataName,
        data: tempData
      },]

    });


  }
  alertBox(ok :boolean){
    this.isActiveAlertBox = false ;
  }


}
