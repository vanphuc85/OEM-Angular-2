import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { BasePage } from './../base-page';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OemService } from '../service/oemservice.service';
import { MeasureService } from './../measure.service';
import { MeasureExtend } from './../vo/measure-extend';
import { ElementRef, Renderer2 } from '@angular/core';
import { ViewChild, ViewChildren, QueryList, Renderer } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { HeaderserviceService } from '../headerservice.service';







@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.css']
})
export class MeasureComponent extends BasePage implements OnInit {

  private _nodeId: string;

  private _measureExtend: Array<MeasureExtend> = Array<MeasureExtend>();

  private _title: string;

  private _measureNames: Array<string> = Array<string>();

  private _nodeName: string;

  private _measureConfig: Array<MeasureExtend> = Array<MeasureExtend>();


  @ViewChildren('child') childChildren: QueryList<ElementRef>;

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

  set measureExtend(_measureExtend: Array<MeasureExtend>) {
    this._measureExtend = _measureExtend;
  }
  get measureExtend() {
    return this._measureExtend;
  }

  set nodeName(_nodeName: string) {
    this._nodeName = _nodeName;
  }
  get nodeName() {
    return this._nodeName;
  }

  set measureConfig(_measureConfig) {
    this._measureConfig = _measureConfig;
  }

  get measureConfig() {
    return this._measureConfig;
  }


  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private oemSevice: OemService,
    public measureService: MeasureService,
    private elRef: ElementRef,
    private renderer: Renderer,
    private headerservice: HeaderserviceService
    

  ) {
    super(_dataService, router);
    this.validateSession();
    this.headerservice.name = "Select Measure(s)";

  }

  ngOnInit() {
    this._nodeId = this.route.snapshot.params['nodeId'];
    this._title = this.route.snapshot.params['title'];
    this._nodeName = this.route.snapshot.params['nodeName'];
    this._measureExtend = Array<MeasureExtend>();

    this.measureService.getMeasurementList(this._nodeId).subscribe(
      data => {
        this._measureExtend = data;
        this._measureConfig = JSON.parse(localStorage.getItem(this._nodeName));
        if(this._measureConfig == null){
          this._measureConfig = Array<MeasureExtend>();
          this._measureConfig = this._measureExtend.slice(0) ;
        }
        this._measureExtend.filter(measureExtend => {
          measureExtend.checkActive(this._measureConfig);
        });
      }
    );


  }
  ngAfterViewInit() {
    let child = this.childChildren.changes.subscribe(
      data => {
        let result: Array<ElementRef> = data._results;
        for (let item of result) {
          // Loading fisrt
          if(item.nativeElement.style.backgroundColor == "rgb(6, 125, 203)"){
            let src = item.nativeElement.firstElementChild.firstElementChild.src;
            item.nativeElement.firstElementChild.firstElementChild.src = this.activeImage(src);
            item.nativeElement.children[1].style.color = "white";
          }else{
            let src = item.nativeElement.firstElementChild.firstElementChild.src;
            item.nativeElement.firstElementChild.firstElementChild.src = this.inActiveImage(src);
            item.nativeElement.children[1].style.color = "";
            
          }
          // Event
          this.renderer.listen(item.nativeElement, 'click', (event) => {
            let children: Array<HTMLElement> = item.nativeElement.children;
            if (item.nativeElement.style.backgroundColor == "white") {
              item.nativeElement.style.backgroundColor = "rgb(6, 125, 203)";
              let src = item.nativeElement.firstElementChild.firstElementChild.src;
              item.nativeElement.children[1].style.color = "white";
      
              item.nativeElement.firstElementChild.firstElementChild.src = this.activeImage(src);
              this._measureExtend.filter(item => {
                if (item.name == children[1].innerText) {
                  this._measureConfig.push(item);
                }
              });
            } else {
              if(this._measureConfig.length == 1){
                return ;
              }
              item.nativeElement.style.backgroundColor = "white";
              item.nativeElement.children[1].style.color = "";
              let src = item.nativeElement.firstElementChild.firstElementChild.src;
              
              item.nativeElement.firstElementChild.firstElementChild.src = this.inActiveImage(src);
              let i = 0
              for (; i < this._measureConfig.length; i++) {
                if (this._measureConfig[i].name == children[1].innerText) {
                  break;
                }
              }
              
              this._measureConfig.splice(i, 1);
            }

          })
        }

      }
    );
  }

  saveConfig() {
    localStorage.setItem(this._nodeName, JSON.stringify(this._measureConfig));
    this.router.navigate(['./dashboard-detail', this._nodeName, this._nodeId, this._title]);
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

  test(event){
    debugger
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
  }

}
