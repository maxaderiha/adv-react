import React, {Component} from 'react';
import {connect} from 'react-redux';
import {moduleName, loadAll} from '../../ducks/events';

class EventsList extends Component {

    componentDidMount() {
        this.props.loadAll();
    }

    render() {
        console.log(this.props.events);
        return (
            <div>

            </div>
        );
    }
}

export default connect(state => ({
    events: state[moduleName].entities,
}), {loadAll})(EventsList);
