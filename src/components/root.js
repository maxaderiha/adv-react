import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import AdminPage from './routes/admin-page';
import AuthPage from './routes/auth-page';
import PeopleAdditionPage from './routes/people-addition-page';
import ProtectedRoute from './common/protected-route';


class Root extends Component {
    render() {
        return (
            <div>
                <ProtectedRoute path='/admin' component={AdminPage}/>
                <Route path='/auth' component={AuthPage}/>
                <Route path='/people' component={PeopleAdditionPage}/>
            </div>
        );
    }
}

export default Root;
