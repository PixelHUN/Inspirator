function changeCol()
{
	let bgCols = ["#1a0d16","#1b180e","#112423","#241111","#171124"];
	//let buttonCols = ["#0f080d","#1b180e","#112423","#241111","#171124"];
	var col = document.body.style.backgroundColor;
	do
	{
		document.body.style.backgroundColor = bgCols[Math.floor(Math.random() * bgCols.length)];
	} while(col == document.body.style.backgroundColor);
}

let fontcount = 0;

function changeFont()
{
	let fonts = ["Lato","Alegreya","Great Vibes"];
	//let buttonCols = ["#0f080d","#1b180e","#112423","#241111","#171124"];
	fontcount += 1;
	if(fontcount >= fonts.length) fontcount = 0;
	document.body.style.fontFamily = fonts[fontcount];
}


function buttonGenerate()
{
	var label = document.getElementById("text");
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
						basis.push(lines[i]);
						break;
					case 2:
						nouns.push(lines[i]);
						break;
					case 3:
						verbs.push(lines[i]);
						break;
					case 4:
						adjs.push(lines[i]);
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
				}, 200);
			  }, 200);

			
		})
	
	
}