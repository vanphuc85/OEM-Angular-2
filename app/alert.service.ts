import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { OemService } from './service/oemservice.service';
import { Watche } from './vo/watche';
import { Condition } from './vo/condition';
import { Observable } from 'rxjs/Observable';
import { BinEnum } from './bin-enum';
import { AlertView } from './alert-view';
import { SerializationHelper } from './serialization-helper';
import { watch } from 'fs';
import { Alert } from './vo/alert';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AlertService {

  private _conditions: Array<any>;

  private _alertView: Array<AlertView>;

  public alertSubject = new BehaviorSubject<Alert>(null);
  
  public alertShare  = this.alertSubject.asObservable();

  set conditions(_conditions: Array<any>) {
    this._conditions = _conditions;
  }
  get conditions() {
    return this._conditions;
  }
  set alertView(_alertView: Array<AlertView>) {
    this._alertView = _alertView;
  }
  get alertView() {
    return this._alertView;
  }

  private _alerts: Array<Alert>;

  set alerts(_alerts: Array<Alert>) {
    this._alerts = _alerts;
  }
  get alerts() {
    return this._alerts;
  }

  constructor(
    private dataService: DataService,
    private oemService: OemService
  ) { }

  findWatcheByNodeName(): Observable<Array<Alert>> {
    return this.oemService.getAllAlert()
      .map(data => {
        this._alerts = SerializationHelper.toInstance(Array<Alert>(), JSON.stringify(data.data.alerts));
        return this._alerts;
      });
  }

  findConditionByDataName(): Observable<Array<AlertView>> {
    return this.findWatcheByNodeName().map(
      data => {
        this._alerts = data ;
        return this.convertAlertToAlertView();
      }
    );

  }
  getAlertById(alertId: number): Observable<Alert> {
    return this.findWatcheByNodeName().map(
      data => {
        let alert: Alert = data.filter(
          item => {
            return item.id == alertId;
          }
        )[0];
        return alert;

      }
    );
  }
  convertAlertToAlertView() : Array<AlertView> {
    for (let item of this._alerts) {
        let alert = SerializationHelper.toInstance(new Alert(), JSON.stringify(item));
        let alertView = new AlertView();
        alertView.name = item.alertName;
        alertView.condition = alert.convertConditionToView();
        alertView.ignore = item.ignore;
        this._alertView.push(alertView);
      }
      return this._alertView ;
  }

}
