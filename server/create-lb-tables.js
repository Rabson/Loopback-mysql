const server = require('./server');
const ds = server.dataSources.db;
const lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'user'];
ds.automigrate(lbTables, function (er) {
    if (er) throw er;
    console.log('Loopback tables [' - lbTables - '] created in ', ds.adapter.name);
    ds.disconnect();
});
