import React, {Component} from 'react';
import VirtualizedEventsTable from '../events/virualized-events-table';

class EventsPage extends Component {
    render() {
        return (
            <div>
                <h1>Events page</h1>
                <VirtualizedEventsTable/>
            </div>
        );
    }
}

export default EventsPage;
