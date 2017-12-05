import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import AdminPage from './routes/admin-page';
import AuthPage from './routes/auth-page';
import PeopleAdditionPage from './routes/people-addition-page';
import ProtectedRoute from './common/protected-route';
import {moduleName, signOut} from '../ducks/auth'
import {connect} from 'react-redux';


class Root extends Component {
    render() {
        const {signedIn, signOut} = this.props;

        const btn = signedIn
            ? <button onClick={signOut}>Sign Out</button>
            : <Link to='/auth/signin'>Sign In</Link>;

        return (
            <div>
                {btn}
                <ProtectedRoute path='/admin' component={AdminPage}/>
                <Route path='/auth' component={AuthPage}/>
                <Route path='/people' component={PeopleAdditionPage}/>
            </div>
        );
    }
}

export default connect(state => ({
    signedIn: !!state[moduleName].user,
}), {signOut}, null, {pure: false})(Root);
