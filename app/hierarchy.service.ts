import { Injectable } from '@angular/core';
import { NodeTreeDatas } from './vo/node-tree-datas';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Rx';
import { BasePage } from './base-page';
import { OemService } from './service/oemservice.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataService } from './data.service';
import { Node } from 'app/node';


@Injectable()
export class HierarchyService extends BasePage  {
  private _fullNode: NodeTreeDatas;
  private _allLeafNode: Array<NodeTreeDatas>;
  private _allData: BehaviorSubject<any>;
  public nodeCollapse: Array<string>;
  public nodes: Array<Node> = new Array<Node>();
  public mode : string = "Device" ;



  set fullNode(_fullNode) {
    this._fullNode = _fullNode;
  }
  get fullNode() {
    return this._fullNode;
  }

  set allLeafNode(_allLeafNode) {
    this._allLeafNode = _allLeafNode;
  }

  get allLeafNode() {
    return this._allLeafNode;
  }

  set allData(_allData) {
    this._allData = _allData;
  }

  get allData() {
    return this._allData;
  }


  constructor(
    private oemService: OemService,
    private router: Router,
    private route: ActivatedRoute,
    private _dataService: DataService,

  ) {
    super(_dataService, router);
    this.validateSession();
  }

  getFullNodesData(id) {
    return this.getOneNodeData(id)
      .expand(response => {
        if (response.nodeTreeDatas) {
          let nodeTreeDatas: NodeTreeDatas = response.nodeTreeDatas;
          for (let i = 0; i < nodeTreeDatas.nodes.length; i++) {
            if (nodeTreeDatas.nodes[i].hasChild != 0) {
              this.getFullNodesData(nodeTreeDatas.nodes[i].hasChild);
            } else if (i < nodeTreeDatas.nodes.length) {
              continue;
            } else {
              return Observable.empty();
            }
          }
        }
      }).subscribe(data => {
        data as NodeTreeDatas;
        this._allData.next(data);
      });
  }

  getOneNodeData(id: number): Observable<any> {
    let result = this.oemService.getNodesData(id);
    return result;
  }

  getDeviceLeaf(fullNode) {

    this._allLeafNode = new Array<NodeTreeDatas>();
    if (fullNode.length == 0) {
      return;
    }

    let nodeTreeDatas: any = fullNode.nodeTreeDatas;
    let nodes: NodeTreeDatas[];
    if (nodeTreeDatas instanceof Array) {
      nodes = nodeTreeDatas[0].nodes;
    } else {
      nodes = nodeTreeDatas.nodes;
    }

    for (let node of nodes) {
      let temp = Object.assign(new NodeTreeDatas(), node);
      this._allLeafNode.push(temp);
    }
  }

  getOneLevelHierarChy(id): Observable<Array<Node>> {
    this.nodeCollapse = Array<string>();
    return this.getOneNodeData(id).map(
      data => {
        console.log(this.nodes);
        let nodeTreeDatas: any;
        if (data.nodeTreeDatas instanceof Array) {
          nodeTreeDatas = data.nodeTreeDatas[0] as NodeTreeDatas;
        } else {
          nodeTreeDatas = data.nodeTreeDatas as NodeTreeDatas;
        }
        if (this.nodes.length == 0 || this.nodes == undefined) {
          this.nodes = Array<Node>();
          let node = new Node();
          node.id = nodeTreeDatas.name;
          node.name = nodeTreeDatas.title;
          let childrens: Array<Node> = new Array<Node>();
          for (let item of nodeTreeDatas.nodes) {
            let node_children: Node = new Node();
            node_children.id = item.name;
            node_children.name = item.title;
            node_children.nodeId = item.id;
            if (item.hasChild == 0) {
              node_children.hasChildren = false;
            }
            else if (item.hasChild > 0) {
              node_children.hasChildren = true;
              this.mode = "Hierarchy";
              this.nodeCollapse.push(node_children.id);
            }
            if (item.measuresList.length == 0) {
              node_children.clickAble = false;
            } else {
              node_children.clickAble = true;
            }

            node_children.children = new Array<Node>();
            childrens.push(node_children);

          }
          node.children = childrens;
          this.nodes.push(node);
          return this.nodes;
        } else {
          if (nodeTreeDatas != undefined)
            this.buidhierarchy(this.nodes[0], nodeTreeDatas, nodeTreeDatas.nodes);
        }
      }
    );

  }
  buidhierarchy(node: Node, root: NodeTreeDatas, leafs: Array<NodeTreeDatas>) {
    this.nodeCollapse = Array<string>();
    let match: boolean = false;
    for (let children of node.children) {
      if (children.id == root.name) {
        let childrens: Array<Node> = new Array<Node>();
        for (let leaf of leafs) {
          let node: Node = new Node();
          node.id = leaf.name;
          node.name = leaf.title;
          node.nodeId = leaf.id;
          if (leaf.hasChild == 0) {
            node.hasChildren = false;
          }
          else if (leaf.hasChild > 0) {
            node.hasChildren = true;
            this.nodeCollapse.push(String(node.id));
          }
          if (leaf.measuresList.length == 0) {
            node.clickAble = false;
          } else {
            node.clickAble = true;
          }
          node.children = new Array<Node>();
          childrens.push(node);
        }
        children.children = childrens;
        match = true;
      }
      if (match) {
        return;
      }
      this.buidhierarchy(children, root, leafs);
    }
  }

}
