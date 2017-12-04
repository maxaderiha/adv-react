import React, {Component} from 'react';
import SignInForm from '../auth/sign-in-form';
import SignUpForm from '../auth/sign-up-form';
import {Route, NavLink} from 'react-router-dom';


class AuthPage extends Component {
    render() {
        return (
            <div>
                <h1>Auth page</h1>
                <NavLink to='/auth/signin' activeStyle={{color: 'red'}}>Sign In</NavLink>
                <NavLink to='/auth/signup' activeStyle={{color: 'red'}}>Sign Up</NavLink>
                <Route path='/auth/signin' render={() => <SignInForm onSubmit={this.handleSignInSubmit}/>}/>
                <Route path='/auth/signup' render={() => <SignUpForm onSubmit={this.handleSignUpSubmit}/>}/>
            </div>
        );
    }

    handleSignInSubmit = (values) => {
        console.log('---', values);
    };

    handleSignUpSubmit = (values) => {
        console.log('---', values)
    }
}

export default AuthPage;
