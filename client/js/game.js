var GAME = (function () {
	var game = {};

	var aiCode = {};
	aiCode.ranged = 0;

	var p;
	var e;

	var util = {};
	util.distance = function(a, b) {
		return Math.sqrt((a.x - b.x) * (a.x - b.x)
			+ (a.y - b.y) * (a.y - b.y));
	}
	util.dirFromTo = function(a, b) {
		return Math.atan2(b.y - a.y, b.x - a.x);
	}

	game.init = function() {
		game._player = p = {x: 0, y: 0, dir: 0, model:meshCode.ranger};
		game._enemies = e = [];
		for (var i = 0; i < 20; i++) {
			var enemy = {x:0, y:0, dir:0, model:meshCode.mage, ai:aiCode.ranged};
			enemy.x = Math.random() * -30 + 15;
			enemy.y = Math.random() * -36 + 18;
			enemy.dir = Math.random() * Math.PI * 2;
			e.push(enemy);
		}
	}

	game.tick = function(inputs) {
		if (inputs.up) game._player.y -= 0.2;
		if (inputs.down) game._player.y += 0.2;
		if (inputs.left) game._player.x -= 0.2;
		if (inputs.right) game._player.x += 0.2;

		e.forEach(function (enemy) {
			ai[enemy.ai](enemy);
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

	return game;
}());