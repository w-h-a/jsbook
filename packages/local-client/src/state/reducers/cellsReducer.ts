import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {},
};

const reducer = (
  state: CellsState = initialState,
  action: Action
): CellsState => {
  switch (action.type) {
    case ActionType.SAVE_CELLS_ERROR: {
      const { error } = action.payload;

      return {
        ...state,
        error,
      };
    }
    case ActionType.FETCH_CELLS: {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case ActionType.FETCH_CELLS_SUCCESS: {
      const newOrder = action.payload.cells.map((cell) => cell.id);
      const newData = action.payload.cells.reduce((acc, cell) => {
        return { ...acc, [cell.id]: cell };
      }, {} as CellsState['data']);

      return {
        ...state,
        order: newOrder,
        data: newData,
      };
    }
    case ActionType.FETCH_CELLS_ERROR: {
      const { error } = action.payload;

      console.log(error);

      return {
        ...state,
        loading: false,
        error,
      };
    }
    case ActionType.UPDATE_CELL: {
      const { id, content } = action.payload;

      const newData = {
        ...state.data,
        [id]: {
          ...state.data[id],
          content,
        },
      };

      return {
        ...state,
        data: newData,
      };
    }
    case ActionType.DELETE_CELL: {
      const { id } = action.payload;

      const newOrder = state.order.filter((v) => v !== id);

      const newData = Object.keys(state.data).reduce(
        (acc, v) => (v !== id ? { ...acc, [v]: state.data[v] } : { ...acc }),
        {}
      );

      return {
        ...state,
        order: newOrder,
        data: newData,
      };
    }
    case ActionType.MOVE_CELL: {
      const { id, direction } = action.payload;
      const idx = state.order.indexOf(id);
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      const oldId = state.order.find((_, i) => i === targetIdx);

      if (targetIdx < 0 || targetIdx > state.order.length - 1) {
        return {
          ...state,
        };
      }

      let oldOrder = [...state.order];
      let newOrder: string[] = [];

      for (let i = 0; i < state.order.length; i++) {
        if (i === targetIdx) {
          newOrder = [...newOrder, id];
          continue;
        }
        if (i === idx) {
          newOrder = [...newOrder, oldId!];
          continue;
        }
        newOrder = [...newOrder, oldOrder[i]];
      }

      return {
        ...state,
        order: newOrder,
      };
    }
    case ActionType.INSERT_CELL_AFTER: {
      const { id, type } = action.payload;

      const cell: Cell = {
        content: '',
        type,
        id: randomId(),
      };

      let newOrder;
      if (id !== null) {
        const idx = state.order.indexOf(id);
        const firstHalf = state.order.slice(0, idx + 1);
        const secondHalf = state.order.slice(idx + 1);
        newOrder = [...firstHalf, cell.id, ...secondHalf];
      } else {
        newOrder = [cell.id, ...state.order];
      }

      const newData = {
        ...state.data,
        [cell.id]: cell,
      };

      return {
        ...state,
        order: newOrder,
        data: newData,
      };
    }
    default: {
      return state;
    }
  }
};

const randomId = () => {
  return Math.random().toString(36).slice(2, 5);
};

export default reducer;
