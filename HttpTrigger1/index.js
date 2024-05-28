module.exports = async function (context, req) {
    context.log('HTTP trigger and SQL output binding function processed a request.');

    if (!req.body) {
        context.res = {
            status: 400,
            body: "Please pass a valid request body"
        };
        return;
    }

    context.bindings.todoItems = req.body;
    context.res = {
        status: 201
    };
};
