import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { BasePage } from './../base-page';
import { DataService } from './../data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { OemService } from '../service/oemservice.service';
import { EventStatistics } from './../event-statistics';
import { DetailData } from './../detail-data';
import { debounce } from 'rxjs/operator/debounce';
import { debug } from 'util';
declare var jquery: any;
declare var $: any;



@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent extends BasePage implements OnInit {

  private _detailData: DetailData;

  private _dataName : string ;

  private originalData: DetailData = new DetailData();

  constructor(
    private _dataService: DataService,
    private router: Router
  ) {
    super(_dataService, router);
    this.validateSession();
  }

  @Input()
  set dataName(_dataName :string){
    
    this._dataName = _dataName ;
  }
  get dataName(){
    return this._dataName ;
  }

  @Input()
  set detailData(detailData: DetailData) {
    
    if(typeof detailData == "undefined"){
      this._detailData = new DetailData();
    }else{
      this._detailData = detailData;
    }
    
    console.log(this._detailData);
    this.minAnimate();
    this.maxAnimate();
    this.averageAnimate();
    this.currentAnimate();
    this.originalData =  this._detailData ;

  }
  get detailData() {
    return this._detailData;
  }

  ngOnInit() {

  }
  ngAfterViewChecked() {

  }

  

  minAnimate() {
    let dataName = this._dataName ;
    $('#min').prop('Counter', this.originalData.min).animate({
      Counter: this._detailData.min
    }, {
        duration: 150,
        easing: 'swing',
        step: function (now) {
          if(dataName == "Atmospheric Pressure"){
            $('#min').text(parseFloat(now).toFixed(3));
          }else{
            $('#min').text(parseFloat(now).toFixed(2));
          }
         
        }
      });
  }
  maxAnimate() {
    let dataName = this._dataName ;
    $('#max').prop('Counter', this.originalData.max).animate({
      Counter: this._detailData.max
    }, {
        duration: 150,
        easing: 'swing',
        step: function (now) {
          if(dataName == "Atmospheric Pressure"){
            $('#max').text(parseFloat(now).toFixed(3));
          }else{
            $('#max').text(parseFloat(now).toFixed(2));
          }
         
        }
      });
  }
  currentAnimate() {
    let dataName = this._dataName ;
    $('#current').prop('Counter', this.originalData.current).animate({
      Counter: this._detailData.current
    }, {
        duration: 150,
        easing: 'swing',
        step: function (now) {
          if(dataName == "Atmospheric Pressure"){
            $('#current').text(parseFloat(now).toFixed(3));
          }
          else{
            $('#current').text(parseFloat(now).toFixed(2));
          }
        }
      });
  }
  averageAnimate() {
    let dataName = this._dataName ;
    $('#average').prop('Counter', this.originalData.average).animate({
      Counter: this._detailData.average
    }, {
        duration: 150,
        easing: 'swing',
        step: function (now) {
          if(dataName == "Atmospheric Pressure"){
            $('#average').text(parseFloat(now).toFixed(3));
          }else{
            $('#average').text(parseFloat(now).toFixed(2));
          }
         
        }
      });
  }

}
