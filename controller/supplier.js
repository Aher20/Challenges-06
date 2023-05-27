const {Supplier} = require('../models');

module.exports = {
    // GET all suppliers
    index: async (req, res) => {
        try {
            const suppliers = await Supplier.findAll();

            return res.status(200).json({
                status: true,
                message: 'success',
                data: suppliers
            });
        } catch (err) {
            throw err;
        }
    },

    // GET detail products
    show: async (req, res) => {
        try {
            const {id} = req.params;

            const supplier = await Supplier.findOne({where: {id}});

            if (!supplier) {
                return res.status(404).json({
                    status: false,
                    message: `can't find supplier with id ${id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: supplier
            });
        } catch (err) {
            throw err;
        }
    },

    // POST data supplier
    store: async (req, res) => {
        try {
            const {name, address} = req.body;

            if (!name) {
                return res.status(400).json({
                    status: false,
                    message: 'name is required!',
                    data: null
                });
            }

            if (!address) {
                return res.status(400).json({
                    status: false,
                    message: 'address is required!',
                    data: null
                });
            }

            const supplier = await Supplier.create({name, address});

            return res.status(201).json({
                status: true,
                message: 'success',
                data: supplier
            });
        } catch (err) {
            throw err;
        }
    },

    update: async (req, res) => {
        try {
            const {id} = req.params;

            const updated = await Supplier.update(req.body, {where: {id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find supplier with id ${id}!`,
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

            const deleted = await Supplier.destroy({where: {id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find supplier with id ${id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (err) {
            throw err;
        }
    }
};