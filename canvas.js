const canvas = document.getElementById('headerCanvas');
const ctx = canvas.getContext('2d');
window.onresize = draw;
draw()

var checkExist = setInterval(function() {
    if ($('.navbar').length) {
       draw();
       clearInterval(checkExist);
    }
 }, 100); // check every 100ms

function draw() {
    try {
        canvas.style.marginTop = `${document.getElementsByTagName("nav")[0].offsetHeight}px`
    } catch {}
    canvas.width  = $(window).width(); 
    canvas.height = $('#headerCanvas').height();
}

const opts = { 
	particleColor: "rgb(200,200,200)",
	lineColor: "rgb(200,200,200)",
	particleAmount: 50,
	defaultSpeed: 1,
	variantSpeed: 1,
	defaultRadius: 2,
	variantRadius: 2,
	linkRadius: 200,
};

window.addEventListener("resize", function(){
	deBouncer();
});

let deBouncer = function() {
    clearTimeout(tid);
    tid = setTimeout(function() {
        draw();
    }, delay);
};

let checkDistance = function(x1, y1, x2, y2){ 
	return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

let linkPoints = function(point1, hubs){ 
	for (let i = 0; i < hubs.length; i++) {
		let distance = checkDistance(point1.x, point1.y, hubs[i].x, hubs[i].y);
		let opacity = 1 - distance / opts.linkRadius;
		if (opacity > 0) { 
			drawArea.lineWidth = 0.5;
			drawArea.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
			drawArea.beginPath();
			drawArea.moveTo(point1.x, point1.y);
			drawArea.lineTo(hubs[i].x, hubs[i].y);
			drawArea.closePath();
			drawArea.stroke();
		}
	}
}

Particle = function(xPos, yPos){ 
	this.x = Math.random() * canvas.width; 
	this.y = Math.random() * canvas.height;
	this.speed = opts.defaultSpeed + Math.random() * opts.variantSpeed; 
	this.directionAngle = Math.floor(Math.random() * 360); 
	this.color = opts.particleColor;
	this.radius = opts.defaultRadius + Math.random() * opts. variantRadius; 
	this.vector = {
		x: Math.cos(this.directionAngle) * this.speed,
		y: Math.sin(this.directionAngle) * this.speed
	};
	this.update = function(){ 
		this.border(); 
		this.x += this.vector.x; 
		this.y += this.vector.y; 
	};
	this.border = function(){ 
		if (this.x >= canvas.width || this.x <= 0) { 
			this.vector.x *= -1;
		}
		if (this.y >= canvas.height || this.y <= 0) {
			this.vector.y *= -1;
		}
		if (this.x > canvas.width) this.x = canvas.width;
		if (this.y > canvas.height) this.y = canvas.height;
		if (this.x < 0) this.x = 0;
		if (this.y < 0) this.y = 0;	
	};
	this.draw = function(){ 
		drawArea.beginPath();
		drawArea.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		drawArea.closePath();
		drawArea.fillStyle = this.color;
		drawArea.fill();
	};
};

function setup(){ 
	particles = [];
	draw();
	for (let i = 0; i < opts.particleAmount; i++){
		particles.push( new Particle() );
	}
	window.requestAnimationFrame(loop);
}

function loop(){ 
    draw();
	window.requestAnimationFrame(loop);
    drawArea.clearRect(0,0,canvas.width,canvas.height);
    var bgGrd = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrd.addColorStop(0, "#cc1af0");
    bgGrd.addColorStop(1, "#a370fa");
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < particles.length; i++){
		particles[i].update();
		particles[i].draw();
	}
	for (let i = 0; i < particles.length; i++){
		linkPoints(particles[i], particles);
    }
    
    ctx.textAlign = "center"
    ctx.fillStyle = "#ffffff";
    var textWidth = 99999999999;
    fontSize = 500;
    for (fontSize = 500; textWidth >= canvas.width; fontSize -= 5) {
        ctx.font = `${fontSize}px Quicksand`;
        textWidth = ctx.measureText("INFINITE AQUARIUS").width
    }

    ctx.font = `${fontSize}px Quicksand`;
    ctx.fillText("INFINITE AQUARIUS", canvas.width/2, canvas.height/2);

    ctx.font = "35px Quicksand";
    ctx.fillText("WE ARE", canvas.width/2, (canvas.height/2)-120);
}

const canvasBody = document.getElementById("headerCanvas"),
drawArea = canvasBody.getContext("2d");
let delay = 200, tid,
rgb = opts.lineColor.match(/\d+/g);
draw();
setup();