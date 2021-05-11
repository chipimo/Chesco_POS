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
var itemsList = [];
var newArry = [];
var isProductLoaded = false;
var initalPrice = 2;
function getUnique(arr, comp) {
    //   const filtered = arr.filter((v, i) => arr.indexOf(v) !== i);
    //   console.log(filtered);
    //   if(filtered.length!)
    var unique = arr
        .map(function (e) { return e[comp]; })
        // store the keys of the unique objects
        .map(function (e, i, final) { return final.indexOf(e) === i && i; })
        // eliminate the dead keys & store unique objects
        .filter(function (e) { return arr[e]; })
        .map(function (e) { return arr[e]; });
    return unique;
}
function CountTotal(type, params) {
    var total = 0;
    var rtxtotal = 0;
    // console.log(params);
    if (type === "rtx") {
        params.forEach(function (item, index) {
            if (item.isTaxEnabled) {
                rtxtotal = item.qnt * item.initalPrice;
            }
        });
    }
    else {
        params.forEach(function (item, index) {
            total = item.qnt * item.initalPrice;
        });
    }
    return { total: total, rtxtotal: rtxtotal };
}
function AddQu(params, type) {
    if (params.items) {
        params.items.map(function (items) {
            if (items.productKey === params.productKey) {
                initalPrice = parseInt(items.initalPrice);
                items.sallingprice = parseInt(items.sallingprice) + initalPrice;
                items.qnt = parseInt(items.qnt) + 1;
                items.amountInstore = items.amountInstore - 1;
                newArry = params.items;
            }
        });
    }
    else {
        itemsList.map(function (items) {
            if (items.productKey === params.payload.items.productKey) {
                initalPrice = parseInt(items.initalPrice);
                items.sallingprice = parseInt(items.sallingprice) + initalPrice;
                items.qnt = parseInt(items.qnt) + 1;
                items.amountInstore = items.amountInstore - 1;
                newArry = params.items;
            }
        });
    }
}
function remove(arr, item) {
    var index = arr.findIndex(function (x) { return x.productKey === item; });
    arr.splice(index, 1);
    newArry = arr;
}
function RemoveQu(params) {
    params.items.map(function (items) {
        if (items.productKey === params.productKey) {
            initalPrice = parseInt(items.initalPrice);
            if (parseInt(items.sallingprice) === initalPrice) {
                newArry = params.items;
            }
            else {
                items.sallingprice = parseInt(items.sallingprice) - initalPrice;
                items.amountInstore = items.amountInstore + 1;
                items.qnt = parseInt(items.qnt) - 1;
                newArry = params.items;
            }
        }
    });
}
function Qnyquantity(params) {
    if (!params.payload.items.isAddedToCart) {
        params.payload.items.amountInstore = params.payload.items.amountInstore - 1;
        params.payload.items.isAddedToCart = true;
    }
    itemsList.push(params.payload.items);
    itemsList = getUnique(itemsList, "productKey");
}
function TotaQtCalc(list) {
    var total_num = 0;
    list.map(function (itemsMap) {
        total_num = total_num + itemsMap.qnt;
    });
    // console.log(total_num);
    return total_num;
}
function CaculateTotalQty(data) {
    var total_num = 0;
    var itemsList = [];
    var total = 0;
    data.items.map(function (items) {
        if (items.productKey === data.productKey) {
            total_num = data.qty;
            items.qnt = total_num;
            total = total_num * items.initalPrice;
        }
        itemsList.push(items);
    });
    return { list: itemsList, num: total_num, total: total };
}
var Cart = function (state, action) {
    if (state === void 0) { state = {
        isItemInCart: false,
        total: 0,
        workP_total: 0,
        items: [],
        istaxed: false,
        refreshCart: false,
        totalQt: 0,
    }; }
    switch (action.type) {
        case "ADDTOCART":
            AddQu(action, "");
            Qnyquantity(action);
            state = __assign({}, state, { isItemInCart: true, refreshCart: false, total: CountTotal("cash", itemsList).total, workP_total: CountTotal("rtx", itemsList).rtxtotal, items: itemsList, istaxed: action.payload.items.isTaxEnabled, totalQt: TotaQtCalc(itemsList) });
            break;
        case "REMOVEFROMCART":
            itemsList = [];
            newArry = [];
            state = __assign({}, state, { isItemInCart: action.payload.isItemInCart, total: action.payload.total, workP_total: action.payload.workP_total, items: action.payload.items, istaxed: true, refreshCart: true, totalQt: 0 });
            break;
        case "ADDQU":
            AddQu(action, "");
            state = __assign({}, state, { isItemInCart: true, refreshCart: false, total: CountTotal("cash", newArry).total, workP_total: CountTotal("rtx", newArry).rtxtotal, istaxed: true, items: newArry, totalQt: TotaQtCalc(newArry) });
            break;
        case "REMOVEQU":
            RemoveQu(action);
            state = __assign({}, state, { isItemInCart: true, refreshCart: false, total: CountTotal("cash", newArry).total, workP_total: CountTotal("rtx", newArry).rtxtotal, istaxed: true, items: newArry, totalQt: TotaQtCalc(newArry) });
            break;
        case "mnqty":
            // console.log(CaculateTotalQty(action).list);
            // console.log(CaculateTotalQty(action).num);
            state = __assign({}, state, { isItemInCart: true, refreshCart: false, total: CaculateTotalQty(action).total, workP_total: CaculateTotalQty(action).total, istaxed: true, items: CaculateTotalQty(action).list, totalQt: CaculateTotalQty(action).num });
            break;
        case "DELETEQU":
            remove(action.items, action.productKey);
            state = __assign({}, state, { isItemInCart: true, refreshCart: true, total: CountTotal("cash", newArry).total, workP_total: CountTotal("rtx", newArry).rtxtotal, istaxed: true, items: newArry, totalQt: TotaQtCalc(newArry) });
            break;
        case "RESTATECART":
            itemsList = [];
            newArry = [];
            AddQu(action, "reset");
            state = __assign({}, state, { isItemInCart: false, refreshCart: true, total: 0, workP_total: 0, items: [], istaxed: true, totalQt: 0 });
            break;
        default:
            return state;
    }
    return state;
};
exports.default = Cart;
//# sourceMappingURL=cart.js.map