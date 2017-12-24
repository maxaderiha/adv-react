import React, {Component} from 'react';
import {connect} from 'react-redux';
import {selctedEventsSelector} from '../../ducks/events';
import EventCard from './events-card';

class SelectedEvents extends Component {
    render() {
        return (
            <div style={{borderBottom: '1px solid black', borderTop: '1px solid black'}}>
                <h2>Selected events</h2>
                {this.props.events.map(event => <EventCard key={event.uid} event={event}/>)}
            </div>
        );
    }
}

export default connect(state => ({events: selctedEventsSelector(state)}))(SelectedEvents);
