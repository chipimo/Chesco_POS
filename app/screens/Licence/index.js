"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var core_1 = require("@material-ui/core");
var react_redux_1 = require("react-redux");
var react_lottie_1 = require("react-lottie");
var react_router_dom_1 = require("react-router-dom");
var animationData = require("../../assets/lottie/42809-driving-license-scanning.json");
var dataBase_1 = require("../../redux/dataBase");
var semantic_ui_react_1 = require("semantic-ui-react");
var index = function (props) {
    var history = react_router_dom_1.useHistory();
    var _a = React.useState(""), Licence = _a[0], setLicence = _a[1];
    var _b = React.useState(false), validate = _b[0], setValidate = _b[1];
    var defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (React.createElement("div", { style: {
            width: "100%",
            height: "100%",
            padding: 10,
            backgroundColor: props.Theme.theme === "light" ? "#F1F1F1" : "#3b3b3b",
        } },
        React.createElement("div", { style: {
                width: "60%",
                height: "100%",
                marginTop: "20",
                margin: "auto",
                textAlign: "center",
            } },
            React.createElement(core_1.Typography, null, "Add Licence Key"),
            React.createElement("div", null,
                React.createElement(react_lottie_1.default, { options: defaultOptions, height: 250, width: 250 })),
            React.createElement("div", null,
                React.createElement(core_1.Paper, { style: {
                        width: "80%",
                        height: "60%",
                        margin: "auto",
                        paddingBottom: 20,
                    }, elevation: 8 },
                    React.createElement(core_1.Typography, null, "Licence Key"),
                    React.createElement("div", { style: { marginTop: 20, width: "80%", margin: "auto" } },
                        React.createElement(core_1.TextField, { id: "outlined-basic", label: "Key", variant: "outlined", fullWidth: true, value: Licence, onChange: function (e) {
                                setLicence(e.target.value);
                            } }),
                        React.createElement(core_1.Button, { onClick: function () {
                                dataBase_1.default.HandelProducts({ _type: "validateLicense", Licence: Licence }, function (callback) {
                                    if (callback.message === "ok")
                                        history.push("/");
                                    else
                                        setValidate(true);
                                });
                            }, variant: "outlined", style: { marginTop: 10 } }, "Submit"))),
                validate ? (React.createElement("div", { style: { marginTop: 20 } },
                    React.createElement(semantic_ui_react_1.Message, { negative: true },
                        React.createElement(semantic_ui_react_1.Message.Header, null, "We're sorry we can't apply this License"),
                        React.createElement("p", null, "Invalid License"),
                        React.createElement("p", null, "Call us on +260975704991 for further help with this license")))) : null,
                React.createElement("div", { style: { marginTop: 40 } },
                    React.createElement(core_1.Typography, { variant: "body1", style: { color: "#212121" } }, "It all starts here. Flexible for any business yet simple for any user. Powerful functionality yet intuitive and quick to learn. The powerful software includes all the tools you need - payments, digital receipts, open tickets, inventory, reports, and more. It is versatile enough to serve every kind of business, from retail to bakery. The simple and elegant user interface makes it easy for you and your staff to get up and running quickly."))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map