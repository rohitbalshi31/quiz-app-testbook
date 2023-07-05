//selecting all required elements
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

function displayUsername() {
  var username = document.getElementById("username").value; //take username
  const val = document.querySelector("#username").value;
  if (val === "") {
    alert("Please Enter a valid Name");
  }
  sessionStorage.setItem("username",username) //store username in sessionStorage
  let wel =document.getElementById("welcome");
  wel.innerHTML = sessionStorage.getItem('username'); //get username from sessionStorage
  wel.style.color = "#6EC72D";
};

function displayUserName() {
  var userName = document.getElementById('userName').value;
  return userName
};

//  function for get the username
function getName() {
  let name = document.getElementById('userName').value;
  let displayName = document.getElementById("name");
  displayName.innerHTML = name;
}

// when start button click then activeInfo named class add in info_box

start_btn.onclick = () => {
  info_box.classList.add("activeInfo"); 
};

// when exit button click then activeInfo named class remove from info_box
exit_btn.onclick = () => {
  info_box.classList.remove("activeInfo"); 
};

// when continue bitton click 

continue_btn.onclick = () => {
  info_box.classList.remove("activeInfo");  //activeInfo class remove
  quiz_box.classList.add("activeQuiz");  // activeQuiz class add in quiz_box
  showQuetions(0);  //the question number is 0
  queCounter(1);  // question counter is 1
  startTimer(60); // timer for 15 seconds
  startTimerLine(0); // timer line here
};

let timeValue = 60; //timer value set
let que_count = 0; // question counter value
let que_numb = 1; // question number value set 
let userScore = 0; // user score is 0 
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart"); //for resatrt quiz
const quit_quiz = result_box.querySelector(".buttons .quit"); // for quit quiz

// Now set functionality when restart_quiz will click

restart_quiz.onclick = () => {
  quiz_box.classList.add("activeQuiz"); // sctiveQuiz class add in quiz_box
  result_box.classList.remove("activeResult");  // acxtiveResult class remove form result_box
  timeValue = 60;
  que_count = 0;
  que_numb = 1;
  userScore = 0;
  widthValue = 0;
  showQuetions(que_count); //showQuestion fucntion call
  queCounter(que_numb);  //queCounter call
  clearInterval(counter);  // here the counter clearInterval function call
  clearInterval(counterLine); //here counterLine clearInterval function call
  startTimer(timeValue);  //starttime fucntion call
  startTimerLine(widthValue);  // staertTimerLine call
  timeText.textContent = "Time Left"; 
  next_btn.classList.remove("show"); // remove show class from next_btn
};

// the quit_quiz click

quit_quiz.onclick = () => {
  window.location.reload(); 
};

const next_btn = document.querySelector("footer .next_btn"); 
const bottom_ques_counter = document.querySelector("footer .total_que");

//onclick of next_btn

next_btn.onclick = () => {
  if (que_count < questions.length - 1) {
    que_count++;  //que_count increase
    que_numb++;  // que_numb increase
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter); 
    clearInterval(counterLine); 
    startTimer(timeValue); 
    startTimerLine(widthValue); 
    timeText.textContent = "Time Left"; 
    next_btn.classList.remove("show"); // show class remove form next_btn
  } else {
    clearInterval(counter);  
    clearInterval(counterLine); 
    showResult(); //result function call
  }
};

// fucntion for showing questions

