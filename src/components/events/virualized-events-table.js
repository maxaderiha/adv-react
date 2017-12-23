import React, {Component} from 'react';
import {connect} from 'react-redux';
import {moduleName, loadLazy, selectEvent, eventsListSelector} from '../../ducks/events';
import Loader from '../common/laoder/loader';
import {Table, Column, InfiniteLoader} from 'react-virtualized';
import 'react-virtualized/styles.css';

class VirtualizedEventsTable extends Component {

    componentDidMount() {
        this.props.loadLazy();
    }

    render() {
        const {loaded, events} = this.props;

        // if (loading) return <Loader/>;

        return (
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
                        overscanRowCount={5}
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
        );
    }

    isRowLoaded = ({index}) => index < this.props.events.length;

    loadMoreRows = () => {
        this.props.loadLazy();
    };

    rowGetter = ({index}) => (
        this.props.events[index]
    );

    handleRowClick = ({uid}) => {
        this.props.selectEvent(uid);
    };
}

export default connect(state => ({
    events: eventsListSelector(state),
    loading: state[moduleName].loading,
}), {loadLazy, selectEvent})(VirtualizedEventsTable);
