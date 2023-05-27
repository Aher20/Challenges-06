const {Product} = require('../models');

module.exports = {
    // GET all products
    index: async (req, res) => {
        try {
            const products = await Product.findAll();

            return res.status(200).json({
                status: true,
                message: 'success',
                data: products
            });
        } catch (err) {
            throw err;
        }
    },

    // GET detail products
    show: async (req, res) => {
        try {
            const {id} = req.params;

            const product = await Product.findOne({where: {id}});

            if (!product) {
                return res.status(404).json({
                    status: false,
                    message: `can't find product with id ${id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: product
            });
        } catch (err) {
            throw err;
        }
    },

    // POST data product
    store: async (req, res) => {
        try {
            const {name, quantity} = req.body;

            if (!name) {
                return res.status(400).json({
                    status: false,
                    message: 'name is required!',
                    data: null
                });
            }

            if (!quantity) {
                return res.status(400).json({
                    status: false,
                    message: 'quantity is required!',
                    data: null
                });
            }

            const product = await Product.create({name, quantity});

            return res.status(201).json({
                status: true,
                message: 'success',
                data: product
            });
        } catch (err) {
            throw err;
        }
    },

    update: async (req, res) => {
        try {
            const {id} = req.params;

            const updated = await Product.update(req.body, {where: {id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find product with id ${id}!`,
                    data: null
                });
            }

            return res.status(201).json({
                status: true,
                message: 'success!',
                data: null
            });
        } catch (err) {
            throw err;
        }
    },

    destroy: async (req, res) => {
        try {
            const {id} = req.params;

            const deleted = await Product.destroy({where: {id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find product with id ${id}!`,
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