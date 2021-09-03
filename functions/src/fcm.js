/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const database = admin.database();
const messaging = admin.messaging();

exports.sendFcm = functions
  .region('asia-southeast1')
  .https.onCall(async (data, context) => {
    checkIfAuth(context);
    const { chatId, title, message } = data;

    const roomSnap = await database.ref(`/rooms/${chatId}`).once('value');

    if (!roomSnap.exists()) {
      return false;
    }

    const roomData = roomSnap.val();

    checkIfAllowed(context, transformToArr(roomData.admins));

    const fcmUsers = transformToArr(roomData.fcmUsers);

    const userTokenPromises = fcmUsers.map(uid => getUserTokens(uid));

    const userTokenResults = await Promise.all(userTokenPromises);

    const tokens = userTokenResults.reduce(
      (accToken, userTokens) => [...accToken, ...userTokens],
      []
    );

    if (tokens.length == 0) {
      return false;
    }

    const fcmMessage = {
      notifications: {
        title: `${title} (${roomData.name})`,
        body: message,
      },
      tokens,
    };

    const batchResponse = await messaging.sendMulticat(fcmMessage);
    const failedTokens = [];

    if (batchResponse.failureCount > 0) {
      batchResponse.responses.forEach((resp, idx) => {
        if (!resp.success) {
          failedTokens.push(tokens[idx]);
        }
      });
    }

    const removePromises = failedTokens.map(token =>
      database.ref(`/fcm_tokens/${token}`).remove()
    );

    return Promise.all(removePromises).catch(err => err.message);
  });

function checkIfAuth(context) {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'You have to be signed in'
    );
  }
}

function checkIfAllowed(context, chatAdmins) {
  if (!chatAdmins.includes(context.auth.uid)) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'Restricted Access'
    );
  }
}

function transformToArr(snapVal) {
  return snapVal ? Object.keys(snapVal) : [];
}

async function getUserTokens(uid) {
  const userTokenSnap = await database
    .ref('/fcm_tokens')
    .orderByValue()
    .equalTo(uid)
    .once('value');

  if (!userTokenSnap.hasChildren()) {
    return [];
  }

  return Object.keys(userTokenSnap.val());
}
