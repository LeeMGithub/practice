import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { UserInfo } from 'src/app/system/model/user-info';

@Component({
  selector: 'app-user-link-menu-site-factory',
  templateUrl: './user-link-menu-site-factory.component.html',
  styleUrls: ['./user-link-menu-site-factory.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UserLinkMenuSiteFactoryComponent implements OnInit {
  //所有的结点数据
  nodes: TreeNode[];

  //用户选中的结点数据
  selectedNodes: string[] = [];

  //用户已关联的菜单
  linkedNodes: TreeNode[] = [];

  //dialog的可视状态
  state: boolean;

  //用户信息
  userInfo:UserInfo = new UserInfo();

  constructor(private http: HttpClient){}

  ngOnInit(){
    this.state = false;
  }

  //取消按钮事件
  cancel(){
    this.state = false;
    this.nodes = [];
    this.linkedNodes = [];
    this.selectedNodes = [];
  }

  //保存按钮事件
  save(){
    const url = '/api/user-manager/userlinkmenusite/' + this.userInfo.userAccount;
    this.http.post(url, this.selectedNodes).subscribe(
      (res) => {
        this.cancel();
      }
    );
  }

  //选中结点事件
  nodeSelect(event){
    this.buildSelectedNode(event.node, this.selectedNodes);
  }

  //取消结点事件
  nodeUnselect(event){
    const unSelectedNode: any[] = [];
    this.buildSelectedNode(event.node, unSelectedNode);
    for(let n of unSelectedNode)
      this.selectedNodes.splice(this.selectedNodes.indexOf(n), 1);
  }

  //递归地构建选中的菜单数据
  buildSelectedNode(node: TreeNode, list: string[]){
    if(node.leaf === true){
      if(!list.includes(node.data)){
        list.push(node.data);
      }
    }
    else{
      for(let n of node.children){
        this.buildSelectedNode(n, list);
      }
    }
  }

  //初始化结点
  initNodes(){
    const url = '/api/user-manager/build-linked-menu-site-factory/' + this.userInfo.userAccount;
    this.http.get(url).subscribe(
      (res) => {
        this.nodes = <TreeNode[]>res;
        const url = '/api/user-manager/find-linked-menu-site-factory/' + this.userInfo.userAccount;
          this.http.get(url).subscribe(
          (res) => {
            const linekdMenu: string[] = <string[]>res;
            this.nodes.forEach(element => {
              this.selectLinkedNode(element, linekdMenu);
            });
            //根据数据库的已连接结点初始化
            this.linkedNodes.forEach(node => {
              if(node.leaf === true){
                if(!this.selectedNodes.includes(node.data)){
                  this.selectedNodes.push(node.data);
                }
              }
            });
          }
        );
      }
    );
  }

  //勾选已关联的结点
  selectLinkedNode(node:TreeNode, linkedMenu: string[]){
    if(linkedMenu.includes(node.data)){
      this.linkedNodes.push(node);
      if(node.children != null){
        node.children.forEach( childNode => {
          this.selectLinkedNode(childNode, linkedMenu);
        });
      }
    }
  }

}
