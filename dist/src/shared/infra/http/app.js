"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
require("express-async-errors");
require("reflect-metadata");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var routes_1 = require("./routes");
var swagger_json_1 = __importDefault(require("../../../swagger.json"));
require("@shared/container");
var Apperror_1 = require("@shared/erros/Apperror");
var typeorm_1 = __importDefault(require("@shared/infra/typeorm"));
var upload_1 = __importDefault(require("@config/upload"));
(0, typeorm_1.default)();
var app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
app.use("/avatar", express_1.default.static("".concat(upload_1.default.tmpfolder, "/avatar")));
app.use("/cars", express_1.default.static("".concat(upload_1.default.tmpfolder, "/cars")));
app.use(routes_1.router);
app.use(function (err, request, response, next) {
    if (err instanceof Apperror_1.Apperror) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }
    return response.status(500).json({
        status: "error",
        message: "internal server error - ".concat(err.message)
    });
});
