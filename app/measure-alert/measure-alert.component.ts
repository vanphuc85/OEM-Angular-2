import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OemService } from '../service/oemservice.service';
import { GetData } from './../dashboard-detail/get-data';
import { BasePage } from './../base-page';
import { DashboardDetailComponent } from './../dashboard-detail/dashboard-detail.component';
import { MeasureExtend } from './../vo/measure-extend';
import { MeasureService } from './../measure.service';
import { Watche } from './../vo/watche';
import { Condition } from './../vo/condition';
import { HeaderserviceService } from '../headerservice.service';







@Component({
  selector: 'app-measure-alert',
  templateUrl: './measure-alert.component.html',
  styleUrls: ['./measure-alert.component.css']
})
export class MeasureAlertComponent extends BasePage implements OnInit {

  private _measureExtend: Array<MeasureExtend> = Array<MeasureExtend>();
  private _nodeId: string;
  private _nodeName: string;
  private _title: string;

  set nodeId(_nodeId: string) {
    this._nodeId = _nodeId;
  }

  get nodeId() {
    return this._nodeId;
  }

  set nodeName(_nodeName: string) {
    this._nodeName = _nodeName;
  }
  get nodeName() {
    return this._nodeName;
  }

  set title(_title: string) {
    this._title = _title;
  }
  get title() {
    return this._title;
  }

  set measureExtend(_measureExtend: Array<MeasureExtend>) {
    this._measureExtend = _measureExtend;
  }
  get measureExtend() {
    return this._measureExtend;
  }

  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private oemSevice: OemService,
    private measureService: MeasureService,
    private headerService: HeaderserviceService
  ) {
    super(_dataService, router);
    this.validateSession();
    this.headerService.name = "Create New Alert";
  }

  ngOnInit() {
    // remove object alert for create alert page
    localStorage.removeItem("alert");
    localStorage.removeItem("unit");

    this._nodeId = this.route.snapshot.params['nodeId'];
    this._nodeName = this.route.snapshot.params['nodeName'];
    this._title = this.route.snapshot.params['title'];

    this.measureService.getMeasurementList(this._nodeId)
      .subscribe(data => {
        debugger
        this._measureExtend = data;

      });

  }
  selectMeasureName(name: string, unit: string) {
    if (unit == undefined) {
      unit = "";
    }
    this.router.navigate(["create-alert", name, unit, this.nodeName]);
  }
  watchByNode() {
    this.oemSevice.watchByNode(this._nodeName)
      .subscribe(data => {
        let watches: Array<Watche> = data.watches;
      });
  }

  findConditionByDataName() {

  }
  mouseEnter(measureName: string) {
    
    for (let item of this._measureExtend) {
      if (item.name == measureName) {
        item.active = true ;
        item.activeImage();
      }
    }
  }
  mouseLeave(measureName: string) {
    for (let item of this._measureExtend) {
      if (item.name == measureName) {
        item.active = false ;
        item.inActiveImage();
      }
    }
  }


}
