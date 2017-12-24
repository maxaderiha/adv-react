import React, {Component} from 'react';

class PersonCard extends Component {

    render() {
        const {person, style} = this.props;

        return (
            <div style={{...style}}>
                <span>{`${person.firstName} ${person.lastName}`}</span>
                <p>{person.email}</p>
            </div>
        );
    }
}


export default PersonCard;
