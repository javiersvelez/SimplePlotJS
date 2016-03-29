/*
v0.5.2
2014-2016 Javier Velez
javiers.velez@gmail.com
*/

SimplePlot_ = function (cvselement, data) {

    this.canvas = document.getElementById(cvselement);
    this.data = [];

    //Unpackage points data
    for (var arr in data) {
        this.data.push(data[arr]);
    }

    this.updateData = function (newData) {
        initialize(ctx, newData[0], newData[1]);
    }

    var _POINTSIZE = 3;
    
    //This size should be obtained from the DOM
    var _CANVASWIDTH = 500;
    var _CANVASHEIGHT = 500;

    var _RANGEX = 5
    var _RANGEY = 5;

    var _SCALEX = undefined;
    var _SCALEY = undefined;

    var _GRIDSIZE = 10;

    //Futuro
    var _CURRENTCOLOR = "#81BEF7";

    var _CBLUE = "#013ADF";
    var _CBLUEMILD = "#7D9EFF";
    var _CBLUELIGHT = "#81BEF7";
    var _CRED = "#DF0101";
    var _CPAPER = "#EFF8FB";

    ctx = this.canvas.getContext("2d");
    _CONTEXT = ctx;

    ctx.canvas.width = _CANVASWIDTH;
    ctx.canvas.height = _CANVASHEIGHT;


    initialize(ctx, this.data[0], this.data[1]);

    function initialize(ctx, data1, data2) {
        setPlotRanges(data1, data2);

        ctx.fillStyle = _CPAPER;
        ctx.fillRect(0, 0, _CANVASWIDTH, _CANVASHEIGHT);
        ctx.fillStyle = _CRED;

        for (var i = 0; i < _CANVASWIDTH / 2; i++) {
            ctx.fillRect(_CANVASWIDTH / 2, i * 2, 1, 1);
            ctx.fillRect(i * 2, _CANVASHEIGHT / 2, 1, 1);
        }
        drawDivisions();
        drawGrid();
        plotData(data1, data2);
    }

    function plotData(arr1, arr2) {




        if (arr1.length != arr2.length){
            //console.log("SimplePlotJS Error: Arrays length is not equal");
        }
        for (var i = 0; i < arr1.length; i++) {
            ctx.fillRect(transX(arr1[i]), transY(arr2[i]), _POINTSIZE, _POINTSIZE);
        }
    }


    function drawDivisions() {
        var divisionSizeX = _CANVASWIDTH * (_GRIDSIZE / 100);
        var divisionSizeY = _CANVASWIDTH * (_GRIDSIZE / 100);

        ctx.fillStyle = _CBLUE;
        ctx.font = "10px Arial";
        var numDivisionsX = (_CANVASWIDTH / divisionSizeX) / 2;
        var incrementX = _RANGEX / numDivisionsX;

        var numDivisionsY = (_CANVASHEIGHT / divisionSizeY) / 2;
        var incrementY = _RANGEY / numDivisionsY;

        var nx = _RANGEX * -1;
        var ny = _RANGEY;

        for (var i = 0; i < divisionSizeX; i++) {
            var x = (_CANVASWIDTH / 2);
            var y = (_CANVASHEIGHT / 2);

            //log(i * divisiones + "," + x)
            ctx.fillRect(i * divisionSizeX, x, 1, 1);
            ctx.fillRect(i * divisionSizeX, x - 1, 1, 1);
            ctx.fillRect(i * divisionSizeX, x - 2, 1, 1);
            ctx.fillRect(i * divisionSizeX, x + 1, 1, 1);
            ctx.fillRect(i * divisionSizeX, x + 2, 1, 1);
            ctx.fillRect(i * divisionSizeX, x + 3, 1, 1);

            ctx.fillRect(y, i * divisionSizeY, 1, 1);
            ctx.fillRect(y - 1, i * divisionSizeY, 1, 1);
            ctx.fillRect(y - 2, i * divisionSizeY, 1, 1);
            ctx.fillRect(y + 1, i * divisionSizeY, 1, 1);
            ctx.fillRect(y + 2, i * divisionSizeY, 1, 1);

            //Dibujar Escala
            var sx = "" + r(nx);
            var sy = "" + r(ny);

            ctx.fillText(sx, (i * divisionSizeX) - 7, (_CANVASHEIGHT / 2) + 10);
            //log(ny);
            if (sy != "0")
                ctx.fillText(sy, (_CANVASWIDTH / 2) - 18, i * divisionSizeY + 4)

            nx = nx + incrementX;
            ny = ny - incrementY;
        }
    }

    function drawGrid() {
        //var divisionSizeX = _CANVASWIDTH * (_GRIDSIZE / 100);
        var divisionSizeX = _CANVASWIDTH / _GRIDSIZE;
        var divisionSizeY = _CANVASWIDTH * (_GRIDSIZE / 100);

        ctx.strokeStyle = _CBLUEMILD;

        var numDivisionsX = (_CANVASWIDTH / divisionSizeX) / 2;
        var numDivisionsY = (_CANVASHEIGHT / divisionSizeY) / 2;

        //numDivisionsX, numDivisionsY esta mal

        var interval = _CANVASWIDTH / (numDivisionsX * 2);

        for (var i = 0; i < divisionSizeX; i++) {

            var x = i * interval;
            var y = 0;

            ctx.setLineDash([2, 2]);
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, _CANVASHEIGHT);
            ctx.stroke();
        }
        for (var i = 0; i < divisionSizeY; i++) {
            var x = 0
            var y = i * interval;

            ctx.setLineDash([2, 2]);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(_CANVASWIDTH, y);
            ctx.stroke();
        }
    }


    function setPlotRanges(array1, array2) {
        //Improve auto-range algorithm
        var rx = Math.abs(array1[array1.length - 1]) + 2;
        var ry = Math.abs(array2[array2.length - 1]) + 2;

        if (rx != 0 && !isNaN(rx))
            _RANGEX = rx;
        if (ry != 0 && !isNaN(ry))
            _RANGEY = ry;
        _SCALEX = (_CANVASWIDTH / 2) / _RANGEX;
        _SCALEY = (_CANVASHEIGHT / 2) / _RANGEY;
    }
    _setCurrentColor = function (color) {
        //Future development
    }

    function transX(x) {
        var xt = x * _SCALEX;

        var halfX = _CANVASWIDTH / 2;
        xt = (xt + halfX);
        //log("xt: " + xt);
        return xt;
    }

    function transY(y) {
        var yt = y * _SCALEY;
        var halfY = _CANVASHEIGHT / 2;

        if (yt >= 0)
            return halfY - yt;
        else
            return halfY + (yt * -1);

    }

    function r(num) {
        var fnum = num.toFixed(1);
        return parseFloat(fnum);
    }

}

