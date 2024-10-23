var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 50;
var frog;
var deathModel;
var logs1 = [];
var logs2 = [];
var turtles1 = [];
var turtles2 = [];
var cars1 = [];
var cars2 = [];
var cars3 = [];
var homes = [];
var reachedHomes = [];
var numHomes = 0;
var numLives = 5;
var score = 0;
var time = 0;
var startTime = 0;
var deathTime = 0;
var custom = false;
var collided;
var submerged = false;
var onLog1 = false;
var onLog2 = false;
var onTurtle1 = false;
var onTurtle2 = false;
var onLake = false;
var reachedHome = false;
var LEFT = 37;
var UP = 38;
var RIGHT = 39;
var DOWN = 40;
var startMat;
var roadMat;
var lakeMat;
var carMat1;
var carMat2;
var carMat3;
var logMat;
var turtleMat;
var homeMat;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var audio = document.createElement('audio');
var source = document.createElement('source');

function gameSetup () {
	renderStart();
	renderRoad();
	renderPath();
	renderLake();
	renderFrog();
	renderCars();
	renderLogs();
	renderTurtles();
	renderHomes();
}

function renderStart() {
	var startGeo = new THREE.PlaneGeometry(window.innerWidth, 10);
	startMat = new THREE.MeshBasicMaterial({color: 0x8E2C16, side: THREE.FrontSide});
	var startPlane = new THREE.Mesh(startGeo, startMat);
	scene.add(startPlane);
	startPlane.position.y = -20;
}

function renderRoad() {
	var roadGeo = new THREE.PlaneGeometry(window.innerWidth, 14);
	roadMat = new THREE.MeshBasicMaterial({color: 0x60606B, side: THREE.FrontSide});
	var roadPlane = new THREE.Mesh(roadGeo, roadMat);
	scene.add(roadPlane);
	roadPlane.position.y = -10;
}

function renderPath() {
	var pathGeo = new THREE.PlaneGeometry(window.innerWidth, 10);
	var pathPlane = new THREE.Mesh(pathGeo, startMat);
	scene.add(pathPlane);
	pathPlane.position.y = 0;
}

function renderLake() {
	var lakeGeo = new THREE.PlaneGeometry(window.innerWidth, 46);
	lakeMat = new THREE.MeshBasicMaterial({color: 0x1FF0EC, side: THREE.FrontSide});
	var lakePlane = new THREE.Mesh(lakeGeo, lakeMat);
	lakePlane.position.y = 5;
	scene.add(lakePlane);
}

function renderFrog() {
	var frogGeo = new THREE.BoxGeometry(2, 2, 3);
	var frogMat = new THREE.MeshBasicMaterial({color: 0x0A4F35,side: THREE.FrontSide});
	frog = new THREE.Mesh(frogGeo, frogMat);
	scene.add(frog);
	frog.position.y = -21;
}

function renderCars() {
	var carGeo = new THREE.BoxGeometry(8, 2, 2);
	carMat1 = new THREE.MeshBasicMaterial({color: 0xD62D20, side: THREE.FrontSide});
	carMat2 = new THREE.MeshBasicMaterial({color: 0xFCE97D, side: THREE.FrontSide});
	carMat3 = new THREE.MeshBasicMaterial({color: 0x000080, side: THREE.FrontSide});
	cars1[0] = new THREE.Mesh(carGeo, carMat1);
	cars1[0].position.x = -30;
	cars1[0].position.y = -13;
	scene.add(cars1[0]);
	cars1[1] = new THREE.Mesh(carGeo, carMat1);
	cars1[1].position.x = -15;
	cars1[1].position.y = -13;
	scene.add(cars1[1]);
	cars1[2] = new THREE.Mesh(carGeo, carMat1);
	cars1[2].position.x = 0;
	cars1[2].position.y = -13;
	scene.add(cars1[2]);
	cars1[3] = new THREE.Mesh(carGeo, carMat1);
	cars1[3].position.x = 15;
	cars1[3].position.y = -13;
	scene.add(cars1[3]);
	cars1[4] = new THREE.Mesh(carGeo, carMat1);
	cars1[4].position.x = 30;
	cars1[4].position.y = -13;
	scene.add(cars1[4]);
	cars2[0] = new THREE.Mesh(carGeo, carMat2);
	cars2[0].position.x = -30;
	cars2[0].position.y = -9;
	scene.add(cars2[0]);
	cars2[1] = new THREE.Mesh(carGeo, carMat2);
	cars2[1].position.x = -20;
	cars2[1].position.y = -9;
	scene.add(cars2[1]);
	cars2[2] = new THREE.Mesh(carGeo, carMat2);
	cars2[2].position.x = -10;
	cars2[2].position.y = -9;
	scene.add(cars2[2]);
	cars2[3] = new THREE.Mesh(carGeo, carMat2);
	cars2[3].position.x = 10;
	cars2[3].position.y = -9;
	scene.add(cars2[3]);
	cars2[4] = new THREE.Mesh(carGeo, carMat2);
	cars2[4].position.x = 20;
	cars2[4].position.y = -9;
	scene.add(cars2[4]);
	cars3[0] = new THREE.Mesh(carGeo, carMat3);
	cars3[0].position.x = -30;
	cars3[0].position.y = -5;
	scene.add(cars3[0]);
	cars3[1] = new THREE.Mesh(carGeo, carMat3);
	cars3[1].position.x = -10;
	cars3[1].position.y = -5;
	scene.add(cars3[1]);
	cars3[2] = new THREE.Mesh(carGeo, carMat3);
	cars3[2].position.x = 0;
	cars3[2].position.y = -5;
	scene.add(cars3[2]);
	cars3[3] = new THREE.Mesh(carGeo, carMat3);
	cars3[3].position.x = 10;
	cars3[3].position.y = -5;
	scene.add(cars3[3]);
	cars3[4] = new THREE.Mesh(carGeo, carMat3);
	cars3[4].position.x = 30;
	cars3[4].position.y = -5;
	scene.add(cars3[4]);
}

