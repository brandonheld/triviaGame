import { getClue as getClueFromCallback } from "./callback-version.js";
import { getClue as getClueFromPromise } from "./promise-version.js";
import { getClue as getClueFromAsyncFunction } from "./async-await-version.js";

let score = 0;

function updateHTMLfromClue (clue) {
    document.getElementById("question").innerHTML = `Question is: ${clue.question}`;
    document.getElementById("answer").innerHTML = clue.answer;
    document.getElementById("value").innerHTML = clue.value;
    document.getElementById("category-title").innerHTML = `Category is: ${clue.category.title}`;
    let isValid = "valid"
    if(clue.invalid_count > 0) {
        isValid = "invalid";
    } else {            
        isValid = "valid";
    }

    document.getElementById("invalid-count").innerHTML = isValid; 
            
    document
        .querySelector(".pure-form")
        .reset();

    
    
}    

window.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("use-callback")
        .addEventListener("click", event => {

        getClueFromCallback((err, clue) => {
            if(err !== null) return console.error(err);
            updateHTMLfromClue(clue);

        });
        document
        .getElementById("answer")
        .classList.add('is-hidden')
    });

    document
        .getElementById("use-promise")
        .addEventListener("click", event => {

        getClueFromPromise()
            .then( clue => updateHTMLfromClue(clue)) 
            .catch( err => console.log(err));

            document
            .getElementById("answer")
            .classList.add('is-hidden')
            
    });

    

    document
        .getElementById("use-async-await")
        .addEventListener("click", async event => {   
        try {
        const clue = await getClueFromAsyncFunction();
        updateHTMLfromClue(clue);
        } catch (err) {
            console.log(err);
        }

        document
        .getElementById("answer")
        .classList.add('is-hidden')
    
    });

    document
        .getElementById('player-response')
        .addEventListener('keyup', () => {
        document.getElementById("check-response")
        .disabled= false;
    })

    document
        .getElementById("check-response")
        .addEventListener("click", async event => { 

        const textResponse = document.getElementById("player-response").value.toLowerCase().trim();
        const answer = document.getElementById('answer').innerHTML.toLowerCase().trim();
        const getValue = document.getElementById('value').innerHTML;
        let value = Number.parseInt(getValue)
        const scoreLocation = document.getElementById('score');
          
    
        if(textResponse == answer) {
            score += value;
            scoreLocation.innerHTML = `Score: ${score}`; 
        } else {
            score -= value;
            scoreLocation.innerHTML = `Score: ${score}`; 
        }

            document.getElementById("answer")
                .classList.remove('is-hidden')

            document.getElementById("check-response")
                .disabled= true;

    
    });
    
    
    
    
});
