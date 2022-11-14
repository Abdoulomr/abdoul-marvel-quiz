import React, {Component, Fragment } from 'react';
import Levels from '../Levels'
import ProgressBar from '../ProgressBar';
import { QuizMarvel } from '../quizMarvel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuizOver from '../QuizOver';


class Quiz extends Component  {

    state = {
        quizLevel: 0,
        levelNames: ['debutant', 'confirmer', 'expert'],
        maxQuestions: 10,
        storedQuestions: [],
        question: null,
        options: [],
        idQuestion: 0,
        userAnswer: null,
        btnDisabled: true,
        score: 0,
        showWelcomeMsg: true,
        quizEnd: false

    };

    storedDataRef = React.createRef();

    loadQuestions = quizz => {
        const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
        
        this.storedDataRef.current = fetchedArrayQuiz;
        
        if (fetchedArrayQuiz.length >= this.state.maxQuestions) {

            const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest}) => keepRest);
            
            this.setState({
                storedQuestions: newArray
            })

                       
        } else {
            console.log("Pass assez de questions !!")
        }

        
    }
    

   showWelcomeMsg = pseudo => {
        if (this.state.showWelcomeMsg) {

            this.setState({
                showWelcomeMsg: false
            })

            toast.warn(`Bonjour ${pseudo}, Bonne chance!`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
   }

    componentDidMount() {
        this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
    }

    nextQuestion = () => {
        if (this.state.idQuestion === this.state.maxQuestions - 1) {
            //End
            this.gameOver();
        } else {
            this.setState(prevState => ({
                idQuestion: prevState.idQuestion + 1,
            }))


        }

        const correctAnswer = this.storedDataRef.current[this.state.idQuestion].answer;


        if (this.state.userAnswer === correctAnswer){
            this.setState(prevState => ({
                score: prevState.score + 1
            }))

            toast.success('Bravo +1', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        } else {
            toast.error('Raté !', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        
    }

        

    componentDidUpdate(prevProps, prevState) {
        if (this.state.storedQuestions !== prevState.storedQuestions) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,

            })
        }

        if (this.state.idQuestion !== prevState.idQuestion) {
            this.setState({
                question: this.state.storedQuestions[this.state.idQuestion].question,
                options: this.state.storedQuestions[this.state.idQuestion].options,
                userAnswer: null,
                btnDisabled: true
            })
        }

        if (this.props.userData.pseudo) {
            this.showWelcomeMsg(this.props.userData.pseudo)
        }
    }

    
    submitAnswer = selectedAnswer => {
        this.setState({
            userAnswer: selectedAnswer,
            btnDisabled: false,
        })
    }

    getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;

    gameOver = () => {
        const gradePercent = this.getPercentage(this.state.maxQuestions, this.state.score);

        if (gradePercent >= 50) {
            this.setState({
                quizLevel: this.state.quizLevel + 1,
                percent: gradePercent,
                quizEnd: true,
            })
        } else {
            this.setState({
                percent: gradePercent,
                quizEnd: true,
            })
        }
    }

    loadLevelQuestions = param => {
        
    }

    


    render()  {

        const displayQuestion = this.state.options.map((option, index) => {
            return (
                <p key={index}
                className={`answerOptions ${this.state.userAnswer === option && "selected"}`}
                onClick={() => this.submitAnswer(option)}
                >
                    {option}
                </p>
            )
        })

        return this.state.quizEnd ? (
            <QuizOver
                ref={this.storedDataRef}
                levelNames={this.state.levelNames}
                score={this.state.score}
                maxQuestions={this.state.maxQuestions}
                quizLevel={this.state.quizLevel}
                percent={this.state.percent}
                loadLevelQuestions={this.loadLevelQuestions}
            />
        ) : (
            <Fragment >
                <Levels />
                <ProgressBar 
                    idQuestion={this.state.idQuestion }
                    maxQuestions={this.state.maxQuestions}
                />
                <h2>{this.state.question}</h2>
                {displayQuestion}
                <button 
                    disabled={this.state.btnDisabled}
                    className='btnSubmit'
                    onClick={this.nextQuestion}
                    >
                    {this.state.idQuestion < this.state.maxQuestions - 1 ? 'Suivant' : 'Terminer'}
                    </button>
                <ToastContainer />
                
            </Fragment>
        )
        
    }
};

export default Quiz;