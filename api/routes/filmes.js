module.exports = app => {
    const controller = app.controllers.filmes;

    app.route('/api/filmes')
        .get(controller.listFilmes)
        .post(controller.saveFilmes);

    app.route('/api/filmes/:id')
        .delete(controller.removeFilmes)
        .put(controller.updateFilmes);
}