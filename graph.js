var canvasInited = false;

var graph = function(values, colors, names, cursor) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var min = -1, max = 1;
    for (var i = 0; i < values.length; i++) {
        for (var j = 0; j < values[i].length; j++) {
            if (values[i][j] < min)
                min = values[i][j];
            if (max < values[i][j])
                max = values[i][j];
        }
    }
    var range = max - min; 
    min -= range * 0.1;
    max += range * 0.1;
    var range2 = max - min;

    if (!canvasInited) {
        ctx.save();
        canvasInited = true;
    }
    ctx.restore();
    ctx.save();
    ctx.translate(0, canvas.height);
    ctx.scale(1, -1);
    ctx.scale(canvas.width / 500, canvas.height / (max - min));
    ctx.translate(0, - min)

    ctx.clearRect(0, min, 500, range2);
    /*
    ctx.beginPath()
    ctx.moveTo(0, (max + min) / 2);
    ctx.lineWidth = 1;
    ctx.lineTo(20, (max + min) / 2);
    ctx.stroke();
    ctx.moveTo(10, (max + min) / 2 + 10);
    ctx.lineWidth = 1;
    ctx.lineTo(50, (max + min) / 2);
    ctx.stroke();
    // */

    //*
    ctx.lineJoin = "bevel";
    for (var i = 0; i < values.length; i++) {
        if (colors[i])
            ctx.strokeStyle = colors[i];
        else
            ctx.strokeStyle = '#00000088';
        ctx.beginPath();
        ctx.lineWidth = range / 300;
        for (var j = 0; j < values[i].length; j++) {
            if (j == 0) {
                ctx.moveTo(j, values[i][j]);
            } else {
                ctx.lineTo(j, values[i][j]);
            }
        }
        ctx.stroke();
    }

    ctx.clearRect(cursor - 0.5, min, 2, range2)
    // */
}

var graphSystemStates = function() {
    var yo = 0, xo = yo + 4, Ao = xo + 4, bo = Ao+4*4;
    var params = Array(bo + 4);
    for (var i = 0; i < bo + 4; i++) {
        params[i] = Array(systemStates.length);
    }
    for (var i = 0; i < systemStates.length; i++) {
        for(var j = 0; j < 4; j++) {
            params[yo + j][i] = systemStates[i].y.e(j + 1, 1);
            params[xo + j][i] = systemStates[i].x.e(j + 1, 1);
            params[bo + j][i] = systemStates[i].b.e(j + 1, 1);
            for (var k = 0; k < 4; k++)
                params[Ao + j*4 + k][i] = systemStates[i].A.e(j + 1, k + 1);
        }
    }
    var colors = [
                    '#880000', '#005500', '#000088', '#660066',
                    '#ff0000', '#00AA00', '#0000FF', '#CC00CC',
                    '#000000', '#000000', '#000000', '#000000',
                    '#000000', '#000000', '#000000', '#000000',
                    '#000000', '#000000', '#000000', '#000000',
                    '#000000', '#000000', '#000000', '#000000',
                    '#ff4444', '#44AA44', '#4444FF', '#CC88CC'
                ];
    var names = [
                    'y1', 'y2', 'y3', 'y4',
                    'x1', 'x2', 'x3', 'x4',
                    'A11', 'A12', 'A13', 'A14',
                    'A21', 'A22', 'A23', 'A24',
                    'A31', 'A32', 'A33', 'A34',
                    'A41', 'A42', 'A43', 'A44',
                    'b1', 'b2', 'b3', 'b4'
                ];
    var cursor = currentSystemStateId;
    graph(params, colors, names, cursor);
}