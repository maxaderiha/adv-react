import React, {Component} from 'react';
import PeopleList from '../people/people-list/people-list';
import EventsTable from '../events/events-table';
import SelectedEvents from '../events/selected-events';

class AdminPage extends Component {
    render() {
        return (
            <div>
                <h1>Admin page</h1>
                <PeopleList/>
                <SelectedEvents/>
                <EventsTable/>
            </div>
        );
    }
}

export default AdminPage;
