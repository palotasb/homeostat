var systemStates = [];
var currentSystemStateId = 0;
var timeOut;

var getNextSystemStateId = function() {
    return currentSystemStateId + 1 < 500 ? currentSystemStateId + 1 : 0;
}

var SystemState = function(y, x, A, b, e, t, getNextStateFunction) {
    this.y = y;
    this.x = x;
    this.A = A;
    this.b = b;
    this.e = e;
    this.t = t;
    this.getNextStateFunction = getNextStateFunction;
    this.getNextState = function() {
        return this.getNextStateFunction(this);
    };
}

var HomeostatGen2Function = function(sys) {
    var dx = sys.A.multiply(sys.x).add(sys.b).multiply(sys.t);
    var dA = sys.x.subtract(sys.y).multiply(sys.x.transpose()).multiply(-1 * sys.e * sys.t);
    var db = sys.x.subtract(sys.y).multiply(-1 * sys.e * sys.t);
    return new SystemState(sys.y, sys.x.add(dx), sys.A.add(dA), sys.b.add(db), sys.e, sys.t, sys.getNextStateFunction);
}

var Step = function() {
    systemStates[getNextSystemStateId()] = systemStates[currentSystemStateId].getNextState();
    currentSystemStateId = getNextSystemStateId();
    writeValues(systemStates[currentSystemStateId], 1, 1, 1, 1, 1, 1);
    writeOutputs(0, 1, 1, 1, 1, 1);
    graphSystemStates();
}

var Play = function() {
    Step();
    timeOut = setTimeout(Play, 20);
}

var Stop = function() {
    clearTimeout(timeOut);
}

var Reset = function() {
    Stop();
    currentSystemStateId = 0;
    systemStates = [];
    SystemInit();
    writeValues(systemStates[currentSystemStateId], 1, 1, 1, 1, 1, 1);
    writeOutputs(0, 1, 1, 1, 1, 1);
}

var updateSystemFromValues = function() {
    var sys = new SystemState(
        $M([values.y]).transpose(),
        $M([values.x]).transpose(),
        $M(values.A),
        $M([values.b]).transpose(),
        values.e, values.t,
        HomeostatGen2Function
    );
    systemStates[currentSystemStateId] = sys;
}

var SystemInit = function() {
    InputsInit();
    ValuesInit();
    readInputs(1, 1, 1, 1, 1, 1);
    updateSystemFromValues();
}