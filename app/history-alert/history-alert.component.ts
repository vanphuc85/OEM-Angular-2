import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { OemService } from '../service/oemservice.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HierarchyService } from '../hierarchy.service';
import { NodeTreeDatas } from '../vo/node-tree-datas';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventLogs } from 'app/event-logs';
import { SerializationHelper } from 'app/serialization-helper';
import { HeaderserviceService } from 'app/headerservice.service';
import 'rxjs/add/operator/catch';
import * as moment from 'moment';




@Component({
  selector: 'app-history-alert',
  templateUrl: './history-alert.component.html',
  styleUrls: ['./history-alert.component.css']
})
export class HistoryAlertComponent implements OnInit {

  private _allLeafNode: Array<NodeTreeDatas>;

  private _root: NodeTreeDatas;

  public evenLogs: Array<EventLogs>;

  public textSearch: string;

  public isActiveAlertBox: boolean = false;

  public message: string;

  constructor(
    private _dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private oemSevice: OemService,
    private hierarchyService: HierarchyService,
    private headerService: HeaderserviceService
  ) {
    this.headerService.name = "History Alert";
  }

  ngOnInit() {

    this.hierarchyService.fullNode = new NodeTreeDatas();
    this.hierarchyService.allLeafNode = new Array<NodeTreeDatas>();
    this.hierarchyService.allData = new BehaviorSubject<NodeTreeDatas>(null);
    this.hierarchyService.getFullNodesData(0);
    this.hierarchyService.allData.asObservable().filter(item => item != null).subscribe(
      response => {
        let _root: NodeTreeDatas = response.nodeTreeDatas;
        if (_root.isRoot == 0) {
          this._root = response.nodeTreeDatas;
          this.getAllHistory();
        }
        this.hierarchyService.getDeviceLeaf(response);
        this._allLeafNode = this.hierarchyService.allLeafNode;
      }
    );
  }

  getAllHistory() {
    this.oemSevice.getAllHistoryAlert(this._root.name)
      .subscribe(
      data => {
        this.evenLogs = data && data.data && data.data.eventLogs;
        if (this.evenLogs == undefined) {
          this.message = "Error communicating with server.";
          this.isActiveAlertBox = true;
          return;
        }
        if (this.evenLogs == null || this.evenLogs.length == 0) {
          this.message = "There's no alert history.";
          this.isActiveAlertBox = true;
          return;
        }
        let temp: Array<EventLogs> = Array<EventLogs>();
        for (let item of this.evenLogs) {
          let tempOb = SerializationHelper.toInstance(new EventLogs(), JSON.stringify(item));
          temp.push(tempOb);
        }
        this.evenLogs = temp;
      },
      err => {
        debugger
        this.message = "Error communicating with server.";
        this.isActiveAlertBox = true;
      }

      );
  }
  search() {
    this.oemSevice.searchHistoryAlert(this._root.name, this.textSearch)
      .subscribe(
      data => {
        this.evenLogs = data.data.eventLogs;
        let temp: Array<EventLogs> = Array<EventLogs>();
        for (let item of this.evenLogs) {
          let tempOb = SerializationHelper.toInstance(new EventLogs(), JSON.stringify(item));
          temp.push(tempOb);
        }
        this.evenLogs = temp;
      }
      );

  }
  alertBox(ok: boolean) {
    this.isActiveAlertBox = false;
  }

}
