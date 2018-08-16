var
	nodes = [],
	blockedNodes = [],
	nodesCount = 25,
	canvasSize = 700;

function setup() {
	var
		canvas = createCanvas( canvasSize, canvasSize );

	// Node props
	Node.radius = Math.floor( canvasSize/( nodesCount + 1 ) );

	for ( var i = 0; i < nodesCount; i ++ ) {
		nodes[i] = [];
		blockedNodes[i] = [];
		for ( var j = 0; j < nodesCount; j ++ ) {
			if ( 0.3 > Math.random() ) {
				blockedNodes[i][j] = new Node( i, j );
			} else {
				nodes[i][j] = new Node( i, j );
			}
		}
	}
}

function draw() {
	background( 230 );
	noStroke();
	for ( var i = 0; i < nodesCount; i ++ ) {
		for ( var j = 0; j < nodesCount; j ++ ) {
			if ( nodes[i][j] ) {
				// Do stuff with the node here
			} else {
				blockedNodes[i][j].show( color( 0, 0, 0 ) );
			}
		}
	}
}