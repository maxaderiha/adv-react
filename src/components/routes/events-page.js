import React, {Component} from 'react';
import EventsList from '../events/events-list';

class EventsPage extends Component {
    render() {
        return (
            <div>
                <h1>Events page</h1>
                <EventsList/>
            </div>
        );
    }
}

export default EventsPage;
