import { Component, OnInit, Injector, Injectable, ViewChild, ElementRef, Renderer, ViewChildren, QueryList ,Renderer2, Inject} from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GetData } from './get-data';
import { OemService } from '../service/oemservice.service';
import { DataService } from './../data.service';
import { BasePage } from './../base-page';
import { Device } from './../vo/device';
import { Measure } from './../vo/measure';
import { MeasureExtend } from './../vo/measure-extend';
import { EventStatistics } from './../event-statistics';
import { DetailData } from './../detail-data';
import { DataBean } from './../data-bean';
import { BinEnum } from './../bin-enum';
import { MeasureService } from './../measure.service';
import { TimeoutService } from './../timeout.service';
import { HeaderserviceService } from './../headerservice.service';
import { HostListener } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { debounce } from 'rxjs/operator/debounce';
import { debug } from 'util';
import { EventBean } from 'app/event-bean';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.css']
})
@Injectable()
export class DashboardDetailComponent extends BasePage implements OnInit {

  private _nodeName: string;
  private _nodeId: string;
  private _dataName: string;

  private _title: string;

  private _measureExtend: Array<MeasureExtend> = Array<MeasureExtend>();

  private _detailData: DetailData;


  private timer: Observable<number>;

  private sub: Subscription;

  private _eventBeans: Array<EventBean>;



  set eventBeans(_eventBeans) {
    this._eventBeans = _eventBeans;
  }
  get eventBeans() {
    return this._eventBeans;
  }

  set measureExtend(_measureExtend: Array<MeasureExtend>) {
    this._measureExtend = _measureExtend;
  }
  get measureExtend() {
    return this._measureExtend;
  }
  set title(_title: string) {
    this._title = _title;
  }
  get title() {
    return this._title;
  }

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
  set detailData(_detailData: DetailData) {
    this._detailData = _detailData;
  }
  get detailData() {
    return this._detailData;
  }

  set dataName(_dataName) {
    this._dataName = _dataName;
  }
  get dataName() {
    return this._dataName;
  }

  @ViewChildren('activeMeasure') childChildren: QueryList<ElementRef>;

  public message: string;

  public isActiveAlertBox: boolean = false;

  public paths: Array<string> ;

