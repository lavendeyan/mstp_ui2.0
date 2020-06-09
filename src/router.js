import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import StaffPage from './routes/StaffPage';
import DepartmentPage from './routes/DepartmentPage';
import GoodsPage from './routes/GoodsPage';
import ApplyPage from './routes/ApplyPage';
import CleanPage from './routes/CleanPage';
import PackPage from './routes/PackPage';
// import MainPage from './routes/MainPage';


function RouterConfig({ history }) {
    return (
        <Router history={history}>
            <Switch>
                <Route path="/" exact component={IndexPage} />
                <IndexPage>
                    <Route path="/staff" exact component={StaffPage} />
                    <Route path="/department" exact component={DepartmentPage} />
                    <Route path="/goods" exact component={GoodsPage} />
                    <Route path="/apply" exact component={ApplyPage} />
                    <Route path="/clean" exact component={CleanPage} />
                    <Route path="/pack" exact component={PackPage} />

                </IndexPage>
            </Switch>
        </Router>
    );
}

export default RouterConfig;
