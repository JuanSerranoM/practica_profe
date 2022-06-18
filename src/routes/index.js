const express = require ('express');
const router = express.Router();
const path = require ('path');
const conexion  = require ('../js/conexion_slq');



//----------------------------------------Se usara formato json----------------------------------------//
router.use(express.urlencoded());

//----------------------------------------views----------------------------------------//


router.get('/create', (req,res)=> {
    res.render ('carga.hbs');
 
});

router.get('/usuarios.html', (req,res)=> {
    res.sendFile(path.resolve(__dirname, '../views/usuarios.html'));
});

router.get('/historialcarga.html', (req,res)=> {
    res.sendFile(path.resolve(__dirname, '../views/historialcarga.html'));
});

//SCRIPTS

//----------------------------------------Metodo mostrar----------------------------------------//
router.get('/',async (req,res)=>{
   const articulo =await conexion.query('SELECT * FROM articulo'
   );
/*    console.log(articulo); */
   res.render('inicio.hbs',{articulo: articulo});
});

//----------------------------------------Metodo insertar----------------------------------------//

router.post('/create/articulo', async(req,res)=>{
    

    
    const sql= "INSERT INTO articulo SET ?"
    const data= {nombre_articulo:req.body.nombre,
        categoria_articulo:req.body.categoria,
        cantidad:req.body.cantidad,
        punto_reposicion:req.body.reposicion};


    await conexion.query(sql,data,function(err,results){
        if(err){
            throw err;
        }else{
            console.log(data);

        }
    })
    res.redirect('/create');
})


//----------------------------------------Metodo modificar----------------------------------------//
router.put('/edit/articulo', async(req,res)=>{
    let id=req.params.id;
    let nombre=req.body.nombre;
    let categoria=req.body.categoria;
    let cantidad=req.body.cantidad;
    let reposicion=req.body.reposicion;
    let sql= "UPDATE articulo SET nombre_articulo= ?, categoria_articulo=?, cantidad=?, punto_reposicion=? WHERE id=?"

    await conexion.query(sql,[nombre,categoria,cantidad,reposicion,id],function(err,results){
        if(err){
            throw err;
        }else{
            res.send(results);

        }
    });
});




module.exports = router;
