import { Component, OnInit, ViewEncapsulation, Output,Input, EventEmitter } from '@angular/core';
import { DataService } from './../data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-alert-box',
  templateUrl: './alert-box.component.html',
  styleUrls: ['./alert-box.component.css'],
  encapsulation: ViewEncapsulation.Native // <------

})
export class AlertBoxComponent implements OnInit {
  
  private _message : string ;

  @Input()set message(_message){
    this._message = _message ;
  }
  get message(){
    return this._message ;
  }

  @Output() exit: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  }

  public ok(): void {
    this.exit.emit(true);
  }
  public cancel(): void{
    this.exit.emit(false);
  }
  

}
