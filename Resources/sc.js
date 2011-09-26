var sc = {};
(function(){
  
  sc.ui = {};
  
  sc.ui.createWindow = function(params){
  	
  	var win = Ti.UI.createWindow(params);
  	
  	var grid = sc.ui.createImageGrid();
  	
  	win.grid = grid;
  	
  	win.add( grid );
  	
  	return win;
  	
  };
  
  sc.ui.createImageGrid = function(){
  	
	 var view = Ti.UI.createScrollView({
        contentWidth: 'auto',
        contentHeight: 'auto',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        showVerticalScrollIndicator: true,
        showHorizontalScrollIndicator: false
    });
    
    var colTracker = 1;
    var topTracker = 0;
    var leftTracker = 0;
    var images = [];
    var imageSize = {height:106, width:106};
    for (var i = 1; i <= 24; i++) {
        var image = Ti.UI.createImageView({
            top: topTracker,
            left: leftTracker,
            width: imageSize.width,
            height: imageSize.height,
            preventDefaultImage: true
        });
        view.add(image);
        images.push(image);
        colTracker++;
        if (colTracker > 3) {
            // new row
            colTracker = 1;
            topTracker += imageSize.height + 1;
            leftTracker = 0;
        } else {
        	// move to the next column
            leftTracker += imageSize.width + 1;
        }
    }
    
    view.images = images;
    
    view.updateGrid = function( items ){
    	for( var i = 0; i < view.images.length ; i++ ){
    		var image = view.images[i];
    		if( items[i] ){
    			image.image = items[i];
    		}
    	}
    };
    
    return view;
  	
  };
  
  sc.allImages = [];
  for( var i = 1; i <= 24; i++ ){
  	sc.allImages.push( 'images/' + i + '.jpg' );
  }
  
}());
