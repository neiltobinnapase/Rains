var harambe, africa;
function preload(){
    harambe = loadImage('images/harambe.jpg');
    africa = loadImage('images/africa.png');
}

//Sounds are played when page is started, loops automatically
var rainsound, song;
function loadSounds(){
    rainsound = new Audio('sounds/Rains.mp3');
    rainsound.volume = .15;
    rainsound.loop = true;
    rainsound.play();

    song = new Audio('sounds/Africa.mp3');
    song.volume = .9;
    song.loop = true;
    song.play();
}


var drops = [];
function setup(){
    var canvas = createCanvas(windowWidth, windowHeight);
    for(var i = 0; i < 750; i++){
        drops[i] = new Drop();
    }

    angleMode(DEGREES);
    loadSounds();
}

function draw(){
    background('#AED581');
    image(harambe, width/32, height-250, 500, 500);
    image(africa, width/2-300, height/2-300, 600, 600);
    
    
    for(var i = 0; i < drops.length; i++){
        drops[i].fall();
        drops[i].show();
    }
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}


//Drop of rain class
//Each drop is given a random placement on the screen and "distance" from the screen
//Depending on the distance, the speed of the drop and the length is changed.
function Drop() {
    this.x = random(width);
    this.y = random(height);
    this.z = random(0, 20);
    this.yspeed = map(this.z, 0, 20, 4, 20);
    this.xspeed = norm(this.yspeed, 0, 3);
    this.len = map(this.z, 0, 20, 15, 25);

	//Drop of rain will change its position over time, wraps from the bottom of screen to the top
	//Will also wrap from right side of screen to left
    this.fall = function() {
        this.y = this.y + this.yspeed;
        this.x = this.x + this.xspeed;
        this.yspeed += 0.05;

        if(this.y > height){
            this.y = random(-200, -100);
            this.yspeed = map(this.z, 0, 20, 4, 20);
            this.xspeed = norm(this.yspeed, 0, 3);
        }

        if(this.x > width + 5){
            this.x = -5;
        }
    }

	//Depending on distance from screen, the drop of rain will also have a different weight
    this.show = function() {
        this.thickness = map(this.z, 0, 20, 1, 3);
        strokeWeight(this.thickness);
        stroke('#4FC3F7');
        line(this.x, this.y, this.x+5, this.y+this.len);
    }
}