var matchThree = (function(){

	var scriptQueue = [];
	var numResourcesLoaded = 0;
	var numResources = 0;
	var executeRunning = false;

	function isStandalone() {
		return (window.navigator.standalone !== false);
	}

	function executeScriptQueue() {
		var next = scriptQueue[0];
		var first, script;

		if(next && next.loaded) {
			executeRunning = true;

			scriptQueue.shift();
			first = document.getElementsByTagName("script")[0];
			script = document.createElement("script");
			script.onload = function() {
				if(next.callback) {
					next.callback();
				}
				executeScriptQueue();
			};
			script.src = next.src;
			first.parentNode.insertBefore(script, first);
		} else {
			executeRunning = false;
		}
	}


	function load(src, callback) {
		var image, queueEntry;

		numResources++;

		queueEntry = {
			src : src,
			callback : callback,
			loaded : false
		};
		scriptQueue.push(queueEntry);

		image = new Image();

		image.onload = image.onerror = function() {
			numResourcesLoaded++;
			queueEntry.loaded = true;
			if(!executeRunning) {
				executeScriptQueue();
			}
		};
		image.src = src;
	}
	
	function setup() {
		matchThree.showScreen("screen-splash");
		if (isStandalone()) {
			showScreen("splash-screen");
		} else {
			showScreen("install-screen");
		}
		
	}

	function showScreen(screenId) {
		var dom = matchThree.dom;
		var $ = dom.$;
		var activeScreen = $("#game .screen.active")[0];
		var screen = $("#" + screenId)[0];

		if(activeScreen) {
			dom.removeClass(activeScreen, "active");
		}
		dom.addClass(screen, "active");

		// run the screen module
		matchThree.screens[screenId].run();
	}

	function dBug(data) {
		console.log(data);
	}
	
	return {
		load : load,
		setup : setup,
		showScreen : showScreen,
		screens : {},
		isStandalone: isStandalone
	};
})();

