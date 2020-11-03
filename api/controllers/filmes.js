
const { json } = require('body-parser');
const uuidv4 = require('uuid/v4');

module.exports = app => {

    const filmesDB = app.data.filmes;
    const controller = {};

    const { filmes: filmesMock, } = filmesDB;

    controller.listFilmes = (req, res) => res.status(200).json(filmesDB);


    controller.saveFilmes = (req, res) => {

        if(Object.keys(req.body).length === 0){
            res.status(400).json({
                message: 'Os dados do novo filme não foram enviados.',
                success: false
            });
        }else{
            filmesMock.data.push({
                id: uuidv4(),
                titulo: req.body.titulo,
                ano: req.body.ano,
                genero: req.body.genero
            });
        }

        res.status(201).json({
            message: 'Filme incluido com sucesso!',
            success: true,
            filmes: filmesMock
        });
    }

    controller.removeFilmes = (req, res) => {
        const { id, } = req.params;

        const foundFilmeIndex = filmesMock.data.
        findIndex(filmes => filmes.id === id);

        if(foundFilmeIndex === -1){
            res.status(404).json({
                message: "Filme não encontrado",
                success: false,
                filmes: filmesMock,
            });
        }else{
            filmesMock.data.splice(foundFilmeIndex, 1);
            res.status(200).json({
                message: "Filme removido com sucesso",
                success: true,
                filmes: filmesMock,
            })
        }
    }

    controller.updateFilmes = (req, res) => {
        const { id, }  = req.params;

        const foundFilmeIndex = filmesMock.data.
        findIndex(filmes => filmes.id === id);

        if(foundFilmeIndex === -1){
            res.status(404).json({
                message: "Filme não encontrado",
                success: false,
                filmes: filmesMock,
            });
        }else{
            const newFilmes = {
                id: id,
                titulo: req.body.titulo,
                ano: req.body.ano,
                genero: req.body.genero,
                createdAt: new Date()
            };

            filmesMock.data.splice(foundFilmeIndex, 1, newFilmes);

            res.status(200).json({
                message: 'Filme encontrado e atualizado com sucesso',
                success: true,
                filmes: filmesMock,
            });
        }
    }

    return controller;
}