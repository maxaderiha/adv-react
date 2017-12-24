import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Column} from 'react-virtualized';
import {loadAll, peopleListSelector, moduleName} from '../../../ducks/people';
import Loader from '../../common/laoder/loader';
import 'react-virtualized/styles.css';

class PeopleTable extends Component {
    componentDidMount() {
        this.props.loadAll();
    }

    render() {
        const {people, loading} = this.props;
        if (loading) return <Loader/>;

        return (
            <div>
                <h2>People table</h2>
                <Table
                    width={700}
                    height={300}
                    headerHeight={50}
                    rowCount={people.length}
                    rowHeight={40}
                    rowGetter={this.rowGetter}
                >
                    <Column
                        dataKey='firstName'
                        label='First name'
                        width={200}/>
                    <Column
                        dataKey='lastName'
                        label='Last name'
                        width={200}/>
                    <Column
                        dataKey='email'
                        label='Email'
                        width={300}/>
                </Table>
            </div>
        );
    }

    rowGetter = ({index}) => this.props.people[index];
}


export default connect(state => ({
    people: peopleListSelector(state),
    loading: state[moduleName].loading,
}), {loadAll})(PeopleTable);
