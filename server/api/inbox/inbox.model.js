'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('inbox', {
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        UpdatedInDB: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        ReceivingDateTime: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        SenderNumber: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: ''
        },
        Coding: {
            type: DataTypes.ENUM('Default_No_Compression', 'Unicode_No_Compression', '8bit', 'Default_Compression', 'Unicode_Compression'),
            allowNull: false,
            defaultValue: 'Default_No_Compression'
        },
        UDH: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        SMSCNumber: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: ''
        },
        Class: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '-1'
        },
        TextDecoded: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        RecipientID: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        Processed: {
            type: DataTypes.ENUM('false', 'true'),
            allowNull: false,
            defaultValue: 'false'
        }
    });
};