function renderLogs() {
	var logGeo = new THREE.BoxGeometry(8, 2, 2);
	logMat = new THREE.MeshBasicMaterial({color: 0x4B3832, side: THREE.FrontSide});
	logs1[0] = new THREE.Mesh(logGeo, logMat);
	logs1[0].position.x = -30;
	logs1[0].position.y = 11;
	scene.add(logs1[0]);
	logs1[1] = new THREE.Mesh(logGeo, logMat);
	logs1[1].position.x = -20;
	logs1[1].position.y = 11;
	scene.add(logs1[1]);
	logs1[2] = new THREE.Mesh(logGeo, logMat);
	logs1[2].position.x = -5;
	logs1[2].position.y = 11;
	scene.add(logs1[2]);
	logs1[3] = new THREE.Mesh(logGeo, logMat);
	logs1[3].position.x = 5;
	logs1[3].position.y = 11;
	scene.add(logs1[3]);
	logs1[4] = new THREE.Mesh(logGeo, logMat);
	logs1[4].position.x = 20;
	logs1[4].position.y = 11;
	scene.add(logs1[4]);
	logs2[0] = new THREE.Mesh(logGeo, logMat);
	logs2[0].position.x = -30;
	logs2[0].position.y = 7;
	scene.add(logs2[0]);
	logs2[1] = new THREE.Mesh(logGeo, logMat);
	logs2[1].position.x = -20;
	logs2[1].position.y = 7;
	scene.add(logs2[1]);
	logs2[2] = new THREE.Mesh(logGeo, logMat);
	logs2[2].position.x = 0;
	logs2[2].position.y = 7;
	scene.add(logs2[2]);
	logs2[3] = new THREE.Mesh(logGeo, logMat);
	logs2[3].position.x = 20;
	logs2[3].position.y = 7;
	scene.add(logs2[3]);
	logs2[4] = new THREE.Mesh(logGeo, logMat);
	logs2[4].position.x = 30;
	logs2[4].position.y = 7;
	scene.add(logs2[4]);
}

