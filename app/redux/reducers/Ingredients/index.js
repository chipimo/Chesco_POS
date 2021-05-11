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
var Ingredients = function (state, action) {
    if (state === void 0) { state = {
        changeState: false,
        state: {},
    }; }
    switch (action.type) {
        case "SETINGREDIENTSSTATE":
            state = __assign({}, state, { changeState: true, state: action.state });
            break;
        case "CLEARINGREDIENTSSTATE":
            state = __assign({}, state, { changeState: false, state: action.state });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = Ingredients;
//# sourceMappingURL=index.js.map