$(document).ready(function(){
	// Set the answer to a random card.
	var xanswer = Math.floor((Math.random()*10)+1);
	var yanswer = Math.floor((Math.random()*10)+1);

	// Define some useful colors.  Using RGB for ease of manipulation.
	var blue = "rgb(0,154,196)";
	var red = "rgb(196,42,0)";
	var gold = "rgb(255,215,0)";

	// More to come, including creating each of the cards from the "Card"
	// object, adding them to the DOM, then making them interactive.

});

var Card = {
	// Object from which we create each card in the game.
	var xposition = this.xposition;
	var yposition = this.yposition;
	var distance = calcDistance(xposition,xanswer,yposition,yanswer);
	var color = calcColor(distance);
	// More to come

}
function calcAbsoluteDistance(xposition, yposition){
	// Calculates and returns the distance of the card, the position of which is
	// given by the xposition and yposition arguments, from the answer.
	// Will return 0 if the run on the answer, otherwise a float equal to one or
	// greator.  Calculation is based of the Pythagorian theorem (c^2 = a^2 + b^2). 
	var xdistance = xposition - xanswer;
	var ydistance = yposition - yanswer;
	return Math.sqrt(Math.pow((xdistance),2) + Math.pow((ydistance),2));
}
function relativeDistance(xposition, yposition){
	// Returns a float between 1 and 0 equal to the ratio between the following two
	// numbers: (1) the distance from the answer to the card at xposition, yposition,
	// and (2) the distance from the answer to the farthest card on the board.
	var topLeft = calcAbsoluteDistance(1,1);
		var topRight = calcAbsoluteDistance(10,1);
		var bottomLeft = calcAbsoluteDistance(1,10);
		var bottomRight = calcAbsoluteDistance(10,10)
		var maxDistance = Math.max(topLeft, topRight, bottomLeft, bottomRight)
		return (calcAbsoluteDistance(xposition,yposition) / maxDistance)
}
function calcColor(xposition,yposition){
	// Calculates the color of the card.  If the card is the answer then we return gold.
	// Otherwise we calculate a color in between red and blue based on the relativeDistance
	// of the card.
	if(absoluteDistance(xposition,yposition)===0){
		return gold;
	} else {
		// Calculates each of the red, green and blue components of the card's color
		// by taking the difference between the "hot" component and "cold" component,
		// multiplying that by the relativeDistance of the card, and then adding back in
		// the lower of the two components.
		// For example, the green component of "hot" is 42 and the green component of cold
		// is 154.  If the card were 3/4 of the way from the answer to the coldest card, then
		// the green component of the card would be the difference between the two (154-42)
		// times the relativeDistance (3/4) plus the lower of "hot" and "cold" compoonents (42).
		var redComponent = Math.floor(Math.abs(196-0)) * relativeDistance(xposition,yposition)) + Math.min(196,0)
		var greenComponent = Math.floor(Math.abs(42-154)) * relativeDistance(xposition,yposition)) + Math.min(42,154)
		var blueComponent = Math.floor(Math.abs(0-196)) * relativeDistance(xposition,yposition)) + Math.min(0,196)
		return ("rgb(" + redComponent + "," + greenComponent + "," + blueComponent + ")")
	}
}