'use strict';

module.exports = (User) => {


    /**
     * beforeRemote create
     *
     * @param {object} context request object. 
     * @next will create user.
     */

    User.beforeRemote('create', (context, userInstance, next) => {


        const email = context.args.data.email;


        //  validate emial.
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            let error = new Error("Invalid emialid.");
            error.status = 401;
            return next(error);
        }

        const query = { where: { "email": email.toLowerCase() } }

        // checking if email already exist.
        User.findOne(query, (err, data) => {
            if (data) {
                let error = new Error("Email Id  All Ready Exist");
                error.status = 401;
                return next(error);
            } else {
                next();
            }
        });

    });

    /**
    * afterRemote create
    *
    * @param {object} context request object.
    * @next will create user.
    */
    User.afterRemote('create', (context, users, next) => {
        // modifying response data to  empty object {}.
        context.result = {};
        next();
    });

    /**
        * afterRemote login
        *
        * @param {object} context request object.
        * @next will send modifed response.
        */

    User.afterRemote('login', (context, users, next) => {
        // modifying response data.
        context.result = {
            token: context.result.id
        };
        next();
    });

};
