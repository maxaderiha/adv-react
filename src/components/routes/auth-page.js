import React, {Component} from 'react';
import SignInForm from '../auth/sign-in-form';
import SignUpForm from '../auth/sign-up-form';
import {Route, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import {signUp, moduleName} from '../../ducks/auth';
import Loader from '../common/laoder/loader';


class AuthPage extends Component {
    render() {
        const {loading} = this.props;
        return (
            <div>
                <h1>Auth page</h1>
                <NavLink to='/auth/signin' activeStyle={{color: 'red'}}>Sign In</NavLink>
                <NavLink to='/auth/signup' activeStyle={{color: 'red'}}>Sign Up</NavLink>
                <Route path='/auth/signin' render={() => <SignInForm onSubmit={this.handleSignInSubmit}/>}/>
                <Route path='/auth/signup' render={() => <SignUpForm onSubmit={this.handleSignUpSubmit}/>}/>
                {loading && <Loader/>}
            </div>
        );
    }

    handleSignInSubmit = (values) => {
        console.log('---', values);
    };

    handleSignUpSubmit = ({email, password}) => {
        this.props.signUp(email, password);
    }
}

export default connect((state) => {
    return {
        loading: state[moduleName].loading,
    }
}, {signUp})(AuthPage);
