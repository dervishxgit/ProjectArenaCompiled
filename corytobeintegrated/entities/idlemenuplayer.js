ig.module(
    'game.entities.idlemenuplayer'
)
.requires(
    'impact.entity',
	'impact.animation'
)
.defines(function(){
    EntityIdlemenuplayer = ig.Entity.extend({
        size: {x: 200, y: 200},
		woodSheet: new ig.AnimationSheet( 'media/SPRITES/Wood_spritesheet.png', 200, 200 ),
		fishSheet: new ig.AnimationSheet( 'media/SPRITES/wolfMatthew_Karl_SpriteSheet.png', 200, 200 ),
		roboSheet: new ig.AnimationSheet( 'media/SPRITES/cameronBradfield_Sprite_Sheet_Fixed.png', 200, 200 ),
		wizaSheet: new ig.AnimationSheet( 'media/SPRITES/Wizard_Sprite_Sheet_Fixeded02.png', 200, 200 ),	
		woodanim: null,
		fishanim: null,
		roboanim: null,
		wizaanim: null,
        init: function( x, y, settings ) {
            this.parent( x, y, settings );
            this.setupAnim();
        },
		setupAnim: function() {
			this.woodanim = new ig.Animation( this.woodSheet, 0.1, [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] );
			this.fishanim = new ig.Animation( this.fishSheet, 0.1, [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] );
			this.roboanim = new ig.Animation( this.roboSheet, 0.1, [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] );
			this.wizaanim = new ig.Animation( this.wizaSheet, 0.1, [12, 13, 14, 15, 16] );
		},
		draw: function() {
			if ( Characterselectdatapass.Spritesheetsto == 1 ) {
				this.woodanim.draw( this.pos.x, this.pos.y );
			}
			else if ( Characterselectdatapass.Spritesheetsto == 2 ) {
				this.fishanim.draw( this.pos.x, this.pos.y );
			}
			else if ( Characterselectdatapass.Spritesheetsto == 3 ) {
				this.roboanim.draw( this.pos.x, this.pos.y );
			}
			else if ( Characterselectdatapass.Spritesheetsto == 4 ) {
				this.wizaanim.draw( this.pos.x, this.pos.y );
			};
			this.parent();
		},
		update: function() {
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
		}
    });
});