  @ViewChild('div') div:ElementRef;



  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private oemSevice: OemService,
    public getData: GetData,
    private measureService: MeasureService,
    private renderer: Renderer,
    private headerservice: HeaderserviceService,
    private rd: Renderer2,
    @Inject(DOCUMENT) private document: any
  ) {
    super(_dataService, router);
    this.validateSession();
    this.headerservice.name = 'DashBoard';
  }

  ngOnInit() {
    this.getData.timeMode = "m";
    this.getData.displayMode = "detail";
    this._nodeId = this.route.snapshot.params['nodeId'];
    this._nodeName = this.route.snapshot.params['nodeName'];
    this._title = this.route.snapshot.params['title'];

    this.paths = JSON.parse(localStorage.getItem("path"));
   

    if (typeof this._nodeId == "undefined") {
      if (typeof localStorage.getItem("nodeName") == "undefined") {
        this.router.navigate(['device']);
      } else {
        this._nodeId = localStorage.getItem("nodeId");
        this._nodeName = localStorage.getItem("nodeName");
        this._title = localStorage.getItem("title");
      }
    }

    this.measureService.getMeasurementList(this._nodeId).subscribe(
      data => {

        this._measureExtend = this.measureService.getMeasureConfig(data, this._nodeName);
        if (this._measureExtend != null && this._measureExtend.length > 0) {
          // Default load for Hour
          this.getData.timeMode = "m";
          this.getData.binEnum = BinEnum.MINUTE;
          this.getData.setTimeDetail();

          this.getMeasurementValue();
          this.selectMeasureName(this._measureExtend[0].name);
        }
      }
    );
    this.timer = Observable.timer(0, 1000);
    this.sub = this.timer.subscribe(
      time => {
        this.getMeasurementValue();
        this.selectMeasureName(this._dataName);
      }
    );
    // let width =  this.div.nativeElement.clientWidth ;
    // // let path = this.paths.join();
    // let canvas = document.createElement('canvas');
    // let ctx = canvas.getContext("2d");
    // ctx.font = "18px sans serif";     
    // debugger
    // for(let i = 0 ; i < 10 ; i++){
    //   let length = ctx.measureText(this.paths.join()).width  ;
    //   if(length < width){
    //     break ;
    //   }else{
    //     this.paths.splice(0, 1);
    //   }
    // }




    debugger
  }



  getMeasurementValue() {

    let dataNames: Array<string> = Array<string>();
    for (let item of this._measureExtend) {
      dataNames.push(item.name);
    }
    console.log(this._measureExtend);

    let tempDataNames = dataNames.join(",");
    this.getData.getCurrentValue(this._nodeName, tempDataNames)
      .subscribe(
      data => {

        let databeans: Array<DataBean> = data;
        if (databeans == null || databeans.length == 0)
          return;
        for (let databean of databeans) {
          for (let measure of this._measureExtend) {
            if (databean.name == measure.name) {
              measure.lastValue = databean.value;
              measure.unit.name = databean.units;
            }
          }
        }

      });
  }

  selectMeasureName(dataName: string) {
    this.getData.setTimeDetail();
    this.getData.detailData = new DetailData();
    if (this._dataName != dataName) {
      this.getData.detailData.count = 0;
      this.getData.detailData.sum = 0;
    }
    this._dataName = dataName;


    let maxMinAve = this.getData.getDashBoardDetail(this._nodeName, dataName).map(
      data => {
        // if(data == undefined){
        //   this.message = "No data available";
        //   this.isActiveAlertBox = true ;
        //   if (typeof this.sub != "undefined") {
        //     this.sub.unsubscribe();
        //   }
        //   return ;
        // }
        this._detailData = data;
      }
    );

    Observable.forkJoin([maxMinAve]).subscribe(
      data => {
        this.getData.setTime();
        this.getData.getData_1(this._nodeName, dataName).subscribe(
          data => {
            this._eventBeans = data;
          }
        );
      }
    );
  }


  ngOnDestroy() {
    if (typeof this.sub != "undefined") {
      this.sub.unsubscribe();
    }
  }

  selectTypeTime(typeTime: string) {

    if (typeTime == "m") {
      this.getData.timeMode = "m";
      this.getData.binEnum = BinEnum.MINUTE;
      this.getData.detailData.count = 0;
      this.getData.detailData.sum = 0;
    }
    else if (typeTime == "H") {
      this.getData.timeMode = "H";
      this.getData.binEnum = BinEnum.HOUR;
    } else if (typeTime == "D") {
      this.getData.timeMode = "D";
      this.getData.binEnum = BinEnum.DAY;

    } else if (typeTime == "M") {

      this.getData.timeMode = "M";
      this.getData.binEnum = BinEnum.MONTH;

    } else if (typeTime == "Y") {
      this.getData.timeMode = "Y";
      this.getData.binEnum = BinEnum.YEAR;

    }

    this.selectMeasureName(this._dataName);
  }
  getDisplay(mode: string) {

    if (mode == "detail") {

      this.getData.displayMode = "detail";
      if (this.getData.timeMode == "m") {
        this.getData.timeMode = "H";
        this.getData.binEnum = BinEnum.HOUR;
        this.selectMeasureName(this._dataName);
      }
      this.sub.unsubscribe();
      this.sub = this.timer.subscribe(
        time => {
          this.getMeasurementValue();
          this.selectMeasureName(this._dataName);
        }
      );
    }
    if (mode == "table") {
      this.sub.unsubscribe();
      this.getData.displayMode = "table";
    }
    if (mode == "graph") {
      this.sub.unsubscribe();
      this.getData.displayMode = "graph";
    }
  }
  gobackDevice() {
    let mode = localStorage.getItem("mode");
    if (mode == "Device") {
      this.router.navigate(['/device']);
    } else {
      this.router.navigate(['/hierarchy']);
    }
  }
  gotoMesuareSetting() {
    this.router.navigate(['/measure', this.nodeName, this._nodeId, this._title]);
  }

  ngAfterViewInit() {
    let child = this.childChildren.changes.subscribe(
      data => {

        let result: Array<ElementRef> = data._results;
        if (this._dataName == this._measureExtend[0].name) {
          result[0].nativeElement.style.backgroundColor = "#067dcb";
          result[0].nativeElement.children[1].style.color = "white";
          result[0].nativeElement.children[2].style.color = "white";
          result[0].nativeElement.children[3].style.color = "white";

          let imageSrc = result[0].nativeElement.firstElementChild.firstElementChild.src;
          result[0].nativeElement.firstElementChild.firstElementChild.src = this.activeImage(imageSrc);
        }

        for (let item of result) {
          this.renderer.listen(item.nativeElement, 'click', (event) => {

            item.nativeElement.style.backgroundColor = "#067dcb";
            let src = item.nativeElement.firstElementChild.firstElementChild.src;
            item.nativeElement.firstElementChild.firstElementChild.src = this.activeImage(src);
            item.nativeElement.children[1].style.color = "white";
            item.nativeElement.children[2].style.color = "white";
            item.nativeElement.children[3].style.color = "white";

            for (let i = 0; i < result.length; i++) {
              if (result[i] != item) {
                result[i].nativeElement.style.backgroundColor = "";
                result[i].nativeElement.children[1].style.color = "";
                result[i].nativeElement.children[2].style.color = "";
                result[i].nativeElement.children[3].style.color = "";

                let src = result[i].nativeElement.firstElementChild.firstElementChild.src;
                result[i].nativeElement.firstElementChild.firstElementChild.src = this.inActiveImage(src);
              }
            }

          })
        }

      }
    );
  }
  public activeImage(imageSrc: string) {
    let result = "";
    if (imageSrc.indexOf("measure01-s.svg") != -1) {
      result = "./assets/image/measure01-s-white.svg";
    }
    else if (imageSrc.indexOf("measure02-s.svg") != -1) {
      result = "./assets/image/measure02-s-white.svg";
    }
    else if (imageSrc.indexOf("measure03-s.svg") != -1) {
      result = "./assets/image/measure03-s-white.svg";
    }
    else if (imageSrc.indexOf("measure04-s.svg") != -1) {
      result = "./assets/image/measure04-s-white.svg";
    }
    else if (imageSrc.indexOf("measure00.svg") != -1) {
      result = "./assets/image/measure00-white.svg";
    }
    else if (imageSrc.indexOf("measure-pressure.svg") != -1) {
      result = "./assets/image/measure-pressure-white.svg"
    }
    else if (imageSrc.indexOf("measure-acoustic-noise.svg") != -1) {
      result = "./assets/image/measure-acoustic-noise-white.svg"
    }
    else if (imageSrc.indexOf("measure-digital-light.svg") != -1) {
      result = "./assets/image/measure-digital-light-white.svg"
    }
    else if (imageSrc.indexOf("measure-accelerometer-X.svg") != -1) {
      result = "./assets/image/measure-accelerometer-X-white.svg"
    }
    else if (imageSrc.indexOf("measure-accelerometer-Y.svg") != -1) {
      result = "./assets/image/measure-accelerometer-Y-white.svg"
    }
    else if (imageSrc.indexOf("measure-accelerometer-Z.svg") != -1) {
      result = "./assets/image/measure-accelerometer-Z-white.svg"
    }
    else if (imageSrc.indexOf("measure-gyroscope-X.svg") != -1) {
      result = "./assets/image/measure-gyroscope-X-white.svg"
    }
    else if (imageSrc.indexOf("measure-gyroscope-Y.svg") != -1) {
      result = "./assets/image/measure-gyroscope-Y-white.svg"
    }
    else if (imageSrc.indexOf("measure-gyroscope-Z.svg") != -1) {
      result = "./assets/image/measure-gyroscope-Z-white.svg"
    }
    else if (imageSrc.indexOf("Measure-magnetometer-X.svg") != -1) {
      result = "./assets/image/Measure-magnetometer-X-white.svg"
    }
    else if (imageSrc.indexOf("Measure-magnetometer-Y.svg") != -1) {
      result = "./assets/image/Measure-magnetometer-Y-white.svg"
    }
    else if (imageSrc.indexOf("Measure-magnetometer-Z.svg") != -1) {
      result = "./assets/image/Measure-magnetometer-Z-white.svg"
    }
    else {
      result = imageSrc;
    }
    return result;
  }
  public inActiveImage(imageSrc: string) {
    let result = "";
    if (imageSrc.indexOf("measure01-s-white.svg") != -1) {
      result = "./assets/image/measure01-s.svg";
    }
    else if (imageSrc.indexOf("measure02-s-white.svg") != -1) {
      result = "./assets/image/measure02-s.svg";
    }
    else if (imageSrc.indexOf("measure03-s-white.svg") != -1) {
      result = "./assets/image/measure03-s.svg";
    }
    else if (imageSrc.indexOf("measure04-s-white.svg") != -1) {
      result = "./assets/image/measure04-s.svg";
    }
    else if (imageSrc.indexOf("measure00-white.svg") != -1) {
      result = "./assets/image/measure00.svg";
    }
    else if (imageSrc.indexOf("measure-pressure-white.svg") != -1) {
      result = "./assets/image/measure-pressure.svg";
    }
    else if (imageSrc.indexOf("measure-acoustic-noise-white.svg") != -1) {
      result = "./assets/image/measure-acoustic-noise.svg";
    }
    else if (imageSrc.indexOf("measure-digital-light-white.svg") != -1) {
      result = "./assets/image/measure-digital-light.svg";
    }
    else if (imageSrc.indexOf("measure-accelerometer-X-white.svg") != -1) {
      result = "./assets/image/measure-accelerometer-X.svg";
    }
    else if (imageSrc.indexOf("measure-accelerometer-Y-white.svg") != -1) {
      result = "./assets/image/measure-accelerometer-Y.svg";
    }
    else if (imageSrc.indexOf("measure-accelerometer-Z-white.svg") != -1) {
      result = "./assets/image/measure-accelerometer-Z.svg";
    }
    else if (imageSrc.indexOf("measure-gyroscope-X-white.svg") != -1) {
      result = "./assets/image/measure-gyroscope-X.svg";
    }
    else if (imageSrc.indexOf("measure-gyroscope-Y-white.svg") != -1) {
      result = "./assets/image/measure-gyroscope-Y.svg";
    }
    else if (imageSrc.indexOf("measure-gyroscope-Z-white.svg") != -1) {
      result = "./assets/image/measure-gyroscope-Z.svg";
    }
    else if (imageSrc.indexOf("Measure-magnetometer-X-white.svg") != -1) {
      result = "./assets/image/Measure-magnetometer-X.svg";
    }
    else if (imageSrc.indexOf("Measure-magnetometer-Y-white.svg") != -1) {
      result = "./assets/image/Measure-magnetometer-Y.svg";
    }
    else if (imageSrc.indexOf("Measure-magnetometer-Z-white.svg") != -1) {
      result = "./assets/image/Measure-magnetometer-Z.svg";
    }
    else {
      result = imageSrc;
    }
    return result;
  }
  alertBox(ok: boolean) {
    this.isActiveAlertBox = false;
  }

}
