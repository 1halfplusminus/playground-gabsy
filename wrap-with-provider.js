"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var src_1 = require("./src");
exports.default = (function (_a) {
    var element = _a.element;
    var store = src_1.createStore();
    return react_1.default.createElement(react_redux_1.Provider, { store: store }, element);
});
