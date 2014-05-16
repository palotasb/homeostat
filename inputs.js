var inputs = { y: [0, 0, 0, 0], x: [0, 0, 0, 0], A: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], b: [0, 0, 0, 0], e: 0, t: 0};
var values = { y: [0, 0, 0, 0], x: [0, 0, 0, 0], A: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], b: [0, 0, 0, 0], e: 0, t: 0};
var lockedValues = { y: [0, 0, 0, 0], x: [0, 0, 0, 0], A: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], b: [0, 0, 0, 0], e: 0, t: 0};

function InputsInit() {
    inputs.y[0]    = document.getElementById('y1');
    inputs.y[1]    = document.getElementById('y2');
    inputs.y[2]    = document.getElementById('y3');
    inputs.y[3]    = document.getElementById('y4');
    inputs.x[0]    = document.getElementById('x1');
    inputs.x[1]    = document.getElementById('x2');
    inputs.x[2]    = document.getElementById('x3');
    inputs.x[3]    = document.getElementById('x4');
    inputs.A[0][0] = document.getElementById('A11');
    inputs.A[0][1] = document.getElementById('A12');
    inputs.A[0][2] = document.getElementById('A13');
    inputs.A[0][3] = document.getElementById('A14');
    inputs.A[1][0] = document.getElementById('A21');
    inputs.A[1][1] = document.getElementById('A22');
    inputs.A[1][2] = document.getElementById('A23');
    inputs.A[1][3] = document.getElementById('A24');
    inputs.A[2][0] = document.getElementById('A31');
    inputs.A[2][1] = document.getElementById('A32');
    inputs.A[2][2] = document.getElementById('A33');
    inputs.A[2][3] = document.getElementById('A34');
    inputs.A[3][0] = document.getElementById('A41');
    inputs.A[3][1] = document.getElementById('A42');
    inputs.A[3][2] = document.getElementById('A43');
    inputs.A[3][3] = document.getElementById('A44');
    inputs.b[0]    = document.getElementById('b1');
    inputs.b[1]    = document.getElementById('b2');
    inputs.b[2]    = document.getElementById('b3');
    inputs.b[3]    = document.getElementById('b4');
    inputs.e       = document.getElementById('eps');
    inputs.t       = document.getElementById('tau');
    //*
    inputs.t.addEventListener('keyup', keyUpHandler);
    inputs.t.addEventListener('keydown', keyDownHandler);
    inputs.t.tag_id = ['t'];
    inputs.e.addEventListener('keyup', keyUpHandler);
    inputs.e.addEventListener('keydown', keyDownHandler);
    inputs.e.tag_id = ['e'];
    for (var i = 0; i < 4; i++) {
        inputs.y[i].addEventListener('keyup', keyUpHandler);
        inputs.y[i].addEventListener('keydown', keyDownHandler);
        inputs.y[i].tag_id = ['y', i ];
        inputs.x[i].addEventListener('keyup', keyUpHandler);
        inputs.x[i].addEventListener('keydown', keyDownHandler);
        inputs.x[i].tag_id = ['x', i];
        inputs.b[i].addEventListener('keyup', keyUpHandler);
        inputs.b[i].addEventListener('keydown', keyDownHandler);
        inputs.b[i].tag_id = ['b', i];
        for (var j = 0; j < 4; j++) {
            inputs.A[i][j].addEventListener('keyup', keyUpHandler);
            inputs.A[i][j].addEventListener('keydown', keyDownHandler);
            inputs.A[i][j].tag_id = ['A', i, j];
        }
    }
    // */
}

var ValuesInit = function() {
    
}

var keyDownHandler = function(e) {
    console.log(e);
    if (e.keyCode == 76) {
        var setValue;
            switch (e.srcElement.tag_id.length) {
                case 1:
                    lockedValues[e.srcElement.tag_id[0]] = setValue = lockedValues[e.srcElement.tag_id[0]];
                    break;
                case 2:
                    lockedValues[
                        e.srcElement.tag_id[0]
                        ][
                            e.srcElement.tag_id[1]
                            ] = setValue = !lockedValues[
                                e.srcElement.tag_id[0]
                                ][
                                    e.srcElement.tag_id[1]
                                    ]
                    break;
                case 3:
                    lockedValues[
                        e.srcElement.tag_id[0]
                        ][
                            e.srcElement.tag_id[1]
                            ][
                                e.srcElement.tag_id[2]
                                ] = setValue = !lockedValues[
                                    e.srcElement.tag_id[0]
                                    ][
                                        e.srcElement.tag_id[1]
                                        ][
                                            e.srcElement.tag_id[2]
                                            ]
                    break;
            }
            e.srcElement.classList.toggle("locked");
            e.preventDefault();
    }
}

var keyUpHandler = function(e) {
    if (e.keyCode == 13 || 1) {
        readInputs(1, 1, 1, 1, 1, 1);
        updateSystemFromValues();
    }
}

var readInputs = function(y, x, A, b, e, t) {
    if (e)
        values.e = parseFloat(inputs.e.value) || 0;
    if (t)
        values.t = parseFloat(inputs.t.value) || 0;
    for (var i = 0; i < 4; i++) {
        if (y)
            values.y[i] = parseFloat(inputs.y[i].value) || 0;
        if (x)
            values.x[i] = parseFloat(inputs.x[i].value) || 0;
        if (b)
            values.b[i] = parseFloat(inputs.b[i].value) || 0;
        if (A)
            for (var j = 0; j < 4; j++) {
                values.A[i][j] = parseFloat(inputs.A[i][j].value) || 0;
            }
    }
}

var writeOutputs = function(y, x, A, b, e, t) {
    if (e && inputs.e != document.activeElement)
        inputs.e.value = values.e.toString();
    if (t && inputs.t != document.activeElement)
        inputs.t.value = values.t.toString();
    for (var i = 0; i < 4; i++) {
        if (y && inputs.y[i] != document.activeElement)
            inputs.y[i].value = values.y[i].toString();
        if (x && inputs.x[i] != document.activeElement)
            inputs.x[i].value = values.x[i].toString();
        if (b && inputs.b[i] != document.activeElement)
            inputs.b[i].value = values.b[i].toString();
        if (A)
            for (var j = 0; j < 4; j++)
                if (inputs.A[i][j] != document.activeElement)
                    inputs.A[i][j].value = values.A[i][j].toString();
    }
}

var writeValues = function(systemState, y, x, A, b, e, t) {
    if (e && !lockedValues.e)
        values.e = systemState.e;
    if (t && !lockedValues.t)
        values.t = systemState.t;
    for (var i = 0; i < 4; i++) {
        if (y && !lockedValues.y[i])
            values.y[i] = systemState.y.elements[i];
        if (x && !lockedValues.x[i])
            values.x[i] = systemState.x.elements[i];
        if (b && !lockedValues.b[i])
            values.b[i] = systemState.b.elements[i];
        if (A)
            for (var j = 0; j < 4; j++)
                if (!lockedValues.A[i][j])
                    values.A[i][j] = systemState.A.elements[i][j];
    }
}