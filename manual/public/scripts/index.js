(function f() {
    var canvasId = 'diamond-control';
    var stopDiamondProportion = 0.2;
    redrawCanvas();
    window.addEventListener('resize', redrawCanvas);
    attachMouseEvents();
    var debounce = getDebounce(100);
    return;

    function redrawCanvas() {
        var canvas = document.getElementById(canvasId);
        var ctx = canvas.getContext('2d');
        var canvasSize = Math.min(window.innerWidth, window.innerHeight);
        canvas.width = canvas.height = canvasSize;

        ctx.rotate(Math.PI / 4);
        var sqrt2 = Math.sqrt(2);
        var diamondSize = canvasSize / sqrt2;
        ctx.strokeRect(diamondSize / 2, -diamondSize / 2, diamondSize, diamondSize);
        ctx.strokeRect(
            diamondSize / 2 + diamondSize * (1 - stopDiamondProportion),
            -diamondSize / 2 + diamondSize * (1 - stopDiamondProportion),
            diamondSize * stopDiamondProportion,
            diamondSize * stopDiamondProportion);
    }

    function attachMouseEvents() {
        var canvas = document.getElementById(canvasId);
        canvas.addEventListener('touchstart', touchEvent);
        canvas.addEventListener('touchmove', touchEvent);
        canvas.addEventListener('mousedown', mouseEvent);
        canvas.addEventListener('mousemove', mouseEvent);

        function touchEvent(ev) {
            if (ev.targetTouches && ev.targetTouches.length) {
                var firstTouch = ev.targetTouches[0];
                processClick(firstTouch.clientX, firstTouch.clientY);
            }
        }

        function mouseEvent(ev) {
            if (ev.buttons) {
                processClick(ev.clientX, ev.clientY);
            }
        }
    }

    function processClick(clientX, clientY) {
        // to not spam the backend with requests debounce mousemove and touchmove events handling
        debounce(function () {
            var diamondRelativePosition = getDiamondRelativePosition(clientX, clientY);
            if (0 <= diamondRelativePosition.left && diamondRelativePosition.left <= 1 &&
                0 <= diamondRelativePosition.right && diamondRelativePosition.right <= 1) {
                // we clicked within the diamond

                if (diamondRelativePosition.left <= stopDiamondProportion &&
                    diamondRelativePosition.right <= stopDiamondProportion) {
                    // motors stop requested
                    post('/motors/stop');
                } else {
                    // speed change requested
                    post('/motors/speed', diamondRelativePosition);
                }
            }
        });

        function getDiamondRelativePosition(clientX, clientY) {
            // relies too much on canvas being top-centered withing the body
            var sqrt2 = Math.sqrt(2);
            var canvasSize = Math.min(window.innerWidth, window.innerHeight);
            var diamondSize = canvasSize / sqrt2;
            var canvasX = clientX - (window.innerWidth - canvasSize) / 2;
            var canvasY = clientY;
            var unrotatedX = canvasX / sqrt2 + canvasY / sqrt2;
            var unrotatedY = -canvasX / sqrt2 + canvasY / sqrt2;
            return {
                left: (1.5 * diamondSize - unrotatedX) / diamondSize,
                right: (0.5 * diamondSize - unrotatedY) / diamondSize,
            };
        }
    }

    function post(url, body) {
        var request = new XMLHttpRequest();
        request.open('POST', url);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify(body));
    }

    function getDebounce(milliseconds) {
        var lastCallTime;
        return function (func) {
            var now = new Date();
            if (!lastCallTime || ((now - lastCallTime) > milliseconds)) {
                lastCallTime = now;
                func();
            }
        }
    }
})();