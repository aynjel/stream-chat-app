/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";
import {onRequest} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require("cors")({origin: true});

// eslint-disable-next-line @typescript-eslint/no-var-requires
const StreamChat = require("stream-chat").StreamChat;

const serverStreamClient = StreamChat.getInstance(
  functions.config().stream.key,
  functions.config().stream.secret
);

admin.initializeApp();

export const createStreamUser = onRequest(async (req, res) => {
  cors(req, res, async () => {
    try {
      const user = req.body;
      if (!user) {
        // eslint-disable-next-line max-len
        throw new functions.https.HttpsError("failed-precondition", "The function must be called while authenticated.");
      }
      const {uid} = user;
      const token = await serverStreamClient.createToken(uid);
      await serverStreamClient.updateUser(user);
      res.status(200).send({token});
    } catch (err) {
      logger.error(err);
      res.status(500).send(err);
    }
  });
});

export const createStreamToken = onRequest((request, response) => {
  cors(request, response, async () => {
    const {user} = request.body;
    if (!user) {
      // eslint-disable-next-line max-len
      throw new functions.https.HttpsError("failed-precondition", "The function must be called " +
      "while authenticated.");
    }
    try {
      const token = await serverStreamClient.createToken(user.uid);
      response.status(200).send({token});
    } catch (err) {
      // eslint-disable-next-line max-len
      throw new functions.https.HttpsError("aborted", "Could not get Stream user");
    }
  });
});

export const revokeStreamUserToken = onRequest((request, response) => {
  cors(request, response, async () => {
    const {user} = request.body;
    if (!user) {
      // eslint-disable-next-line max-len
      throw new functions.https.HttpsError("failed-precondition", "The function must be called " +
      "while authenticated.");
    }
    try {
      await serverStreamClient.revokeUserToken(user.uid);
      response.status(200).send({});
    } catch (err) {
      // eslint-disable-next-line max-len
      throw new functions.https.HttpsError("aborted", "Could not get Stream user");
    }
  });
});
