import React from 'react'
import { Route, Redirect, IndexRoute,IndexRedirect } from 'react-router'
import MainLayout from './components/mainLayout/index';
import CreateFile from './components/createFile/index';
import DetailFile from './components/detailFile/index';
import EditFile from './components/editFile/index';

const Routes = (
    <Route>
        <Route path="/" component={MainLayout}>
            <Route path="/create" component={CreateFile} />
            <Route path="/detail/:fileId" component={DetailFile}/>
            <Route path="/detail/:fileId/edit" component={CreateFile}/>
        </Route>

    </Route>
)

export default Routes;