import React, { useState, useEffect } from "react";
import App from "../components/OneLineKeyboard";
import Testletter from '../components/TestLetter/TestLetter';
import Result from "./ResultContainer/ResultContainer";

function SmartWatch({
    words,
    characters,
    wpm,
    timeRemaining,
    timerStarted,
    testInfo,
    onInputChange
}) {
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (message != "") {
          setMessage(message);
          onInputChange(message);
        }
      }, [message]);

    const changeInput = (e) => {
        setMessage(e.target.value);
        onInputChange(e.target.value);
    }

    return(
        <>
            <div className='grid grid-cols-1 timer mt-3'>
                <p className="timer">00:
                    {timeRemaining >= 10 ? timeRemaining : `0${timeRemaining}`}
                </p>
                <p className="timer-info">
                    {!timerStarted && "Start typing to start the test"}
                </p>
            </div>
            <div className='section'>
                <div className='card has-background-dark'>
                    <div className='card-content'>
                        <div className="content" id="test-paragraph-div">
                            {
                                testInfo.map((individualLetterInfo, index) => {
                                    return <Testletter 
                                                key={index}
                                                individualLetterInfo={individualLetterInfo} />;
                                    })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="Smartwatch m-auto mt-5">    
                <div className="text-center" id="key-input">
                    <textarea
                    value={(message)}
                    className="box-input"
                    type="text"
                    id="message"
                    onChange={(e) => changeInput(e)}
                    />
                </div>
                <App setMessage={setMessage} message={message} />
            </div>
            <div>
                <Result cardName="Words" cardValue={words}/>
                <Result cardName="Characters" cardValue={characters}/>
                <Result cardName="WPM" cardValue={wpm}/>
            </div>
        </>
    )
}

export default SmartWatch;