var a, b;
var rw, rh;
var circle = [];
var portCircle = [];
var CirX;
var Phase = 1;
var Col = [];
var img = [];
var video;
var button = [];
var Text;
var html = [];
var addedPos = [];
var avatarPos = [];
var imgPos = [];
var page = 0;
var pagePos = [0,0,0,0];
var buttonSize = 64;

function preload() {
	img[0] = loadImage("assets/share.png");
	img[1] = loadImage("assets/avatar/head.png");
	img[2] = loadImage("assets/avatar/hair.png");
	img[3] = loadImage("assets/avatar/glasses.png");
	img[4] = loadImage("assets/avatar/brows.png");
	img[5] = loadImage("assets/avatar/mouth.png");
	img[6] = loadImage("assets/avatar/LHand.png");
	img[7] = loadImage("assets/avatar/RHand.png");
	img[8] = loadImage("assets/avatar/body.png");
	img[9] = loadImage("assets/avatar/pants.png");
	img[10] = loadImage("assets/avatar/LShoe.png");
	img[11] = loadImage("assets/avatar/RShoe.png");
	img[12] = loadImage("assets/telephone.png");
	img[13] = loadImage("assets/aboutMe.png");
	img[14] = loadImage("assets/skills.png");
	img[15] = loadImage("assets/cv.png");
	img[16] = loadImage("assets/portfolio.png");

	img[17] = loadImage("assets/Skills/PS.png");
	img[18] = loadImage("assets/Skills/AI.svg");
	img[19] = loadImage("assets/Skills/unity.png");
	img[20] = loadImage("assets/Skills/maya.png");
	img[21] = loadImage("assets/Skills/blender.png");
	img[22] = loadImage("assets/Skills/nodeJS.png");
	img[23] = loadImage("assets/Skills/CSharp.png");
	img[24] = loadImage("assets/Skills/singing.png");

	imageMode(CENTER);
}

function setup() {

	rw = window.innerWidth;
	rh = window.innerHeight;
	createCanvas(rw, rh);
	stroke(255);
	strokeWeight(0);
	textAlign(CENTER);
	textSize(32);
	textFont("helvetica");

	setupHTML()

	avatarPos = [rw*0.5,rh*0.5,0.6];

	leftBarTarX = 64*1.5;
	leftBarX = leftBarTarX;
	mouseX = rw*0.5;

	buttonSetup();

	portCircle = [120,135,210];

	Col[0] = [110, 212, 161];
	Col[1] = [92 , 194, 143];
	Col[2] = [255,255,255,0];
	Col[3] = [175,215,215];
	Col[4] = [101,203,152];
	// Col[4] = [160,203,216];
	a = 255*0.5;
	b = 255*0.35;
	Col[5] = [a+random(b),a+random(b),a+random(b)];

	//0x, 1y, 2currentSize, 3targetSize, 4sizeRate
	circle[0] = [0.5, 0.5, 0, rh*0.3, 0.5];

}

function draw() {
  
	worldCalculations();

	background(255);

	// left bar
	stroke(Col[0]);
	fill(Col[0]);
	rect(0,0,leftBarX,rh);

	drawAvatar(1);
	drawAvatar(2);

	leftBar();

	Page1();
	Page2();
	Page3();
	Page4();
	Page5();

	pageDrawer(); // circle indications of which page you're in

	// if page is in a vertical dimension
	if (rh > rw) {
		background(Col[0]);
		fill(255);
		text("The website \n is not designed \n for this dimension yet.", rw*0.5+leftBarX-64*1.5,rh*0.5);
	}

}

function keyPressed () {
	if (keyCode == 32) {
		console.log("Space Pressed");
		console.log("https://www.youtube.com/embed/zw1XLrZ-Spg");
	}
}


function resetCanvas() {
	rw = window.innerWidth*1;
	rh = window.innerHeight*1;
	resizeCanvas(rw, rh);

	buttonSetup();

}

function NotUsingYet () {
	if (Phase == 2) {
		for (i = 0; i < circle.length; i ++) {
			if (circle[i][2] < circle[i][3]) { // current size smaller than target size
				circle[i][4] += 2;
				circle[i][4] *= 0.95;
			}
			if (circle[i][2] > circle[i][3]) { // current size bigger than target size
				circle[i][4] -= 2;
				circle[i][4] *= 0.95;
			}
			if (abs(circle[i][2]-circle[i][3]) < 10 && abs(circle[i][4]) < 10) { // if current size and target size is close
				circle[i][2] = circle[i][3];
			}
			if (dist(mouseX,mouseY,circle[i][0]*rw,circle[i][1]*rh) < circle[i][3]*0.5) { // if mouse close to circle
				circle[i][3] = rh*0.65;
			} else {
				circle[i][3] = rh*0.4;
			}
			circle[i][2] += circle[i][4]; // current size adds by size rate
			ellipse(rw*circle[i][0],rh*circle[i][1],circle[i][2], circle[i][2]); //
		}
	}
}

