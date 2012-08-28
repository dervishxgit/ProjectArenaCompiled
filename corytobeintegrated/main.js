//(c)opyright Corydon LaPaz, Steve Miller, Tyler Fuqua

ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'impact.debug.debug',
	'impact.animation',
	'game.levels.teamsplashscreen',
	'game.levels.mainmenuscreen',
	'game.levels.creditsscreen',
	'game.levels.gamelobbyscreen',
	'game.levels.creategamescreen',
	'game.levels.characterselectscreen',
	'game.levels.Arena002',
	'game.entities.player',
    'game.entities.otherplayer',
    'game.entities.projectile',
    'game.data.projectileLib',
    'game.data.theWeather',
    'game.entities.weatherorb'	
)
.defines(function(){
//Could not figure out Button entity
//Could not figure out how to create a counter counting down
TeamSplash = ig.Game.extend({
//A fade-in fade-out of a team logo for the class
//OPTIONS: NONE
	init: function() {
		ig.input.bind( ig.KEY.MOUSE1, 'click' );
		this.loadLevel( LevelTeamsplashscreen );
	},
	update: function() {
		this.parent();
	},
	draw: function() {
		this.parent();
	}
});
MainMenu = ig.Game.extend({
//A menu featuring splash art, game name, and interactive text to start the game or open the credits.
//OPTIONS: START(GameLobby) : CREDITS(Credits)
	init: function() {
		this.loadLevel( LevelMainmenuscreen );
	},
	update: function() {
		this.parent();
	},
	draw: function() {
		this.parent();
	}
});
Credits = ig.Game.extend({
//A simple screen featuring all participants names, roles, and acknoledgements with a button to go back.
//OPTIONS: BACK(MainMenu)
	init: function() {
		this.loadLevel( LevelCreditsscreen );
	},
	update: function() {
		this.parent();
	},
	draw: function() {
		this.parent();
	}
});
GameLobby = ig.Game.extend({
//An interactive screen that features an actively updating list of all available games, local and web. Inside the interactive area is a button to join for each game found. At the bottom of the page are 2 buttons to go back or create a game to be displayed in the interactive area for other players.
//OPTIONS: CREATE(CreateGame), BACK(MainMenu), JOIN(CharacterSelect)
	init: function() {
		this.loadLevel( LevelGamelobbyscreen );
	},
	update: function() {
		this.parent();
	},
	draw: function() {
		this.parent();
	}
});
CreateGame = ig.Game.extend({
//A simple screen that lets you give your game a name. Features 2 buttons to go back or to create a game with the desired name. This game will be displayed in the interactive area of (GameLobby) under that name, if the name is already in use it will return an error.
//OPTIONS: CREATE(CharacterSelect), BACK(GameLobby)
	init: function() {
		this.loadLevel( LevelCreategamescreen );
	},
	update: function() {
		this.parent();
	},
	draw: function() {
		this.parent();
	}
});
CharacterSelect = ig.Game.extend({
//A more complicated screen. It displays the name of the game you're in, the name entered by the host, at the top; a character display and selector at the left, using 2 arrow buttons; a trait selector below that, using 6 buttons; a lobby chat to the right of the character selector; A list of connected players on the right; 2 buttons at the botom right to mark yourself as ready or go back. Both players must mark themselves as 'ready' for that function to pass, if one is ready it holds.
//OPTIONS: READY(MyGame), BACK(GameLobby)
	characterselectfont: new ig.Font( 'media/04b03dark.font.png' ),
	init: function() {
		this.loadLevel( LevelCharacterselectscreen );
	},
	update: function() {
		this.parent();
	},
	draw: function() {
		this.parent();
	}
});
MyGame = ig.Game.extend({

        gravity: 1000,
        // Load a font
        //font: new ig.Font( 'media/04b03.font.png' ),
        font: new ig.Font('media/04b04.font.png'),
		//Win and Loss states
		win: false,
		loss: false, 

        playerList: {
            thisPlayer: null,
            otherPlayer: null
        },

        projectileLib: {},
        theWeather: null,

        init: function () {
            ig.game = this;
            /*// Initialize your game here; bind keys etc.
            ig.input.bind( ig.KEY.A, 'left' );
            ig.input.bind( ig.KEY.D, 'right' );
            ig.input.bind( ig.KEY.W, 'up' );
            ig.input.bind( ig.KEY.S, 'down' );
            //this.loadLevel (LevelLevel1);
            //this.loadLevel (LevelTestlevel01);
            //this.loadLevel (LevelBlank);
            this.loadLevel (LevelTest03Large);*/

            // Bind keys
            ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
            ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
            ig.input.bind(ig.KEY.X, 'jump');
            ig.input.bind( ig.KEY.C, 'shoot' );
            ig.input.bind(ig.KEY.DOWN_ARROW, 'down');

            // Load the LevelTest as required above ('game.level.test')
            //this.loadLevel( LevelTest );
            //this.loadLevel(LevelTest02);
            //this.loadLevel(LevelTest03Large);
            this.loadLevel(LevelArena002);
            //this.loadLevel(LevelArena003);
            //this.loadLevel(LevelArena004);
            //this.loadLevel(LevelArenablank);

            this.projectileLib = new ClassProjectilelib;
            this.theWeather = new ClassTheWeather('firestorm');


        },

        update: function () {
            // Update all entities and backgroundMaps
            this.parent();

            // Add your own, additional update code here
            if(!this.playerList.thisPlayer){
                this.playerList.thisPlayer = this.getEntitiesByType(EntityPlayer)[0];
            }

            if (!this.playerList.otherPlayer){
                this.playerList.otherPlayer = this.getEntityByName('otherplayer');
            }

            if (this.playerList.thisPlayer) {
                this.screen.x = this.playerList.thisPlayer.pos.x - ig.system.width / 2;
                this.screen.y = this.playerList.thisPlayer.pos.y - ig.system.height / 2;
            }

            //weather
            //update weather
            this.theWeather.update();

            //console.log(this.playerList);
			//Win and Loss checker
			if ( win == true ) {
				ig.system.setGame(WinScreen);
			}
			else if ( loss == true ) {
				ig.system.setGame(LooseScreen);
			}
        },

        draw: function () {
            // Draw all entities and backgroundMaps
            this.parent();

            //var player = this.getEntitiesByType(EntityPlayer)[0];
            //var otherplayer = this.getEntityByName('otherplayer');
            // Add your own drawing code here
            this.playerList.thisPlayer.messageboxtimer = this.playerList.thisPlayer.messageboxtimer - 1;

            if(this.playerList.thisPlayer.messageboxtimer < 1)
            {
                this.playerList.thisPlayer.messageboxtimer = 50;
                var newtext = "";
                var newsplit = this.playerList.thisPlayer.messagebox.split("\n");
                for(var i = 0;i < newsplit.length; i++)
                {
                    if(i > 1)
                    {
                        newtext = newtext + "\n" + newsplit[i];
                    }
                }
    		
                this.playerList.thisPlayer.messagebox = newtext;
            }

            this.font.draw('Arrow Keys, X, C', 2, 2);
            this.font.draw( this.playerList.thisPlayer.messagebox, 350, 10);
            this.font.draw('Health: ' + this.playerList.thisPlayer.health, 2, 32);
            this.font.draw('Armor: ' + this.playerList.thisPlayer.armor, 2, 64);

            //debug other player stats
            //this.font.draw('otherplayer: ' + this.playerList.otherPlayer.health, 2, 128 );
        },

        sendOutMessage: function(funcString, argString) {
            //outgoing message
            if (argString || argString != null || argString != undefined) {
                socket.emit(funcString, argString);
            } else {
                socket.emit(funcString /*,args*/);
            }
        }

    });

WinScreen = ig.Game.extend({
//A slightly transparent screen with a win graphic, press 'key' to continue.
//OPTIONS: CONTINUE(MainMenu)
	Background: new ig.Image( 'media/winBackground.png' ),
	woodSheet: new ig.AnimationSheet( 'media/SPRITES/Wood_spritesheet.png', 200, 200 ),
	fishSheet: new ig.AnimationSheet( 'media/SPRITES/wolfMatthew_Karl_SpriteSheet.png', 200, 200 ),
	roboSheet: new ig.AnimationSheet( 'media/SPRITES/cameronBradfield_Sprite_Sheet_Fixed.png', 200, 200 ),
	wizaSheet: new ig.AnimationSheet( 'media/SPRITES/Wizard_Sprite_Sheet_Fixeded02.png', 200, 200 ),	
	woodanim: null,
	fishanim: null,
	roboanim: null,
	wizaanim: null,
	init: function() {
		this.setupAnim();
	},
	setupAnim: function() {
		this.woodanim = new ig.Animation( this.woodSheet, 0.1, [82, 83, 84, 85, 86, 87, 88, 89] );
		this.fishanim = new ig.Animation( this.fishSheet, 0.1, [82, 83, 84, 85, 86, 87, 88, 89] );
		this.roboanim = new ig.Animation( this.roboSheet, 0.1, [82, 83, 84, 85, 86, 87, 88, 89] );
		this.wizaanim = new ig.Animation( this.wizaSheet, 0.15, [50, 51, 52, 53, 54, 55, 56] );
	},
	update: function() {
		if(ig.input.released('continue')){
			ig.system.setGame(MyGame)
		};
		if ( Characterselectdatapass.Spritesheetsto == 1 ) {
			this.woodanim.update();
		}
		else if ( Characterselectdatapass.Spritesheetsto == 2 ) {
			this.fishanim.update();
		}
		else if ( Characterselectdatapass.Spritesheetsto == 3 ) {
			this.roboanim.update();
		}
		else if ( Characterselectdatapass.Spritesheetsto == 4 ) {
			this.wizaanim.update();
		};
		this.parent();
	},
	draw: function() {
		this.parent();
		this.Background.draw( 0, 0 );
		if ( Characterselectdatapass.Spritesheetsto == 1 ) {
			this.woodanim.draw( ig.system.width / 2 - 100, ig.system.height / 2 - 200 );
		}
		else if ( Characterselectdatapass.Spritesheetsto == 2 ) {
			this.fishanim.draw( ig.system.width / 2 - 100, ig.system.height / 2 - 200 );
		}
		else if ( Characterselectdatapass.Spritesheetsto == 3 ) {
			this.roboanim.draw( ig.system.width / 2 - 100, ig.system.height / 2 - 200 );
		}
		else if ( Characterselectdatapass.Spritesheetsto == 4 ) {
			this.wizaanim.draw( ig.system.width / 2 - 100, ig.system.height / 2 - 200 );
		};
	}
});
LooseScreen = ig.Game.extend({
//A slightly transparent screen with a loss graphic, press 'key' to continue.
//OPTIONS: CONTINUE(MainMenu)
	Background: new ig.Image( 'media/loseBackground.png' ),
	woodSheet: new ig.AnimationSheet( 'media/SPRITES/Wood_spritesheet.png', 200, 200 ),
	fishSheet: new ig.AnimationSheet( 'media/SPRITES/wolfMatthew_Karl_SpriteSheet.png', 200, 200 ),
	roboSheet: new ig.AnimationSheet( 'media/SPRITES/cameronBradfield_Sprite_Sheet_Fixed.png', 200, 200 ),
	wizaSheet: new ig.AnimationSheet( 'media/SPRITES/Wizard_Sprite_Sheet_Fixeded02.png', 200, 200 ),	
	woodanim: null,
	fishanim: null,
	roboanim: null,
	wizaanim: null,
	init: function() {
		this.setupAnim();
	},
	setupAnim: function() {
		this.woodanim = new ig.Animation( this.woodSheet, 0.1, [90, 91, 92, 93, 94, 95, 96, 97] );
		this.fishanim = new ig.Animation( this.fishSheet, 0.1, [90, 91, 92, 93, 94, 95, 96, 97] );
		this.roboanim = new ig.Animation( this.roboSheet, 0.1, [90, 91, 92, 93, 94, 95, 96, 97] );
		this.wizaanim = new ig.Animation( this.wizaSheet, 0.15, [57, 58, 59, 60, 61, 62, 63] );
	},
	update: function() {
		if(ig.input.released('continue')){
			ig.system.setGame(MyGame)
		};
		if ( Characterselectdatapass.Spritesheetsto == 1 ) {
			this.woodanim.update();
		}
		else if ( Characterselectdatapass.Spritesheetsto == 2 ) {
			this.fishanim.update();
		}
		else if ( Characterselectdatapass.Spritesheetsto == 3 ) {
			this.roboanim.update();
		}
		else if ( Characterselectdatapass.Spritesheetsto == 4 ) {
			this.wizaanim.update();
		};
		this.parent();
	},
	draw: function() {
		this.parent();
		this.Background.draw( 0, 0 );
		if ( Characterselectdatapass.Spritesheetsto == 1 ) {
			this.woodanim.draw( ig.system.width / 2 - 100, ig.system.height / 2 - 100 );
		}
		else if ( Characterselectdatapass.Spritesheetsto == 2 ) {
			this.fishanim.draw( ig.system.width / 2 - 100, ig.system.height / 2 - 100 );
		}
		else if ( Characterselectdatapass.Spritesheetsto == 3 ) {
			this.roboanim.draw( ig.system.width / 2 - 100, ig.system.height / 2 - 100 );
		}
		else if ( Characterselectdatapass.Spritesheetsto == 4 ) {
			this.wizaanim.draw( ig.system.width / 2 - 100, ig.system.height / 2 - 100 );
		};
	}
});
// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', TeamSplash, 60, 960, 640, 1 );
});