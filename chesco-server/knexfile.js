require ('custom-env').env()

module.exports = {
  development: {
    client: 'pg',
    connection: {
      user: process.env.DB_USER,    
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port:  process.env.DB_PORT,
      database: process.env.DB_NAME,
      ssl: true
    },
    migrations: { 
      directory: __dirname + '/db/migrations',  
    },
    seeds: {
      directory: __dirname + '/db/seeds',
    },
  },
};
 