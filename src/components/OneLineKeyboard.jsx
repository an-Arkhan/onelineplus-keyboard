import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import  { setText } from "./KeyboardUtil";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../styles/styles.css";

// import required modules
import { Keyboard, Pagination, Navigation } from "swiper";

// word data
var data = require("../WORD_DATA.json")

function Board ({ message, setMessage }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isCap, setIsCap] = useState(0);

    // mousedown time of each button
    let press_time = 0;

    const onMouseUp = (e) => {
      // to get which button is clicked
      const id = Number(e.target.id);
      var cur_time = new Date();
      // to differentiate long press and short press
      var gap_time = cur_time - press_time;

      if(gap_time > 1000 && ((id >= 4 && id <= 13) || id === 14)) {
        // long press
        const append = (id === 14) ? 0: id-4;
        setMessage(message+append);
      } else {
        // short press
        let result = setText(id, message, isCap);
          setMessage(result.message);
          setIsCap(result.isCap);
      }
    }

    const autoText = (e) => {
        setMessage(message+e);
    }

    const keyPress = message.toLowerCase().split(" ");
    const lengthSent = keyPress.length;
    const sliceMess = keyPress.slice(lengthSent-1);

  return (
    <>
      <div className="content-center keyboard">
        <div className="grid grid-flow-col mx-auto topButton">
            {data
                .filter((item) => {
                    const keyTerm = message.toLowerCase().split(" ");
                    const lengthWord = keyTerm.length;
                    const sliceWord = keyTerm.slice(lengthWord-1);
                    const words = item.words.toLowerCase();

                    return (
                        sliceWord &&
                        words.startsWith(sliceWord) &&
                        words !== keyTerm
                    )
                })
                .slice(0,5)
                .map((item) => (
                    <div 
                        onClick={() => {
                            if(message === ""){
                                autoText(item.words+" ")
                            } else {
                                autoText(item.words.slice(1)+" ")
                            }
                        }}
                        className="my-auto py-2 px-2 autotext"
                        key={item.words}>
                        { 
                            message === "" && message.split(" ").slice(message.length-1) ?  "" : item.words 
                        }
                    </div>
                ))
            }
          {/* <div className="my-auto px-2 textOne">Lorem</div>
          <div className="my-auto px-2 textTwo">Ipsum</div>
          <div className="my-auto px-2 textThree">Dolor</div>
          <div className="my-auto px-2.5 textFour">Sit</div> */}
        </div>
        <div className="grid grid-cols-4 mx-auto middleButton">
          <button 
            id="15" 
            onMouseDown={() => press_time = new Date()} 
            onMouseUp={onMouseUp} 
            className="my-auto px-2 capslock middleHeight">
              &#x2191;
          </button>
          <button
            id="2"
            onMouseDown={() => press_time = new Date()} 
            onMouseUp={onMouseUp} 
            className="my-auto px-2 enter middleHeight">
               &#8629;
          </button>
          <button
            id="14" 
            onMouseDown={() => press_time = new Date()} 
            onMouseUp={onMouseUp} 
            className="my-auto px-1 space middleHeight">
              space
          </button>
          <button
            id="3"
            onMouseDown={() => press_time = new Date()}
            onMouseUp={onMouseUp}
            className="my-auto px-2 backspace middleHeight">
              ⌫
          </button>
        </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={0}
        keyboard={{
          enabled: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation]}
        className="bottomButton"
      >
        <SwiperSlide className="py-2">
            <div className="alpha-button" id="abc">
                <button 
                    id="5" 
                    onMouseDown={() => press_time = new Date()} 
                    onMouseUp={onMouseUp} 
                    className="key">
                        {isCap === 0?'abc': (isCap === 1? "Abc": "ABC")} <sup>1</sup>
                </button>
            </div>
        </SwiperSlide>
        <SwiperSlide className="py-2">
            <div className="alpha-button" id="def">
                <button 
                    id="6" 
                    onMouseDown={() => press_time = new Date()} 
                    onMouseUp={onMouseUp} 
                    className="key">
                        {isCap === 0?'def': (isCap === 1? "Def": "DEF")} <sup>2</sup>
                </button>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="alpha-button" id="ghi">
                <button 
                    id="7" 
                    onMouseDown={() => press_time = new Date()} 
                    onMouseUp={onMouseUp} 
                    className="key">
                        {isCap === 0?'ghi': (isCap === 1? "Ghi": "GHI")} <sup>3</sup>
                </button>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="alpha-button" id="jkl">
                <button 
                    id="8" 
                    onMouseDown={() => press_time = new Date()} 
                    onMouseUp={onMouseUp} 
                    className="key">
                        {isCap === 0?'jkl': (isCap === 1? "Jkl": "JKL")} <sup>4</sup>
                </button>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="alpha-button" id="mno">
                <button 
                    id="9" 
                    onMouseDown={() => press_time = new Date()} 
                    onMouseUp={onMouseUp} 
                    className="key">
                        {isCap === 0?'mno': (isCap === 1? "Mno": "MNO")} <sup>5</sup>
                </button>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="alpha-button" id="pqrs">
                <button 
                    id="10" 
                    onMouseDown={() => press_time = new Date()} 
                    onMouseUp={onMouseUp} 
                    className="key">
                        {isCap === 0?'pqrs': (isCap === 1? "Pqrs": "PQRS")} <sup>6</sup>
                </button>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="alpha-button" id="tuv">
                <button 
                    id="11" 
                    onMouseDown={() => press_time = new Date()} 
                    onMouseUp={onMouseUp} 
                    className="key">
                        {isCap === 0?'tuv': (isCap === 1? "Tuv": "TUV")} <sup>7</sup>
                </button>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="alpha-button" id="wxyz">
                <button 
                    id="12" 
                    onMouseDown={() => press_time = new Date()} 
                    onMouseUp={onMouseUp} 
                    className="key">
                        {isCap === 0?'wxyz': (isCap === 1? "Wxyz": "WXYZ")} <sup>8</sup>
                </button>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="alpha-button" id="symbol1">
                <button 
                    id="13" 
                    onMouseDown={() => press_time = new Date()} 
                    onMouseUp={onMouseUp} 
                    className="key">
                        .,? <sup>9</sup>
                </button>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className="alpha-button" id="symbol2">
                <button 
                    id="4" 
                    onMouseDown={() => press_time = new Date()} 
                    onMouseUp={onMouseUp} 
                    className="key">
                        *#@ <sup>0</sup>
                </button>
            </div>
        </SwiperSlide>
      </Swiper>
      </div>
    </>
  );
}

export default Board;