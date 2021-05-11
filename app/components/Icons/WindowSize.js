"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
function getWindowDimensions() {
    var width = window.innerWidth, height = window.innerHeight;
    return {
        width: width,
        height: height
    };
}
function useWindowDimensions() {
    var _a = react_1.useState(getWindowDimensions()), windowDimensions = _a[0], setWindowDimensions = _a[1];
    react_1.useEffect(function () {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return function () { return window.removeEventListener('resize', handleResize); };
    }, []);
    return windowDimensions;
}
exports.default = useWindowDimensions;
//# sourceMappingURL=WindowSize.js.map