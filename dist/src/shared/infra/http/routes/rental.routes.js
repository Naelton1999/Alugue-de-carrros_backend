"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rentalRoutes = void 0;
var express_1 = require("express");
var createrentalcontroller_1 = require("@modules/rentals/usecases/createrental/createrentalcontroller");
var ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
var devolutionrentalcontroller_1 = require("@modules/rentals/usecases/devolutionrental/devolutionrentalcontroller");
var listrentalbyusercontroller_1 = require("@modules/rentals/usecases/listrentalbyuser/listrentalbyusercontroller");
var rentalRoutes = (0, express_1.Router)();
exports.rentalRoutes = rentalRoutes;
var createrentalcontroller = new createrentalcontroller_1.Createrentalcontroller();
var devolutionrentalcontroller = new devolutionrentalcontroller_1.Devolutionrentalcontroller();
var listrentalbyusercontroller = new listrentalbyusercontroller_1.Listrentalbyusercontroller();
rentalRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, createrentalcontroller.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated_1.ensureAuthenticated, devolutionrentalcontroller.handle);
rentalRoutes.get("/user", ensureAuthenticated_1.ensureAuthenticated, listrentalbyusercontroller.handle);