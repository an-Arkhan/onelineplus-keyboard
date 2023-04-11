import React from "react";

export const Dashboard = () => {
    return (
        <div className="Smartwatch m-auto mt-5">
            <div className="content-center">
                <div className="grid grid-cols-4 mx-auto bottomMiddle">
                    <div className="my-auto px-2 symbol">!@#</div>
                    <div className="my-auto px-1 number">123</div>
                    <div className="my-auto px-1 space">space</div>
                    <div className="my-auto px-2.5 backspace">⌫</div>
                </div>
                <div className="grid grid-cols-4 mx-auto bottomButton">
                    <div className="my-auto px-4 back">&larr;</div>
                    <div className="my-auto px-1 firstAlpha">ABC</div>
                    <div className="my-auto px-1 secondAlpha">DEF</div>
                    <div className="my-auto px-2.5 next">&rarr;</div>
                </div>
            </div>
        </div>
    );
}
