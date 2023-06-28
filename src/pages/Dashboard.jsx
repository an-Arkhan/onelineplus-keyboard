/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useRef } from 'react';
import { SAMPLE_PARAGRAPHS } from '../data/samplePara';
import SmartWatch from '../components/SmartWatch';

const TotalTime = 60;
const DataUrl = "http://metaphorpsum.com/paragraphs/2/4"
const DefualtState = {
    selectedParagraph: "",
    timerStarted: false,
    timeRemaining: TotalTime,
    words: 0,
    characters: 0,
    wpm: 0,
    testInfo: [],
    incorrectCount: 0
}

class Dashboard extends React.Component {
    state = DefualtState

    fetchfromFallBack = () => {
        const data = SAMPLE_PARAGRAPHS[
            Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)
        ];
        const selectedParagraphArray = data.split("");
        //  console.log("splitted array - ", selectedParagraphArray);
        const testInfo = selectedParagraphArray.map((selectedLetter) => {
            return {
                testLetter: selectedLetter,
                status: "notAttempted",
            };
        });

        this.setState({ ...DefualtState, testInfo, selectedParagraph: data });

    }

    fetchNewParagraph = () => {
        fetch(DataUrl)
            .then((response) => response.text())
            .then((data) => {
                //console.log("API RESPOSNE IS : ", data)

                const selectedParagraphArray = data.split("");
                //  console.log("splitted array - ", selectedParagraphArray);
                const testInfo = selectedParagraphArray.map((selectedLetter) => {
                    return {
                        testLetter: selectedLetter,
                        status: "notAttempted",
                    };
                });
                this.setState({ ...DefualtState, testInfo, selectedParagraph: data });
            });

    }

    componentDidMount() {
        this.fetchfromFallBack();
    };

    startAgain = () => this.fetchfromFallBack();

    startTimer = () => {
        this.setState({ timerStarted: true });
        const timer = setInterval(() => {
            //  console.log("Interval Set " + this.setState.timeRemaining);
            if (this.state.timeRemaining > 0) {
                // Change the WPM
                const check = this.state.timerStarted;
                const timeSpent = TotalTime - this.state.timeRemaining;
                const wpm = timeSpent > 0
                    ? (this.state.words / timeSpent) * TotalTime
                    : 0;

                this.setState({
                    timeRemaining: this.state.timeRemaining - 1,
                    wpm: parseInt(wpm),
                });
            }
            else {
                clearInterval(timer);
            }

        }, 1000);
    };


    handleUserInput = (inputValue) => {
        console.log(inputValue);
        if (!this.state.timerStarted) {
            this.startTimer();
        }
        const characters = inputValue.length;
        const words = inputValue.split(" ").length;
        const index = characters - 1;

        if (index < 0) {
            this.setState({
                testInfo: [
                    {
                        testLetter: this.state.testInfo[0].testLetter,
                        status: "notAttempted",
                    },
                    ...this.state.testInfo.slice(1),
                ],
                characters,
                words,
            });
            return;
        }

        if (index >= this.state.selectedParagraph.length) {
            this.setState({ characters, words });
            return;
        }

        // make a cpoy of testInfo (case for backsapcing)
        const testInfo = this.state.testInfo;
        if (!(index === this.state.selectedParagraph.length - 1))
            testInfo[index + 1].status = "notAttempted";

        // Check for mistake
        const isMistake = inputValue[index] === testInfo[index].testLetter;
        console.info(this.state.incorrectCount, 'Incorrect count', isMistake);

        // Update the testInfo
        testInfo[index].status = isMistake ? "correct" : "incorrect";

        // Update the state
        this.setState({
            testInfo,
            words,
            characters,
            incorrectCount: isMistake ? this.state.incorrectCount : this.state.incorrectCount + 1
        });
    };

    render () {
        return (
            <>
            <div>
                <div className="grid grid-cols-1 text-lg font-semibold mt-3 place-items-center">
                    <h1>Layout Testing</h1>
                </div>
                <SmartWatch
                    words={this.state.words}
                    characters={this.state.characters}
                    wpm={this.state.wpm} 
                    selectedParagraph={this.state.selectedParagraph}
                    timeRemaining={this.state.timeRemaining}
                    timerStarted={this.state.timerStarted}
                    onInputChange={this.handleUserInput}
                    testInfo={this.state.testInfo}
                    incorrectCount={this.state.incorrectCount}
                />
            </div>
            </>
        );
    }
}

export default Dashboard;

/* <div className="grid grid-cols-4 mx-auto bottomButton">
<div className="my-auto px-4 back">&larr;</div>
<div className="my-auto px-2 firstAlpha">ABC</div>
<div className="my-auto px-2 secondAlpha">DEF</div>
<div className="my-auto px-2.5 next">&rarr;</div>
</div> */
