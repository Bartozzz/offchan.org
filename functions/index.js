const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const firestore = admin.firestore();
const countersCollection = firestore.collection("counters");
const boardThreadsCounterDoc = countersCollection.doc("threads");

firestore.settings({
  timestampsInSnapshots: true
});

exports.incrementBoardThreadsCounter = functions.firestore
  .document("threads/{threadId}")
  .onCreate((snap, context) => {
    const value = snap.data();
    const board = value.board;

    return boardThreadsCounterDoc.get().then(document => {
      if (document.exists) {
        const previous = document.data();
        const selected = previous[board] || 0;

        return boardThreadsCounterDoc.set(
          Object.assign({}, previous, {
            [board]: selected + 1
          })
        );
      } else {
        return boardThreadsCounterDoc.set({
          [board]: 1
        });
      }
    });
  });