function renderTurtles() {
	var turtleGeo = new THREE.SphereGeometry(1.5, 32, 16);
	turtleMat = new THREE.MeshBasicMaterial({color: 0x00FF00, side: THREE.FrontSide});	
	turtles1[0] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles1[0].position.x = -30;
	turtles1[0].position.y = 15;
	scene.add(turtles1[0]);
	turtles1[1] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles1[1].position.x = -27;
	turtles1[1].position.y = 15;
	scene.add(turtles1[1]);
	turtles1[2] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles1[2].position.x = -17;
	turtles1[2].position.y = 15;
	scene.add(turtles1[2]);
	turtles1[3] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles1[3].position.x = -14;
	turtles1[3].position.y = 15;
	scene.add(turtles1[3]);
	turtles1[4] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles1[4].position.x = -4;
	turtles1[4].position.y = 15;
	scene.add(turtles1[4]);
	turtles1[5] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles1[5].position.x = -1;
	turtles1[5].position.y = 15;
	scene.add(turtles1[5]);
	turtles1[6] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles1[6].position.x = 9;
	turtles1[6].position.y = 15;
	scene.add(turtles1[6]);
	turtles1[7] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles1[7].position.x = 12;
	turtles1[7].position.y = 15;
	scene.add(turtles1[7]);
	turtles1[8] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles1[8].position.x = 22;
	turtles1[8].position.y = 15;
	scene.add(turtles1[8]);
	turtles1[9] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles1[9].position.x = 25;
	turtles1[9].position.y = 15;
	scene.add(turtles1[9]);
	turtles2[0] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles2[0].position.x = -30;
	turtles2[0].position.y = 19;
	scene.add(turtles2[0]);
	turtles2[1] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles2[1].position.x = -27;
	turtles2[1].position.y = 19;
	scene.add(turtles2[1]);
	turtles2[2] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles2[2].position.x = -12;
	turtles2[2].position.y = 19;
	scene.add(turtles2[2]);
	turtles2[3] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles2[3].position.x = -9;
	turtles2[3].position.y = 19;
	scene.add(turtles2[3]);
	turtles2[4] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles2[4].position.x = 1;
	turtles2[4].position.y = 19;
	scene.add(turtles2[4]);
	turtles2[5] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles2[5].position.x = 4;
	turtles2[5].position.y = 19;
	scene.add(turtles2[5]);
	turtles2[6] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles2[6].position.x = 19;
	turtles2[6].position.y = 19;
	scene.add(turtles2[6]);
	turtles2[7] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles2[7].position.x = 22;
	turtles2[7].position.y = 19;
	scene.add(turtles2[7]);
	turtles2[8] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles2[8].position.x = 32;
	turtles2[8].position.y = 19;
	scene.add(turtles2[8]);
	turtles2[9] = new THREE.Mesh(turtleGeo, turtleMat);
	turtles2[9].position.x = 35;
	turtles2[9].position.y = 19;
	scene.add(turtles2[9]);
}

function renderHomes() {
	var homeGeo = new THREE.BoxGeometry(6, 2, 2);
	homeMat = new THREE.MeshBasicMaterial({color: 0x54FF9F, side: THREE.FrontSide});
	homes[0] = new THREE.Mesh(homeGeo, homeMat);
	homes[0].position.x = -30;
	homes[0].position.y = 23;
	scene.add(homes[0]);
	homes[1] = new THREE.Mesh(homeGeo, homeMat);
	homes[1].position.x = -15;
	homes[1].position.y = 23;
	scene.add(homes[1]);
	homes[2] = new THREE.Mesh(homeGeo, homeMat);
	homes[2].position.x = 0;
	homes[2].position.y = 23;
	scene.add(homes[2]);
	homes[3] = new THREE.Mesh(homeGeo, homeMat);
	homes[3].position.x = 15;
	homes[3].position.y = 23;
	scene.add(homes[3]);
	homes[4] = new THREE.Mesh(homeGeo, homeMat);
	homes[4].position.x = 30;
	homes[4].position.y = 23;
	scene.add(homes[4]);
}

function playerMove(e) {
	switch (e.keyCode) {
    	case UP:
			if (audio.ended == true || audio.currentTime == 0) {
				source.src = 'jump.mp3';
				audio.load();
				audio.play();
			}
			frog.position.y += 4;
			score += 10;
			break;
      	case DOWN:
			if (audio.ended == true || audio.currentTime == 0) {
				source.src = 'jump.mp3';
				audio.load();
				audio.play();
			}	
			frog.position.y -= 4;
			if (frog.position.y < -23)
				frog.position.y += 4;
			break;
      	case LEFT:
			if (audio.ended == true || audio.currentTime == 0) {
				source.src = 'jump.mp3';
				audio.load();
				audio.play();
			}
      		frog.position.x -= 4;
			if (frog.position.x < -43)
				frog.position.x += 4;
			break;
      	case RIGHT:
			if (audio.ended == true || audio.currentTime == 0) {
				source.src = 'jump.mp3';
				audio.load();
				audio.play();
			}
        	frog.position.x += 4;
			if (frog.position.x > 43)
				frog.position.x -= 4;
			break;
    }
}

