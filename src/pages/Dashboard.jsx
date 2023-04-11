import React from "react";

export const Dashboard = () => {
    return (
        <div className="Smartwatch m-auto mt-5">
            <div className="content-center">
                <div className="grid grid-cols-5 mx-auto bottomMiddle">
                    <div className="m-auto symbol">!@#</div>
                    <div className="my-auto px-5 number">123</div>
                    <div className="col-span-2 my-auto px-12 space">Space</div>
                    <div className="m-auto backspace">⌫</div>
                </div>
                <div className="grid grid-cols-5 mx-auto bottomButton">
                    <div className="m-auto back">&larr;</div>
                    <div className="my-auto px-5 firstAlpha">ABC</div>
                    <div className="m-auto secondAlpha">DEF</div>
                    <div className="my-auto px-5 thirdAlpha">GHI</div>
                    <div className="m-auto next">&rarr;</div>
                </div>
            </div>
        </div>
    );
}