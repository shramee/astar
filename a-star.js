function AStar( nodes, start, end ) {
	this.nodes = nodes;
	this.start = start;
	this.end = end;

	this.openSet = [ start ];
	this.closedSet = [];
}

AStar.prototype.nodeNeighbours = function ( node ) {
	var
		offsets = [- 1, 0, 1],
		neighbours = [];

	offsets.map( function ( x ) {
		offsets.map( function ( y ) {
			// Make sure both i and j are not 0 which will point to self ;)
			if ( x || y ) {
				var
					i = node.i + x,
					j = node.j + y;
				if ( this.nodes[i] && this.nodes[i][j] ) {
					neighbours.push( this.nodes[i][j] );
				}
			}
		} );
	} );
};

AStar.prototype.processNodes = function () {
	// Algo here
};

AStar.prototype.iterate = function () {
	if ( this.currentNode === this.end ) {
		// Success
		return 'Done';
	} else if ( this.openSet.length ) {
		// Process
		this.processNodes();
	} else {
		// No solution
		return 'No solution';
	}
};
