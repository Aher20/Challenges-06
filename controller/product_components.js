const {Product, Component, Product_Components} = require('../models');

module.exports = {
    // GET all data
    index: async (req, res) => {
        try {
            const product_components = await Product_Components.findAll();

            return res.status(200).json({
                status: true,
                message: 'success',
                data: product_components
            });
        } catch (err) {
            throw err;
        }
    },

    // GET detail data
    show: async (req, res) => {
        try {
            const {id} = req.params;

            const product_components = await Product_Components.findOne({where: {id}});

            if (!product_components) {
                return res.status(404).json({
                    status: false,
                    message: `can't find product_components with id ${id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: product_components
            });
        } catch (err) {
            throw err;
        }
    },

    // POST data product_component
    store: async (req, res) => {
        try {
            const {id_product, id_component} = req.body;

            if (!id_product) {
                return res.status(400).json({
                    status: false,
                    message: 'id_product is required!',
                    data: null
                });
            }

            if (!id_component) {
                return res.status(400).json({
                    status: false,
                    message: 'id_component is required!',
                    data: null
                });
            }

            const product = await Product.findOne({where: {id:id_product}});
            const component = await Component.findOne({where: {id:id_component}});

            if (!product) {
                return res.status(404).json({
                    status: false,
                    message: 'product not found!',
                    data: null
                });
            }

            if (!component) {
                return res.status(404).json({
                    status: false,
                    message: 'component not found!',
                    data: null
                });
            }

            const product_components = await Product_Components.create({id_product, id_component});

            return res.status(201).json({
                status: true,
                message: 'success',
                data: product_components
            });
        } catch (err) {
            throw err;
        }
    },

    update: async (req, res) => {
        try {
            const {id} = req.params;

            const {id_product, id_component} = req.body;

            if (!id_product) {
                return res.status(400).json({
                    status: false,
                    message: 'id_product is required!',
                    data: null
                });
            }

            if (!id_component) {
                return res.status(400).json({
                    status: false,
                    message: 'id_component is required!',
                    data: null
                });
            }

            const product = await Product.findOne({where: {id:id_product}});
            const component = await Component.findOne({where: {id:id_component}}); 

            if (!product) {
                return res.status(404).json({
                    status: false,
                    message: 'product not found!',
                    data: null
                });
            }

            if (!component) {
                return res.status(404).json({
                    status: false,
                    message: 'component not found!',
                    data: null
                });
            }

            const updated = await Product_Components.update(req.body, {where: {id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find product_component with id ${id}!`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (err) {
            throw err;
        }
    },

    destroy: async (req, res) => {
        try {
            const {id} = req.params;

            const deleted = await Product_Components.destroy({where: {id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find product_component with id ${id}!`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (err) {
            throw err;
        }
    }
};