
module.exports = function (app) {

    const remotes = app.remotes();

    // modify all success response.
    remotes.after('**', function (ctx, next) {

        if (ctx) {
            ctx.result = {
                error: false,
                message: "Success",
                data: ctx.result,
            };
        }
        next();
    });
};
