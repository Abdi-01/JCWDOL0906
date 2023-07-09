"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static asscociate(models) {

            Cart.belongsTo(models.User, {
                foreignKey: 'user_id'
            })

            Cart.belongsTo(models.Product, { foreignKey: 'product_id', as: 'Product' })
            // Cart.hasMany(models.Product, { foreignKey: 'product_id' })
        }
    }
    Cart.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            qty: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            total_price: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            product_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Cart",
        }
    );
    return Cart;
};