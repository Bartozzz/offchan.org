import { BoardNames, Thread, State } from '../types';
import { MutationTree } from 'vuex';

export const threadMutations: MutationTree<State> = {
  setThreads(
	  state,
	  { board, threads }: { board: BoardNames, threads: Thread[] }
	) {
	  state.threads[board] = threads
  }
};
