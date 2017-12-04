import React, {Component} from 'react';
import SignInForm from '../auth/sign-in-form';


class AuthPage extends Component {
    render() {
        return (
            <div>
                <h1>Auth page</h1>
                <SignInForm/>
            </div>
        );
    }
}

export default AuthPage;
