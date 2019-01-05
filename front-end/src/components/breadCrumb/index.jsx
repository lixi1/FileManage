import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { withRouter, Link } from 'react-router'
import './index.less'


const breadCrumbItemMaps = {
    '/detail': "详情",
    '/create': "新增"
}

const BreadCrumb = withRouter(
    (props) => {
        const { pathname } = props;
        const pathSnippets = pathname.split("/").filter( i => i);
        const breadcrumbItems = pathSnippets.map((_, index) => {
            const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
            let itemName = () => {
                if(url.indexOf("edit") > 0 && index == pathSnippets.length -1){
                    return "编辑"
                }else{
                    return index === 0 ? breadCrumbItemMaps[url] : props.title
                }
            }
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {
                            itemName()
                        }
                    </Link>
                </Breadcrumb.Item>
            )
        })
        return (
            <Breadcrumb separator=">">
                {breadcrumbItems}
            </Breadcrumb>
        )
    }
)
export default BreadCrumb;