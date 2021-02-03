var quiz = {
    draw : function () {

      var wrapper = document.getElementById("quiz-wrap");
  
      for (var index in questions) {
        var number = parseInt(index) + 1; 
        var qwrap = document.createElement("div"); 
        qwrap.classList.add("question"); 
  
        var question = document.createElement("h1");
        question.innerHTML = number + ") " + questions[index]['q'];
        qwrap.appendChild(question);
  
        for (var oindex in questions[index]['o']) {
          var label = document.createElement("label");
          qwrap.appendChild(label);
  
          var option = document.createElement("input");
          option.type = "radio";
          option.value = oindex;
          option.required = true;
          option.classList.add("oquiz"); 
  
          option.name = "quiz-" + number;
          label.appendChild(option);
  
          var otext = document.createTextNode(questions[index]['o'][oindex]);
          label.appendChild(otext);
        }
  
        wrapper.appendChild(qwrap);
      }
  
      var submitbutton = document.createElement("input");
      submitbutton.type = "submit";
      wrapper.appendChild(submitbutton);
      wrapper.addEventListener("submit", quiz.submit);
    },
  
    submit : function (evt) {
  
      evt.preventDefault();
      evt.stopPropagation();
  
      var selected = document.querySelectorAll(".oquiz:checked");
  
      var score = 0;
      for (var index in questions) {
        if (selected[index].value == questions[index]['a']) {
          score++;
        }
      }
  
      var total = selected.length;
      var percent = score / total ;
  
      var html = "<h1>";
      if (percent>=0.8) {
        html += "FELICITARI, ESTI UN ASTRONOM PRICEPUT!";
      } else if (percent>=0.5) {
        html += "FOARTE BINE, CUNOSTINTELE TALE DE ASTRONOMIE SUNT PESTE MEDIE!";
      } else {
        html += "DOCUMENTEAZA-TE SI MAI INCEARCA!";
      }
      html += "</h1>";
      html += "<div>" + score + " corecte din " + total + ".</div>";
      document.getElementById("quiz-wrap").innerHTML = html;
    }
  };
  
  window.addEventListener("load", quiz.draw);