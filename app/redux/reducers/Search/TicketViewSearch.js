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
var TicketSearchProduct = function (state, action) {
    if (state === void 0) { state = {
        item: {},
        isSet: false,
    }; }
    switch (action.type) {
        case "TICKTSEARCHPRODUCT":
            // console.log(action.socket);
            state = __assign({}, state, { item: action.payload.item, isSet: action.payload.isSet });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = TicketSearchProduct;
//# sourceMappingURL=TicketViewSearch.js.map