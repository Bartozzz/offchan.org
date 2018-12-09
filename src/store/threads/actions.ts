import { ActionTree } from "vuex";
import { ThreadPayload } from "@/api/firebase/document/thread";
import { threads } from "@/api/firebase";
import { Board } from "@/api/types";
import { State } from "@/store/getInitialState";

/**
 * Checks if there's a valid subscription listener for a board.
 *
 * @param state Current app state
 * @param board Board to check subscription for
 */
export const hasSubscribed = (state: State, board: Board) => {
  return typeof state.threads[board].unsubscribe === "function";
};

const actions: ActionTree<State, {}> = {
  /**
   * Subscribes to threads from a given board (if there's no subscribtion
   * already) and fetches threads in real-time.
   *
   * @param payload         Action payload
   * @param payload.board   Board to fetch threads from
   */
  fetchThreads({ commit, state }, payload: { board: Board }) {
    const { board } = payload;

    if (!hasSubscribed(state, board)) {
      console.debug(`[Vuex] Subscribing to threads from ${board}`);

      const unsubscribe = threads.fetch(board, threads => {
        console.debug(`[Vuex] New thread bulk from ${board}`);
        commit("setThreads", { board, threads });
      });

      commit("setThreadsUnsubscribe", { board, unsubscribe });
    } else {
      console.debug(`[Vuex] Already subscribed to threads from ${board}`);
    }
  },

  /**
   * Fetches threads for a board once (without subscription).
   *
   * @param payload         Action payload
   * @param payload.board   Board to fetch threads from
   */
  fetchThreadsOnce({ commit, state }, payload: { board: Board }) {
    const { board } = payload;
    const timeLabel = `[Vuex] Fetched threads from ${board}`;

    console.time(timeLabel);

    return threads.fetchOnce(board).then(threads => {
      console.timeEnd(timeLabel);
      commit("setThreads", { board, threads });
    });
  },

  /**
   * Creates a new thread with provided payload in a given board.
   *
   * @param payload         Action payload
   * @param payload.board   Board to create thread in
   * @param payload.<rest>  Thread payload
   */
  createThread({ commit, state }, payload: { board: Board } & ThreadPayload) {
    const { board, ...data } = payload;

    console.debug(`[Vuex] Creating new thread in ${board}`, data);
    threads.create(board, data);
  }
};

export default actions;
