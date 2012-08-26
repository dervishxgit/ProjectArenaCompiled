//(c)opyright  2012 - Steve Miller

ig.module(

	'game.entities.otherplayer'
    )

.requires(

	'impact.entity'
    )

.defines(function () {
    ///////////////////////////////Enemy Other Players////////////////////////////////
    /*var testPunchCopySettings = {
        flip: false,
        bWatchSpawnerPosition: true, 
        referenceSpawner: null,
        lifeTime: 100,
        offsetSpawnOrigin: {x: 100, y: 0},
        punchString: "",
    };*/

    var testVar = 1;

    EntityOtherplayer = ig.Entity.extend({
        size: {
            x: 100,
            y: 100
        },

        offset: {
            x: 50,
            y: 100
        },

        startPosition: {x: 0, y: 0},

        _wmIgnore: true,

        speed: 100,
        name: "otherplayer",
        gamename: "",
        iNetReceiveAnim: 0,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.PASSIVE,

        health: 100,
        armor: 0,
        lives: 3,

        punchBasicString: "punchBasic",
         offsetSpawnOrigin: {x: 100, y: 0}, //the coords of where we spawn projectiles, additive as offset

         animSheet: new ig.AnimationSheet('media/Wood_spritesheet.png', 200, 200),

        testPunchCopySettings : {
            flip: false,
            bWatchSpawnerPosition: true, 
            referenceSpawner: null,
            lifeTime: 100,
            offsetSpawnOrigin: {x: 100, y: 0},
            punchString: "",
        },

        init: function (x, y, settings) {
          
            this.parent(x, y, settings);
            this.startPosition.x = x;
            this.startPosition.y = y;

            //this.health = 100;

           /* this.addAnim('idle', 1, [1]);
            this.addAnim('run', 0.07, [1]);
            this.addAnim('jump', 0.5, [0]);
            this.addAnim('fall', 0.4, [0]);*/

            this.addAnim( 'run', 0.16, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] );
            this.addAnim( 'idle', 0.16, [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] );
            this.addAnim( 'swingattack', .66, [24, 25, 26, 27] ); //not implemented
            this.addAnim( 'punchattack', .16, [28, 29, 30, 31] ); //not implemented
            this.addAnim( 'swingattackreverse', .66, [98, 99, 100, 101] ); //not implemented
            this.addAnim( 'punchattackreverse', .66, [102, 103, 104, 105] ); //not implemented
            this.addAnim( 'pain', .66, [32, 33, 34, 35] ); //not implemented
            this.addAnim( 'block', .5, [36, 37, 38] ); //not implemented
            this.addAnim( 'dodge', .5, [39, 40, 41] ); //not implemented
            this.addAnim( 'duckstart', .16, [42, 43, 44] ); //implemented, but needs work
            this.addAnim( 'ducked', .16, [44]);
            //this.addAnim( 'duckend', .16, [43,44]);
            this.addAnim( 'duckattack', .66, [45, 46, 47, 48] ); //implemented, needs more work
            this.addAnim( 'jump', .5, [49, 50, 51] ); 
            this.addAnim( 'idleairidle', .5, [52, 53, 54] );
            this.addAnim( 'idledoublejump', .5, [55, 56, 57] );
            this.addAnim( 'forwardjump', .5, [58, 59, 60] );
            this.addAnim( 'forwardairidle', .5, [61, 62, 63] );
            this.addAnim( 'forwarddoublejump', .5, [64, 65, 66] );
            this.addAnim( 'backwardjump', .5, [67, 68, 69] ); //not implemented
            this.addAnim( 'backwardairidle', .5, [70, 71, 72] ); //not implemented
            this.addAnim( 'backwarddoublejump', .5, [73, 74, 75] ); //not implemented
            this.addAnim( 'fall', .5, [76, 77, 78] );
            this.addAnim( 'airdodge', .5, [79, 80, 81] ); //not implemented
            this.addAnim( 'victory', 1.33, [82, 83, 84, 85, 86, 87, 88, 89] ); //not implemented
            this.addAnim( 'death', 1.33, [90, 91, 92, 93, 94, 95, 96, 97] ); //not implemented

            //ig.game.playerList.otherplayer = this;
            this.testPunchCopySettings.referenceSpawner = this;
            //console.log(this.iNetReceiveAnim);
            //console.log('spawned other player');
        },

        netmoveplayer: function () {

            this.pos.x = positionx;
            this.pos.y = positiony;

        },

        incSpawnProjectileNetCopy: function() {
           //console.log(this);
           console.log('received message');
            this.testPunchCopySettings.flip = this.flip;
            this.testPunchCopySettings.punchString = this.punchBasicString;
                //we need to check for the flip state and feed spawnposition data
                if (this.flip){
                    ig.game.spawnEntity(
                        EntityProjectilenetcopy, 
                        this.pos.x - this.offsetSpawnOrigin.x,
                        this.pos.y + this.offsetSpawnOrigin.y, 
                        this.testPunchCopySettings
                    );
                    console.log('spawned flipped netpunch');
                } else if (!this.flip){
                    ig.game.spawnEntity(
                        EntityProjectilenetcopy, 
                        this.pos.x + this.offsetSpawnOrigin.x,
                        this.pos.y + this.offsetSpawnOrigin.y, 
                        this.testPunchCopySettings
                    );
                    console.log('spawned nonflipped netpunch');
                }
                console.log(this.pos.x, this.pos.y);
            //ig.game.spawnEntity(EntityProjectilenetcopy, this.pos.x-100, this.pos.y, testPunchCopySettings);
            //console.log('incspawn got here');
        },

        incSetNetAnim: function(iAnimValue) {
            //console.log(iAnimValue);
            this.iNetReceiveAnim = iAnimValue;
            //console.log(this.iNetReceiveAnim);
        },

        setAnim: function() {

        },

        setHealth: function(healthValue) {
            this.health = healthValue;
        },

        setArmor: function(armorValue) {
            this.armor = armorValue;
        },

        setLives: function(livesValue) {
            this.lives = livesValue;
        },

        update: function () {

             // set the current animation, based on the player's speed
           /* if (this.vel.y < 0) {
                this.currentAnim = this.anims.jump;
            }
            else if (this.vel.y > 0) {
                this.currentAnim = this.anims.fall;
            }
            else if (this.vel.x != 0) {
                this.currentAnim = this.anims.run;
            }
            else {
                this.currentAnim = this.anims.idle;
            }*/



            this.currentAnim.flip.x = !this.flip;

            this.updateAnim();

            
            /*switch (this.animation) {
                case 1:
                    this.currentAnim = this.anims.up;
                    break;
                case 2:
                    this.currentAnim = this.anims.down;
                    break;
                case 3:
                    this.currentAnim = this.anims.left;
                    break;
                case 4:
                    this.currentAnim = this.anims.right;
                    break;
                case 5:
                    this.currentAnim = this.anims.idleup;
                    break;
                case 6:
                    this.currentAnim = this.anims.idledown;
                    break;
                case 7:
                    this.currentAnim = this.anims.idleleft;
                    break;
                case 8:
                    this.currentAnim = this.anims.idleright;
                    break;

            }*/

            this.parent();
        },

        updateAnim: function() {
            if(this.iNetReceiveAnim == 0) {
                this.currentAnim = this.anims.idle;
                //console.log('hit' + this.currentAnim);
            }
            else if(this.iNetReceiveAnim == 1) {
                this.currentAnim = this.anims.run;
                //console.log('hit' + this.currentAnim);
            }
            else if(this.iNetReceiveAnim == 2) {
                this.currentAnim = this.anims.jump;
                //console.log('hit' + this.currentAnim);
            }
            else if(this.iNetReceiveAnim == 3) {
                this.currentAnim = this.anims.fall;
                //console.log('hit' + this.currentAnim);
            }
            //console.log(this.iNetReceiveAnim);
        },

         onDeath: function() {
            this.currentAnim = this.anims.death;
            //also tell game that we died
            //ig.game.spawnEntity(EntityPlayer, this.startPosition.x, this.startPosition.y);
            this.pos.x = this.startPosition.x;
            this.pos.y = this.startPosition.y;
            ig.game.otherPlayerDied(this);
            this.lives = this.lives - 1;
            this.respawnStats();

        },
        
        kill: function() {
            //if we have lives, we will pretend we died and respawn instead
            if (this.lives > 1) {
                this.onDeath();
            }
            else{
                this.currentAnim = this.anims.death;
                ig.game.otherPlayerDied(this);
                //ig.game.displayDeathMessage();
                this.parent();
                                
            }
        },

        respawnStats: function() {
            this.health = 100;
            this.armor = 0;
        }


    });

});