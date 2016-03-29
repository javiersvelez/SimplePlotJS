console.log("demoLibrary.js...OK");

window.onload = function () {
/* Sin(x) */
	var sinx = [];
	var siny = [];
	
	for (var i=-200; i<200; i+=18){
		sinx.push(i);
		siny.push(Math.sin(i));
	}
	
	
	/* Exp(x) */
	var expx = [];
	var expy = [];
	
	for (var i=-10; i<10; i+=0.1){
		expx.push(i);
		expy.push(Math.exp(i));
	}
	
	/* Tan(x) */
	var tanx = [];
	var tany = [];
	
	for (var i=-200; i<200; i+=0.95){
		var y = Math.tan(i);
		
		if (y > -1 && y < 1){
		tanx.push(i);
		tany.push(y);
		}
	}
    
	$("#button1").click(function() {
		var plot1 = SimplePlot_("canvasPlot",{sinx,siny})
	});
	
	$("#button2").click(function() {
        var plot2 = SimplePlot_("canvasPlot",{expx,expy})
	});
	
	$("#button3").click(function() {
        var plot3 = SimplePlot_("canvasPlot",{tanx,tany})
	});
	
	
	$("#button4").click(function() {
        var plot4 = SimplePlot_("canvasPlot",{_ejoscx,_ejoscy})

	});
    
    //Show first example
    $("#button1").click();

};