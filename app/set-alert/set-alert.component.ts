import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeaderbigService } from './../headerbig.service';
import { BasePage } from './../base-page';
import { DataService } from './../data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OemService } from '../service/oemservice.service';
import { AlertService } from './../alert.service';
import { Condition } from './../vo/condition';
import { AlertView } from '../alert-view';
import { Alert } from '../vo/alert';
import { Confirm } from 'app/confirm';
import { HeaderserviceService } from 'app/headerservice.service';



@Component({
  selector: 'app-set-alert',
  templateUrl: './set-alert.component.html',
  styleUrls: ['./set-alert.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SetAlertComponent extends BasePage implements OnInit {


  private nodeId: string;
  private nodeName: string;
  private _dataName: string;
  private _alertView: Array<AlertView>;
  private _title: string;
  private _isActive: boolean;

  private _alertNameDelete: string;
  public _message: string = "Do you want to delete alert ? ";
  public isActiveAlertBox : boolean = false ; 

  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private oemSevice: OemService,
    private alertService: AlertService,
    private headerbigService: HeaderbigService,
    private headerService : HeaderserviceService
  ) {
    super(_dataService, router);
    this.validateSession();
    this.headerService.name = "Set Alert";
  }
  set isActive(_isActive) {
    this._isActive = _isActive;
  }
  get isActive() {
    return this._isActive;
  }

  set dataName(_dataName: string) {
    this._dataName = _dataName;
  }
  get dataName() {
    return this._dataName;
  }

  set alertView(_alertView: Array<AlertView>) {
    this._alertView = _alertView;
  }
  get alertView() {
    return this._alertView;
  }

  set title(_title: string) {
    this._title = _title;
  }
  get title() {
    return this._title;
  }
  set message(_message){
    this._message = _message ;
  }
  get message(){
    return this._message ;
  }

  ngOnInit() {
    // for create and edit alert
    localStorage.removeItem("alert");
 
    this._alertView = new Array<AlertView>();
    this.alertService.alerts = Array<Alert>();

    this.alertService.alertView = new Array<AlertView>();
    this.alertService.findConditionByDataName()
      .subscribe(data => {
        this._alertView = data;
        
      });
  }

  editAlerts(index) {
    this.alertService.alertSubject.next(this.alertService.alerts[index]);
    let alert = this.alertService.alerts[index] ;
    let conditions = alert.alertConditions ;
    if(conditions != null && conditions.length >= 2){
      this.isActiveAlertBox = true ;
      this._message = "Only one condition supported.";
      return ;
    }
    this.router.navigate(['alert-edit', this.alertService.alerts[index].id]);
  }
  goToCreateAlert() {
    this.router.navigate(['alert-device']);
  }
  udpateStatus(name: string) {
    let alerts = this.alertService.alerts;
    let alert = new Alert();
    for (let item of alerts) {
      if (item.alertName == name) {
        alert = item;
        break;
      }
    }
    if (alert.ignore == 1) {
      alert.ignore = 0;
    } else {
      alert.ignore = 1;
    }
    
    this.oemSevice.updateAlert(alert).subscribe(
      data => {
        let alerts: Array<Alert> = data && data.data && data.data.alerts;
        let success = data.success;
        if ((alerts != null && typeof alerts != "undefined" && alerts.length > 0) || success == 0) {
          for (let item of this._alertView) {
            if (item.name == name) {
              if (item.ignore == 1) {
                item.ignore = 0;
              } else {
                item.ignore = 1;
              }
              break;
            }
          }
        }
      }
    );
  }
  confirmDelete(alertName: string) {
    this._isActive = true;
    this._message  = "Do you want to delete alert ? ";
    this._alertNameDelete = alertName;
  }
  changeStatus(exit: boolean) {
    this._isActive = false;
    if (exit == false)
      return;
    for (let item of this.alertService.alerts) {
      if (item.alertName == this._alertNameDelete) {
        if (item.ignore == 0) {
          item.ignore = 1;
          this.oemSevice.updateAlert(item).subscribe(
            data => {
              this.deleteAlert();
            }
          );
        } else {
          this.deleteAlert();
        }
        break;
      }
    }
  }
  deleteAlert() {
    this.oemSevice.deleteAlert(this._alertNameDelete).subscribe(
      data => {
        if (data.data.alerts != null && typeof data.data.alerts !== "undefined") {
          this.alertService.alerts = data.data.alerts;
          this.alertService.alertView = [];
          this._alertView = this.alertService.convertAlertToAlertView();
        }
      }
    );
  }
  alertBox(ok :boolean){
    this.isActiveAlertBox = false ;
  }
}
