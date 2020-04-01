import { getClue as getClueFromCallback } from "./callback-version.js";



window.addEventListener("DOMContentLoaded", () => {

    document
        .getElementById("use-callback")
        .addEventListener("click", event => {

            getClueFromCallback((err, clue) => {
                if(err !== null) return console.error(err);

                console.log(clue)
                document.getElementById("question").innerHTML = clue.question;
                document.getElementById("answer").innerHTML = clue.answer;
                document.getElementById("value").innerHTML = clue.value;
                document.getElementById("category-title").innerHTML = clue.category.title;
                let isValid = "valid"
                if(clue.invalid_count > 0) {
                    isValid = "invalid";
                } else {            
                    isValid = "valid";
                }
                document.getElementById("invalid-count").innerHTML = isValid;

            });





        });



});