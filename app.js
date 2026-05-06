const express = require('express');
const app = express();
const port = 3000;
 
const cors = require("cors");

app.use(cors({
  origin: 'http://localhost:5173/' 
}));

// Importa i middleware per gestire errori 404 e 500
const middlewarsError404 = require('./middlewars/middlewarsError404');
const middlewarsError500 = require('./middlewars/middlewarsError500');

const setImagePath = require('./middlewars/imagePath');

// Middleware per impostare il percorso delle immagini
app.use(setImagePath);


// Middleware per il parsing del corpo delle richieste
app.use(express.json());

// Importa i router
const moviesRouter = require('./routers/moviesRouters');

// Serve file statici dalla cartella "public"
app.use(express.static('public')); 



// Middleware per il parsing del corpo delle richieste
app.get('/', (req, res) => {
  res.send('Benvenuto al blog dedicato al cinema e alla televisione!');
});

// Rotta per ottenere tutte le recensioni
app.use('/movies', moviesRouter);


// Middleware per gestire errori 404 e 500
app.use(middlewarsError404);
app.use(middlewarsError500);


// Aggiungi altre rotte per gestire le richieste specifiche del tuo blog
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});