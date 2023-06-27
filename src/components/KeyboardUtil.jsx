let last_press = -1;
let press_time = new Array(15);
let cap1_cnt = 0;

let _characters = [
  ["a", "b", "c", "1"],
  ["d", "e", "f", "2"],
  ["g", "h", "i", "3"],
  ["j", "k", "l", "4"],
  ["m", "n", "o", "5"],
  ["p", "q", "r", "s", "6"],
  ["t", "u", "v", "7"],
  ["w", "x", "y", "z", "8"],
  [".", ",", "?", "!", "(", ")", "/", "9"],
  ["*", "#", "@", "$", "&", "0"]
];

export const setText = (id, message, isCap) => {
  // current time
    const d = new Date();
    let cur_time = d.getTime();

//  enter 
  if (id === 2) {
    message += "\n";
  }

  // backspace 
  if (id === 3) {
      if(isCap === 1) cap1_cnt--;
    message = message.slice(0, -1);
  }

// letters
  if(id >= 4 && id <= 13) {
      if(last_press === id &&  cur_time - press_time[id] <= 500) {
        // previous button clicked === current button clicked
        // and time difference is less than 500ms
        let last = message[message.length-1];
        let i = 0, n = _characters[id-4].length;

        // to get next character
        while(i < n) {
            if(last.toLowerCase() === _characters[id-4][i]) break;
            i++;
        }

        // remove previous character
        message = message.slice(0,-1);
    
        // appended character should be uppercase or not
        if(((isCap === 2) || (isCap === 1 && cap1_cnt === 1)) && id !== 13) {
            if(i >= n-2) message += _characters[id-4][n-1].toUpperCase();  
            else message += _characters[id-4][i+1].toUpperCase();
        } else {
            if(i >= n-2) message += _characters[id-4][n-1];  
            else message += _characters[id-4][i+1];
        }
      } else {
        // previous button clicked !== current button clicked
          if((isCap === 2 || (isCap ===1 && cap1_cnt === 0) )&& id !== 13) message += _characters[id-4][0].toUpperCase()
        else message += _characters[id-4][0];
        cap1_cnt++;
      } 
  }

  // space
  if (id === 14) {
    if(last_press === id &&  cur_time - press_time[id] <= 500) {
        message = message.slice(0,-1);  
        message += "0";
    }else message += " ";
  }

  // set letter style, i.e to capitals and vice versa
  if(id === 15) {
      isCap = (isCap+1)%3;
      if(isCap === 1) cap1_cnt = 0;
  }

  last_press = id;
  press_time[id] = cur_time;

  return { message, isCap };
};
