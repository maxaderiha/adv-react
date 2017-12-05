import React, {Component} from 'react';
import PeopleForm from '../people-form/people-form';
import {connect} from 'react-redux';
import {addPerson} from '../../ducks/people';


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
        this.props.addPerson({...values});
    }
}

export default connect(null, {addPerson})(PeopleAdditionPage);
