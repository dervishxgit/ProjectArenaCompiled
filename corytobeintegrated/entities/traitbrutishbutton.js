ig.module(
	'game.entities.traitbrutishbutton'
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
 
  EntityTraitbrutishbutton = EntityBackbutton.extend({
	size: { x: 100, y: 50 },
	animSheet: new ig.AnimationSheet( 'media/traitBrutish.png', 100, 50 ),
	init: function(x, y, settings) {
		this.parent(x, y, settings);
		//any other init varialbles
	},
	update: function() {
		if ( Characterselectdatapass.Tactilitysto ) {
			this.setState( 'deactive' );
		}
		else if ( Characterselectdatapass.Tactilitysto == false ) {
			this.setState( 'idle' );
		}
		this.parent();
	},
	pressed: function() {
		Characterselectdatapass.Tactilitysto = true;
	},
	pressedUp: function() {
	}
  }); // line end entitytestbutton
});