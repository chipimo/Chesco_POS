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
var TableActions = function (state, action) {
    if (state === void 0) { state = {
        action: "",
        isSet: false,
        id: "",
    }; }
    switch (action.type) {
        case "SETTABLEACTIONS":
            state = __assign({}, state, { action: action.ActionType, isSet: true, id: action.id });
            break;
        case "CLEARTABLEACTIONS":
            state = __assign({}, state, { action: "", isSet: false, id: "" });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = TableActions;
//# sourceMappingURL=actions.js.map