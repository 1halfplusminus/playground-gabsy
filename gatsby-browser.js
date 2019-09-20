"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var wrap_with_provider_1 = __importDefault(require("./wrap-with-provider"));
exports.wrapRootElement = wrap_with_provider_1.default;
exports.onServiceWorkerUpdateReady = function () { return window.location.reload(true); };
