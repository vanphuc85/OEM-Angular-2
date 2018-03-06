import { Component, OnInit, Input ,Output,EventEmitter } from '@angular/core';
import { HeaderinputService } from './../headerinput.service';
import { Menu } from 'app/menu';
import * as globals from 'app/globals';


@Component({
  selector: 'app-header-input',
  templateUrl: './header-input.component.html',
  styleUrls: ['./header-input.component.css']
})
export class HeaderInputComponent implements OnInit {

  private _inputText: string;

  private _name: string;

  public active  : boolean = true ;

  public menuList: Array<Menu>;

  public text : string ;

  @Output() messageEvent = new EventEmitter<any>();

  @Input() set inputText(_inputText: string) {
    this._inputText = _inputText;
  }
  get inputText() {
    return this._inputText;
  }

  @Input() set name(_name: string) {
    this._name = _name;
  }

  get name() {
    return this._name;
  }
  constructor(private headerinput: HeaderinputService) {
    this.menuList = globals.menuList;
  }

  ngOnInit() {
    this.menuList = Object.assign(Array<Menu>(), JSON.parse(localStorage.getItem("menu")));
    let mode = localStorage.getItem("mode");
    let temp : Array<Menu>= Array<Menu>();
    debugger
    for(let item of this.menuList){
      if(mode == "Device"){
        if(item.name != "hierarchy"){
          temp.push(item);
        }
      }else if(mode == "Hierarchy"){
        if(item.name != "device"){
          temp.push(item);
        }
      }
    }
    this.menuList = temp ;
  }

  routing(menu: Menu) {
    // reset focus into device tab after click logout
    
    if (menu.name == "login") {
      for (let item of this.menuList) {
        if (item.name == "device"  || item.name == "hierarchy") {
          item.active = true;
        } else {
          item.active = false;
        }
      }
      return;
    }
    // general case for 3 button device, alert, contact
    for (let item of this.menuList) {
      if (item.name == menu.name) {
        item.active = true;
      } else {
        item.active = false;
      }
    }
    localStorage.setItem("menu",JSON.stringify(this.menuList));
  }

  hide(){
    if(this.active == true){
      this.active = false ;
    }else{
      this.active = true ;
    }
  }
  textChanged(event) {        
    this.messageEvent.emit(event);          //<<<###added 
  }
}
