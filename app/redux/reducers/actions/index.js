"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Actions = function (state, action) {
    if (state === void 0) { state = {
        state: "",
    }; }
    switch (action.type) {
        case "SETSTATE":
            state = __assign({}, state, { state: action.state });
            break;
        case "CLEARSTATE":
            state = __assign({}, state, { state: "" });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = Actions;
//# sourceMappingURL=index.js.map