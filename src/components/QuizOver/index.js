import React, { forwardRef, Fragment, useEffect, useState } from 'react';

const QuizOver = forwardRef((props, ref) => {

    const [asked, setAsked] = useState([]);

    const { levelNames, score, maxQuestions, quizLevel, percent, loadLevelQuestions } = props;

    useEffect(() => {
        setAsked(ref.current)
    }, [ref])

    const averageGrade = maxQuestions / 2;

    const decision = score >= averageGrade ? (
        <Fragment>
            <div className='stepsBtnContainer'>
                {
                    quizLevel < levelNames.length ? 
                    (   
                        <Fragment>
                            <div className="successMsg">Bravo, vous pouvez passer au niveau suivant</div>
                            <button
                                className='btnResult success'
                                onClick={() => loadLevelQuestions(quizLevel)}
                            >
                                Niveau suivant
                            </button>
                        </Fragment>
                    )
                    :
                    (   
                        <Fragment>
                            <div className="successMsg">Bravo, vous êtes un expert !</div>
                            <button className='btnResult success'>Terminer</button>
                        </Fragment>
                    )
                }
            </div>
            <div className="percentage">
                <div className="progressPercent">Réuissite: {percent}%</div>
                <div className="progressPercent">Notes: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    ) 
    : 
    (
        <Fragment>
            <div className='stepsBtnContainer'>
                <div className="failureMsg">Vous avez échoué !</div>
            </div>

            <div className="percentage">
                <div className="progressPercent">Réuissite: {percent}%</div>
                <div className="progressPercent">Notes: {score}/{maxQuestions}</div>
            </div>
        </Fragment>
    )

    const questionAnswer = score >= averageGrade ? 
    (
        asked.map(question => {
            return (
                <tr key={question.id}>
                    <td>{question.question}</td>
                    <td>{question.answer}</td>
                    <td><button className='btnInfo'>Infos</button></td>
                </tr>
            )
    })
    )
    :
    (
        <tr>
            <td colSpan='3'>
                <p style={ {textAlign: 'center', color: 'red'} }>Pas de réponses !</p>
            </td>
        </tr>
    )


    return (
        <Fragment>
            {decision}

            <hr />
            <p>Les réponses aux questions posées:</p>
            <div className="answerContainer">
                <table className='answers'>
                    <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Réponses</th>
                            <th>Infos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questionAnswer}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
})



export default React.memo(QuizOver);