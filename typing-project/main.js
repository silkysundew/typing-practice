// alpha 0.1




let getSSNhtml = () => 
{ // returns a random Social Security Number as a string
    let ssn = [];
    for (let i = 0; i <= 10; i++) {
        if (i === 3 || i === 6) {
            ssn.push('<span>-</span>');
        }
        else {
            ssn.push('<span>');
            ssn.push(Math.floor(Math.random() * Math.floor(10)));
            ssn.push('</span>');
        }
    }
    
    return ssn.join('');
}

let num = document.getElementById('num');
let digits = num.getElementsByTagName('span');
let errorsHTML = document.getElementById('errors');
let wpmHTML = document.getElementById('wpm');

num.innerHTML = getSSNhtml();



let errors = 0;
let current = 0;
let started = false;

let wpm = 0;

let words =11; // change to number of words or entries
let time = 0; // in seconds
let startTime;


// add 1 second to time if once you start

digits[current].classList.toggle('active');




document.addEventListener('keydown', event => {
    
    // start timer
    if( !started) {
        started = true;
        startTime = setInterval( () => {
                time++;
            }, 1000);
        }
    
    // reset
    if(current === digits.length && event.keyCode === 13 ){
        for( el of digits){
            el.classList.remove("wrong");
            el.classList.remove("correct");
        }
        
        started = false;
        clearInterval(startTime);
        wpm = (words - errors)/(time/60);
        wpmHTML.innerText = wpm;
        time = 0;
        
        errorsHTML.innerText = errors.toString();

        errors ? errorsHTML.classList.add('errors-made') :
        errorsHTML.classList.remove('errors-made');

        errors = 0;
        
        
        num.innerHTML = getSSNhtml();
        current = 0;
        digits[current].classList.toggle("active");
    }
    else{
        // correct
        if (event.key === digits[current].innerText) {
            digits[current].classList.toggle("correct");
            digits[current].classList.remove("active");
            current++;
            digits[current].classList.toggle("active");
            
        }
        // incorrect
        else {
            digits[current].classList.toggle("wrong");
            errors++;
            digits[current].classList.remove("active");
            current++;
            digits[current].classList.toggle("active");
            
        }
    }
    
});



