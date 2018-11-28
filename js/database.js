const DUPLICATE_KEY_ERROR_CODE = 11000;
const DuplicateKeyError = require('./errors.js').DuplicateKeyError;
const debug = require('debug')('push:database');
const mongoose = require('mongoose');

const mongoHost = process.env.DB_HOST ? process.env.DB_HOST : 'localhost';
mongoose.Promise = Promise;
mongoose.connect(`mongodb://newuser:newuser123@ds115753.mlab.com:15753/productstutorial`);

const db = mongoose.connection;
db.on('error', err => console.log('Database connection error:', err));
db.once('open', () => console.log('Opened connection to MongoDB'));

const tokenSchema = mongoose.Schema({
  token: {
    type: String,
    unique: true,
  },
});
const DeviceToken = mongoose.model('DeviceToken', tokenSchema);

module.exports = {

  saveDeviceToken: async (token) => {
    console.log('Trying to store new device token', token);
    const t = new DeviceToken({ token });
    try {
      const result = await t.save();
      console.log('Successfully stored device token', token);
      return result;
    } catch (e) {
      if (e.code === DUPLICATE_KEY_ERROR_CODE) {
        /* duplicate key error is totally acceptable for our use case 
         * where device tokens are being regularly sent by clients */
        console.log(`Ignoring duplicate device token ${token}`);
        throw new DuplicateKeyError(`Device token ${token} already stored in DB`);
      }
      console.log(`Error while trying to store token ${token}`, e);
      throw e;
    }
  },

  fetchDeviceTokens: async () => {
    const tokens = await DeviceToken.find().select('token').exec();
    return tokens.map(d => d.token);
  },
};
