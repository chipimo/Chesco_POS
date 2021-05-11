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
var React = require("react");
var react_redux_1 = require("react-redux");
var core_1 = require("@material-ui/core");
var styles_1 = require("@material-ui/core/styles");
var DialPad_1 = require("./DialPad");
var dataBase_1 = require("../../redux/dataBase");
var animationData = require("../../assets/lottie/505-error.json");
var CircularProgress_1 = require("@material-ui/core/CircularProgress");
var WindowSize_1 = require("../../components/Icons/WindowSize");
var semantic_ui_react_1 = require("semantic-ui-react");
var VpnKey_1 = require("@material-ui/icons/VpnKey");
// Inspired by the Facebook spinners.
var useStylesFacebook = styles_1.makeStyles({
    root: {
        position: "relative",
    },
    top: {
        color: "#eef3fd",
    },
    bottom: {
        color: "#6798e5",
        animationDuration: "550ms",
        marginTop: 20,
    },
});
// ispiered by facebook
function FacebookProgress(props) {
    var classes = useStylesFacebook();
    return (React.createElement("div", { className: classes.root },
        React.createElement(CircularProgress_1.default, __assign({ variant: "indeterminate", disableShrink: true, className: classes.bottom, size: 24, thickness: 4 }, props))));
}
var index = function (props) {
    var _a = React.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = React.useState(true), loadingDep = _b[0], setLoadingDep = _b[1];
    var _c = WindowSize_1.default(), height = _c.height, width = _c.width;
    var _d = React.useState(false), LicenseExpired = _d[0], setLicenseExpired = _d[1];
    React.useEffect(function () {
        setTimeout(function () {
            dataBase_1.default.CheckConfig();
        }, 200);
        setTimeout(function () {
            setLoading(false);
        }, 4000);
        setTimeout(function () {
            setLoadingDep(false);
        }, 4500);
    }, []);
    var defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (React.createElement(core_1.Paper, { style: {
            width: "100%",
            height: "100%",
            display: "flex",
            backgroundColor: props.Theme.theme === "light" ? "#E5E5E5" : "transparent",
            backgroundImage: "url(./assets/img/backgroundLogin2.png)",
            backgroundSize: "100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        } },
        React.createElement(core_1.Paper, { elevation: 24, style: {
                width: "60%",
                height: height < 780 ? "98%" : height <= 900 ? "92%" : "80%",
                margin: "auto",
                display: "flex",
                overflow: "hidden",
                backgroundColor: "rgba(225,225,225,0.8)",
            } },
            React.createElement(core_1.Paper, { elevation: 24, style: {
                    width: "45%",
                    textAlign: "center",
                    transition: "all 0.7s",
                    backgroundColor: props.Theme.theme === "light"
                        ? "rgba(225,225,225,0.6)"
                        : "rgba(0,0,0,0.5)",
                } }, LicenseExpired ? (React.createElement("div", null,
                React.createElement(core_1.Typography, { variant: "h4", style: { marginTop: 15 } }, "License Key"),
                React.createElement("div", { style: { marginTop: 10 } },
                    React.createElement(semantic_ui_react_1.Message, { negative: true },
                        React.createElement(semantic_ui_react_1.Message.Header, null,
                            "We're sorry we can't continue",
                            " "),
                        React.createElement("p", null, "Your license has expired! Please re-new your license key to continue using the app again"))),
                React.createElement("div", { style: { marginTop: 20 } },
                    React.createElement(core_1.Typography, null, "Enter your license key"),
                    React.createElement("div", { style: { marginTop: 15 } },
                        React.createElement(core_1.TextField, { id: "input-with-icon-textfield", label: "Your new license key", InputProps: {
                                startAdornment: (React.createElement(core_1.InputAdornment, { position: "start" },
                                    React.createElement(VpnKey_1.default, null))),
                            } })),
                    React.createElement("div", { style: { marginTop: 15 } },
                        React.createElement(core_1.Button, { variant: "outlined" }, " Continue"))))) : (React.createElement("div", null,
                React.createElement(core_1.Typography, { variant: "h4", style: { marginTop: 5 } }, "Welcome back"),
                React.createElement(core_1.Typography, null, "Login Account "),
                React.createElement("div", { style: { width: "90%", margin: "auto" } },
                    React.createElement(DialPad_1.default, null))))),
            React.createElement("div", { style: {
                    textAlign: "center",
                    width: "100%",
                    padding: 15,
                    marginTop: 30,
                } },
                React.createElement("div", null,
                    React.createElement(core_1.Typography, { variant: "h4", style: {
                            color: "#212121",
                        } }, "Welcome to Chesco POS"),
                    React.createElement(core_1.Typography, { variant: "body1", style: { color: "#212121" } }, "Empowering businesses worldwide")),
                React.createElement("div", { style: { marginTop: 10 } },
                    React.createElement(core_1.Divider, null)),
                React.createElement("div", { style: { marginTop: 10 } },
                    React.createElement(core_1.Typography, { variant: "body1", style: { color: "#212121" } }, "It all starts here. Flexible for any business yet simple for any user. Powerful functionality yet intuitive and quick to learn. The powerful software includes all the tools you need - payments, digital receipts, open tickets, inventory, reports, and more. It is versatile enough to serve every kind of business, from retail to bakery. The simple and elegant user interface makes it easy for you and your staff to get up and running quickly.")),
                React.createElement("div", { style: { marginTop: 10 } }),
                React.createElement("div", null,
                    React.createElement(core_1.Typography, { variant: "body1", style: { color: "#212121" } }, "support@chesco-tech.com"),
                    React.createElement(core_1.Typography, { variant: "body1", style: { color: "#212121" } }, "www.chescopos.com"),
                    React.createElement(core_1.Typography, { variant: "body1", style: { color: "#212121" } }, "+260975704991"))))));
};
function mapStateToProps(state) {
    return {
        Theme: state.Theme,
        SocketConn: state.SocketConn,
        Config: state.Config,
    };
}
var mapDispatchToProps = function (dispatch) {
    return {
        dispatchEvent: function (data) { return dispatch(data); },
    };
};
exports.default = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(index);
//# sourceMappingURL=index.js.map