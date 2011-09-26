// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('black');

Ti.include('sc.js');

sc.ui.windows = [];

// Create the home window.
var winHome = Ti.UI.createWindow({  
    title:'Home',
    backgroundColor:'black'
});
var label = Ti.UI.createLabel({
	top :10,
	width:'90%',
	font:{fontSize:14,fontWeight:'bold'},
	height:150,
	textAlign:'center',
	color:'#aaa',
	text:"This is an example of how setting the image property on a large number of image views in a window at different times give the user a different UI experience. This will only show the first time you click on the tab. For the best effect, click on the home tab between each tab"
});
winHome.add(label);
sc.ui.windows.push(winHome);


// This window will use an external context
// and load the images before open in the
// external file
var winExternalContext = Ti.UI.createWindow({
	url:'win_external.js',
	title:'External Context',
	backgroundColor:'black'
});
sc.ui.windows.push(winExternalContext);

// This window will set the image
// property on the imageViews before open
var winBeforeOpen = sc.ui.createWindow({  
    title:'Before Open'
});
// Update the images now, before open
winBeforeOpen.grid.updateGrid(sc.allImages);
sc.ui.windows.push(winBeforeOpen);

// This window will set the image
// property on the on the open event
var winOnOpen = sc.ui.createWindow({  
    title:'On Open'
});
// Update the images now, before open
winOnOpen.addEventListener('open', function(){
	winOnOpen.grid.updateGrid(sc.allImages);
});
sc.ui.windows.push(winOnOpen);

// This window will set the image
// property on the on the focus event
// but only the first time
var winOnFocus = sc.ui.createWindow({  
    title:'On Focus'
});
winOnFocus.needsUpdate = true;
// Update the images now, before open
winOnFocus.addEventListener('focus', function(){
	if(winOnFocus.needsUpdate){
	   winOnFocus.grid.updateGrid(sc.allImages);
	   winOnFocus.needsUpdate = false;
	} else {
	  // do nothing
	  Ti.API.info("I don't need to update images" );
	}
});
sc.ui.windows.push(winOnFocus);

// Tab Group for the UI
var tabGroup = Ti.UI.createTabGroup();

for( var i = 0; i < sc.ui.windows.length; i++ ){
  var tab = Ti.UI.createTab({
  	title: sc.ui.windows[i].title,
  	window: sc.ui.windows[i]
  });
  tabGroup.addTab( tab );
}

tabGroup.open();
