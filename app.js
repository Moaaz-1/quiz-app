// localStorage.clear();
function teacher_div() {
  document.querySelector(".container .t-or-s").style.marginLeft = "-100%";
  document.querySelector(".container .teacher-div").style.cssText =
    "margin-left:0;left: 50%;transform: translateX(-50%);";
}
function student_div() {
  document.querySelector(".container .t-or-s").style.marginLeft = "-100%";
  document.querySelector(".container .student-div").style.cssText =
    "margin-left:0;left: 50%;transform: translateX(-50%);";
}
function question_div() {
  document.querySelector(".container .teacher-div").style.marginLeft = "-100%";
  document.querySelector(".container .question-div").style.cssText =
    "margin-left:0;left: 50%;transform: translateX(-50%);";
}
function quiz_div() {
  document.querySelector(".container .student-div").style.marginLeft = "-100%";
  document.querySelector(".container .the-quiz").style.cssText =
    "margin-left:0;left: 50%;transform: translateX(-50%);";
  document.querySelector(
    ".container .the-quiz .student-name"
  ).textContent = `Your name: ${
    document.querySelectorAll(".student-div input")[0].value
  }`;
  document.querySelector(
    ".container .the-quiz .quiz-key"
  ).textContent = `Quiz key: ${
    document.querySelectorAll(".student-div input")[1].value
  }`;
}
////////////////////////////////////////////////////////////////////////////////
let local_storage_array = [];
function add_question() {
  let num_of_ans = 0;
  let q_info = [];
  ///////////////////////////////////////////////////////////////////////////
  let q_div = document.createElement("div");
  let textarea = document.createElement("textarea");
  let add_choices = document.createElement("button");
  let save_btn = document.createElement("button");
  let choice_array = [];
  /////////////////////////////////////////////////////////////////////////////
  q_div.style.cssText =
    "position:relative;border:2px dashed green;margin-top:20px;padding:50px;";
  textarea.style.cssText =
    "width:100%;height:100px;display:block;margin:20px auto 50px auto;resize:none;outline: none;border: 1px solid var(--main-color);";
  add_choices.style.cssText = "position: absolute;top: 180px;right: 50px;";
  save_btn.style.cssText =
    "position: absolute;bottom: 5px;left: 50%;transform: translateX(-50%);";
  document
    .querySelector(".container .question-div .q-display")
    .appendChild(q_div);
  q_div.appendChild(textarea);
  textarea.focus();
  q_div.appendChild(add_choices);
  q_div.appendChild(save_btn);
  textarea.setAttribute("placeholder", "Type the question");
  save_btn.textContent = "Save the question";
  add_choices.textContent = "Add Choice";
  /////////////////////////////////////////////////////////////////////////////////
  function edu_q() {
    let span3 = document.createElement("span");
    span3.textContent = "Delete question";
    span3.style.cssText =
      "position: absolute;top: 25px;left:50px;background-color: #da2323;color:white;padding:5px;cursor:pointer;";
    q_div.appendChild(span3);
    span3.onclick = () => {
      local_storage_array.splice(
        local_storage_array.indexOf(
          q_div.querySelectorAll("textarea")[0].value
        ),
        3
      );
      window.localStorage.setItem(
        document.querySelector(".container .teacher-div input").value,
        JSON.stringify(local_storage_array)
      );
      q_div.remove();
    };
  }
  ////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////
  function local_storage_info() {
    local_storage_array.push(textarea.value);
    console.log(local_storage_array);
    console.log(check_true_array);
    for (let i = 0; i < choice_array.length; i++) {
      if (check_true_array[i].hasAttribute("true")) {
        q_info.push("true");
      }
      q_info.push(choice_array[i].value);
    }
    local_storage_array.push(q_info);
    local_storage_array.push("new_array");
    window.localStorage.setItem(
      document.querySelector(".container .teacher-div input").value,
      JSON.stringify(local_storage_array)
    );
  }
  ////////////////////////////////////////////////////////////////////////////////
  let check_true_array = [];
  add_choices.addEventListener("click", () => {
    num_of_ans++;
    let choice = document.createElement("textarea");
    let check_true = document.createElement("input");
    choice_array.push(choice);
    check_true.setAttribute("order", num_of_ans);
    choice.setAttribute("order", num_of_ans);
    q_div.appendChild(check_true);
    q_div.appendChild(choice);
    choice.focus();
    check_true.setAttribute("type", "radio");
    choice.setAttribute("placeholder", "Type the answer");
    choice.style.cssText =
      "width:100%;height:50px;display:block;margin:20px auto;resize:none;outline: none;border: 1px solid var(--main-color);";
    check_true.style.cssText =
      "float: left;margin-left: -25px;margin-top: 20px;";
    check_true_array.push(check_true);
    check_true.addEventListener("click", () => {
      for (let i = 0; i < q_div.querySelectorAll("input").length; i++) {
        check_true_array[i].removeAttribute("true");
      }
      for (let i = 0; i < q_div.querySelectorAll("input").length; i++) {
        if (
          check_true_array[i].getAttribute("order") ===
          check_true.getAttribute("order")
        ) {
          check_true_array[i].setAttribute("true", "");
        }
      }
    });
    ////////////////////////////////////////////////////////////////
  });
  save_btn.addEventListener("click", () => {
    let check_the_true = 0;
    let check_empty_textarea = 0;
    for (let i = 0; i < choice_array.length; i++) {
      check_true_array[i].hasAttribute("true") ? check_the_true++ : "";
      if (choice_array[i].value !== "") {
        check_empty_textarea = 0;
      } else {
        check_empty_textarea = 1;
        break;
      }
    }
    if (check_empty_textarea === 0 && check_the_true === 1) {
      if (num_of_ans <= 5 && num_of_ans >= 2) {
        local_storage_info();
        check_true_array = [];
        for (let i = 0; i < choice_array.length; i++) {
          choice_array[i].setAttribute("disabled", "");
        }
        textarea.setAttribute("disabled", "");
        add_choices.remove();
        save_btn.remove();
        edu_q();
      }
      choice_array = [];
    }
  });
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////
}
function display_the_quiz() {
  let control_click=0;
  let local_data = JSON.parse(
    localStorage.getItem(
      document.querySelectorAll(".student-div input")[1].value
    )
  );
  for (let i = 0; i < local_data.length; i += 3) {
    let main_div = document.createElement("div");
    document.querySelector(".container .the-quiz .the-content").appendChild(main_div);
    main_div.style.cssText =
      "position: relative;width: 100%;background-color: #e7e7e7;margin-bottom: 10px;padding: 20px 0;";
    let ques_input = document.createElement("textarea");
    main_div.appendChild(ques_input);
    ques_input.value = local_data[i];
    ques_input.setAttribute("disabled", "");
    ques_input.style.cssText =
      "width: 85%;height: 100px;padding: 15px 20px;font-size: 15px;display: block;margin: 0 auto 50px auto;background-color: white;resize: none;outline: none;border: none;";
    for (let x = 0; x < local_data[i + 1].length; x++) {
      if (local_data[i + 1][x] === "true") {
        x++;
        let main_input = document.createElement("span");
        main_input.style.cssText =
          "display:block;width: 85%;height: 10px;padding: 15px 20px 20px 20px;font-size: 15px;margin:0 auto;margin-bottom: 15px;background-color: white;outline: none;border: none;cursor: pointer;";
        main_input.setAttribute("true", "");
        main_div.appendChild(main_input);
        main_input.textContent = local_data[i + 1][x];
        if (control_click===0) {
          main_input.addEventListener("click", () => {
            main_div.querySelectorAll("span").forEach((ele) => {
              ele.style.backgroundColor = "white";
              ele.style.color = "black";
              ele.removeAttribute("choose");
            });
            main_input.style.cssText =
              "display:block;width: 85%;height: 10px;padding: 15px 20px 20px 20px;font-size: 15px;background-color:green;color:white;margin:0 auto;margin-bottom: 15px;outline: none;border: none;cursor: pointer;";
            main_input.setAttribute("choose", "");
          });
        }
      } else {
        let main_input = document.createElement("span");
        main_input.style.cssText =
          "display:block;width: 85%;height: 10px;padding: 15px 20px 20px 20px;font-size: 15px;;margin:0 auto;margin-bottom: 15px;background-color: white;outline: none;border: none;cursor: pointer;";
        main_div.appendChild(main_input);
        main_input.textContent = local_data[i + 1][x];
        if (control_click===0) {
          main_input.addEventListener("click", () => {
            main_div.querySelectorAll("span").forEach((ele) => {
              ele.style.backgroundColor = "white";
              ele.style.color = "black";
              ele.removeAttribute("choose");
            });
            main_input.style.cssText =
              "display:block;width: 85%;height: 10px;padding: 15px 20px 20px 20px;font-size: 15px;background-color:green;color:white;margin:0 auto;margin-bottom: 15px;outline: none;border: none;cursor: pointer;";
            main_input.setAttribute("choose", "");
          });
        }
      }
    }
  }
  let result_btn = document.createElement("button");
  result_btn.textContent = "Show Result";
  document.querySelector(".container .the-quiz .the-content").appendChild(result_btn);
  result_btn.style.cssText =
    "float: right;margin-top: 20px;color: white;background-color: green;border: none;outline: none;padding: 10px;cursor: pointer;";
  let caution = document.createElement("span");
  caution.textContent = "Answer all the questions";
  document.querySelector(".container .the-quiz .the-content").appendChild(caution);
  caution.style.cssText =
    "float: right;margin-top: 20px;color: red;padding: 10px;display:none;";
  function show_result() {
    let choose_num = 0;
    let true_choose = 0;
    let true_ans = 0;
    document
      .querySelector(".container .the-quiz")
      .querySelectorAll("div")
      .forEach((ele) => {
        ele.querySelectorAll("span").forEach((element) => {
          if (element.hasAttribute("choose")) {
            choose_num++;
          } if (element.hasAttribute("true")) {
            true_choose++;
          }
        });
      });
    if (choose_num === true_choose) {
      control_click=1;
      caution.style.cssText =
        "float: right;margin-top: 20px;color: red;padding: 10px;display:none;";
      document
        .querySelector(".container .the-quiz")
        .querySelectorAll("div")
        .forEach((ele) => {
          ele.querySelectorAll("span").forEach((element) => {
            if (
              element.hasAttribute("choose") &&
              element.hasAttribute("true")
            ) {
              true_ans++;
            }
          });
        });
        document
        .querySelector(".container .the-quiz")
        .querySelectorAll("div")
        .forEach((ele) => {
          ele.querySelectorAll("span").forEach((element) => {
            if (element.hasAttribute("choose")&&!element.hasAttribute("true")) {
              element.style.backgroundColor="#e30000";
              element.style.color="white";
            } if (element.hasAttribute("true")) {
              element.style.backgroundColor="green";
              element.style.color="white";
            }
          });
        });
      let resultspan = document.createElement("span");
      resultspan.textContent = `Your Result is : ${true_ans/2}/${true_choose/2}`;
      document.querySelector(".container .the-quiz").prepend(resultspan);
      resultspan.style.cssText =
        "display: block;margin: 30px auto;width: fit-content;color: white;background-color: green;border: none;outline: none;padding: 10px;cursor: pointer;";
        result_btn.remove();
        document.querySelector(".container .the-quiz .result-pop").style.display="block";
        document.querySelector(".container .the-quiz .result-pop").onclick=()=>{
          window.scrollTo(0,0)
        }
        let back_btn = document.createElement("button");
        back_btn.textContent = "Back to main page";
        document.querySelector(".container .the-quiz").prepend(back_btn);
        back_btn.style.cssText =
          "display: block;margin: 30px auto;width: fit-content;color: white;background-color: #868686;border: none;outline: none;padding: 10px;cursor: pointer;";
          back_btn.addEventListener("click",()=>{
            window.location.reload();
          })
          console.log(control_click);
    } else {
      caution.style.cssText =
        "float: right;margin-top: 20px;color: red;padding: 10px;display:block;";
    }
  }
  result_btn.addEventListener("click",()=>{
    show_result();
  })
}
document.querySelector(".container .t-or-s div .teacher-b").onclick = () => {
  teacher_div();
};
document.querySelector(".container .t-or-s div .student-b").onclick = () => {
  student_div();
};
document.querySelector(".container .teacher-div .quiz-d").onclick = () => {
  if (document.querySelector(".container .teacher-div input").value === "") {
    document.querySelectorAll(".container .teacher-div span")[0].style.display =
      "block";
  } else if (
    JSON.parse(
      localStorage.getItem(
        document.querySelector(".container .teacher-div input").value
      )
    ) !== null
  ) {
    document.querySelectorAll(".container .teacher-div span")[0].style.display =
      "none";
    document.querySelectorAll(".container .teacher-div span")[1].style.display =
      "block";
  } else {
    question_div();
  }
};
document.querySelector(".container .question-div .add-q").onclick = () => {
  add_question();
};
document.querySelector(".container .student-div .add-q").onclick = () => {
  if (
    document.querySelectorAll(".student-div input")[1].value !== "" &&
    document.querySelectorAll(".student-div input")[0].value !== ""
  ) {
    if (
      JSON.parse(
        localStorage.getItem(
          document.querySelectorAll(".student-div input")[1].value
        )
      ) === null
    ) {
      document.querySelectorAll(".student-div span")[0].style.display = "none";
      document.querySelectorAll(".student-div span")[1].style.display = "block";
    } else {
      quiz_div();
      display_the_quiz();
    }
  } else if (
    document.querySelectorAll(".student-div input")[1].value === "" ||
    document.querySelectorAll(".student-div input")[0].value === ""
  ) {
    document.querySelectorAll(".student-div span")[0].style.display = "block";
  }
};