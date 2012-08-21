//(c)opyright 2012 - Steve Miller

ig.module(
	'game.entities.weatherorb'
	)

.requires(
	'impact.entity'
	//'game.data.theweather',

	)

.defines(function(){
	EntityWeatherorb = ig.Entity.extend({

		_wmIgnore: true,

		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.BOTH,


		init: function(x, y, settings) {
			this.parent(x, y, settings);
			ig.game.theWeather.registerWeatherOrb(this);
		},

		check: function (other) {
			//console.log('orb touched');
			ig.game.theWeather.setOrbTouched(true, true);
		}

	});//eol entityweatherorb

	EntityWeatherorbfirestorm = EntityWeatherorb.extend({

		animSheet: new ig.AnimationSheet('media/forest1.png', 25, 25),

		init: function(x, y, settings) {
			this.addAnim('idle', 1.0, [6]);
			this.parent(x, y, settings);
		}

	});//eol weatherorbfirestorm

	EntityWeatherorbgravity = EntityWeatherorb.extend({});//eol weatherorbfirestorm

	EntityWeatherorbwind = EntityWeatherorb.extend({});//eol weatherorbfirestorm

	EntityWeatherorbsnow = EntityWeatherorb.extend({});//eol weatherorbfirestorm

});//eol defines