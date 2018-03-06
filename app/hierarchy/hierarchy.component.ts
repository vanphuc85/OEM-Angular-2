import { Component, OnInit, ViewChild } from '@angular/core';
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
import jquery from "jquery";
import { Node } from 'app/node';
import { TreeModel, TreeNode, ITreeOptions, ITreeState } from 'angular-tree-component';
import { first } from 'rxjs/operators/first';
import { ITreeModel } from 'angular-tree-component/dist/defs/api';
import { Children } from 'app/children';

declare var $: any;


@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.css']
})
export class HierarchyComponent extends BasePage implements OnInit {

  public nodes: Array<Node> = new Array<Node>();

  public nodeCollapse: Array<string>;

  private _state: ITreeState;

  private key: string;


  @ViewChild('tree') tree;

  options: ITreeOptions;

  constructor(
    private oemService: OemService,
    private router: Router,
    private route: ActivatedRoute,
    private _dataService: DataService,
    private hierarchyService: HierarchyService,
    private headerService: HeaderserviceService,
  ) {
    super(_dataService, router);
    this.validateSession();
    this.headerService.name = "Hierarchy";
  }

  ngOnInit() {
    this.key = localStorage.getItem("key");
    if (localStorage.getItem(this.key) == undefined) {
      this.getOneLevelHierarChy(0).subscribe();
    } else {
      this.nodes = JSON.parse(localStorage.getItem(this.key));
    }
    if (localStorage.getItem("treeState") != undefined) {
      this._state = localStorage.getItem("treeState") && JSON.parse(localStorage.getItem("treeState"));
    }

   


  }

  getOneLevelHierarChy(id): Observable<Node> {
    this.nodeCollapse = Array<string>();
    return this.hierarchyService.getOneNodeData(id).map(
      data => {
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
          let map = new Map<string,string>();
          node.pushNoDuplicate(node.name);
          this.nodes.push(node);

          return node;
        } else {
          if (nodeTreeDatas != undefined)
            return this.buidhierarchy(this.nodes[0], nodeTreeDatas, nodeTreeDatas.nodes);

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
        children = Object.assign(new Node(), children);
        children.concatNoDuplicate(node.path);
        children.pushNoDuplicate(children.name);
        match = true;
      }

      if (match) {
        return children;
      }
      
      this.buidhierarchy(children, root, leafs);
    }
  }

  goToDetail(_nodeName, _nodeId, _title) {
    localStorage.setItem("nodeId", _nodeId);
    localStorage.setItem("nodeName", _nodeName);
    localStorage.setItem("title", _title);

    this.router.navigate(['./dashboard-detail', _nodeName, _nodeId, _title]);
  }

  filterFn(value, treeModel: TreeModel) {
    treeModel.filterNodes((node) => this.fuzzysearch(value, node.data.name));
  }
  fuzzysearch(needle, haystack) {
    const haystackLC = haystack.toLowerCase();
    const needleLC = needle.toLowerCase();

    const hlen = haystack.length;
    const nlen = needleLC.length;

    if (nlen > hlen) {
      return false;
    }
    if (nlen === hlen) {
      return needleLC === haystackLC;
    }
    outer: for (let i = 0, j = 0; i < nlen; i++) {
      const nch = needleLC.charCodeAt(i);

      while (j < hlen) {
        if (haystackLC.charCodeAt(j++) === nch) {
          continue outer;
        }
      }
      return false;
    }
    return true;
  }
  focus(event) {
    let treeNode: TreeNode = event.node;

    let node: Node = treeNode.data;
    // go to dashboard detail
    if (treeNode.hasChildren == false) {
      if (node.clickAble == false) {
        return;
      }

      this.getOneLevelHierarChy(node.nodeId).subscribe(
        data => {
          debugger
          this._state = this.tree.treeModel.getState();
          let nodeName = node.id;
          let title = node.name;
          let nodeId = node.nodeId;

          let result: Array<Node> = new Array<Node>();

          localStorage.setItem("treeState", JSON.stringify(this._state));
          localStorage.setItem("nodeId", String(nodeId));
          localStorage.setItem("nodeName", nodeName);
          localStorage.setItem("title", title);
          localStorage.setItem("path",JSON.stringify(node.path));
          this.router.navigate(['./dashboard-detail', nodeName, nodeId, title]);

        }
      );
    }
    return;
  }

  get state() {
    return this._state;
  }
  set state(_state) {
    this._state = _state;
  }

  toggleExpanded(event) {
    let treeNode: TreeNode = event.node;
    let node: Node = treeNode.data;

    if (treeNode.isCollapsed == false) {
      this.getOneLevelHierarChy(node.nodeId).subscribe(
        data => {
          localStorage.setItem(this.key, JSON.stringify(this.nodes));
          let treeNode: TreeNode = this.tree
          this.tree.treeModel.update();
          this.onInitialized(this.tree);
          this._state = this.tree.treeModel.getState();
          localStorage.setItem("treeState", JSON.stringify(this._state));
        }
      );
      return;
    } else {
      this._state = this.tree.treeModel.getState();
    }
  }


  onInitialized(tree) {
    if (this.tree == undefined) {
      this.tree = tree;
    }
    if (this.nodeCollapse == undefined) {
      return;
    }

    for (let item of this.nodeCollapse) {
      const collapseNode = this.tree.treeModel.getNodeById(item);
      collapseNode.collapseAll();
    }

  }
  activate(event) {
    let treeNode: TreeNode = event.node;
    treeNode.expand();
  }
  deactivate(event) {

  }

}
