var
	nodes = [],
	blockedNodes = [],
	nodesCount = 50,
	canvasSize = 700,
	aStar, bgClr;

function setup() {
	bgClr = color( 230 );

	var
		canvas = createCanvas( canvasSize, canvasSize + 50 );
	// Node props
	Node.radius = Math.floor( canvasSize/( nodesCount + 1 ) );

	for ( var i = 0; i < nodesCount; i ++ ) {
		nodes[i] = [];
		blockedNodes[i] = [];
		for ( var j = 0; j < nodesCount; j ++ ) {

			var freeNode = i === j ?  i === nodesCount - 1 || i === 0 : false;

			if (
				freeNode ||
				0.3 < Math.random()
			) {
				nodes[i][j] = new Node( i, j );
			} else {
				blockedNodes[i][j] = new Node( i, j );
			}
		}
	}

	aStar = new AStar( nodes, nodes[0][0], nodes[nodesCount - 1][nodesCount - 1] );
}

function draw() {
	// Do the algo suff
	var i, j, coords, message;

	message = aStar.iterate();

	background( bgClr );
	noFill();
	strokeWeight( Node.radius * .5 );
	for ( i = 0; i < nodesCount; i ++ ) {
		for ( j = 0; j < nodesCount; j ++ ) {
			if ( blockedNodes[i][j] ) {
				blockedNodes[i][j].show( color( 0, 0, 0 ) );
			}
		}
	}

	for ( i = 0; i < aStar.openSet.length; i ++ ) {
		aStar.openSet[i].show( '#74b9ff' );
	}

	for ( i = 0; i < aStar.closedSet.length; i ++ ) {
		aStar.closedSet[i].show( '#b2bec3' );
	}

	aStar.end.show( '#e84393' );

	var parent = aStar.currentNode;
	stroke( '#0984e3' );
	beginShape();
	while ( parent ) {
//		parent.show( bgClr );
		coords = parent.coords();
		vertex( coords[0], coords[1] );
		parent = parent.parent;
	}
	endShape();

	if ( message ) {
		noStroke();
		fill( '#000' );
		textSize( 32 );
		textAlign( CENTER );
		text( message, canvasSize/2, canvasSize + 25 );
		noLoop();
	}

}