import React, { useState } from 'react';
import App from "../components/OneLineKeyboard";

export const Dashboard = () => {
    let [message, setMessage] = useState("");
    return (
        <>
        <div>
            <div className="grid grid-cols-1 text-lg font-semibold mt-3 place-items-center">
                <h1>Layout Testing</h1>
            </div>
            <div>

            </div>
            <div className="Smartwatch m-auto mt-5">
                <div className="text-center" id="key-input">
                    <textarea
                        value={message}
                        className="box-input"
                        type="text"
                        id="message" 
                        readonly 
                        autocomplete="off" 
                    />
                </div>
                <App setMessage={setMessage} message={message} />
            </div>
        </div>
        </>
    );
}

/* <div className="grid grid-cols-4 mx-auto bottomButton">
<div className="my-auto px-4 back">&larr;</div>
<div className="my-auto px-2 firstAlpha">ABC</div>
<div className="my-auto px-2 secondAlpha">DEF</div>
<div className="my-auto px-2.5 next">&rarr;</div>
</div> */
