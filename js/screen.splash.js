matchThree.screens["screen-splash"] = (function(){

	var firstRun = true;

	function setup() {
		matchThree.dom.bind("#screen-splash", "click", function(){
			matchThree.showScreen("screen-mainmenu");
		});
	}

	function run() {
		if(firstRun) {
			setup();
			firstRun = false;
		}
	}

	return {
		run : run
	};
})();