import React from 'react';
import batman from "../../images/batman.png"

const ErrorPage = () => {

    const styleForContainer = {
        minHeight: '600px'
    }

    const centerH2 = {
        width: 'fit-content',
        textAlign: 'center',
        margin: 'auto',
    }

    const styleForImg = {
        maxWidth: '900px',
        margin: 'auto'
    }

    return (
        <div className='quiz-bg' style={styleForContainer}>
            <div className="container">
                <h2 style={centerH2}>Oup, cette page n'existe pas!</h2>
                <img src={batman} alt="error page" style={styleForImg} />
            </div>
        </div>
    );
};

export default ErrorPage;