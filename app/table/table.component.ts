import { Component, OnInit, Input } from '@angular/core';
import { DetailComponent } from './../detail/detail.component';
import { DataService } from './../data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OemService } from '../service/oemservice.service';
import { EventStatistics } from './../event-statistics';
import { BasePage } from './../base-page';
import { DataBean } from './../data-bean';
import * as moment from 'moment';
import { EventBean } from 'app/event-bean';






@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent extends BasePage implements OnInit {

  private _tableData: Array<DataBean>;

  private _eventBeans: Array<EventBean>;
  private _timeRange: Array<string>;
  private _timeMode: string;

  public isActiveAlertBox : boolean = false ;
  public message : string = "No data available";

  constructor(
    private _dataService: DataService,
    private router: Router
  ) {
    super(_dataService, router);
    this.validateSession();
  }

  @Input() set timeMode(_timeMode: string) {
    this._timeMode = _timeMode;
  }
  get timeMode(){
    return this._timeMode ;
  }

  @Input()
  set tableData(tableData: Array<DataBean>) {
    this._tableData = tableData;
    this._tableData.reverse();
  }
  get tableData() {
    return this._tableData;
  }

  @Input() set eventBeans(_eventBeans: Array<EventBean>) {
    // if(_eventBeans == undefined || _eventBeans.length == 0){
    //   this.isActiveAlertBox = true ;
    //   return  ;
    // }
    
    this._eventBeans = new Array<EventBean>();
    for (let item of _eventBeans) {
      let eventBean: EventBean = Object.assign(new EventBean(), item);
      this._eventBeans.push(eventBean);
    }
    debugger
    this._eventBeans.reverse();
  }
  get eventBeans() {
    return this._eventBeans;
  }

  ngOnInit() {

  }
  alertBox(ok : boolean){
    this.isActiveAlertBox = false ;
  }

}
