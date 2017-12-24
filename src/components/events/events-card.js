import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addEventToPerson, peopleListSelector} from '../../ducks/people';
import {DropTarget} from 'react-dnd';

class EventCard extends Component {
    render() {
        const {connectDropTarget, hovered, canDrop, people} = this.props;
        const {title, where, when} = this.props.event;

        const dropStyle = {
            backgroundColor: canDrop ? '#def9f4' : '#b8f2e6',
            border: hovered ? '3px solid #b8f2e6' : 'none',
        };

        const peopleElement = people && <p>{people.map(person => person.email).join(', ')}</p>;

        return connectDropTarget(
            <div style={dropStyle}>
                <h3>{title}</h3>
                <p>{where}, {when}</p>
                {peopleElement}
            </div>
        );
    }
}

const spec = {
    drop(props, monitor) {
        const personUid = monitor.getItem().uid;
        const eventUid = props.event.uid;

        props.addEventToPerson(personUid, eventUid);

        return {eventUid}
    }
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    canDrop: monitor.canDrop(),
});

export default connect((state, props) => ({
    people: peopleListSelector(state).filter(person => person.events.includes(props.event.uid))
}), {addEventToPerson})(DropTarget(['person'], spec, collect)(EventCard));
