import React, { useState, Fragment, useEffect  } from 'react';
import Logout from '../Logout';
import Quiz from '../Quiz';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, user } from '../Firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { getDoc } from 'firebase/firestore';

const Welcome = () => {

    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({})

    const navigate = useNavigate();

    useEffect(() => {
        const listener = onAuthStateChanged(auth, user => {
            user ? setUserSession(user) : navigate('/');
        })

        if (!!userSession) {
            const colRef = user(userSession.uid);
            getDoc(colRef)
            .then( snapshot => {
                if (snapshot.exists()) {
                    const docData = snapshot.data();
                    setUserData(docData);
                }
            })
            .catch( error => {
                console.log(error);
            })
        }
        
        return listener();

    }, [userSession])

    


    return userSession === null ? (
        <Fragment>
            <div className="loader">
            </div>
        </Fragment>
        
    ) :
    (
        <div className='quiz-bg'>
            <div className="container">
                <Logout />
                <Quiz userData={userData} />
            </div>
        </div>
    )
};

export default Welcome;