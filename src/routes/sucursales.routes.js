import { Router } from 'express';
import pool from '../database.js';

const router = Router();

//router.get('/addS', (req, res) => {
//    res.render('sucursales/addS');
//});

router.post('/addS', async (req, res) => {
    try {
        const { idEmpresa, descripcion, direccion, telefono, encargado, estado } = req.body;
        const newSucursal = {
            idEmpresa, descripcion, direccion, telefono, encargado, estado
        };
        await pool.query('INSERT INTO inv_sucursales SET ?', [newSucursal]);
        res.redirect('/listS');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/addS', async (req, res) => {
    try {
        const [empresas] = await pool.query('SELECT idEmpresa, nombre FROM gen_empresas');
        res.render('sucursales/addS', { empresas });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.get('/listS', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM inv_sucursales');
        res.render('sucursales/lista_sucursales', { sucursales: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.get('/editS/:idSucursal', async (req, res) => {
    try {
        const { idSucursal } = req.params;

        // Consultar la sucursal específica
        const [sucursalResult] = await pool.query('SELECT * FROM inv_sucursales WHERE idSucursal = ?', [idSucursal]);
        const sucursal = sucursalResult[0];  // La primera fila será la sucursal que editamos

        // Consultar todas las empresas disponibles
        const [empresas] = await pool.query('SELECT idEmpresa, nombre FROM gen_empresas');

        // Renderizar la vista 'editS' con los datos de la sucursal y la lista de empresas
        res.render('sucursales/editS', { sucursal, empresas });
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/editS/:idSucursal', async (req, res) => {
    try {
        const { idEmpresa, descripcion, direccion, telefono, encargado, estado } = req.body;
        const { idSucursal } = req.params;
        const editSucursal = {
            idEmpresa, descripcion, direccion, telefono, encargado, estado
        };
        await pool.query('UPDATE inv_sucursales SET ? WHERE idSucursal = ?', [editSucursal, idSucursal]);
        res.redirect('/listS');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/deleteS/:idSucursal', async (req, res) => {
    try {
        const { idSucursal } = req.params;
        await pool.query('DELETE FROM inv_sucursales WHERE idSucursal = ?', [idSucursal]);
        res.redirect('/listS');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
