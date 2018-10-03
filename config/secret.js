module.exports = {

  database: process.env.DATABASE || 'mongodb://root:abc123@ds237192.mlab.com:37192/hamzapay',
  port: process.env.PORT || 3000,
  secret: process.env.SECRET || 'hamzacoll1',

}
