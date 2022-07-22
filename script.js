const switchElements = document.getElementsByName('theme');

const displayInput = document.getElementById('display-input');

const numberBtns = document.getElementsByClassName('btn-number');
const symbBtns = document.getElementsByClassName('btn-symbol');

const delBtn = document.getElementById('btn-deleted');
const resetBtn = document.getElementById('btn-reset');
const calcBtn = document.getElementById('calculate');

const screen = document.getElementById('display');
const screenSecond = document.getElementById('display-second');
const screenContainer = document.getElementById('display-container');


//Change Theme 
for(let i = 0; i < switchElements.length; i++) {
    switchElements[i].onchange = () => {
        const bodyElement = document.querySelector('body');
        if(switchElements[0].checked) {
            bodyElement.className = "theme1";
        }else if(switchElements[1].checked) {
            bodyElement.className = "theme2";
        }else if(switchElements[2].checked) {
            bodyElement.className = "theme3";
        }
    }
}

// Button Deleted
delBtn.onclick = () =>  {
    if(displayInput.value.length === 1 ) {
        displayInput.value = '0';
    }else if(displayInput.value.slice(1).includes('=')) {
        screenSecond.textContent = '';
        displayInput.value = displayInput.value.slice(3);
    }else if(displayInput.value === '') {
        displayInput.value = screen.textContent;
        displayInput.value = displayInput.value.slice(0,-1);
    } else {
        displayInput.value = displayInput.value.slice(0,-1);
    }
    updateValue();

    if(displayInput.value.length <= 12) {
        screen.style.fontSize = maxFont + 'px';
    }


}

// Button Reset
resetBtn.onclick = () =>  {
    displayInput.value = '0';
    screenSecond.textContent ='';
    updateValue();
    screen.style.fontSize = maxFont + 'px';
}

// Button Calculate
calcBtn.onclick = () => {
    if(displayInput.value.slice(1).includes('=') === false && displayInput.value !== '.`') {
        const calcEq = screenSecond.textContent + screen.textContent;
        screenSecond.textContent = calcEq;
        displayInput.value =" = " + eval(calcEq);
        updateValue();

        const textWidth = screen.offsetWidth;
        const containerWidth = screenContainer.offsetWidth - 48;
 
        if(textWidth > containerWidth) {
            let newFontSize = containerWidth * maxFont / textWidth;
            screen.style.fontSize = newFontSize + 'px';
        }
    }
}


// Display Screen
const updateValue = () => {
    screen.textContent = displayInput.value;
}
updateValue();


for(let i = 0; i < numberBtns.length; i++) {
    numberBtns[i].onclick = () => {
        if(!(displayInput.value.length >= 12)) {
            if(displayInput.value === '0' && screenSecond.textContent.length === 0 || displayInput.value.includes('=')) {
                displayInput.value = numberBtns[i].textContent;
                screenSecond.textContent ='';
            }else if(displayInput.value === '0' && screenSecond.textContent.length !== 0 ) {
                displayInput.value = numberBtns[i].textContent;
            }else if(numberBtns[i].textContent === '.'){
                if(displayInput.value.includes('.') === false) {
                    displayInput.value += numberBtns[i].textContent;
                }
            } else {
                displayInput.value += numberBtns[i].textContent;
            }
        }else if (displayInput.value.length >= 12 && displayInput.value.includes('=')) {
            displayInput.value = numberBtns[i].textContent;
            screenSecond.textContent ='';
        }
        updateValue();
        screen.style.fontSize = maxFont + 'px';

        
    }
}

// Symbol
for(let i = 0; i < symbBtns.length; i++) {
    symbBtns[i].onclick = () =>{
        if(displayInput.value.includes('=')) {
            screenSecond.textContent = screen.textContent.slice(3) +  symbBtns[i].textContent;
            screen.textContent = screen.textContent.slice(3);
        }else if(displayInput.value !== '') {
            screenSecond.textContent += displayInput.value + symbBtns[i].textContent;
        }
        displayInput.value = '';

    }

}

//set cookie
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//get cookie
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

