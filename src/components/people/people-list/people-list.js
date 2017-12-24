import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List} from 'react-virtualized';
import {loadAll, peopleListSelector, moduleName} from '../../../ducks/people';
import Loader from '../../common/laoder/loader';
import PersonCard from '../person-card/person-card';

class PeopleList extends Component {
    componentDidMount() {
        this.props.loadAll();
    }

    render() {
        const {people, loading} = this.props;
        if (loading) return <Loader/>;

        return (
            <List
                width={700}
                height={300}
                rowCount={people.length}
                rowHeight={100}
                rowRenderer={this.rowRenderer}
            />
        );
    }

    rowRenderer = ({key, index, style}) => {
        const person = this.props.people[index];

        return <PersonCard key={key} style={style} person={person}/>;
    }
}


export default connect(state => ({
    people: peopleListSelector(state),
    loading: state[moduleName].loading,
}), {loadAll})(PeopleList);
