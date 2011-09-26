var win = Ti.UI.currentWindow;

Ti.include('sc.js');

var grid = sc.ui.createImageGrid();
  	
win.add( grid );

grid.updateGrid(sc.allImages);