function drawAvatar(Type) {

	// avatarPos[0] = (avatarPos[0]*15+mouseX)/16;
	// avatarPos[1] = (avatarPos[1]*15+mouseY)/16;

	if (Type == 1) {
		avatarPos[0] = portCircle[0];
		avatarPos[1] = portCircle[1]+12;
		addedPos[0] = (mouseX-avatarPos[0])*0.04*avatarPos[2];
		addedPos[1] = (mouseY-avatarPos[1])*0.05*avatarPos[2];

		fill(255);
		strokeWeight(0);
		ellipse(portCircle[0],portCircle[1],portCircle[2],portCircle[2]);
	}
	if (Type == 2) {
		avatarPos[0] = portCircle[0]*1.3+portCircle[2]*0.5+rw;
		avatarPos[1] = portCircle[1]+12;
		addedPos[0] = (mouseX-avatarPos[0])*0.04*avatarPos[2];
		addedPos[1] = (mouseY-avatarPos[1])*0.05*avatarPos[2];
	}
	
	image(img[1],avatarPos[0],avatarPos[1],img[1].width*avatarPos[2],img[1].height*avatarPos[2]); // head
	image(img[2],avatarPos[0]+addedPos[0]*0.2,avatarPos[1]-80*avatarPos[2]+addedPos[1]*0.2,img[2].width*avatarPos[2],img[2].height*avatarPos[2]); // hair
	image(img[3],avatarPos[0]+addedPos[0],avatarPos[1]+10*avatarPos[2]+addedPos[1],img[3].width*avatarPos[2],img[3].height*avatarPos[2]); // glasses
	image(img[4],avatarPos[0]+addedPos[0],avatarPos[1]-35*avatarPos[2]+addedPos[1],img[4].width*avatarPos[2],img[4].height*avatarPos[2]); // brows
	image(img[5],avatarPos[0]+addedPos[0]*0.25,avatarPos[1]+70*avatarPos[2]+addedPos[1]*0.25,img[5].width*avatarPos[2],img[5].height*avatarPos[2]); // mouth
	image(img[6],avatarPos[0]+85*avatarPos[2]-addedPos[0]*0.05,avatarPos[1]+233*avatarPos[2]-addedPos[1]*0.05,img[6].width*avatarPos[2],img[6].height*avatarPos[2]); // LHand
	image(img[7],avatarPos[0]-85*avatarPos[2]-addedPos[0]*0.05,avatarPos[1]+233*avatarPos[2]-addedPos[1]*0.05,img[7].width*avatarPos[2],img[7].height*avatarPos[2]); // RHand
	image(img[8],avatarPos[0]-addedPos[0]*0.05,avatarPos[1]+200*avatarPos[2]-addedPos[1]*0.05,img[8].width*avatarPos[2],img[8].height*avatarPos[2]) // body
	image(img[9],avatarPos[0]-addedPos[0]*0.05,avatarPos[1]+385*avatarPos[2]-addedPos[1]*0.05,img[9].width*avatarPos[2],img[9].height*avatarPos[2]) // pants
	image(img[10],avatarPos[0]+55*avatarPos[2]-addedPos[0]*0.05,avatarPos[1]+497*avatarPos[2]-addedPos[1]*0.05,img[10].width*avatarPos[2],img[10].height*avatarPos[2]) // LShoe
	image(img[11],avatarPos[0]-54*avatarPos[2]-addedPos[0]*0.05,avatarPos[1]+497*avatarPos[2]-addedPos[1]*0.05,img[11].width*avatarPos[2],img[11].height*avatarPos[2]) // RShoe
	

	strokeWeight(0);
	
	if (Type == 1) {
		fill(Col[0]);
		rect(portCircle[0]-portCircle[2]*0.5,portCircle[1]+portCircle[2]*0.5-3,portCircle[2],portCircle[2]*2);
		rect(portCircle[0]-portCircle[2]*0.5+portCircle[2]*0.665,portCircle[1]+portCircle[2]*0.5-10,50,50);
		rect(portCircle[0]-portCircle[2]*0.5+portCircle[2]*0.1,portCircle[1]+portCircle[2]*0.5-10,50,50);
		rect(portCircle[0]-portCircle[2]*0.5+portCircle[2]*0.725,portCircle[1]+portCircle[2]*0.5-15,50,50);
		rect(portCircle[0]-portCircle[2]*0.5+portCircle[2]*0.05,portCircle[1]+portCircle[2]*0.5-15,50,50);

		fill(Col[2]);
		stroke(Col[1]);
		strokeWeight(8);
		ellipse(portCircle[0],portCircle[1],portCircle[2],portCircle[2]);
	}

	if (Type == 2) {
		fill(255);
		rect(portCircle[0]*1.3+rw,portCircle[1]+portCircle[2]*0.5-3,portCircle[2],portCircle[2]*2);
		rect(portCircle[0]*1.3+rw+portCircle[2]*0.665,portCircle[1]+portCircle[2]*0.5-10,50,50);
		rect(portCircle[0]*1.3+rw+portCircle[2]*0.1,portCircle[1]+portCircle[2]*0.5-10,50,50);
		rect(portCircle[0]*1.3+rw+portCircle[2]*0.725,portCircle[1]+portCircle[2]*0.5-15,50,50);
		rect(portCircle[0]*1.3+rw+portCircle[2]*0.05,portCircle[1]+portCircle[2]*0.5-15,50,50);

		fill(Col[2]);
		stroke(Col[1]);
		strokeWeight(8);
		ellipse(portCircle[0]*1.3+portCircle[2]*0.5+rw,portCircle[1],portCircle[2],portCircle[2]);
	}

}

