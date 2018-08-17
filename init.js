var
	nodes = [],
	blockedNodes = [],
	nodesCount = 25,
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
	var i;
	background( bgClr );
	noStroke();
	for ( i = 0; i < nodesCount; i ++ ) {
		for ( var j = 0; j < nodesCount; j ++ ) {
			if ( blockedNodes[i][j] ) {
				blockedNodes[i][j].show( color( 0, 0, 0 ) );
			}
		}
	}

	// Do the algo suff
	var message = aStar.iterate();

	for ( i = 0; i < aStar.openSet.length; i ++ ) {
		aStar.openSet[i].show( color( '#0984e3' ) );
	}

	var parent = aStar.currentNode;
	while ( parent ) {
		parent.show( background );
		parent = this.parent;
	}

	for ( i = 0; i < aStar.closedSet.length; i ++ ) {
		aStar.closedSet.show( color( '#b2bec3' ) );
	}

	aStar.end.show( color( '#e84393' ) );

	if ( message ) {
		console.log( message );
		textSize( 32 );
		textAlign( CENTER );
		text( message, canvasSize/2, canvasSize + 25 );
	}
}