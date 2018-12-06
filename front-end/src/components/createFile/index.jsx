import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Input, Form, Button } from 'antd';
import {observer, inject} from 'mobx-react';
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
@inject('createStore', 'sideMenuStore')
@observer
@Form.create()
export default class CreateFile extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
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

    handleSubmit = (event) => {
        event.preventDefault();
        const {
            router,
            detailContent,
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
            router,
            detailContent
        } = this.props;
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

        const { 
            detailContent 
        } = this.props;

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

        return (
            <div className="createFile">
                <Form onSubmit={this.handleSubmit}>
                    <FormItem label="文章标题" {...formItemLayout}>
                        {
                            getFieldDecorator('title', {
                                rules: [{
                                    required: true,
                                    message: "请输入标题！"
                                }],
                                initialValue: detailContent ? detailContent.title : ""
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
                                 initialValue:  BraftEditor.createEditorState(detailContent ? detailContent.content : null)
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
