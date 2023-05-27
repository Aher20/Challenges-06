const { Component, Product, Supplier, Product_Components, Component_Suppliers } = require("../models");

module.exports = {
    component: async () => {
        await Component.destroy({ truncate: true, restartIdentity: true });
    },

    product: async () => {
        await Product.destroy({ truncate: true, restartIdentity: true });
    },

    supplier: async () => {
        await Supplier.destroy({ truncate: true, restartIdentity: true });
    },

    product_components: async () => {
        await Product_Components.destroy({ truncate: true, restartIdentity: true });
    },

    component_suppliers: async () => {
        await Component_Suppliers.destroy({ truncate: true, restartIdentity: true });
    },
};