function pageDrawer() {

	for (i = 0; i < 5; i++) {
		if (page == i) {
			fill(Col[1]);
		} else {
			fill(Col[3]);
		} 

		ellipse(rw*0.96+leftBarX-96,rh*0.5+32*(-1+i),10,10);
	}

}

function worldCalculations () {
	if (rw != window.innerWidth || rh != window.innerHeight) {
		resetCanvas();
	}

	if (mouseX < leftBarX) {
		leftBarTarX = 64*6.5;
	} else {
		leftBarTarX = 64*1.5;
	}

	pagePos[3] = page*-rh;
	pagePos[1] = (pagePos[1]*10+pagePos[3])/11;

	// html[0].position(rw*0.5,rh*0.5);

	leftBarX = (leftBarX*10 + leftBarTarX)/(11);
	portCircle[0] = leftBarX-280;
}

function leftBar() {
	for (i = 0; i < 5; i++) {
		button[i][0] = 38+4*(leftBarX/64*1.5);

		// if button collision area
		a = buttonSize;
		if (button[i][1]-mouseY <= a && button[i][1]-mouseY >= a*-5 && mouseX < leftBarX) {
			if (page == i) {
				stroke(Col[1]);
				fill(Col[1]);
			} else {
				stroke(Col[4]);
				fill(Col[4]);
			}
			rect(0,button[i][1]-a,leftBarX,6*a);
			button[i][0] = 6+4*(leftBarX/(4*16))*1.5+2*16+16*0.75;

			if (mouseIsPressed) {
				page = i;
			}
		} else if (page == i) {
			stroke(Col[1]);
			fill(Col[1]);
			rect(0,button[i][1]-a,leftBarX,a*6);
			button[i][0] = 16*2.375+4*(leftBarX/(16*4)*1.5);
		}

		if (i == 0) {
			fill(255);
			strokeWeight(0);
			ellipse(button[i][0],button[i][1]+2.375*buttonSize,buttonSize*3,buttonSize*3);
			Text = "About Me";
		} else if (i == 1) {
			Text = "Skill Set";
		} else if (i == 2) {
			Text = "Portfolio";
		} else if (i == 3) {
			Text = "Curriculum Vitae (CV)";
		} else if (i == 4) {
			Text = "Contacts";
		}
		fill(255);
		textSize(24);
		strokeWeight(0);
		textAlign(LEFT);
		textStyle(NORMAL);
		text(Text,button[i][0]+a*4*1.25,button[i][1]+a*3);

	}

	textSize(16);
	text("Phone: \n(852) 55166039",265,95);
	text("E-mail: \njusticekawuma@ \ngmail.com",265,165);

	// left bar boarder
	strokeWeight(0);
	stroke(Col[1]);
	fill(Col[1]);
	rect(leftBarX-rw*0.005,0,rw*0.005+4,rh);

	// button image
	image(img[13], button[0][0], button[0][1]+a*2,buttonSize*4,buttonSize*4);
	image(img[14], button[1][0], button[1][1]+a*2,buttonSize*4,buttonSize*4);
	image(img[16], button[2][0], button[2][1]+a*2,buttonSize*4,buttonSize*4);
	image(img[15], button[3][0], button[3][1]+a*2,buttonSize*4,buttonSize*4);
	image(img[12], button[4][0], button[4][1]+a*2,buttonSize*4,buttonSize*4);
}

