import React, {Component} from 'react';
import {DragLayer} from 'react-dnd';
import PersonCardDragPreview from './people/person-card/person-card-drag-preview';

const layerStyle = {
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 10000,
};

const previews = {
    person: PersonCardDragPreview,
};

class CustomDragLayer extends Component {
    getItem() {
        const {offset, item, itemType} = this.props;
        const SpecPreview = previews[itemType];

        if (!offset || !SpecPreview) return null;

        const {x, y} = offset;

        const style = {
            transform: `translate(${x}px, ${y}px)`,
        };


        return <div style={style}><SpecPreview {...item}/></div>
    }

    render() {
        const {isDragging} = this.props;
        if (!isDragging) return null;
        const item = this.getItem();

        if (!item) return null;

        return (
            <div style={layerStyle}>{item}</div>
        );
    }
}

const collect = (monitor) => ({
    isDragging: monitor.isDragging(),
    offset: monitor.getSourceClientOffset(),
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
});

export default DragLayer(collect)(CustomDragLayer);
