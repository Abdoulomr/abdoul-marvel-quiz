import React, { useEffect, useState } from 'react';
import Levels from '../Levels'
import ProgressBar from '../ProgressBar';
import { QuizMarvel } from '../quizMarvel';

const Quiz = () => {

    const [quizData, setQuizData] = useState({
        
        quizLevel: 0,
        levelNames: ['debutant', 'confirmer', 'expert'],
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        test: '',
    });
    



    const loadQuestions = level => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[level];
        if (fetchedArrayQuiz.length >= quizData.maxQuestions) {
            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest}) => keepRest);

            // setQuizData(quizData => ({
            //     ...quizData.storedQuestions,
            //     ...newArray
            // }))
            const updateObj = {
                ...quizData,
                storedQuestions: newArray,
            }
            
            
            setQuizData(updateObj)
            console.log(quizData.test)       
        } else {
            console.log("Pass assez de questions !!")
        }
        
    }
    



    useEffect(() => {
        loadQuestions(quizData.levelNames[quizData.quizLevel]);

        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    useEffect(() => {
        setQuizData({
            ...quizData,
            question: quizData.storedQuestions[0]
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quizData.storedQuestions])



    return (
        <div >
            <Levels />
            <ProgressBar />
        </div>
    );
};

export default Quiz;