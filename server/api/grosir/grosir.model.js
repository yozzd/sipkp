'use strict';

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('grosir', {
        _id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        receiveddate: {
            type: DataTypes.DATEONLY(),
            allowNull: false
        },
        receivedtime: {
            type: DataTypes.TIME(),
            allowNull: false
        },
        sender: {
            type: DataTypes.STRING(20),
            allowNull: false,
            defaultValue: ''
        },
        kabkota: {
            type: DataTypes.STRING(30),
            allowNull: false,
            defaultValue: ''
        },
        sapi: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        kerbau: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        kambing: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        domba: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        ayambroiler: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        ayamburas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        itik: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        docbroiler: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        doclayer: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        telurayamras: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        telurayamburas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        teluritik: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        susu: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        pakanbroiler: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        pakanlayer: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        }
    });
};