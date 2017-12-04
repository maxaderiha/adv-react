import React from 'react';
import {Link} from 'react-router-dom';


function Unauthorized() {
    return (
        <div>
            <h1>Unauthorized, please <Link to='/auth/signin'>Sign In</Link></h1>
        </div>
    );
}

export default Unauthorized;
