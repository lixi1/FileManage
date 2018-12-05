import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd'
import SideMenu from '../sideMenu/index'
import './index.less'

const { Header, Content } = Layout;

class MainLayout extends Component {
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
        return true
    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }


    render() {
        return (
            <Layout id="layout">
                <Header id="head">
                    <img src={require('../../image/uyunlogo.png')}/>
                </Header>
                <Layout>
                    <SideMenu/>
                    
                    <Content id="layout-content">
                        {
                            this.props.children
                        }
                    </Content>
                </Layout>
                
            </Layout>
        );
    }
}

MainLayout.propTypes = {

};

export default MainLayout;