import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import AdminPage from '../components/routes/admin-page';
import AuthPage from '../components/routes/auth-page';
import ProtectedRoute from './common/protected-route';


class Root extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <ProtectedRoute path='/admin' component={AdminPage}/>
                    <Route path='/auth' component={AuthPage}/>
                </Switch>
            </div>
        );
    }
}

export default Root;
