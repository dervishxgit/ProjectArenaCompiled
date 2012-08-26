//(c)opyright 2012 - Steve Miller

//firestorm is one of the possible effects instantiated by the weather system
//the firestorm should hang out and spawn projectiles

ig.module('game.entities.weatherentities')
.requires(
	'impact.entity',
	'game.entities.projectile'
	)
.defines(function(){
	EntityFirestorm = ig.Entity.extend({
		_wmIgnore: true,

		size: {x: 0, y:0},

		pos: {x: 0, y:0},

		name: 'firestorm',

		fireTimer : null,
		liveTimer: null,
		lifeTime: 60,

		refireTime: 0.25,

		playerRef: null, //watcher for player
		screenSpawnOffsetX: 0, //our offset amount to be calculated based on player and screen
		screenSpawnOffsetY: 0,

		randomSpawnX: 0,
		randomSpawnY: 0,

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			if (settings.lifeTime) {
				this.lifeTime = settings.lifeTime;
			}

			this.fireTimer = new ig.Timer();
			this.liveTimer = new ig.Timer(this.lifeTime);

			this.getPlayerRef();

			this.setOffsetBasedOnScreen();
		},

		update: function() {

			this.rainFire();

			this.parent();
		},

		rainFire: function() {
			if (this.fireTimer.delta() > this.refireTime) {
				this.randomSpawnX = this.setRandomSpawnLoacationX();
				this.randomSpawnY = ig.game.screen.y;
				this.spawnFireBalls(1, this.randomSpawnX, this.randomSpawnY);
				this.fireTimer.set();
				//console.log('rained fire');
			}

			
		},

		spawnFireBalls: function(numballs, positionx, positiony) {
			ig.game.spawnEntity(EntityFireball, positionx, positiony);			
		},

		getPlayerRef: function() {
			var player = ig.game.getEntitiesByType(EntityPlayer)[0];
				if (player) {
					this.playerRef = player;
				}
		},

		setRandomSpawnLoacationX: function() {
			//should give us a random positionX in the constraints of the current screen,
			//our y will always be the top of the screen
			var minX = ig.game.screen.x,
				maxX = ig.game.screen.x + ig.system.width;
				//minY = ig.game.screen.y,
				//maxY = ig.game.screen.y + ig.system.height.

			//random number between start of screen and end will be our x
			var returnRandomX = Math.floor((Math.random() * maxX) +minX);
			//console.log(returnRandomX);
			return returnRandomX;

		},

		setOffsetBasedOnScreen: function() {
			//assumes a centered camera
			screenSpawnOffsetX = ig.system.width /2;
			screenSpawnOffsetY = ig.system.height /2;
		},

		checkCountDown: function () {
			var countdowndelta = this.liveTimer.delta();
			if (countdowndelta >= 0) {
				this.kill();
			}
		},

		draw: function() {
			this.drawCountdown();

			this.parent();
		},

		drawCountdown: function() {
			ig.game.font.draw('Firestorm Time Remaining:' + this.liveTimer.delta(), 2, 512);
		}


	});//eol firestorm

	EntityGravity = ig.Entity.extend({
		_wmIgnore: true,

		size: {x: 0, y:0},

		pos: {x: 0, y:0},

		name: 'gravity',

		liveTimer: null,
		lifeTime: 60,

		playerRef: null, //watcher for player

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			if (settings.lifeTime) {
				this.lifeTime = settings.lifeTime;
			}

			this.liveTimer = new ig.Timer(this.lifeTime);

			this.getPlayerRef();

		},

		update: function() {

			//this.rainFire();

			this.parent();
		},

		getPlayerRef: function() {
			var player = ig.game.getEntitiesByType(EntityPlayer)[0];
				if (player) {
					this.playerRef = player;
				}
		},

		checkCountDown: function () {
			var countdowndelta = this.liveTimer.delta();
			if (countdowndelta >= 0) {
				this.kill();
			}
		},

		draw: function() {
			this.drawCountdown();

			this.parent();
		},

		drawCountdown: function() {
			ig.game.font.draw('Gravity Time Remaining:' + this.liveTimer.delta(), 2, 512);
		}

	});//eol gravity

	EntityWind = ig.Entity.extend({
		_wmIgnore: true,

		size: {x: 0, y:0},

		pos: {x: 0, y:0},

		name: 'wind',

		liveTimer: null,
		lifeTime: 60,

		playerRef: null, //watcher for player

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			if (settings.lifeTime) {
				this.lifeTime = settings.lifeTime;
			}

			this.liveTimer = new ig.Timer(this.lifeTime);

			this.getPlayerRef();

		},

		update: function() {

			//this.rainFire();

			this.parent();
		},

		getPlayerRef: function() {
			var player = ig.game.getEntitiesByType(EntityPlayer)[0];
				if (player) {
					this.playerRef = player;
				}
		},

		checkCountDown: function () {
			var countdowndelta = this.liveTimer.delta();
			if (countdowndelta >= 0) {
				this.kill();
			}
		},

		draw: function() {
			this.drawCountdown();

			this.parent();
		},

		drawCountdown: function() {
			ig.game.font.draw('Wind Time Remaining:' + this.liveTimer.delta(), 2, 512);
		}

	});//eol wind

	EntitySnow = ig.Entity.extend({
		_wmIgnore: true,

		size: {x: 0, y:0},

		pos: {x: 0, y:0},

		name: 'snow',

		liveTimer: null,
		lifeTime: 60,

		playerRef: null, //watcher for player


///////////////////////////////////////////////////
		//states:
		//backup relevant player data
		//alter relevant player data
		//run timer, after timer expires then -
		//alter relevant player data back to original
		//destroy self

		currentState: 0,
		stateBackup: 0,
		stateAlterPlayer: 1,
		stateRunTimer: 2,
		stateRestorePlayer: 3,
		stateDestroy: 4,
//////////////////////////////////////////////////////////
//////////now we have to declare our storage for the relevant stats of the player
//////////related to this weather type

		relevantStats: {
			friction: {x: null, y: null},
			maxVel: {x: null, y: null}

		},

		excludeTrait: null, //the trait of the player that grants them a free pass

		alterValues: {
			friction: {x: 50, y: 0},
			maxVel: {x: 240, y: 1000}

		},

		init: function(x, y, settings) {
			this.parent(x, y, settings);
			if (settings.lifeTime) {
				this.lifeTime = settings.lifeTime;
			}

			this.liveTimer = new ig.Timer(this.lifeTime);

			this.getPlayerRef();

		},

		update: function() {

			this.runSnow();

			this.parent();
		},

		runSnow: function() {
			//run snow will be our state machine, this logic should extend to the other weather types as well
			if (this.currentState == this.stateBackup) {
				this.backupPlayerStats();
				console.log('finished state: ' + this.currentState);
				this.currentState = this.stateAlterPlayer;
			}
			else if (this.currentState == this.stateAlterPlayer) {
				this.alterPlayerStats();
				console.log('finished state: ' + this.currentState);
				this.currentState = this.stateRunTimer;
			} 
			else if (this.currentState == this.stateRunTimer) {
				//compare timer
				this.checkCountDown();

			}
			else if (this.currentState == this.stateRestorePlayer) {
				this.restorePlayerStats();
				console.log('finished state: ' + this.currentState);
				this.currentState = this.stateDestroy;
			}
			else if (this.currentState == this.stateDestroy) {
				console.log('finished state: ' + this.currentState);
				this.kill();
			}
		},

		backupPlayerStats: function () {
			this.getPlayerRef();
			//copy values from player to our relevant stats
			this.relevantStats.friction.x = this.playerRef.friction.x;
			this.relevantStats.friction.y = this.playerRef.friction.y;
			this.relevantStats.maxVel.x = this.playerRef.maxVel.x;
			this.relevantStats.maxVel.y = this.playerRef.maxVel.y;
			console.log('backup was called');
		},

		alterPlayerStats: function () {
			this.getPlayerRef();
			console.log(this.alterValues);
			this.playerRef.setUnderTheWeather(true);
			this.playerRef.setFriction(this.alterValues.friction.x, this.alterValues.friction.y);
			this.playerRef.setMaxVel(this.alterValues.maxVel.x, this.alterValues.maxVel.y);
			console.log('alterplayerstats was called');
		},

		restorePlayerStats: function () {
			this.getPlayerRef();
			this.playerRef.setUnderTheWeather(false);
			this.playerRef.setFriction(this.relevantStats.friction.x, this.relevantStats.friction.y);
			this.playerRef.setMaxVel(this.relevantStats.maxVel.x, this.relevantStats.maxVel.y);
			console.log('restorePlayerStats was called');
		},

		getPlayerRef: function() {
			var player = ig.game.getEntitiesByType(EntityPlayer)[0];
				//if (player) {
					this.playerRef = player;
				//}
		},

		checkCountDown: function () {
			var countdowndelta = this.liveTimer.delta();
			if (countdowndelta >= 0) {
				//this.kill();
				this.currentState = this.stateRestorePlayer;
			} else {
				//nothing
			}
		},

		draw: function() {
			this.drawCountdown();

			this.parent();
		},

		drawCountdown: function() {
			ig.game.font.draw('Snow Time Remaining:' + this.liveTimer.delta(), 2, 512);
		}

	});//eol snow
}); //eol defines