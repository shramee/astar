var
	nodes = [],
	nodesCount = 50,
	canvasSize = 700,
	gridBuilder = 1,
	aStar, bgClr;

function setup() {
	bgClr = color( 230 );

	var
		canvas = createCanvas( canvasSize, canvasSize + 50 );
	// Node props
	Node.radius = Math.floor( canvasSize/( nodesCount + 1 ) );

	for ( var i = 0; i < nodesCount; i ++ ) {
		nodes[i] = [];
		for ( var j = 0; j < nodesCount; j ++ ) {

			var freeNode = i === j ?  i === nodesCount - 1 || i === 0 : false;

//			nodes[i][j] = new Node( i, j, ! ( freeNode || 0.3 < Math.random() ) );
			nodes[i][j] = new Node( i, j );
		}
	}

	aStar = new AStar( nodes, nodes[0][0], nodes[nodesCount - 1][nodesCount - 1] );
}

function draw() {
	background( bgClr );
	strokeWeight( 2 );
	stroke( '#000' );
	noFill();
	rect( 25, 25, 650, 650 );

	strokeWeight( Node.radius * .5 );

	if ( gridBuilder ) {
		drawGridBuilder();
	} else {
		drawAlgo();
	}
}

function drawGridBuilder() {
	var xy;
	for ( i = 0; i < nodesCount; i ++ ) {
		for ( j = 0; j < nodesCount; j ++ ) {
			xy = nodes[i][j].coords();
			if ( nodes[i][j].blocked ) {
				nodes[i][j].show( color( 0, 0, 0 ) );
			}
			if ( mouseIsPressed ) {
				if (
					Math.abs( mouseX - xy[0] ) < 7 &&
					Math.abs( mouseY - xy[1] ) < 7
				) {
					nodes[i][j].blocked = true;
				}
			}
		}
	}

	aStar.end.show( '#e84393' );
	aStar.start.show( '#0984e3' );

	noStroke();
	fill( '#000' );
	textSize( 32 );
	textAlign( CENTER );
	xy = [ canvasSize/2, canvasSize + 34 ]
	text( 'Click to start', xy[0], xy[1] );
}

function drawAlgo() {
	// Do the algo suff
	var i, j, coords, message;

	if ( ! message ) {
		message = aStar.iterate();
	}

	for ( i = 0; i < aStar.openSet.length; i ++ ) {
		aStar.openSet[i].show( '#74b9ff' );
	}

	for ( i = 0; i < aStar.closedSet.length; i ++ ) {
		aStar.closedSet[i].show( '#b2bec3' );
	}

	for ( i = 0; i < nodesCount; i ++ ) {
		for ( j = 0; j < nodesCount; j ++ ) {
			if ( nodes[i][j].blocked ) {
				nodes[i][j].show( color( 0, 0, 0 ) );
			}
		}
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
		text( message, canvasSize/2, canvasSize + 34 );
		noLoop();
	}

}

function mouseClicked() {
	if ( mouseY > canvasSize ) {
		switchGridBuilder();
	}
}

function switchGridBuilder() {
	gridBuilder = ! gridBuilder;

	if ( gridBuilder ) {
		// Reset nodes
		for ( var i = 0; i < nodesCount; i ++ ) {
			for ( var j = 0; j < nodesCount; j ++ ) {
				nodes[i][j].parent = null;
				nodes[i][j].estimate = null;
				nodes[i][j].fromStart = null;
			}
		}
	}
}