function showQuetions(index) {
  const que_text = document.querySelector(".que_text");
  
  let que_tag =
    "<span>" +
    questions[index].numb +
    ". " +
    questions[index].question +
    "</span>";
  let option_tag =
    '<div class="option"><span>' +
    questions[index].options[0] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[1] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[2] +
    "</span></div>" +
    '<div class="option"><span>' +
    questions[index].options[3] +
    "</span></div>";
  que_text.innerHTML = que_tag; 
  option_list.innerHTML = option_tag; 

  const option = option_list.querySelectorAll(".option"); //option here

  // loop for option select
  for (i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>'; //Tick icon here
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>'; // cross od wrong icon here

// define fucntion for select the options

function optionSelected(answer) {
  clearInterval(counter); 
  clearInterval(counterLine); 
  let userAns = answer.textContent; //user answer
  let correcAns = questions[que_count].answer; // corect answer
  const allOptions = option_list.children.length; 

//check the user anser and coorect answer

  if (userAns == correcAns) {
    // this call when user answer and correct answer both right
    userScore += 1; // user score will inscrese by 1
    answer.classList.add("correct"); 
    answer.insertAdjacentHTML("beforeend", tickIconTag); 
    console.log("Correct Answer");
    console.log("Your correct answers = " + userScore);
  } else {
    answer.classList.add("incorrect");
    answer.insertAdjacentHTML("beforeend", crossIconTag); 
    console.log("Wrong Answer");
//this is when the time out
    for (i = 0; i < allOptions; i++) {
      if (option_list.children[i].textContent == correcAns) {
        
        option_list.children[i].setAttribute("class", "option correct"); 
        option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
        console.log("Auto selected correct answer.");
      }
    }
  }
  for (i = 0; i < allOptions; i++) {
    option_list.children[i].classList.add("disabled"); 
  }
  next_btn.classList.add("show"); 
}

// here declare the fucntion for showing result

function showResult() {
  info_box.classList.remove("activeInfo"); //activeInfo class remove
  quiz_box.classList.remove("activeQuiz"); //activeQuiz class remove
  result_box.classList.add("activeResult"); //activeResult class add
  const scoreText = result_box.querySelector(".score_text");
  // if the userscore is greater than 3 then below condition run 
  if (userScore > 3) {
    //template literals are used
    let userName = sessionStorage.getItem("username")
    let scoreTag = `Congrats! <strong>${userName}</strong>, <br>
    You got <strong>${userScore}</strong> out of <strong>${
      questions.length
    }</strong> <br>
    <strong>Correct:</strong> ${userScore} <br>
    <strong>Wrong:</strong> ${questions.length - userScore}<br>
    <strong>Percentage:</strong> ${(userScore / questions.length) * 100}%
    `;
    scoreText.innerHTML = scoreTag; 
    // if the userscore is greater than 1 then below condition run 
  } else if (userScore > 1) { 
    
    let userName = sessionStorage.getItem("username")
    let scoreTag = `Nice! <strong>${userName}</strong>, <br>
    You got <strong>${userScore}</strong> out of <strong>${
      questions.length
    }</strong> <br>
    <strong>Correct:</strong> ${userScore} <br>
    <strong>Wrong:</strong> ${questions.length - userScore}<br>
    <strong>Percentage:</strong> ${(userScore / questions.length) * 100}%
    `;
    scoreText.innerHTML = scoreTag;
  } else {
    // if user scored less than 1
    let userName = sessionStorage.getItem("username")
    let scoreTag = `Sorry! <strong>${userName}</strong>, <br>
      You got <strong>${userScore}</strong> out of <strong>${
      questions.length
    }</strong> <br>
      <strong>Correct:</strong> ${userScore} <br>
      <strong>Wrong:</strong> ${questions.length - userScore}<br>
      <strong>Percentage:</strong> ${(userScore / questions.length) * 100}%
`;
    scoreText.innerHTML = scoreTag;
  }
}

// declare fucntion for timer

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time; 
    time--; 
    if (time < 9) {
      
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero; 
    }
    if (time < 0) {
      
      clearInterval(counter); 
      timeText.textContent = "Time Off"; 
      const allOptions = option_list.children.length; 
      let correcAns = questions[que_count].answer; 
      for (i = 0; i < allOptions; i++) {
        if (option_list.children[i].textContent == correcAns) {
          
          option_list.children[i].setAttribute("class", "option correct"); 
          option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
          console.log("Time Off: Auto selected correct answer.");
        }
      }
      for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); 
      }
      next_btn.classList.add("show"); 
    }
  }
}

// declare funtion for Time Line

function startTimerLine(time) {
  counterLine = setInterval(timer, 111);
  function timer() {
    time += 1; 
    time_line.style.width = time + "px"; 
    if (time > 549) {
      
      clearInterval(counterLine); 
    }
  }
}

// declare fucntion for question counter

function queCounter(index) {
  let totalQueCounTag =
    "<span><p>" +
    index +
    "</p> of <p>" +
    questions.length +
    "</p> Questions</span>";
  bottom_ques_counter.innerHTML = totalQueCounTag; 
}
