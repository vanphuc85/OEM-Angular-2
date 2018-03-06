import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { DataService } from './../data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';



@Component({
  selector: 'app-timeout',
  templateUrl: './timeout.component.html',
  styleUrls: ['./timeout.component.css'],
  encapsulation: ViewEncapsulation.Native // <------

})
export class TimeoutComponent implements OnInit {

  @Output() exit: EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
  }

  public keepStay(): void {
    
    this.exit.emit(true);
  }

}
