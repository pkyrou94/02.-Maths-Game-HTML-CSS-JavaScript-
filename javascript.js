var playing = false;
var score;
var action;
var time;
var correctAnswer;

//if we click on the start/reset
document.getElementById("startreset").onclick = function(){
    if(playing == true){    //if we are playing
        location.reload();  //reload page
    }else{  // if we are not playing
        playing = true;
        //set score to 0
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        
        //hide gameover box
        hide("gameover");
        
        //change button text to reset game
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //show countdown box
        show("time");
        //start countdown box
        time = 60;
        startCountdown();
        
        //generate new question and answer
        genarateQA();
    }
}

//if we click on answer box
for(i=1; i<5; i++){
    document.getElementById("box"+i).onclick = function(){
    //if we are playing
    if(playing == true){ //yes
        if(this.innerHTML == correctAnswer){ //if correct answer?
            score ++; //increase score by 1
            document.getElementById("scorevalue").innerHTML = score;
            
            //hide wrong box and show correct box for one sec
            hide("wrong");
            show("correct");
            setTimeout(function(){
                hide("correct")
            },1000);
            
            genarateQA(); //generate new question and answer
            
        }else{ //if wrong anser
            //show try agein box for one sec
            hide("correct");
            show("wrong");
            setTimeout(function(){
                hide("wrong");
            },1000)
        }
    }
}
}

//functions
function startCountdown(){
    action = setInterval(function(){
        //reduce time by one sec in loops
        time -= 1;
        document.getElementById("timevalue").innerHTML = time;
        
        //timeleft?
        if(time == 0){  //no-game over
            stopCountdown();
            
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>game over!</p><p>your score is "+ score +".</p>";
            
            hide("time");
            
            //change button text to reset game
            document.getElementById("startreset").innerHTML = "Start Game";
            
            playing = false;
        }
    }, 1000)
}

function stopCountdown(){
    clearInterval(action);
}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display = "block";
}

function genarateQA(){
    var x = 1+Math.round(9*Math.random());
    var y = 1+Math.round(9*Math.random());
    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    
    var correctPosition = 1+Math.round(3*Math.random());
    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; //one box with correct answer
    
    //boxes with wrong answers
    var answers = [correctAnswer];
    
    for(i=1; i<5; i++){
        if (i != correctPosition){
            var wrongAnswer;
            
            //correct and wrong answers are differetn
            do{
                {
                  wrongAnswer = (1+Math.round(9*Math.random())*1+Math.round(9*Math.random())); //wrong anser
                }
            }while(answers.indexOf(wrongAnswer)>-1)
            document.getElementById("box"+i).innerHTML = wrongAnswer;
            
            answers.push(wrongAnswer);
        }
    }
}