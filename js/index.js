$("document").ready(function() {
  $("#credit").hide().fadeIn(3000);
  
  // object to track the state of the operation when buttons are pressed
  var resultState = {
    setReady: function() {
      this.result = "";
      this.evaluated = false;
      $("#display").html(this.result);
    },
    setEvaluated: function() {
      this.result = (this.result.length === 0) ? "0" : (String(eval(this.result)).length < 15) ? String(eval(this.result)) : error(); // coercion to string allows for continued concatenation of operations
      this.evaluated = true;
      $("#display").html(this.result);
    },
    getEvaluated: function() {
      return this.evaluated;
    }
  };
  
  function error() {
    resultState.setReady();
    $("#display").html("Error!");
  }
  
  resultState.setReady();
  
  // function to display result on clicking "equals"
  $("#equals").on("click", function() {
    // validate input in accordance with eval() behaviour
    if ((/^((\d)+(\.)(\d)+|(\d))*([\+\-\*\/\%]((\d)+(\.)(\d)+|(\d))*)*$/).test(resultState.result)) {
      resultState.setEvaluated();
    } else {
      error();
    }
  });
  
  // function to clear the display and reset the result variable on clicking "AC"
  $("#ac").on("click", function() {
    resultState.setReady();
  });
  
  // functions to add numbers and operators to the display and the result string
  $(".number").on("click", function() {
    if (resultState.result.length < 15) { // only add new digits if there is enough display space
      if (resultState.getEvaluated()) { // only operators can be concatenated after "equals" is pressed - digit after "equals" resets result
        resultState.result = $(this).text();
        resultState.evaluated = false;
      } else {
        resultState.result += $(this).text();
      }
      $("#display").html(resultState.result);
    }
  });
  
  $(".operator").on("click", function() {
    if (resultState.result.length < 15) {
      if (resultState.getEvaluated()) {
        resultState.evaluated = false;
      }
      resultState.result += $(this).text();
      $("#display").html(resultState.result);
    }
  });
  
});