ig.module(
	'game.entities.rightarrowbutton'
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
 
  EntityRightarrowbutton = EntityBackbutton.extend({
	size: { x: 50, y: 50 },
	animSheet: new ig.AnimationSheet( 'media/characterArrowButtonR.png', 50, 50 ),
	init: function(x, y, settings) {
		this.parent(x, y, settings);
		//any other init varialbles
	},
	update: function() {
	this.parent();
	},
	pressedUp: function() {
		Characterselectdatapass.Spritesheetsto++;
		if ( Characterselectdatapass.Spritesheetsto > 4) {
			Characterselectdatapass.Spritesheetsto = 1;
		};
	}
  }); // line end entitytestbutton
});