let controller = {};
let format = require("../format").format;
const res = require("express/lib/response");
const jwt = require("jsonwebtoken");
const db =require ("../database").config;

controller.getLogin = (req,res) =>{
    const user={
        id: req.body.id,
        time : new Date().getTime()
    }
    const token =jwt.sign({user}, db.secret_key,{expiresIn:"1m"});
    res.status(200);
    format.success =true;
    format.code =200;
    format.message="token";
    format.data=token;
    res.json(format);
    };

controller.getAdoption = (req, res) =>
{
    const sql = "SELECT * FROM adoptions INNER JOIN pets ON pets.id = adoptions.pet_id INNER JOIN users ON users.id = adoptions.user_id  WHERE adoptions.id = ?";
	req.getConnection((error,conn) => {
        if(error)
        {
            format.code = 500;
            format.message = "Error to connect to DB, please contact to admin";
            format.success = false;
            res.status(500);
            res.json(format);
        }
        else
        {
            conn.query(sql, [req.query.id] ,(err, results) =>{
                if(err)
                {
                    format.code = 400;
                    format.message = err.sqlMessage;
                    format.success = false;
                    res.status(400);
                    res.json(format);
                }
                else
                {
                    format.code = 200;
                    format.message = "Success";
                    format.success = true;
                    format.data = results;
                    res.status(200);
                    res.json(format);
                }
                
            })
        }
		
	});
};

controller.getAdoptionByUser = (req, res) =>
{
    const sql = "SELECT * FROM adoptions INNER JOIN pets ON pets.id = adoptions.pet_id INNER JOIN users ON users.id = adoptions.user_id WHERE adoptions.user_id = ?";
	req.getConnection((error,conn) => {
        if(error)
        {
            format.code = 500;
            format.message = "Error to connect to DB, please contact to admin";
            format.success = false;
            res.status(500);
            res.json(format);
        }
        else
        {
            conn.query(sql, [req.query.user_id] ,(err, results) =>{
                if(err)
                {
                    format.code = 400;
                    format.message = err.sqlMessage;
                    format.success = false;
                    res.status(400);
                    res.json(format);
                }
                else
                {
                    format.code = 200;
                    format.message = "Success";
                    format.success = true;
                    format.data = results;
                    res.status(200);
                    res.json(format);
                }
                
            })
        }
		
	});
};

controller.getAdoptions = (req, res) =>
{
    const sql = "SELECT * FROM adoptions INNER JOIN pets ON pets.id = adoptions.pet_id INNER JOIN users ON users.id = adoptions.user_id";
	req.getConnection((error,conn) => {
        if(error)
        {
            format.code = 500;
            format.message = "Error to connect to DB, please contact to admin";
            format.success = false;
            res.status(500);
            res.json(format);
        }
        else
        {
            conn.query(sql, [req.query.id] ,(err, results) => {
                if(err)
                {
                    format.code = 400;
                    format.message = err.sqlMessage;
                    format.success = false;
                    res.status(400);
                    res.json(format);
                }
                else
                {
                    format.code = 200;
                    format.message = "Success";
                    format.success = true;
                    format.data = results;
                    res.status(200);
                    res.json(format);
                }
                
            })
        }
    })
}

controller.postAdoption = (req, res) =>
{
    const sql = "INSERT INTO adoptions SET ?";
    req.getConnection((error,conn) => {
        if(error)
        {
            format.code = 500;
            format.message = "Error to connect to DB, please contact to admin";
            format.success = false;
            res.status(500);
            res.json(format);
        }
        else
        {
            conn.query(sql, [req.body] ,(err, results) => {
                if(err)
                {
                    format.code = 400;
                    format.message = err.sqlMessage;
                    format.success = false;
                    res.status(400);
                    res.json(format);
                }
                else
                {
                    format.code = 201;
                    format.message = "Adption add";
                    format.success = true;
                    format.data = results.insertId;
                    res.status(201);
                    res.json(format);
                }
                
            })
        }
    })
}

controller.putAdoption = (req, res) =>
{
    const sql = "UPDATE adoptions SET ? WHERE id = ?";
	req.getConnection((error,conn) => {
        if(error)
        {
            format.code = 500;
            format.message = "Error to connect to DB, please contact to admin";
            format.success = false;
            res.status(500);
            res.json(format);
        }
        else
        {
            conn.query(sql, [req.body, req.body.id] ,(err, results) => {
                if(err)
                {
                    format.code = 400;
                    format.message = err.sqlMessage;
                    format.success = false;
                    res.status(400);
                    res.json(format);
                }
                else
                {
                    if(results.affectedRows > 0)
                    {
                        format.code = 200;
                        format.message = "Adoption updated";
                        format.success = true;
                        format.data = results;
                        res.status(200);
                        res.json(format);
                    }
                    else
                    {
                        format.code = 404;
                        format.message = "Adoption can't be updated, please confirm data";
                        format.success = false;
                        format.data = results;
                        res.status(404);
                        res.json(format);
                    }
                    
                }
            })
        }
    })
}

controller.deleteAdoption = (req, res) =>
{
    const sql = "DELETE from adoptions WHERE id = ?";
    req.getConnection((error,conn) => {
        if(error)
        {
            format.code = 500;
            format.message = "Error to connect to DB, please contact to admin";
            format.success = false;
            res.status(500);
            res.json(format);
        }
        else
        {
            conn.query(sql, [req.body.id] ,(err, results) => {
                if(err)
                {
                    format.code = 400;
                    format.message = err.sqlMessage;
                    format.success = false;
                    res.status(400);
                    res.json(format);
                }
                else
                {
                    if(results.affectedRows > 0)
                    {
                        format.code = 204;
                        format.message = "Adoption deleted";
                        format.success = true;
                        format.data = results;
                        res.status(204);
                        res.json(format);
                    }
                    else
                    {
                        format.code = 404;
                        format.message = "Adoption can't be deleted, please confirm data";
                        format.success = false;
                        format.data = results;
                        res.status(404);
                        res.json(format);
                    }
                    
                }
            })
        }
    })
}
module.exports = controller;