function roadCollision() {
	for (var i = 0; i < cars1.length; i++) {
		firstBox = new THREE.Box3().setFromObject(frog);
  		secondBox = new THREE.Box3().setFromObject(cars1[i]);
		collided = firstBox.isIntersectionBox(secondBox);
		if (collided) 
			death();
	}
	for (var i = 0; i < cars2.length; i++) {
		firstBox = new THREE.Box3().setFromObject(frog);
  		secondBox = new THREE.Box3().setFromObject(cars2[i]);
		collided = firstBox.isIntersectionBox(secondBox);
		if (collided) 
			death();
	}
	for (var i = 0; i < cars3.length; i++) {
 		firstBox = new THREE.Box3().setFromObject(frog);
 		secondBox = new THREE.Box3().setFromObject(cars3[i]);
 		collided = firstBox.isIntersectionBox(secondBox);
 		if (collided) 
			death();
	}
}

function lakeCollision() {
	onLog1 = false;
	onLog2 = false;
	onTurtle1 = false;
	onTurtle2 = false;
	reachedHome = false;
	onLake = false;
	if (frog.position.y >= 7)
		onLake = true;
 	if (frog.position.y == 11) {
		for (var i = 0; i < logs1.length; i++) {
 			if (Math.abs(frog.position.x - logs1[i].position.x) < 3)
 				onLog1 = true;
		}
 	}
	if (frog.position.y == 7) {
		for (var i = 0; i < logs2.length; i++) {
			if (Math.abs(frog.position.x - logs2[i].position.x) < 3)
				onLog2 = true;
		}
	}
	if (frog.position.y == 15) {
		for (var i = 0; i < turtles1.length; i++) {
			if (Math.abs(frog.position.x - turtles1[i].position.x) < 3)
				onTurtle1 = true;
		}
	}
	if (frog.position.y == 19) {
		for (var i = 0; i < turtles2.length; i++) {
			if (Math.abs(frog.position.x - turtles2[i].position.x) < 3)
				onTurtle2 = true;
		}
	}
	if (frog.position.y == 23) {
		for (var i = 0; i < homes.length; i++) {
			if (Math.abs(frog.position.x - homes[i].position.x) < 3) {
				reachedHome = true;
				if (homes[i].position.z == -5) {
					frog.position.set(0, -21, 0);
					break;
				}
				var reachedHomeGeo = new THREE.BoxGeometry(6, 2, 2);
				var reachedHomeMat = new THREE.MeshBasicMaterial({color: 0x0A4F35,side: THREE.FrontSide});
				reachedHomes[i] = new THREE.Mesh(reachedHomeGeo, reachedHomeMat);
				reachedHomes[i].position.x = homes[i].position.x;
				reachedHomes[i].position.y = homes[i].position.y;
				scene.add(reachedHomes[i]);
				homes[i].position.z -= 5;
				numHomes++;
				score += 50;
				frog.position.set(0, -21, 0);
				break;
			}
		}
	}	
	if (!onLog1 && !onLog2 && !onTurtle1 && !onTurtle2 && !reachedHome && onLake)
		death();
}

function death() {
	var deathGeo = new THREE.BoxGeometry(2, 2, 3);
	var deathMat = new THREE.MeshBasicMaterial({color: 0xFFA500, side: THREE.FrontSide});
	deathModel = new THREE.Mesh(deathGeo, deathMat);
	deathModel.position.set(frog.position.x, frog.position.y, 0);
	scene.add(deathModel);
	if (numLives > 1) {
		numLives--;
		source.src = 'death.mp3';
		audio.load();
		audio.play();
		alert('\nYou lost a life! You have ' + numLives + ' lives left');
		frog.position.set(0, -21, 0);
	}
	else {
		source.src = 'gameOver.mp3';
		audio.load();
		audio.play();
		alert('\nGame Over! Your score was ' + score + '\n\nTry again');
		frog.position.set(0, -21, 0);
		numLives = 5;
		score = 0;
		numHomes = 0;
		for (var i = 0; i < homes.length; i++) {
			if (homes[i].position.z == -5)
				homes[i].position.z += 5;
		}
	}
}

function win() {
	if (numHomes == 6) {
		source.src = 'win.mp3';
		audio.load();
		audio.play();
		score += 1000;
		alert('\nYou won! Your current score is ' + score + '\n\nNow continue playing for a better score!');
		numHomes = 0;
		frog.position.set(0, -21, 0);
		for (var i = 0; i < homes.length; i++)
			homes[i].position.z += 5;
	}
}

