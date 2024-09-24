"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomerModel = (sequelize, dataTypes) => {
    return sequelize.define('Customer', {
        first_name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: dataTypes.STRING,
            allowNull: false,
        },
    });
};
exports.default = CustomerModel;
