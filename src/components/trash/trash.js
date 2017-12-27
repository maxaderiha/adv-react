import React, {Component} from 'react';
import {DropTarget} from 'react-dnd';
import {connect} from 'react-redux';
import {deleteEvent} from '../../ducks/events';

class Trash extends Component {
    render() {
        const {style, connectDropTarget, canDrop, hovered} = this.props;

        const dropStyle = {
            backgroundColor: canDrop ? '#def9f4' : '#b8f2e6',
            border: hovered ? '3px solid #b8f2e6' : 'none',
        };

        return connectDropTarget(
            <div style={{
                ...style,
                ...dropStyle,
                width: 300,
                height: 300,
            }}>
                <h3>Trash</h3>
            </div>
        );
    }
}

const spec = {
    drop(props, monitor) {
        const eventUid = monitor.getItem().uid;
        props.deleteEvent(eventUid);
    }
};

const collect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    canDrop: monitor.canDrop(),
});

export default connect(null, {deleteEvent})(DropTarget(['event'], spec, collect)(Trash));
