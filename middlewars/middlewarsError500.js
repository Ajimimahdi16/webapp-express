function middlewarsError500 ( err, req, res, next){
    res.status(500);
    res.json({message : "errore interno del server"});
}

module.exports = middlewarsError500;