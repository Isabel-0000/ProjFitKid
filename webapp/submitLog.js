
//List for headings
var subHeadings=[["Eggs","Lean meat / Fish", "Red meat", "Beans / Nuts"],["Fresh / frozen fruit","Fresh / frozen veggies", "Juice", "Canned fruit / Jam"],
                 ["Milk / soymilk","Yogurt", "Cheese", "Ice cream"],["White bread / pasta / rice","Whole grains", "Cereal", "Muffins, rolls, etc."],
                 ["Chips","Fast food", "Soda / Candy", "Donuts / Pastries"],
                 ["Arobic Exercise","Weight Bearing", "Walking or Stairs", "Other"]];
var names = new Array();
var star=false;

//Called on completion of log when user hits continue button 
function log(){
	
	var formNames=["proteinForm","fruitVeggieForm","dairyForm","carbForm","junkFoodForm","exerciseForm"];
	var headings= ["Protein","Fruits / Veggies", "Dairy" , "Carbohydrates", "Junk Food", "Exercise"];
	var count=1;
	//Records user input
	for (var i = 0;i<headings.length;i++)
		{
		for(var j =0;j<subHeadings[0].length;j++)
			{
			names[count]=document.forms[formNames[i]][subHeadings[i][j]].value;
			count ++;
			}
		
		}
	

	document.getElementById('logs').innerHTML="";
	document.getElementById('continueButton').innerHTML="";
	getSuggestions();
	
	
		
}

// Writes the log page to log.html when the page is loaded
function getLog(){
	var row = document.getElementById('logs');
	
	var formNames=["proteinForm","fruitVeggieForm","dairyForm","carbForm","junkFoodForm","exerciseForm"];
	var headings= ["Protein","Fruits / Veggies", "Dairy" , "Carbohydrates", "Junk Food", "Exercise"];
	
	
	for(var j = 0; j < headings.length; j ++){
		var form = document.createElement('form');
		form.setAttribute("name", formNames[j]);
		row.appendChild(form);
		var div = document.createElement('div');
		div.setAttribute("class","col-sm-6 col-md-4");
		form.appendChild(div);
		var div2 = document.createElement('div');
		div2.setAttribute("class","thumbnail");
		div.appendChild(div2);
		var h3 = document.createElement('h3');
		h3.setAttribute("style", "text-align:center; color:black");
		div2.appendChild(h3);
		h3.innerHTML=headings[j];
		
		for(var i =0; i< subHeadings[0].length; i++){
			var div3=document.createElement('div');
			div3.setAttribute("class","input-group");
			div3.setAttribute("style","padding-bottom:10px");
			div2.appendChild(div3);
			var span= document.createElement('span');
			span.setAttribute("class", "input-group-addon");
			span.setAttribute("id", "basic-addon2");
			span.innerHTML=subHeadings[j][i];
			div3.appendChild(span);
			input = document.createElement('input');
			input.setAttribute("type","number");
			input.setAttribute("name",subHeadings[j][i]);
			input.setAttribute("min","0");
			if (j<5){
				input.setAttribute("placeholder","How many servings?");
			}
			else{
				input.setAttribute("placeholder","How many minutes?");
			}
			input.setAttribute("class","form-control");
			input.setAttribute("aria-describedby","basic-addon1");
			div3.appendChild(input);
			
		}
		
		
		
		
	}
}

