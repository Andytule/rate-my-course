"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _components = require("./components");
var _reactToastify = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var App = function App() {
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_reactToastify.ToastContainer, null), /*#__PURE__*/_react.default.createElement(_components.Navbar, null), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "/",
    element: /*#__PURE__*/_react.default.createElement(_components.Login, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "RateACourse",
    element: /*#__PURE__*/_react.default.createElement(_components.RateACourse, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "ViewRatings",
    element: /*#__PURE__*/_react.default.createElement(_components.ViewRatings, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "Surveys",
    element: /*#__PURE__*/_react.default.createElement(_components.Surveys, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "Forums",
    element: /*#__PURE__*/_react.default.createElement(_components.Forums, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "Profile",
    element: /*#__PURE__*/_react.default.createElement(_components.Profile, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "EditACourse",
    element: /*#__PURE__*/_react.default.createElement(_components.EditACourse, null)
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: "CreateThread",
    element: /*#__PURE__*/_react.default.createElement(_components.CreateThread, null)
  }))));
};
var _default = exports.default = App;