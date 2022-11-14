import React, { useEffect, useState } from 'react';
import { signOut } from "firebase/auth";
import { auth } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';


const Logout = () => {

    const [checked, setChecked] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        if(checked) {
            signOut(auth)
            .then(() => {
                console.log('Deconnexion ');
                setTimeout(() => {
                    navigate('/');
                }, 1000);
            })
            .catch((error) => {
             // An error happened.
            });
        }
    }, [checked, navigate])

    const handleChange = e => {
       setChecked(e.target.checked)
    }
    return (
        <div className='logoutContainer'>
            <label className='switch'>
                <input
                onChange={handleChange}
                    type="checkbox"
                    checked={checked}
                />
                <span className='slider round'></span>
            </label>
        </div>
    );
};

export default Logout;