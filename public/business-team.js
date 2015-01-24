$( document ).ready(function() {

   var myBar = new progressBar(50);

   // Animate the progress bar
      animate(myBar);
      console.log("finished first animation");

	panels[0].makePanel();
});

//$('#pane').append("<div class='col-md-5'>content</div>");

function newPanel(control, action, size) {
	$('#topRow').append("<div class='col-md-" + size + "'>" + control + "<br /><button type='button' class='btn btn-default btn-primary'>" + action + "</button></div>");
}

function wipeRow() {
	$('#topRow').empty();
}
function animate(myBar) {
   console.log("starting to animate");
   myBar.adjustProgressBar();
   setTimeout(myBar.animate, 100);
}

function progressBar(startingPercent) {
   this.percent = startingPercent;
   $('#progressbar').append("<div class='progress-bar progress-bar-striped active' id='thebaritself' role='progressbar' aria-valuenow='45' aria-valuemin='0' aria-valuemax='100' style='width: " + this.percent + "%'>");

   this.getPercent = function() {
      return this.percent;
   }

   this.setPercent = function(newPercent) {
      $("#thebaritself").width(newPercent + "%");
      this.percent = newPercent;
   }

   this.adjustProgressBar = function() {
      console.log("starting to adjust");
      console.log("percent is " + this.percent);

      if (this.percent >= 100) {
         console.log("got too wide");
         this.setPercent(0);
      }

      this.setPercent(this.getPercent() +10);
      console.log("percent is now " + this.percent);

   }
}

panels = new Array();
panels.push(new Panel("Business Socks", "switch", "3", "Put on", "Take off"))

function Panel(control, inputType, divWidth, action1, action2, action3) {
	this.control = control;
	this.action1 = action1;
	this.action2 = action2;
	this.action3 = action3;
	this.inputType = inputType;
	this.divWidth = divWidth;

	this.makePanel = function() {
		console.log(inputType);
		switch (this.inputType) {
			case "button":
				$('#topRow').append("<div class='col-md-" + divWidth + "'>" + control + "<br /><button type='button' class='btn btn-default btn-primary'>" + action1 + "</button></div>");
				break;

			case "switch":
				console.log("yolo");
				$('#topRow').append("<div class='col-md-" + divWidth + "'>" + control + "<br /><div class='btn-group' data-toggle='buttons'><label class='btn btn-primary'><input type='radio' name='control' id='option1' autocomplete='off' checked>" + action1 + "</label><label class='btn btn-primary'><input type='radio' name='options' id='option2' autocomplete='off'>" + action2 + "</label></div></div>");
				break;
		}
	}
}
