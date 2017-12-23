import React, {Component} from 'react';
import {connect} from 'react-redux';
import {moduleName, loadAll, eventsListSelector} from '../../ducks/events';
import Loader from '../common/laoder/loader';

class EventsList extends Component {

    componentDidMount() {
        this.props.loadAll();
    }

    render() {
        if (this.props.loading) return <Loader/>;

        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Where</th>
                        <th>Month</th>
                    </tr>
                    {this.getRows()}
                    </tbody>
                </table>
            </div>
        );
    }

    getRows = () => (
        this.props.events.map(this.getRow)
    );

    getRow = (event) => (
        <tr key={event.uid}>
            <td>{event.title}</td>
            <td>{event.where}</td>
            <td>{event.month}</td>
        </tr>
    );
}

export default connect(state => ({
    events: eventsListSelector(state),
    loading: state[moduleName].loading,
}), {loadAll})(EventsList);
