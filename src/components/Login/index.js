import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';



const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState('')

    const navigate = useNavigate();

    const [btn, setBtn] = useState(false)

    useEffect(() => {
        if (password.length > 5 && email !== '') {
            setBtn(true)
        } else if (btn) {
            setBtn(false)
        }
    }, [email, password, btn])

    const handleSubmit = e => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            setEmail(email);
            setPassword(password);
            navigate('/welcome');
        })
        .catch(error => {
            setError(error);
            setEmail(email);
            setPassword(password);
        })
    }

    const errorMsg = error !== '' && <span>{error.message}</span>

    return (
        <div className='signUpLoginBox'>

            <div className="slContainer">
                <div className="formBoxLeftLogin">

                </div>
                <div className="formBoxRight">
                    <div className="formContent">
                        <h2>Connexion</h2> 
                        {errorMsg}
                        <form onSubmit={handleSubmit}>

                            <div className="inputBox">
                                <input type="email" onChange={e => setEmail(e.target.value)} value={email} autoComplete='off' required />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="inputBox">
                                <input type="password" onChange={e => setPassword(e.target.value)} value={password}  autoComplete='off' required />
                                <label htmlFor="password">Mot de passe</label>
                            </div>

                            {btn ?  <button>Connexion</button> : <button disabled>Connexion</button>}
                        </form>

                        <div className="linkContainer">
                            <Link className='simpleLink' to="/signup">Nouveau sur marvel Quiz ? inscrivez-vous</Link>
                            <br /><br />
                            <Link className='simpleLink' to="/forgetpassword">Mot de passe oublié? Récupérer ici</Link>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Login;