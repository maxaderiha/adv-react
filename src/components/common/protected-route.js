import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {moduleName} from '../../ducks/auth';
import Unauthorized from './unauthorized';


class ProtectedRoute extends Component {
    render() {
        const {component, ...rest} = this.props;
        return <Route {...rest} render={this.renderProtected}/>
    }

    renderProtected = (routeProps) => {
        const {component: ProtectedComponent, authorized} = this.props;
        return authorized
            ? <ProtectedComponent {...routeProps}/>
            : <Unauthorized/>;
    }
}


export default connect(state => ({
    authorized: !!state[moduleName].user,
}))(ProtectedRoute);
