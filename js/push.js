const debug = require('debug')('push:notifications');

const settings = {
  gcm: {
    id: 'AAAAXFegkME:APA91bFDBjdsB02tlKvi6-e68RTULRHyOzEr_bGd68GCSMXoqQmIPtEXCmNHcK_2aTipoXKjI5rWWhxRKPTtNwy7lBkMfkKAsS5Fxuvjd4h2pXlT4IRPeTgvmb-spKzlkZT_GJVZlSfI',
  },
  apn: {
    token: {
      key: './certs/key.p8',
      keyId: 'ABCD',
      teamId: 'EFGH',
    },
  },
};
console.log(settings, 'settingsssssss')
// AAAAXFegkME:APA91bFDBjdsB02tlKvi6-e68RTULRHyOzEr_bGd68GCSMXoqQmIPtEXCmNHcK_2aTipoXKjI5rWWhxRKPTtNwy7lBkMfkKAsS5Fxuvjd4h2pXlT4IRPeTgvmb-spKzlkZT_GJVZlSfI
// AAAA9U3NkO8:APA91bE9XnPD1WQGYle0dbJs6KO6HmAq_73f_z2PHoPr3sbRovXbn9q-PyJAKYlxgNI88rBpTzNWCXRuxhX9FcwbDBhT4h0BAiJr4BiEx8uSkWHXM92q04Q6cydK-dHGSnR20bsgH0Lg
const PushNotifications = require('node-pushnotifications');

const push = new PushNotifications(settings);
console.log(push, 'pushhhhhhhhhh')

module.exports = {
  sendNotification: async (tokens) => {
    const data = {
      title: 'Crossplattform push is working!',
      body: 'Powered by node.js and React Native',
    };

    try {
      const results = await push.send(tokens, data);
      console.log('Results for sending notifications:', results);
      return results;
    } catch (err) {
      console.log('Error while sending notifications:', err);
      throw err;
    }
  },
};
