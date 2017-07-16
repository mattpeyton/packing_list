/*Setting up the fine details of where the app
will run and which database to use
*/
module.exports = {
  appName: 'The Packing List App',
  port: 3030,
  db: {
    host: 'localhost',
    dbName: 'packlist',
  }
};
