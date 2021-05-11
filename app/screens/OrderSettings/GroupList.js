"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var styles_1 = require("@material-ui/core/styles");
var Grid_1 = require("@material-ui/core/Grid");
var List_1 = require("@material-ui/core/List");
var Card_1 = require("@material-ui/core/Card");
var CardHeader_1 = require("@material-ui/core/CardHeader");
var ListItem_1 = require("@material-ui/core/ListItem");
var ListItemText_1 = require("@material-ui/core/ListItemText");
var ListItemIcon_1 = require("@material-ui/core/ListItemIcon");
var Checkbox_1 = require("@material-ui/core/Checkbox");
var Button_1 = require("@material-ui/core/Button");
var Divider_1 = require("@material-ui/core/Divider");
var core_1 = require("@material-ui/core");
var dataBase_1 = require("../../redux/dataBase");
var useStyles = styles_1.makeStyles(function (theme) { return ({
    root: {
        margin: "auto",
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 200,
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: "auto",
    },
    button: {
        margin: theme.spacing(0.5, 0),
    },
}); });
function not(a, b) {
    return a.filter(function (value) { return b.indexOf(value) === -1; });
}
function intersection(a, b) {
    return a.filter(function (value) { return b.indexOf(value) !== -1; });
}
function union(a, b) {
    return a.concat(not(b, a));
}
var GroupList = function (props) {
    var classes = useStyles();
    var _a = React.useState([]), checked = _a[0], setChecked = _a[1];
    var _b = React.useState([]), left = _b[0], setLeft = _b[1];
    var _c = React.useState([]), right = _c[0], setRight = _c[1];
    var _d = React.useState(""), printerIP = _d[0], setPrinterIP = _d[1];
    var leftChecked = intersection(checked, left);
    var rightChecked = intersection(checked, right);
    React.useEffect(function () {
        // console.log(props);
        setPrinterIP(props.selected.printerIP);
        var groupsSetRight = [];
        var dataLeft = [];
        // props.selected.list.data.map((listGroup) => {
        //   groupsSetRight.push(listGroup);
        // });
        // setRight(groupsSetRight);
        dataBase_1.default.HandlePrinterGroups({ _type: "getGrounpWithID", id: props.selected.idKey }, function (reciveCallback) {
            console.log(reciveCallback);
            reciveCallback.map(function (list) {
                groupsSetRight.push(list.group);
            });
            setRight(groupsSetRight);
        });
        dataBase_1.default.HandlePrinterGroups({ _type: "getWithOutID" }, function (reciveCallback) {
            console.log(reciveCallback);
            reciveCallback.map(function (list) {
                dataLeft.push(list.group);
            });
            setLeft(dataLeft);
        });
    }, []);
    var handleToggle = function (value) { return function () {
        var currentIndex = checked.indexOf(value);
        var newChecked = checked.slice();
        if (currentIndex === -1) {
            newChecked.push(value);
        }
        else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    }; };
    var numberOfChecked = function (items) { return intersection(checked, items).length; };
    var handleToggleAll = function (items) { return function () {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        }
        else {
            setChecked(union(checked, items));
        }
    }; };
    var handleCheckedRight = function () {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };
    var handleCheckedLeft = function () {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };
    var HandleSave = function () {
        dataBase_1.default.HandlePrinterGroups({ _type: "edit", right: right, printerIP: printerIP, id: props.selected.idKey }, function (callback) { });
    };
    var customList = function (title, items) { return (React.createElement(Card_1.default, null,
        React.createElement(CardHeader_1.default, { className: classes.cardHeader, avatar: React.createElement(Checkbox_1.default, { onClick: handleToggleAll(items), checked: numberOfChecked(items) === items.length && items.length !== 0, indeterminate: numberOfChecked(items) !== items.length &&
                    numberOfChecked(items) !== 0, disabled: items.length === 0, inputProps: { "aria-label": "all items selected" } }), title: title, subheader: numberOfChecked(items) + "/" + items.length + " selected" }),
        React.createElement(Divider_1.default, null),
        React.createElement(List_1.default, { className: classes.list, dense: true, component: "div", role: "list" },
            items.map(function (value) {
                var labelId = "transfer-list-all-item-" + value + "-label";
                return (React.createElement(ListItem_1.default, { key: value, role: "listitem", button: true, onClick: handleToggle(value) },
                    React.createElement(ListItemIcon_1.default, null,
                        React.createElement(Checkbox_1.default, { checked: checked.indexOf(value) !== -1, tabIndex: -1, disableRipple: true, inputProps: { "aria-labelledby": labelId } })),
                    React.createElement(ListItemText_1.default, { id: labelId, primary: value })));
            }),
            React.createElement(ListItem_1.default, null)))); };
    return (React.createElement("div", { style: {
            display: "flex",
            justifyContent: "space-between",
            marginTop: 10,
        } },
        React.createElement("div", { style: { padding: 10 } },
            React.createElement(core_1.TextField, { id: "outlined-basic", label: "Printer IP Address", variant: "outlined", value: printerIP, onChange: function (e) { return setPrinterIP(e.target.value); } }),
            React.createElement(Button_1.default, { style: { marginTop: 10 }, onClick: function () { return HandleSave(); }, variant: "outlined" }, "Save Changes")),
        React.createElement(Grid_1.default, { container: true, spacing: 2, justify: "center", alignItems: "center", className: classes.root },
            React.createElement(Grid_1.default, { item: true }, customList("Choices", left)),
            React.createElement(Grid_1.default, { item: true },
                React.createElement(Grid_1.default, { container: true, direction: "column", alignItems: "center" },
                    React.createElement(Button_1.default, { variant: "outlined", size: "small", className: classes.button, onClick: handleCheckedRight, disabled: leftChecked.length === 0, "aria-label": "move selected right" }, ">"),
                    React.createElement(Button_1.default, { variant: "outlined", size: "small", className: classes.button, onClick: handleCheckedLeft, disabled: rightChecked.length === 0, "aria-label": "move selected left" }, "<"))),
            React.createElement(Grid_1.default, { item: true }, customList("Chosen", right)))));
};
var mapStateToProps = function (state) { return ({}); };
var mapDispatchToProps = {};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GroupList);
//# sourceMappingURL=GroupList.js.map