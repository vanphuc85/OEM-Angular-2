import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';
import { DataService } from './../data.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css'],
  encapsulation: ViewEncapsulation.Native // <------

})
export class ConfirmComponent implements OnInit {

  private _message: string;

  private _item: number | string;

  @Input() set message(_message) {
    this._message = _message;
  }
  get message() {
    return this._message;
  }

  @Input() set item(_item) {
    this._item = _item;
  }
  get item() {
    return this._item;
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
  public cancel(): void {
    this.exit.emit(false);
  }

}
