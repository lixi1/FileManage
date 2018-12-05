import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CreateFile from '../createFile/index';
import BreadCrumb from '../breadCrumb/index';
import { withRouter } from 'react-router'

@withRouter
class EditFile extends Component {
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
        const { location} = this.props;
        return (
            <div>
                <BreadCrumb pathname={location.pathname} title={location.state.detailContent.title}/>
                <CreateFile detailContent={location.state.detailContent} router={this.props.router}/>
            </div>
        );
    }
}

EditFile.propTypes = {

};

export default EditFile;