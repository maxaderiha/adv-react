import React from 'react';


function ErrorField(props) {
    const {input, type, meta: {error, active}} = props;
    const errorText = (input.value.length || active) && error && <div style={{color: 'red'}}>{error}</div>;
    return (
        <div>
            <input {...input} type={type}/>
            {errorText}
        </div>
    );
}

export default ErrorField;
