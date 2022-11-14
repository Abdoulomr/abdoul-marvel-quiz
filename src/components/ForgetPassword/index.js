import React, {  useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../Firebase/firebaseConfig';

const ForgetPassword = () => {

    

    const [email, setEmail] = useState('');

    const [success, setSucces] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        sendPasswordResetEmail(auth, email)
        .then(() => {
            setError(null);
            setSucces(`Consultez votre email ${email} pour changer le mot de passe`);
            setEmail("");

            setTimeout(() => {
                navigate('/login')
             }, 5000);

        })
        .catch(error => {
             setError(error);
             setEmail("");

             
        })
    }


    

    const disabled = email === '';
    return (
        <div className='signUpLoginBox'>

            <div className="slContainer">
                <div className="formBoxLeftForget">

                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        <h2>Mot de passe oublié</h2>
                        {success && 
                        <span 
                        style={{
                            border: '1px solid green',
                            background: 'green',
                            color: '#fff'
                        }}
                        >
                            {success}
                        </span>}
                        {error && <span>{error.message}</span>}
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input type="email" onChange={e => setEmail(e.target.value)} value={email} autoComplete='off' required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <button disabled={disabled}>Modifier</button>
                        </form>

                        <div className="linkContainer">
                            <Link className='simpleLink' to="/login">Déjà inscrit? connectez-vous</Link>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default ForgetPassword;