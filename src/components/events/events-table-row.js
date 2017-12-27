import React, {Component} from 'react';
import {defaultTableRowRenderer} from 'react-virtualized';
import {DragSource} from 'react-dnd';

class EventsTableRow extends Component {
    render() {
        const {connectDragSource, ...rest} = this.props;
        return connectDragSource(defaultTableRowRenderer(rest));
    }
}

const spec = {
    beginDrag(props) {
        return {
            uid: props.rowData.uid,
        }
    }
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
});


export default DragSource('event', spec, collect)(EventsTableRow);
