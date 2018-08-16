function Node( i, j, blocked ) {
	this.i = i;
	this.j = j;
	this.blocked = blocked;
	this.parent = null;
}

Node.radius = 25;

Node.prototype.show = function ( clr ) {
	var
		d = Node.radius,
		r = d * .5;
	fill( clr );
	if ( this.blocked ) {
		fill( clr );
	}
	ellipse(
		( this.i + 1.5 ) * d,
		( this.j + 1.5 ) * d,
		r, r
	);
};