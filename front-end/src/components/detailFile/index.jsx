import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BreadCrumb from '../breadCrumb/index'
import { Layout, Button, Modal } from 'antd';
import { withRouter } from 'react-router'
import { observer, inject } from 'mobx-react';
import {toJS} from "mobx"
import './index.less'
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/table.css'
import 'braft-extensions/dist/code-highlighter.css'

const { Header, Content } = Layout;

@withRouter
@inject("detailStore", "sideMenuStore")
@observer
class DetailFile extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {
        this.props.detailStore.getFileDetail(this.props.params.fileId)
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.params.fileId !== this.props.params.fileId){
            nextProps.detailStore.getFileDetail(nextProps.params.fileId)
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return true
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {
        this.props.detailStore.reset();
    }

    render() {
        const { 
            location, 
            params,
            detailStore,
            sideMenuStore,
            router
         } = this.props;
        const {
            detailContent
        } = detailStore;
        return (
            <Layout className="detail">
                <BreadCrumb pathname={location.pathname} title={detailContent.title}/>
                <Header>
                    <h2>{detailContent.title}</h2>
                    <div className="btnGroup">
                        <Button type="primary" onClick={() => {
                            router.push(`/detail/${params.fileId}/edit`)
                        }}>编辑</Button>
                        <Button onClick={() => {
                            Modal.confirm({
                                title: `是否确定要删除${detailContent.title}?`,
                                className: "delModal",
                                okText: "确定",
                                cancelText: "取消",
                                onOk() {
                                    sideMenuStore.deleteFile({id: params.fileId})
                                    router.push('/')
                                }
                            })
                        }}>删除</Button>
                    </div>
                </Header>
                <Content>
                    <div dangerouslySetInnerHTML={{__html: detailContent.content}}></div>
                </Content>
            </Layout>
        );
    }
}

DetailFile.propTypes = {

};

export default DetailFile;