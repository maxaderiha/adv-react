import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import emailValidator from 'email-validator';
import ErrorField from '../common/error-field/error-field';


class PeopleForm extends Component {
    render() {
        const {handleSubmit} = this.props;

        return (
            <div>
                <h2>PeopleForm</h2>
                <form onSubmit={handleSubmit}>
                    <Field name='firstName' component={ErrorField}/>
                    <Field name='lastName' component={ErrorField}/>
                    <Field name='email' component={ErrorField}/>
                    <div>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

const validate = ({firstName, lastName, email}) => {
    const errors = {};

    if (!firstName) errors.firstName = 'firstName is required';
    else if (firstName.length < 3) errors.firstName = 'short firsName';

    if (!lastName) errors.lastName = 'lastName is required';
    else if (lastName.length < 5) errors.lastName = 'short lastName';

    if (!email) errors.email = 'email is required';
    else if (!emailValidator.validate(email)) errors.email = 'invalid email';

    return errors;
};

export default reduxForm({
    form: 'people',
    validate,
})(PeopleForm);
