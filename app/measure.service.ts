import { Injectable } from '@angular/core';
import { BasePage } from './base-page';
import { DataService } from './data.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OemService } from './service/oemservice.service';
import { Device } from './vo/device';
import { Measure } from './vo/measure';
import { MeasureExtend } from './vo/measure-extend';
import { Unit } from 'app/unit';
import { Util } from 'app/util';



@Injectable()
export class MeasureService extends BasePage {

  private _measureExtend: Array<MeasureExtend>

  set measureExtend(_measureExtend: Array<MeasureExtend>) {
    this._measureExtend = _measureExtend;
  }
  get measureExtend() {
    return this._measureExtend;
  }

  constructor(
    protected _dataService: DataService,
    protected router: Router,
    protected oemService: OemService,
  ) {
    super(_dataService, router);
    this.validateSession();

  }
  getMeasurementList(nodeId) {
    this._measureExtend = Array<MeasureExtend>();
    return this.oemService.getNodesData(nodeId)
      .map(
      data => {
        debugger
        let measureNames: string = data.nodeTreeDatas.measures != "" ? data.nodeTreeDatas.measures : data.nodeTreeDatas.availableMeasure;
        let measureList: Array<Measure> = data.nodeTreeDatas.measuresList;

        if (typeof measureNames != "undefined" && measureNames.length > 0) {
          let measuresNamesList: Array<string> = measureNames.split(",");
          for (let item of measuresNamesList) {
            for (let measure_ of measureList) {
              if (measure_.name == item) {

                let unit: Unit = Object.assign(new Unit(), JSON.parse(JSON.stringify(measure_.unit)));
                let measure: Measure = new Measure(item, unit);
                let measureExtend = new MeasureExtend(measure);
                // Remove duplicate .
                let match = false ;
                this._measureExtend.map(
                  data =>{
                    if(data.name == measureExtend.name){
                      match = true ;
                    }
                  }
                );
                if(false == match){
                  this._measureExtend.push(measureExtend);
                }
              }
            }
          }
        }

        return this._measureExtend;
      }
      )
      ;
  }
  getMeasureConfig(data: Array<MeasureExtend>, nodeName: string) {
    debugger
    let result: Array<MeasureExtend> = Array<MeasureExtend>();
    let measureConfigJson = localStorage.getItem(nodeName);
    let measureConfig: Array<MeasureExtend> = Object.assign(new Array<MeasureExtend>(), JSON.parse(measureConfigJson));
    if (measureConfig != null && measureConfig.length > 0) {
      result = measureConfig;
    } else {
      result = this._measureExtend;
    }
    return result;
  }



}
