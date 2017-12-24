import React, {Component} from 'react';
import {DragSource} from 'react-dnd';
import {getEmptyImage} from 'react-dnd-html5-backend';

class PersonCard extends Component {

    componentDidMount() {
        this.props.connectPreview(getEmptyImage());
    }

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
    connectPreview: connect.dragPreview(),
});

export default DragSource('person', spec, collect)(PersonCard);
