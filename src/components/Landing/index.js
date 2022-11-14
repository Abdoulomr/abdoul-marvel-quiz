import React, { useRef, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";

const Landing = () => {

  const [btn, setBtn] = useState(false);

  const refWolverine = useRef(null);

  useEffect(() => {
    refWolverine.current.classList.add('startingImg');

    setTimeout(() => {
      refWolverine.current.classList.remove('startingImg');
      setBtn(true)
    }, 1000)

  }, [])

  const setLeftImage = () => {
    refWolverine.current.classList.add('leftImg')
  }

  const setRightImage = () => {
    refWolverine.current.classList.add('rightImg')
  }

  const clearImg = () => {
    if (refWolverine.current.classList.contains('leftImg')) {
      refWolverine.current.classList.remove('leftImg')
    } else if (refWolverine.current.classList.contains('rightImg')) {
      refWolverine.current.classList.remove('rightImg')
    }
  }

  const btnDisplay = btn && (
      <Fragment>
        <div className="leftBox" onMouseOver={setLeftImage} onMouseOut={clearImg}>
          <Link to="/signup" className="btn-welcome">Inscription</Link>
          
        </div>

        <div className="rightBox" onMouseOver={setRightImage} onMouseOut={clearImg}>
          <Link to="/login" className="btn-welcome">Connexion</Link>
        </div>
      </Fragment>
  )


  return (
    <main ref={refWolverine} className="welcomePage" >
      {btnDisplay}
    </main>
  );
};

export default Landing;
