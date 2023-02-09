

let bgCount = 0;
let bgCols = ["#1a0d16","#1b180e","#112423","#241111","#171124"];
function changeCol()
{
	bgCount += 1;
	if(bgCount >= bgCols.length) bgCount = 0;
	document.body.style.backgroundColor = bgCols[bgCount];
	generateImage();
}

let fontcount = 0;
let fonts = ["Lato","Alegreya","Great Vibes"];

function changeFont()
{
	//let buttonCols = ["#0f080d","#1b180e","#112423","#241111","#171124"];
	fontcount += 1;
	if(fontcount >= fonts.length) fontcount = 0;
	document.body.style.fontFamily = fonts[fontcount];
	generateImage();
}

function buttonGenerate()
{
	let label = document.getElementById("text");
	let basis = [];
	let nouns = [];
	let verbs = [];
	let adjs = [];
	
	fetch('inspirator.txt')
		.then(response => response.text())
		.then(text => {
			let lines = text.split('\n');
			//console.log(lines[1]);
			var readingState = 0;
			for(var i = 0; i < lines.length; i++)
			{
				// State codes: 1 - Basis, 2 - Noun, 3 - Verb, 4 - Adjective
				//console.log(readingState);
				if(lines[i].includes("--Basis--")) readingState = 1;
				if(lines[i].includes("--Nouns--")) readingState = 2;
				if(lines[i].includes("--Verbs--")) readingState = 3;
				if(lines[i].includes("--Adjectives--")) readingState = 4;
				if(lines[i].startsWith("--")) continue;

				switch(readingState)
				{
					case 1:
						basis.push(lines[i].trim());
						break;
					case 2:
						nouns.push(lines[i].trim());
						break;
					case 3:
						verbs.push(lines[i].trim());
						break;
					case 4:
						adjs.push(lines[i].trim());
						break;
				}
			}

			let theSentence = "";
			theSentence = basis[Math.floor(Math.random() * basis.length)];
			
			do
			{
				theSentence = theSentence.replace("$noun",nouns[Math.floor(Math.random() * nouns.length)].replace(" ",""));
				theSentence = theSentence.replace("$verb",verbs[Math.floor(Math.random() * verbs.length)].replace(" ",""));
				theSentence = theSentence.replace("$adj",adjs[Math.floor(Math.random() * adjs.length)].replace(" ",""));
				let randomInt = Math.floor(Math.random() * (3)) + 1;
				console.log(randomInt);
				if(randomInt == 1) theSentence = theSentence.replace("$blank",nouns[Math.floor(Math.random() * nouns.length)].replace(" ",""));
				if(randomInt == 2) theSentence = theSentence.replace("$blank",verbs[Math.floor(Math.random() * verbs.length)].replace(" ",""));
				if(randomInt == 3) theSentence = theSentence.replace("$blank",adjs[Math.floor(Math.random() * adjs.length)].replace(" ",""));
			} while(theSentence.includes('$'));

			setTimeout(function() {
				label.classList.add("changing");
				setTimeout(function() {
				  label.textContent = theSentence;
				  label.textContent = label.textContent.charAt(0).toUpperCase() + label.textContent.slice(1);
				  console.log(theSentence);
				  label.classList.remove("changing");
				  generateImage();
				}, 200);
			  }, 200);

			
		})
	
	
}

function generateImage()
{
	let label = document.getElementById("text");
	let canvas = document.getElementById("saveCanvas");
	let context = canvas.getContext("2d");
	context.clearRect(0,0,document.getElementById("saveCanvas").width,document.getElementById("saveCanvas").height);
	context.font = "32px "+fonts[fontcount];
	context.textAlign = "center";
	context.beginPath();
	context.rect(0,0,canvas.width,canvas.height);
	context.fillStyle = bgCols[bgCount];
	context.fill();
	context.fillStyle = "aliceblue";
	context.fillText("Inspirator",canvas.width/2,64);
	wrapText(context, label.textContent, canvas.width/2, canvas.height/2, 450, 40);
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
	var line = '';

	for(var n = 0; n < words.length; n++) {
	  var testLine = line + words[n] + ' ';
	  var metrics = context.measureText(testLine);
	  var testWidth = metrics.width;
	  if (testWidth > maxWidth && n > 0) {
		context.fillText(line, x, y);
		line = words[n] + ' ';
		y += lineHeight;
	  }
	  else {
		line = testLine;
	  }
	}
	context.fillText(line, x, y);
  }