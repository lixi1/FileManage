import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Input, Form, Button } from 'antd';
import {observer, inject} from 'mobx-react';
import {toJS} from 'mobx'
import BreadCrumb from '../breadCrumb';
import BraftEditor from 'braft-editor'
import Table from 'braft-extensions/dist/table'
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import './index.less';
import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/table.css'
import 'braft-extensions/dist/code-highlighter.css'

BraftEditor.use(Table({
    defaultColumns: 3, 
    defaultRows: 3,
}))

BraftEditor.use(CodeHighlighter())


const FormItem = Form.Item;

@withRouter
@inject('createStore', 'sideMenuStore', 'detailStore')
@observer
@Form.create()
export default class CreateFile extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.createStore.reset();
        console.log(2222,this.props.params.fileId)
        if(this.props.params.fileId){
            this.props.detailStore.getFileDetail(this.props.params.fileId)
        }
    }

    componentDidMount() {
        this.props.router.setRouteLeaveHook(
            this.props.route, 
            this.routerWillLeave.bind(this)
        )
    }
    routerWillLeave() {
        if(!this.props.createStore.isSave){
            return "编辑的内容还没有保存, 确认要离开？";
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.params.fileId !== this.props.params.fileId){
            nextProps.detailStore.getFileDetail(nextProps.params.fileId)
        }
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

    handleSubmit = (event) => {
        event.preventDefault();
        const {
            router,
            form,
            createStore,
            sideMenuStore
        } = this.props;
        form.validateFields((error, values) => {
            if(!error){
                this.submitContent()
            }else{
                return;
            }
        })
    }

    handleCancel = (event) => {
        event.preventDefault();
        const {
            detailContent
        } = this.props.detailStore;
        this.props.createStore.cancelFile();
        this.props.router.push(detailContent ? `/detail/${detailContent.id}` : "/");
    }

    // ctr + s时调用
    submitContent = (data) => {
        const {
            router,
            detailContent,
            form,
            createStore,
            sideMenuStore
        } = this.props;

        const callback = () => {
            sideMenuStore.loadSideMenu();
            router.push(detailContent ? `/detail/${detailContent.id}` : "/");
        }

        const submitData = {
            title: form.getFieldValue("title"),
            content: form.getFieldValue("content").toHTML(),
            id: detailContent ? detailContent.id : null
        }

        detailContent ? createStore.updateFile(submitData, callback) : createStore.saveFile(submitData, callback)

    }

    render() {
        const {
            getFieldDecorator
        } = this.props.form;

        const controls = [
            'font-size',
            'bold',
            'italic',
            'underline',
            'text-color',
            'media',
            'separator',
            'link',
            'code',
            'blockquote'
        ];
        const {
            detailContent
        } = this.props.detailStore;
        
        const formItemLayout={
            labelCol: {
                span: 2
            },
            wrapperCol: {
                span: 21,
            }
        }

        BraftEditor.use(Table({
            includeEditors: ['editor-with-table'],
            defaultColumns: 5,
            defaultRows: 3
        }))
        console.log(222, this.props.detailStore, toJS(this.props.detailStore.detailContent))
        const isEdit = Object.keys(detailContent).length > 0 
        return (
            <div className="createFile">
                <BreadCrumb pathname={this.props.location.pathname} title={isEdit ? detailContent.title : ""}/>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="文章标题" {...formItemLayout}>
                        {
                            getFieldDecorator('title', {
                                rules: [{
                                    required: true,
                                    message: "请输入标题！"
                                }],
                                initialValue: isEdit ? detailContent.title : ""
                            })(
                                <Input size="large" placeholder="请输入标题！"/>
                            )
                        }
                    </FormItem>
                    <FormItem label="文章内容" {...formItemLayout}>
                         {
                             getFieldDecorator("content", {
                                 validateTrigger: "onBlur",
                                 rules: [{
                                    required: true,
                                    validator: (_, value, callback) => {
                                        if(value.isEmpty()){
                                            callback("请输入文章内容！");
                                        }else{
                                            callback()
                                        }
                                    }
                                 }],
                                 initialValue:  BraftEditor.createEditorState(isEdit ? detailContent.content : null)
                             })(
                                <BraftEditor
                                    id="editor-with-extensions"
                                    className="content-editor"
                                    placeholder="请输入文章内容！"
                                    onSave={this.submitContent}
                                />
                             )
                         }
                    </FormItem>
                    <FormItem 
                        wrapperCol={{span: 21, offset: 2}}
                    >
                        <Button size="large" type="primary" htmlType="submit">保存</Button>
                        <Button size="large" onClick={this.handleCancel}>取消</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

CreateFile.propTypes = {

};
