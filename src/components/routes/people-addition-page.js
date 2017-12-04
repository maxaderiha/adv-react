import React, {Component} from 'react';
import PeopleForm from '../people-form/index';


class PeopleAdditionPage extends Component {
    render() {
        return (
            <div>
                <h1>People addition page</h1>
                <PeopleForm onSubmit={this.handlePeopleForm}/>
            </div>
        );
    }

    handlePeopleForm = (values) => {
        console.log('---', values);
    }
}

export default PeopleAdditionPage;
