import React, {Component} from 'react';
import {connect} from 'react-redux';
import {moduleName, loadAll, selectEvent, eventsListSelector} from '../../ducks/events';
import Loader from '../common/laoder/loader';
import {Table, Column} from 'react-virtualized';
import 'react-virtualized/styles.css';

class VirtualizedEventsTable extends Component {

    componentDidMount() {
        this.props.loadAll();
    }

    render() {
        const {loading, events} = this.props;

        if (loading) return <Loader/>;

        return (
            <Table
                rowCount={events.length}
                rowGetter={this.rowGetter}
                width={700}
                height={300}
                rowHeight={40}
                headerHeight={50}
                onRowClick={this.handleRowClick}
            >
                <Column
                    dataKey='title'
                    label='title'
                    width={300}
                />
                <Column
                    dataKey='where'
                    label='where'
                    width={250}
                />
                <Column
                    dataKey='month'
                    label='when'
                    width={150}
                />

            </Table>
        );
    }

    rowGetter = ({index}) => (
        this.props.events[index]
    );

    handleRowClick = ({uid}) => {
        this.props.selectEvent(uid);
    }
}

export default connect(state => ({
    events: eventsListSelector(state),
    loading: state[moduleName].loading,
}), {loadAll, selectEvent})(VirtualizedEventsTable);
