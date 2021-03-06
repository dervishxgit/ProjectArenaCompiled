ig.module(
	'game.entities.traitwirybutton'
)
.requires(
  'impact.entity',
  'game.entities.backbutton'
)
.defines(function() {
// A Button Entity for Impact.js
// Has 4 States: 
// * hidden - Not shown
// * idle - just sitting there
// * active - someone is pushing on it
// * deactive - shown, but not usable

// And 3 Events
// * pressedDown - activated when pressed Down
// * pressed - constantly fires when pressing
// * pressedUp - activated when button released

// Can render Text. Should explain itself.

// Use like you want to, just don't blame me for anything.
 
  EntityTraitwirybutton = EntityBackbutton.extend({
	size: { x: 100, y: 50 },
	animSheet: new ig.AnimationSheet( 'media/traitWiry.png', 100, 50 ),
	init: function(x, y, settings) {
		this.parent(x, y, settings);
		//any other init varialbles
	},
	update: function() {
		if ( Characterselectdatapass.Physiquesto == false ) {
			this.setState( 'deactive' );
		}
		else if ( Characterselectdatapass.Physiquesto ) {
			this.setState( 'idle' );
		}
		this.parent();
	},
	pressed: function() {
		Characterselectdatapass.Physiquesto = false;
	},
	pressedUp: function() {
	}
  }); // line end entitytestbutton
});