import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import AdminPage from './routes/admin-page';
import AuthPage from './routes/auth-page';
import PeopleAdditionPage from './routes/people-addition-page';
import ProtectedRoute from './common/protected-route';
import EventsPage from './routes/events-page';
import {moduleName, signOut} from '../ducks/auth'
import {connect} from 'react-redux';
import CustomDragLayer from './custom-drag-layer';

class Root extends Component {
    render() {
        const {user, signOut} = this.props;
        const btn = user
            ?
            <div>
                <button onClick={signOut}>Sign Out</button>
                <p>{user.email}</p>
            </div>
            : <Link to='/auth/signin'>Sign In</Link>;
        return (
            <div>
                {btn}
                <ul>
                    <li><Link to='/admin'>admin</Link></li>
                    <li><Link to='/people'>people</Link></li>
                    <li><Link to='/events'>events</Link></li>
                </ul>
                <ProtectedRoute path='/admin' component={AdminPage}/>
                <Route path='/auth' component={AuthPage}/>
                <ProtectedRoute path='/people' component={PeopleAdditionPage}/>
                <ProtectedRoute path='/events' component={EventsPage}/>
                <CustomDragLayer/>
            </div>
        );
    }
}

export default connect(state => ({
    user: state[moduleName].user,
}), {signOut}, null, {pure: false})(Root);
