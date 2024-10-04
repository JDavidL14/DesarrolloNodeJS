import {Router} from 'express'
import pool from '../database.js'

const router = Router();

router.get('/add',(req,res)=>{
    res.render('empresas/add');
});

router.post('/add', async(req,res)=>{
    try {
        const {nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono, fechaadicion} = req.body;
        const newEmpresa = {
            nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono, fechaadicion
        }
        await pool.query('insert into gen_empresas set ?', [newEmpresa]);
        res.redirect('/list');

    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

router.get('/list', async(req,res)=>{
    try {
        const [result] = await pool.query('select * from gen_empresas');
        res.render('empresas/lista_empresas', {empresas: result})
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

router.get('/edit/:idEmpresa', async(req,res)=>{
    try {
        const {idEmpresa} = req.params;
        const [empresa] = await pool.query('select * from gen_empresas where idEmpresa = ?', [idEmpresa]);
        const empresaEdit = empresa[0];
        res.render('empresas/edit',{empresa: empresaEdit});
    } catch (error) {
        res.status(500).json({message:err.message});
    }
});

router.post('/edit/:idEmpresa', async(req,res)=>{
    try {
        const { nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono} = req.body;
        const {idEmpresa} = req.params;
        const editEmpresa = {
            nombre, direccion, direccionfacturacion, representantelegal, telefono, correoelectronico, codigopostal, estado, principal, adiciono
        };
        await pool.query('update gen_empresas set ? where idEmpresa = ?', [editEmpresa, idEmpresa]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

router.get('/delete/:idEmpresa', async(req,res)=>{
    try {
        const {idEmpresa} = req.params;
        await pool.query('delete from gen_empresas where idEmpresa = ?', [idEmpresa]);
        res.redirect('/list');
    } catch (err) {
        res.status(500).json({message:err.message});
    }
});

export default router;