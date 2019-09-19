"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var reducer = function (state, action) {
    if (state === void 0) { state = {}; }
    return state;
};
var initialState = { count: 0 };
exports.createStore = function () { return redux_1.createStore(reducer, initialState); };