function Page1 () { // Home
	textPos = [rw*0.5+leftBarX-96*2.75, rh*0.475+pagePos[1]];
	if (textPos[1] < 0 || textPos[1] > rh) {
		textPos[0] = -1000;
		textPos[1] = rh*0.5;
	}
	html[0].position(textPos[0],textPos[1]);
}

function Page2 () { // Skill Set
	textPos = [rw*0.5+leftBarX-96*1.6,rh*1.05+pagePos[1]];
	if (textPos[1] < 0 || textPos[1] > rh) {
		textPos[0] = -1000;
		textPos[1] = rh*0.5;
	}
	html[1].position(textPos[0],textPos[1]);

	imageSize = 96/1750*rw;
	num = 8;
	for (i = 0; i < num; i++) {
		image(img[17+i],rw*0.5+leftBarX+(imageSize*1.5)*i-(imageSize*1.5)*(num*0.5)-imageSize*0.25,rh*1.9+pagePos[1],(imageSize/img[17+1].width)*img[17+1].width,(imageSize/img[17+1].width)*img[17+1].width);
	}
}
function Page3 () { // Portfolio
	textPos = [rw*0.5+leftBarX-96*1.75,rh*2.05+pagePos[1]];
	imgPos[0] = textPos[0];
	imgPos[1] = textPos[1];
	if (textPos[1] < 0 || textPos[1] > rh) {
		textPos[0] = -1000;
		textPos[1] = rh*0.5;
	}
	if (imgPos[1] < -rh || imgPos[1] > rh) {
		imgPos[0] = -1000;
		imgPos[1] = rh*0.5;
	}
	html[2].position(textPos[0],textPos[1]);

	// document.getElementById("videoPosY").innerHTML = textPos[1];
	sessionStorage.setItem("videoX",imgPos[0]-rw*0.2);
	sessionStorage.setItem("videoY",imgPos[1]+rh*0.19);
	sessionStorage.setItem("frameWidth",rw*0.5);
}
function Page4 () { // CV
	textPos = [rw*0.5+leftBarX-96*2.5,rh*3.05+pagePos[1]];
	imgPos[0] = textPos[0]+125-rh*0.25;//-rh*0.13;//+rw/rh*12.5;
	imgPos[1] = textPos[1]+rh*0.15;
	if (textPos[1] < 0 || textPos[1] > rh) {
		textPos[0] = -1000;
		textPos[1] = rh*0.5;
	}
	if (imgPos[1] < -rh || imgPos[1] > rh) {
		imgPos[0] = -1000;
		imgPos[1] = rh*0.5;
	}
	fill(Col[0]);
	rect(-20+imgPos[0],-20+imgPos[1],+rh*0.75*0.7+35,rh*0.75+35);
	fill(Col[1]);
	rect(10+imgPos [0],10+imgPos [1],rh*0.75*0.7+5,rh*0.75+5);
	html[3].position(textPos[0],textPos[1]);
	html[5].position(imgPos[0],imgPos[1]);
	html[5].size(rh*0.75*0.7,rh*0.75);
}
function Page5 () { // contacts
	textPos = [rw*0.5+leftBarX-96*1.7,rh*4.05+pagePos[1]];
	if (textPos[1] < 0 || textPos[1] > rh) {
		textPos[0] = -1000;
		textPos[1] = rh*0.5;
	}
	html[4].position(textPos[0],textPos[1]);
}

function setupHTML() {

	html[0] = createElement("H1","How are you today?");
	html[1] = createElement("H1","Skill Set");
	html[2] = createElement("H1","Portfolio");
	html[3] = createElement("H1","Curriculum Vitae");
	html[4] = createElement("H1","Contacts");
	html[5] = createImg("assets/CV.jpg");
	html[5].position(rw*0.475,rh*0.6);

}

function buttonSetup() {
	// set up left buttons
	if (rh < 800) {
		buttonSize = rh*(16/800);
		if (buttonSize > 16) {buttonSize = 16;}
	}
	for (i = 0; i < 5; i++) {
		button[i] = [0,rh*0.4+buttonSize*4*1.5*i];
	}
	//16,15,14,13,12
}