'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('outbox', {
        ID: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        UpdatedInDB: {
            type: DataTypes.DATE(),
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        InsertIntoDB: {
            type: DataTypes.DATE(),
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        SendingDateTime: {
            type: DataTypes.DATE(),
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        SendBefore: {
            type: DataTypes.TIME(),
            allowNull: false,
            defaultValue: '23:59:59'
        },
        SendAfter: {
            type: DataTypes.TIME(),
            allowNull: false,
            defaultValue: '00:00:00'
        },
        Text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        DestinationNumber: {
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
            allowNull: true
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
        MultiPart: {
            type: DataTypes.ENUM('false', 'true'),
            allowNull: false,
            defaultValue: 'false'
        },
        RelativeValidity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '-1'
        },
        SenderID: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        SendingTimeOut: {
            type: DataTypes.DATE(),
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        DeliveryReport: {
            type: DataTypes.ENUM('default', 'yes', 'no'),
            allowNull: false,
            defaultValue: 'default'
        },
        CreatorID: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
};