// Clears log page and creates and writes suggestions based on user input
function getSuggestions(){
	var recommendations=new Array(6);
	var score = 0.0;
	//Exercise
	var totalExercise= names[21]+names[22]+names[23]+names[24];
	if (names[21]<30 && totalExercise > 60){
		recommendations[6]="Good job on the exercise overall. Try to get some more aerobic exercise in!";
		score += 0.5;
	}
	else if(totalExercise<60){
		recommendations[6]="Do more exercise!";
	}
	else if (totalExercise>=60){
		recommendations[6]="Great job with your exercise!";
		score ++;
	}
	
	//Carbs
	var totalCarbs= names[13]+names[14]+names[15]+names[16];
	if ((totalCarbs/2)>names[14] && totalCarbs>2 && totalCarbs<7){
		score +=0.5;
		recommendations[4]="Try to eat more whole grains.";
	}
	else if (totalCarbs<2){
		recommendations[4]="Eat more carbohydrates!";
	}
	else if (totalCarbs>7){
		recommendations[4]="Eat less carbohydrates!";
	}
	else if (totalCarbs>=2 && totalCarbs<=7){
		recommendations[4]="You're doing great with the carbs.";
		score ++;
	}
	
	//Protein
	var totalProtein= names[1]+names[2]+names[3]+names[4];
	if (totalProtein<2){
		recommendations[1]="Try to eat more protein!";
	}
	else if (totalProtein > 1 && totalProtein <5){
		recommendations[1]="You're doing good with the protein!";
		score ++;
	}
	else if (totalProtein>=5){
		recommendations[1]="Gaston! You're actually getting more protein than you need.";
		score += 0.5;
	}
	
	//Junk food
	var  totalJunk= names[17]+names[18]+names[19]+names[20];
	if (totalJunk>5)
		recommendations[5]="Uh oh! You need to cut down on the junk food!";
	else if (totalJunk>2)
		recommendations[5]="A bit less junk food would be good.";
	else if (totalJunk<=2){
		recommendations[5]="Keep up the good work limiting junk food!";
		score ++;
	}
	
	//Fruits / Veggies
	if (names[5]>2 && names[6]>3){
		score ++;	
		recommendations[2]="Keep up the good work eating lots of fresh fruits and veggies!";
		}
	else if (names[5]>2 && names[6]<=3){
		recommendations[2]="You're eating plenty of fruit, but work on getting more veggies.";
		score +=0.5;
	}
	else if (names[5]<=2 && names[6]>3){
		recommendations[2]="You're getting plenty of veggies, but try to eat more fruit!";
		score +=0.5;
	}
	else if (names[6]<=3 && names[5]<=2 && names[7]>1)
		recommendations[2]="Try to eat more fresh fruit and veggies! Hint: only 1 serving of juice counts.";
	else if (names[6]<=3 && names[5]<=2)
		recommendations[2]="Try to eat more fresh fruit and veggies!";
	
	// Dairy
	var totalDairy= names[9]+names[10]+names[11]+names[12];
	if (totalDairy>2 && names[12]<=1){
		recommendations[3]= "Good job on the dairy!";
		score ++;
	}
	else if (totalDairy>2 && names[12]>1)
		recommendations[3]= "Ummmm... You really like ice cream, don't you?";
	else if (totalDairy<=2)
		recommendations[3]= "Try to eat/drink more dairy or soymilk!";
	
	// If food and exercise is good, a star is earned
	if(score>=4.5){
		star=true;
	}
	
	var listGroup = document.getElementById('Suggestions');
	
	// If the user has not filled out the log form, an error is written to the page
	if(totalDairy+totalJunk+totalProtein+totalCarbs+totalExercise+names[4]+names[5]+names[6]+names[7]==0){
		var div = document.createElement('div');
		div.setAttribute("class", "panel panel-primary");
		var p =document.createElement('p');
		p.setAttribute("class","list-group-item-text");
		p.innerHTML="Please fill out the log for today.";
		div.appendChild(p);
		listGroup.appendChild(div);
		return;
	}
	
	// Writes recommendations
	var headings= ["Protein","Fruits / Veggies", "Dairy" , "Carbohydrates", "Junk Food", "Exercise"];
	var paragraphTexts = [recommendations[1],recommendations[2],recommendations[3],recommendations[4],recommendations[5],recommendations[6]];
	for (var j = 0; j < headings.length; j ++) {
		var div = document.createElement('div');
		div.setAttribute("class", "panel panel-primary");
		var h4 = document.createElement('h4');
		h4.setAttribute("class", "list-group-item-heading");
		h4.innerHTML=headings[j];
		var p =document.createElement('p');
		p.setAttribute("class","list-group-item-text");
		p.innerHTML=paragraphTexts[j];
		div.appendChild(h4);
		div.appendChild(p);
		listGroup.appendChild(div);
	
	}
	// Tells user if they have earned a star or not
	img = document.createElement("img");
	img.src = "http://www.elm.org/wp-content/uploads/2014/05/gold-star.jpg";
	img.setAttribute('width','400px');
	
		var div=document.createElement('div');
		var p=document.createElement('p');
		if(star){
			p.innerHTML= "Congratulations! You earned a star today!";
			p.appendChild(img);
			
		}
		else
			p.innerHTML= "Sorry, no star today. Try again tomorrow!";
		div.appendChild(p);
		listGroup.appendChild(div);
		
	
}

// Puts star verdict on award page
function getAwards(){
	var row = document.getElementById('awards');
	var div=document.createElement('div');
	if (star){
		div.setAttribute('class',"panel panel-success");
		div.innerHTML="Congratulations! You have earned a star today.";
}
	else{
		div.setAttribute('class',"panel panel-danger");
		div.innerHTML="Sorry, no star! Try again tomorrow.";
	}
	row.appendChild(div);
}

