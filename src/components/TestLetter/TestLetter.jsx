import React from "react";
import './TestLetter.css'

const Testletter = ({ individualLetterInfo }) => {
    return (
        <span className={`test-letter`}>
            {individualLetterInfo.testLetter}
        </span>
    )
};

export default Testletter;