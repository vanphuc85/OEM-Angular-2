import { Component, OnInit } from '@angular/core';
import { OemService } from '../service/oemservice.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from './../data.service';
import { Observable } from 'rxjs/Rx';
import { NodeTreeDatas } from './../vo/node-tree-datas';
import { BasePage } from './../base-page';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TimeoutService } from './../timeout.service';
import { HierarchyService } from './../hierarchy.service';
import { HeaderserviceService } from '../headerservice.service';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css'],
})
export class DeviceComponent extends BasePage implements OnInit {

  private _originalAllLeafNode: Array<NodeTreeDatas> = Array<NodeTreeDatas>();

  public _allLeafNode: Array<NodeTreeDatas> = Array<NodeTreeDatas>();

  private _textSearch: string;

  set textSearch(_textSearch: string) {
    this._textSearch = _textSearch;
  }
  get textSearch() {
    return this._textSearch;
  }

  get allLeafNode() {
    return this._allLeafNode;
  }
  set allLeafNode(_allLeafNode) {
    this._allLeafNode = _allLeafNode;
  }

  constructor(
    private oemService: OemService,
    private router: Router,
    private route: ActivatedRoute,
    private _dataService: DataService,
    private hierarchyService: HierarchyService,
    private headerService : HeaderserviceService  ) {
    super(_dataService, router);
    this.validateSession();
    this.headerService.name = "Devices";
  }

  ngOnInit() {
    this.hierarchyService.fullNode = new NodeTreeDatas();
    this.hierarchyService.allLeafNode = new Array<NodeTreeDatas>();
    this.hierarchyService.allData = new BehaviorSubject<NodeTreeDatas>(null);
    this.hierarchyService.getFullNodesData(0);
    this.hierarchyService.allData.asObservable().filter(item => item != null).subscribe(
      response => {
        this.hierarchyService.fullNode = response;
        this.hierarchyService.getDeviceLeaf(response);
        this._allLeafNode = this.hierarchyService.allLeafNode;
        this._originalAllLeafNode = this.hierarchyService.allLeafNode;
      }
    );
  }

  goToDetail(_nodeName, _nodeId, _title) {
    localStorage.setItem("nodeId", _nodeId);
    localStorage.setItem("nodeName", _nodeName);
    localStorage.setItem("title", _title);
    debugger
    this.router.navigate(['./dashboard-detail', _nodeName, _nodeId, _title]);
  }
  searchDevice() {
    if (this.textSearch == "") {
      this._allLeafNode = [];
      this._allLeafNode = this._originalAllLeafNode;
      return;
    }

    let tempSearch = Array<NodeTreeDatas>();
    for (let item of this._allLeafNode) {
      if (item.title.toLocaleLowerCase().indexOf(this.textSearch.toLocaleLowerCase()) != -1) {
        tempSearch.push(item);
      }
    }
    if (tempSearch.length > 0) {
      this._allLeafNode = tempSearch;
    }

  }

}
