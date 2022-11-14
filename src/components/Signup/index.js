import React, { useState } from 'react';
import {  createUserWithEmailAndPassword } from "firebase/auth";
import { auth, user } from '../Firebase/firebaseConfig';
import { setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const data = {
        pseudo: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
    const [loginData, setLoginData] = useState(data);
    const {pseudo, email, password, confirmPassword} = loginData;

    const handleChange = e => {
        setLoginData({...loginData, [e.target.id]: e.target.value})
    }

    const [error, setError] = useState('')

    const navigate = useNavigate();



    const handleSubmit = e => {
        e.preventDefault();
        const { email, password } = loginData;
        createUserWithEmailAndPassword(auth, email, password)
        .then( authUser => {
            return setDoc(user(authUser.user.uid), {
                pseudo,
                email
            })
        })
        .then(() => {
            setLoginData({...data});
            navigate('/welcome');
        })
        .catch(error => {
            setError(error);
            setLoginData({...data});
        })
    }



    const errorMsg = error !== '' && <span>{error.message}</span>

    const btn = pseudo === '' || email === '' || password === '' || password !== confirmPassword ? <button disabled>Isciption</button> : <button>Isciption</button>

    return (
        <div className='signUpLoginBox'>

            <div className="slContainer">
                <div className="formBoxLeftSignup">

                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        <h2>Inscription</h2>
                        <form onSubmit={handleSubmit}>
                            {errorMsg}
                            <div className="inputBox">
                                <input type="text" onChange={handleChange} value={pseudo} id="pseudo" autoComplete='off' required />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>

                            <div className="inputBox">
                                <input type="email" onChange={handleChange} value={email} id="email" autoComplete='off' required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input type="password" onChange={handleChange} value={password} id="password" autoComplete='off' required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            <div className="inputBox">
                                <input type="password" onChange={handleChange} value={confirmPassword} id="confirmPassword" autoComplete='off' required />
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>

                            {btn}
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

export default Signup;