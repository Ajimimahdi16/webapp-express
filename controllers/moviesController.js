const connection = require('../data/db');


// Funzione per ottenere tutti i film


// Questa funzione esegue una query per selezionare tutti i film dalla tabella "movies" e restituisce i risultati come JSON
function index(req, res) {
  connection.query('SELECT * FROM movies', (err, results) => {
    if (err) {
      console.error('Errore durante la query:', err);
      res.status(500).json({ error: 'Errore del server' });
    } else {

      const moviesWithImagePath = results.map(movie => {
        return {
          ...movie,
          image_url: req.imagePath + movie.image_url // Aggiungiamo il percorso completo dell'immagine a ogni film
        };
      });
      res.json(moviesWithImagePath);
    }
  });
}


function show(req, res) {
    //  Recuperiamo l'id dall'URL
    const id = req.params.id;

    //  Prepariamo le query con i segnaposto '?' (Prepared Statements per sicurezza)
    const sql = 'SELECT * FROM movies WHERE id = ?';
    const reviewsSql = 'SELECT * FROM reviews WHERE movie_id = ?';

    //  Eseguiamo la prima query per il film
    connection.query(sql, [id], (err, moviesResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        
        // Se non troviamo nulla, restituiamo 404
        if (moviesResults.length === 0) return res.status(404).json({ error: 'Movie not found' });

        // Definiamo il singolo film 
        const movie = moviesResults[0];

        movie.image_url = req.imagePath + movie.image_url; // Aggiungiamo il percorso completo dell'immagine al film

        //  Eseguiamo la seconda query per le recensioni, annidata nella prima
        connection.query(reviewsSql, [id], (err, reviewsResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' });

            // Aggiungiamo l'array delle recensioni all'oggetto film
            movie.reviews = reviewsResults; 
        
            //  Inviamo la risposta finale solo ora che abbiamo entrambi i dati
            res.json(movie);


        }); 
    }); 
}

module.exports = {
  index,
  show
};