//(c)opyright 2012 - Steve Miller

ig.module(
	'game.data.theWeather'
	)

.requires(
	'game.entities.firestorm'
	)

.defines(function(){
	

	ClassTheWeather = ig.Class.extend({
		weatherTimer : null,
		weatherDebugTimer : null,
		weatherOrbRef : null,

		weatherOrbSpawnRef: null,

		currentTypeToBeSpawned: null,
		currentWeather: null,

		defaultWeatherType: 'firestorm',
		defaultSpawnType: 'EntityWeatherorbfirestorm',

		aSpawnType: {
			firestorm: 'EntityWeatherorbfirestorm', //0
			gravity:   'EntityWeatherorbgravity', 	//1
			wind:      'EntityWeatherorbwind',		//2
			snow:      'EntityWeatherorbsnow'		//3
		},

		aWeatherType: {
			firestorm: 'firestorm',
			gravity: 'gravity',
			wind: 'wind',
			snow: 'snow'
		},

		spawnedOrb: false,

		bOrbTouched: false,

		bWeatherOn: false,

		bDidSpawnFirestorm: false,

		init: function(weatherType) {
			if (weatherType == undefined || weatherType == null) {
				this.selectWeatherType(this.defaultWeatherType);
				this.selectSpawnType(this.defaultSpawnType);
			} else if (weatherType) {
				this.selectWeatherType(weatherType);
				this.selectSpawnType(weatherType);
			}
			this.weatherTimer = new ig.Timer();
			this.weatherDebugTimer = new ig.Timer();
			//this.selectSpawnType(this.defaultSpawnType);
			console.log('init weather');

		},

		update: function() {
			this.checkWeatherOrbSpawn();
			this.orbTouched();
			

			if (this.spawnedOrb == false) {
				this.spawnWeatherOrb();
				//this.orbTouched();
			}
			if (this.bWeatherOn) {
				this.runWeather();
			}
			

			//testing output and states
			if (this.weatherDebugTimer.delta() > 2) {
				//console.log('weather orb: ' + this.weatherOrbRef);
				//console.log('weather orb spawn:' + this.weatherOrbSpawnRef);
				//console.log(this);
				//console.log(this.weatherOrbSpawnRef.spawnedOrb);
				//console.log(this.weatherOrbSpawnRef.currentTypeToBeSpawned);
				//console.log(this.currentWeather);
				//console.log(this.currentTypeToBeSpawned);
				//console.log(this.bOrbTouched);
				//console.log(this.bWeatherOn);
				//console.log(this.bDidSpawnFirestorm);
				this.weatherDebugTimer.reset();
			}

			
			//this.parent();
		},

		deregisterCurrentOrb: function() {
			this.weatherOrbRef = null;
		},

		getCurrentOrb: function() {
			return this.weatherOrbRef;
		},

		registerWeatherOrb: function(orbInstance) {
			if (!this.weatherOrbRef){
				this.weatherOrbRef = orbInstance;
			}
		},

		checkWeatherOrbSpawn: function() {
			if (this.weatherOrbSpawnRef) {
				return;
			} else if (!this.weatherOrbSpawnRef) {
				this.weatherOrbSpawnRef = ig.game.getEntityByName('weatherorbspawn');
			}
		},

		setWeatherType: function(type) {
			this.currentWeather = type;
		},

		selectWeatherType: function(type) {
			if (type == this.aWeatherType.firestorm || type == 0 || type == 'firestorm') {
				this.setWeatherType(this.aWeatherType.firestorm);
			} 
			else if (type == this.aWeatherType.gravity || type == 1 || type == 'gravity') {

			} 
			else if (type == this.aWeatherType.wind || type == 2 || type == 'wind') {

			} 
			else if (type == this.aWeatherType.snow || type == 3 || type == 'snow') {

			}
		},

		selectSpawnType: function(type) {
			if (type == this.aSpawnType.firestorm || type == 0 || type == 'firestorm') {
				//this.currentTypeToBeSpawned = this.aSpawnType.firestorm;
				this.setSpawnType(this.aSpawnType.firestorm);
				//currentTypeToBeSpawned = 'EntityWeatherorbfirestorm';
			} 
			else if (type == this.aSpawnType.gravity || type == 1 || type == 'gravity') {

			} 
			else if (type == this.aSpawnType.wind || type == 2 || type == 'wind') {

			} 
			else if (type == this.aSpawnType.snow || type == 3 || type == 'snow') {

			}
		},

		setSpawnType: function(spawnType) {
			this.currentTypeToBeSpawned = spawnType;
		},

		spawnWeatherOrb: function() {
			//for now will spawn firestorm
			ig.game.spawnEntity(
				this.currentTypeToBeSpawned,
				this.weatherOrbSpawnRef.pos.x,
				this.weatherOrbSpawnRef.pos.y
				/*, settings*/
				);
			this.spawnedOrb = true;
		},

		orbTouched: function() {
			//this.weatherOrbSpawnRef.selectSpawnType(0);
			//this.weatherOrbSpawnRef.spawnWeatherOrb();
			if(this.bOrbTouched == true) {
				this.startWeather();
			}
			
		},

		setOrbTouched: function(bool, globalFlag) {
			this.bOrbTouched = bool;
			if (globalFlag) {
				ig.game.sendOutMessage('serverBroadCastWeatherOrbTouched', bool);
			}
		},

		startWeather: function() {
			this.bWeatherOn = true;
		},

		runWeather: function() {
			if (this.currentWeather == this.aWeatherType.firestorm) {
				if (this.bDidSpawnFirestorm == true) {return;}
				else {
					ig.game.spawnEntity(EntityFirestorm, 0, 0);
					this.bDidSpawnFirestorm = true;
				}
			}
		}

	});//eol theweather

});//eol defines