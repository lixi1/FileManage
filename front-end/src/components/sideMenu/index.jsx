import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx';
import { Layout, Tree, Button, Icon } from 'antd';
const { Sider } = Layout

import './index.less'

const TreeNode = Tree.TreeNode;
@withRouter
@inject("sideMenuStore")
@observer
class SideMenu extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.sideMenuStore.loadSideMenu();
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }


    // 异步加载对应父节点的子节点
    onLoadData = (treeNode) => {
        this.props.sideMenuStore.loadSideMenu(treeNode);
    }

    // 渲染树节点
    renderTreeNodes = (data) => {
        return  data.map((item, index) => {
                    const title = (
                        <div>
                            <span onClick={event => {
                                this.props.router.push(`/detail/${item.id}`)
                            }}>{item.title}</span>
                            {/* <div className="btnGroup">
                                <span 
                                    onClick={event => {
                                        event.stopPropagation()
                                        // this.props.onAddTree(item)
                                        this.props.router.push('/create');
                                }}>
                                    <Icon type="edit"/>
                                </span>
                                <span 
                                    onClick={event => {
                                        event.stopPropagation()
                                        this.props.sideMenuStore.deleteFile({id: item.id})
                                }}>
                                    <Icon type="delete"/>
                                </span>
                            </div> */}
                        </div>
                    )
                    if(item.children) {
                        return (
                            <TreeNode title={title} key={item.id} dataRef={item} isLeaf={item.isLeaf}>
                                {this.renderTreeNodes(item.children)}
                            </TreeNode>
                        )
                    }
                    return <TreeNode title={title} key={item.id} dataRef={item} isLeaf={item.isLeaf}/>
                })
    }

    render() {
        const {
            sideList,
            loadSideMenu
        } = this.props.sideMenuStore;
        return (
            <Sider id="side">
                <h2>采集代理文件管理</h2>
                <p>页面树结构</p>
                <Button type="primary" onClick={() => {
                    this.props.router.push('/create');
                }}>新建文件</Button>
                <Tree 
                    loadData={loadSideMenu}
                >
                    {
                        this.renderTreeNodes(sideList)}
                </Tree>
            </Sider>
        );
    }
}

SideMenu.propTypes = {

};

export default SideMenu;