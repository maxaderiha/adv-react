import React, {Component} from 'react';
import PeopleForm from '../people/people-form/people-form';
import {connect} from 'react-redux';
import {addPerson} from '../../ducks/people';
import PeopleTable from '../people/people-table/people-table';


class PeopleAdditionPage extends Component {
    render() {
        return (
            <div>
                <h1>People addition page</h1>
                <PeopleForm onSubmit={this.handlePeopleForm}/>
                <PeopleTable/>
            </div>
        );
    }

    handlePeopleForm = (values) => {
        this.props.addPerson({...values});
    }
}

export default connect(null, {addPerson})(PeopleAdditionPage);
