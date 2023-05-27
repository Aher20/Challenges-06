const {Component, Supplier, Component_Suppliers} = require('../models');

module.exports = {
    // GET all data
    index: async (req, res) => {
        try {
            const component_suppliers = await Component_Suppliers.findAll();

            return res.status(200).json({
                status: true,
                message: 'success',
                data: component_suppliers
            });
        } catch (err) {
            throw err;
        }
    },

    // GET detail data
    show: async (req, res) => {
        try {
            const {id} = req.params;

            const component_suppliers = await Component_Suppliers.findOne({where: {id}});

            if (!component_suppliers) {
                return res.status(404).json({
                    status: false,
                    message: `can't find component_suppliers with id ${id}!`,
                    data: null
                });
            }

            return res.status(200).json({
                status: true,
                message: 'success',
                data: component_suppliers
            });
        } catch (err) {
            throw err;
        }
    },

    // POST data component_suppliers
    store: async (req, res) => {
        try {
            const {id_component, id_supplier} = req.body;

            if (!id_component) {
                return res.status(400).json({
                    status: false,
                    message: 'id_component is required!',
                    data: null
                });
            }

            if (!id_supplier) {
                return res.status(400).json({
                    status: false,
                    message: 'id_supplier is required!',
                    data: null
                });
            }

            const component = await Component.findOne({where: {id:id_component}});
            const supplier = await Supplier.findOne({where: {id:id_supplier}});

            if (!component) {
                return res.status(404).json({
                    status: false,
                    message: 'component not found!',
                    data: null
                });
            }

            if (!supplier) {
                return res.status(404).json({
                    status: false,
                    message: 'supplier not found!',
                    data: null
                });
            }

            const component_suppliers = await Component_Suppliers.create({id_component, id_supplier});

            return res.status(201).json({
                status: true,
                message: 'success',
                data: component_suppliers
            });
        } catch (err) {
            throw err;
        }
    },

    update: async (req, res) => {
        try {
            const {id} = req.params;

            const {id_component, id_supplier} = req.body;

            if (!id_component) {
                return res.status(400).json({
                    status: false,
                    message: 'id_component is required!',
                    data: null
                });
            }

            if (!id_supplier) {
                return res.status(400).json({
                    status: false,
                    message: 'id_supplier is required!',
                    data: null
                });
            }

            const component = await Component.findOne({where: {id:id_component}});
            const supplier = await Supplier.findOne({where: {id:id_supplier}});

            if (!component) {
                return res.status(404).json({
                    status: false,
                    message: 'component not found!',
                    data: null
                });
            }

            if (!supplier) {
                return res.status(404).json({
                    status: false,
                    message: 'supplier not found!',
                    data: null
                });
            }


            const updated = await Component_Suppliers.update(req.body, {where: {id}});

            if (updated[0] == 0) {
                return res.status(404).json({
                    status: false,
                    message: `can't find component_suppliers with id ${id}!`,
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

            const deleted = await Component_Suppliers.destroy({where: {id}});

            if (!deleted) {
                return res.status(404).json({
                    status: false,
                    message: `can't find component_suppliers with id ${id}!`,
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