function moveObjects() {
	for (var i = 0; i < cars1.length; i++) {
		if (cars1[i].position.x <= 40)	
			cars1[i].position.x += 0.2;
		else 
			cars1[i].position.x = -40;
	}
	for (var i = 0; i < cars2.length; i++) {
		if (cars2[i].position.x >= -40)	
			cars2[i].position.x -= 0.4;
		else 
			cars2[i].position.x = 40;
	}
	for (var i = 0; i < cars3.length; i++) {
		if (cars3[i].position.x <= 40) 
			cars3[i].position.x += 0.3;
		else 
			cars3[i].position.x = -40;
	}
	for (var i = 0; i < logs1.length; i++) {
		if (logs1[i].position.x <= 40) 
			logs1[i].position.x += 0.05;
		else 
			logs1[i].position.x = -40;
	}
	for (var i = 0; i < logs2.length; i++) {
		if (logs2[i].position.x >= -40)
			logs2[i].position.x -= 0.15;
		else 
			logs2[i].position.x = 40;
	}
	for (var i = 0; i < turtles1.length; i++) {
		if (turtles1[i].position.x >= -40)
			turtles1[i].position.x -= 0.35;
		else 
			turtles1[i].position.x = 40;
	}
	for (var i = 0; i < turtles2.length; i++) {
		if (turtles2[i].position.x <= 40)
			turtles2[i].position.x += 0.25;
		else 
			turtles2[i].position.x = -40;
	}
	if (onLog1) {
		frog.position.x += 0.05;
		if (frog.position.x > 43)
			death();
	}
	if (onLog2) {
		frog.position.x -= 0.15;
		if (frog.position.x < -43)
			death();
	}
	if (onTurtle1) {
		frog.position.x -= 0.35;
		if ((Math.abs(frog.position.x - turtles1[4].position.x) < 3 || Math.abs(frog.position.x - turtles1[5].position.x) < 3)
		&& submerged)
			death();
		if (frog.position.x < -43)
			death();
	}
	if (onTurtle2) {
		frog.position.x += 0.25;
		if ((Math.abs(frog.position.x - turtles2[0].position.x) < 3 || Math.abs(frog.position.x - turtles2[1].position.x) < 3)
		&& submerged)
			death();
		if (frog.position.x > 43)
			death();
	}
	if (time % 300 == 0 && time != 0) {
		submerged = true;
		turtles1[4].position.z -= 5;
		turtles1[5].position.z -= 5;
		turtles2[0].position.z -= 5;
		turtles2[1].position.z -= 5;
	}
	if (submerged)
		startTime++;
	if (startTime == 150) {
		submerged = false;
		startTime = 0;
		turtles1[4].position.z += 5;
		turtles1[5].position.z += 5;
		turtles2[0].position.z += 5;
		turtles2[1].position.z += 5;
	}
	time++;
}

function render() {
    requestAnimationFrame(render);
	moveObjects();
	window.addEventListener("keydown", playerMove, false);
	var event;
	document.addEventListener('keydown', (event) => {
    	if (event.key === "!") {
			if (!custom) {
				custom = true;
				startMat.color.setHex(0x800080);
				roadMat.color.setHex(0x000000);
				carMat1.color.setHex(0xFA00C5);
				carMat2.color.setHex(0xFFFFFF);
				carMat3.color.setHex(0x1FF0EC);
				lakeMat.color.setHex(0xFF0000);
				logMat.color.setHex(0x808000);
				turtleMat.color.setHex(0x60606B);
				homeMat.color.setHex(0xFFFF00);
			}
			else {
				custom = false;
				startMat.color.setHex(0x8E2C16);
				roadMat.color.setHex(0x60606B);
				carMat1.color.setHex(0xD62D20);
				carMat2.color.setHex(0xFCE97D);
				carMat3.color.setHex(0x000080);
				lakeMat.color.setHex(0x1FF0EC);
				logMat.color.setHex(0x4B3832);
				turtleMat.color.setHex(0x00FF00);
				homeMat.color.setHex(0x54FF9F);
			}
			numHomes = 0;
			score = 0;
			numLives = 5;
			frog.position.set(0, -21, 0);
			for (var i = 0; i < homes.length; i++)
				homes[i].position.z = 0;
			time = 0;
    	}
	});
	roadCollision();
	lakeCollision();
	win();
	renderer.render(scene, camera);
	if (numHomes == 5)
		numHomes++;
	if (deathModel.position.z == 0)
		deathTime++;
	if (deathTime == 50) {
		deathModel.position.z = -10;
		deathTime = 0;
	}
}

source.src = 'jump.mp3';
audio.appendChild(source);
audio.play();
gameSetup();
render();

