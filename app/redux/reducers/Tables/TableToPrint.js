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
var TableToPrint = function (state, action) {
    if (state === void 0) { state = {
        id: "",
        table: "",
        userName: "",
    }; }
    switch (action.type) {
        case "SETTOPRINT":
            state = __assign({}, state, { id: action.id, table: action.table, userName: action.userName });
            break;
        case "CLEARTOPRINT":
            state = __assign({}, state, { id: "", table: "", userName: "" });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = TableToPrint;
//# sourceMappingURL=TableToPrint.js.map