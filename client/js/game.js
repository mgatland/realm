var GAME = (function () {
	var game = {};

	var aiCode = {};
	aiCode.ranged = 0;
	aiCode.shot = 1;

	var p;
	var e;
	var s;

	var util = {};
	util.distance = function(a, b) {
		return Math.sqrt((a.x - b.x) * (a.x - b.x)
			+ (a.y - b.y) * (a.y - b.y));
	}
	util.dirFromTo = function(a, b) {
		return Math.atan2(b.y - a.y, b.x - a.x);
	}

	game.init = function() {
		game._player = p = {
			x: 0, y: 0, 
			dir: 0, 
			model:meshCode.ranger,
			shotTimer: 0};
		game._enemies = e = [];
		for (var i = 0; i < 20; i++) {
			var enemy = {x:0, y:0, dir:0, model:meshCode.mage, ai:aiCode.ranged};
			enemy.x = Math.random() * -30 + 15;
			enemy.y = Math.random() * -36 + 18;
			enemy.dir = Math.random() * Math.PI * 2;
			e.push(enemy);
		}
		game._shots = s = [];
	}

	function fireProjectile (start, dest) {
		var shot = {
			x:start.x, y:start.y,
			dir: util.dirFromTo(start, dest), 
			model:meshCode.mage,
			ai:aiCode.shot};
		s.push(shot);
	}

	game.tick = function(inputs) {
		if (inputs.up) game._player.y -= 0.2;
		if (inputs.down) game._player.y += 0.2;
		if (inputs.left) game._player.x -= 0.2;
		if (inputs.right) game._player.x += 0.2;

		if (game._player.shotTimer > 0) {
			game._player.shotTimer--;
		}
		if (inputs.mouseDown && game._player.shotTimer == 0) {
			fireProjectile(p, inputs.mousePos);
			game._player.shotTimer = 22;
		}

		e.forEach(function (enemy) {
			ai[enemy.ai](enemy);
		});

		s.forEach(function (shot) {
			ai[shot.ai](shot);
		});
	}

	var ai = [];
	ai[aiCode.ranged] = function(enemy) {
		var dist = util.distance(enemy, p);
		if (dist > 13) {
			var dir = util.dirFromTo(enemy, p);
			var spd = 0.1;
			var dX = Math.cos(dir) * spd;
			var dY = Math.sin(dir) * spd;
			enemy.x += dX;
			enemy.y += dY;
			enemy.timer = 0;
		} else if (dist < 4) {
			var dir = util.dirFromTo(p, enemy);
			var spd = 0.1;
			var dX = Math.cos(dir) * spd;
			var dY = Math.sin(dir) * spd;
			enemy.x += dX;
			enemy.y += dY;
			enemy.timer = 0;
		} else {
			if (enemy.timer == 0 || enemy.timer == undefined) {
				enemy.timer = 20;
				enemy.moveDir = Math.random() * Math.PI * 2;
			}
			enemy.timer--;
			var spd = 0.1;
			var dX = Math.cos(enemy.moveDir) * spd;
			var dY = Math.sin(enemy.moveDir) * spd;
			enemy.x += dX;
			enemy.y += dY;
		}
	}

	ai[aiCode.shot] = function (shot) {
		var spd = 0.6;
		var dX = Math.cos(shot.dir) * spd;
		var dY = Math.sin(shot.dir) * spd;
		shot.x += dX;
		shot.y += dY;
	}

	return game;
}());