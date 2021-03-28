//Name variables here
var starImg, fairyImg, bgImg;
var gameState;
var box;
var fairy , fairyVoice;
var star, starBody
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
function preload(){
	//Load images of sprites
	starImg = loadImage("images/star.png");
	fairyImg = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	bgImg = loadImage("images/starNight.png");
	fairyVoice = loadSound("sound/JoyMusic.mp3");
}
function setup() {
	//Create necessary bodies and Sprites here.
	createCanvas(1600, 750);
	gameState = "playing";
	fairy = createSprite(130, 520);
	fairy.addAnimation("fairyflying",fairyImg);  
	fairy.scale =0.25;
	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;
	engine = Engine.create();
	world = engine.world;
	starBody = Bodies.circle(650 , 30 , 5 , {restitution:0.5, isStatic:true});
	var rectBody = Bodies.rectangle(100,100,50,50);
	World.add(world, starBody);
	World.add(world, rectBody);
	Engine.run(engine);
}
function draw() {
	//Call necessary functions here 
	background(bgImg);
	protectStar();
	keyPressed();
	drawSprites();
}
function keyPressed() {
	//write code to move sprites here
		if(gameState=="playing" && keyCode === LEFT_ARROW){
		fairy.velocityX = -7;
		box.velocityX = -7;
	}else if(gameState=="playing" && keyCode === RIGHT_ARROW){
		fairy.velocityX = 7;
		box.velocityX = 7;
	}else if(gameState=="playing" && keyCode === DOWN_ARROW){
		star.velocityY = 5;
	}
}
function protectStar(){
	//Make the star stop if it is on the fairy's hand or hitting the ground.
	if(star.x >= fairy.x + 95 && star.x <= fairy.x + 145 && star.y >= fairy.y - 45  && star.y <= fairy.y + 5){
		star.velocityY = 0;
		console.log("problem");
		gameState = "won";
		fairy.velocityX = 0;
	}else if(star.y >= 750){
		star.velocityY = 0;
		fairy.velocityX = 0;
		gameState = "lost";
	}
	
}
	
