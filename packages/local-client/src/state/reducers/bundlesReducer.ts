import { ActionType } from '../action-types';
import { Action } from '../actions';

interface BundlesState {
    [key: string]: {
        loading: boolean;
        code: string;
        err: string;
    } | undefined;
}

const initialState: BundlesState = {};

const reducer = (state: BundlesState = initialState, action: Action): BundlesState => {
    switch (action.type) {
        case ActionType.BUNDLE_START: {
            const { cellId } = action.payload;
            return {
                ...state,
                [cellId]: {
                    loading: true,
                    code: '',
                    err: '',
                }
            };
        }
        case ActionType.BUNDLE_COMPLETE: {
            const { cellId, bundle } = action.payload;
            return {
                ...state,
                [cellId]: {
                    loading: false,
                    code: bundle.code,
                    err: bundle.err,
                }
            };
        }
        default: {
            return state;
        }
    }
};

export default reducer;