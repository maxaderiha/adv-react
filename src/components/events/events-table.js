import React, {Component} from 'react';
import {connect} from 'react-redux';
import {moduleName, loadLazy, selectEvent, eventsListSelector} from '../../ducks/events';
import {Table, Column, InfiniteLoader} from 'react-virtualized';
import 'react-virtualized/styles.css';

class EventsTable extends Component {

    componentDidMount() {
        this.props.loadLazy();
    }

    render() {
        const {loaded, events} = this.props;

        return (
            <div>
                <h2>Events table</h2>
                <InfiniteLoader
                    isRowLoaded={this.isRowLoaded}
                    rowCount={loaded ? events.length : events.length + 1}
                    loadMoreRows={this.loadMoreRows}
                >
                    {({onRowsRendered, registerChild}) =>
                        <Table
                            ref={registerChild}
                            rowCount={events.length}
                            rowGetter={this.rowGetter}
                            overscanRowCount={10}
                            width={700}
                            height={300}
                            rowHeight={40}
                            headerHeight={50}
                            onRowClick={this.handleRowClick}
                            onRowsRendered={onRowsRendered}
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
                    }
                </InfiniteLoader>
            </div>
        );
    }

    isRowLoaded = ({index}) => index < this.props.events.length;

    loadMoreRows = () => {
        this.props.loadLazy();
    };

    rowGetter = ({index}) => (
        this.props.events[index]
    );

    handleRowClick = ({rowData}) => {
        this.props.selectEvent(rowData.uid);
    };
}

export default connect(state => ({
    events: eventsListSelector(state),
    loading: state[moduleName].loading,
}), {loadLazy, selectEvent})(EventsTable);
