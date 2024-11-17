const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cors = require("cors");
const postgresPool = require("pg").Pool

const app = express()
const bodyParser = require("body-parser");
const { Connection } = require("pg");
const port = process.env.PORT || 4000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.listen(port,(error)=>{
    if(error) throw error;
    console.log(`El servidor se está ejecutando en el puerto: ${port}`)
})

/* Conexion con la base de datos */
const pool = new postgresPool({
    host: 'localhost',
    user: 'postgres',
    password: 'kevin3146477564',
    database: 'db_apolo',
    port: 5432,
    max: 10,
})

pool.connect((error, Connection)=>{
    if(error) throw error;
    console.log(`La conección a la base de datos db_apolo ha sido exitosa`)
})

// endpoints
/* Listar usuarios */
app.get('/usuarios', (req, res)=>{
    const sql = 'SELECT * FROM usuarios';
    pool.query(sql,(error, resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows);
    })
})

/* Listar usuarios por código */
app.get('/usuarios/:id', (req, res)=>{
    const usuId = Number(req.params.id);
    const sql = 'SELECT * FROM usuarios WHERE "id" = $1';
    pool.query(sql,[usuId],(error, resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows[0]);
    })
})

/* Insertar usuarios */
app.post('/usuarios', (req, res)=>{
    const {nombre, apellidos, tipo_documento, numero_documento, fecha_nacimiento, genero, telefono, email, contraseña} = req.body
    console.log('Datos recibidos:', req.body)
    const sql = 'INSERT INTO usuarios(nombre, apellidos, tipo_documento, numero_documento, fecha_nacimiento, genero, telefono, email, contraseña) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';
    pool.query(sql,[nombre, apellidos, tipo_documento, numero_documento, fecha_nacimiento, genero, telefono, email, contraseña],(error, resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows[0]);
    })
})

/* Inicio de sesión */
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      console.log('Datos recibidos en login:', req.body);
  
      const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
      console.log('Resultado de la consulta:', result);
  
      if (result.rowCount === 0) {
        console.log('Usuario no encontrado');
        return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
      }
  
      const user = result.rows[0];
      console.log('Usuario encontrado:', user);
  
      const passwordField = Object.keys(user).find(key => key.includes('contraseña'));
      if (!passwordField) {
        console.error('Campo de contraseña no encontrado');
        return res.status(500).json({ message: 'Error en el servidor. Campo de contraseña no encontrado.' });
      }
  
      let storedPassword = user[passwordField];
      console.log('Contraseña guardada:', storedPassword);
  
      let isPasswordValid = false;
  
      if (storedPassword.startsWith('$2a$') || storedPassword.startsWith('$2b$')) {
        isPasswordValid = await bcrypt.compare(password, storedPassword);
      } else {
        if (password === storedPassword) {
          const hashedPassword = await bcrypt.hash(password, 10);
          await pool.query('UPDATE usuarios SET contraseña = $1 WHERE email = $2', [hashedPassword, email]);
          isPasswordValid = true;
          storedPassword = hashedPassword;
          console.log('Contraseña encriptada y actualizada en la base de datos');
        }
      }
  
      console.log('Resultado de la comparación de contraseñas:', isPasswordValid);
  
      if (isPasswordValid) {
        const token = jwt.sign({ id: user.id }, 'tu_secreto', { expiresIn: '1h' });
        res.json({ token, id: user.id, nombre: user.nombre }); // Asegúrate de que estamos enviando el ID del usuario
      } else {
        res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ message: 'Error en el servidor' });
    }
  });

/* Actualizar usuarios */
app.patch('/usuarios/:id', (req, res)=>{
    const usuId = Number(req.params.id);
    const {nombre, apellidos, tipo_documento, numero_documento, fecha_nacimiento, genero, telefono, email, contraseña} = req.body
    const sql = 'UPDATE usuarios SET nombre=$1, apellidos=$2, tipo_documento=$3, numero_documento=$4, fecha_nacimiento=$5, genero=$6, telefono=$7, email=$8, contraseña=$9 WHERE "id"= $10';
    pool.query(sql,[nombre, apellidos, tipo_documento, numero_documento, fecha_nacimiento, genero, telefono, email, contraseña, usuId],(error, resultado)=>{
        if(error) return res.json(error);
        return res.status(200).send(`El usuario ha sido actualizado por el codigo: ${usuId}`);
    })
})

/* Eliminar usuarios */
app.delete('/usuarios/:id', (req, res)=>{
    const usuId = Number(req.params.id);
    const sql = 'DELETE FROM usuarios WHERE "id"= $1';
    pool.query(sql,[usuId],(error, resultado)=>{
        if(error) return res.json(error);
        return res.status(200).send(`El usuario ha sido eliminado por el codigo: ${usuId}`);
    })
})

/* Listar reservas */
app.get('/reservas', (req, res) =>{
    const sql = 'SELECT * FROM reservas';
    pool.query(sql, (error, resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows)
    })
})

/* Listar reservas por codigo */
app.get('/reservas/:id', (req, res) =>{
    const resId = Number(req.params.id)
    const sql = 'SELECT * FROM reservas WHERE "id" = $1';
    pool.query(sql,[resId],(error, resultado)=>{
        if(error) return res.json(error);
        return res.status(200).json(resultado.rows[0])
    })
})

/* Añadir una reserva */
app.post('/reservas', async (req, res) =>{
    const { usuario_id, pelicula, hora_funcion } = req.body
    try{
        console.log('datos recibidos en reservas:', req.body)

        const result = await pool.query('INSERT INTO reservas(usuario_id, pelicula, hora_funcion) VALUES($1, $2, $3) RETURNING*',
        [usuario_id, pelicula, hora_funcion]
    );
    res.status(201).json(result.rows[0]);
    } catch (error){
        console.error('Error al guardar la reserva', error);
        res.status(500).json({message: 'Error al guardar la reserva'});
    }
})

/* Actualizar una reserva */
app.patch('/reservas/:id', (req, res) =>{
    const resId = Number(req.params.id);
    const {usuario_id, pelicula, hora_funcion} = req.body
    const sql = 'UPDATE reservas SET usuario_id = $1, pelicula = $2, hora_funcion = $3 WHERE "id" = $4';
    pool.query(sql, [usuario_id, pelicula, hora_funcion, resId],(error, resultado)=>{
        if(error) return res.json(error);
        return res.status(200).send(`La reserva ha sido actualizada por el codigo: ${resId}`);
    })
})

/* Eliminar reserva */
app.delete('/reservas/:id', (req, res)=>{
    const resId = Number(req.params.id);
    const sql = 'DELETE FROM reservas WHERE "id"= $1';
    pool.query(sql,[resId],(error, resultado)=>{
        if(error) return res.json(error);
        return res.status(200).send(`La reserva ha sido eliminada por el codigo: ${resId}`);
    })
})

app.post('/contactos', async (req, res)=>{
    const {nombre, correo_electronico, asunto, mensaje} = req.body;

    try{
        console.log('Datos recibidos en contactos:', req.body);

        const result = await pool.query(
            'INSERT INTO contactos (nombre, correo_electronico, asunto, mensaje) VALUES($1, $2, $3, $4) RETURNING*',
            [nombre, correo_electronico, asunto, mensaje]
        );
        res.status(201).json(result.rows[0]);
    } catch (error){
        console.error('Error al guardar el mensaje de contacto:', error);
        res.status(500).json({message: 'Error en el servidor'});
    }
})