var GAME = (function () {
	var game = {};
	var p;
	var e;

	game.init = function() {
		game._player = p = {x: 0, y: 0, dir: 0, model:meshCode.ranger};
		game._enemies = e = [];
		for (var i = 0; i < 20; i++) {
			var enemy = {x:0, y:0, dir:0, model:meshCode.mage};
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
			if (enemy.x > p.x) {
				enemy.x -= 0.1;
			}
			if (enemy.x < p.x) {
				enemy.x += 0.1;
			}
			if (enemy.y > p.y) {
				enemy.y -= 0.1;
			}
			if (enemy.y < p.y) {
				enemy.y += 0.1;
			}
		});
	}

	return game;
}());