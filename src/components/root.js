import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import AdminPage from '../components/routes/admin-page';
import AuthPage from '../components/routes/auth-page';


class Root extends Component {
    render() {
        return (
            <div>
                <Route path='/admin' component={AdminPage}/>
                <Route path='/auth' component={AuthPage}/>
            </div>
        );
    }
}

export default Root;
