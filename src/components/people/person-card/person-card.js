import React, {Component} from 'react';
import {DragSource} from 'react-dnd';

class PersonCard extends Component {

    render() {
        const {person, style, connectDragSource, isDragging} = this.props;
        const dragStyle = {
            opacity: isDragging ? 0.3 : 1
        };

        return (
            <div style={{...dragStyle, ...style}}>
                {connectDragSource(<h4>{`${person.firstName} ${person.lastName}`}</h4>)}
                <p>{person.email}</p>
            </div>
        );
    }
}

const spec = {
    beginDrag(props) {
        return {
            uid: props.person.uid,
        }
    },
    endDrag(props, monitor) {
        // const personUid = props.person.uid;
        // const eventUid = monitor.getDropResult() && monitor.getDropResult().eventUid;
    }
};

const collect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
});

export default DragSource('person', spec, collect)(PersonCard);
