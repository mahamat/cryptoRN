import uuid from 'uuid';
import { getPrice } from '../api/cryptonator';

const types = {
  ADD_COIN: '[Coin] Add Coin',
  EDIT_COIN: '[Coin] Edit Coin',
  REMOVE_COIN: '[Coin] Remove Coin',
  FETCH_DATA_PENDING: '[Coin] Fetch Data Pending',
  FETCH_DATA_SUCCESS: '[Coin] Fetch Data Success',
  FETCH_DATA_FAIL: '[Coin] Fetch Data Fail'
};

export const actionCreators = {
  fetchData: () => (dispatch, getState) => {

    if ((Date.now() - getState().holdings.timestamp) < 60000) return;

    dispatch({ type: types.FETCH_DATA_PENDING, timestamp: Date.now() });
    const { entities } = getState().holdings;
    const entitiesArray = Object.keys(entities).map(id => entities[id]);
    Promise.all(
      entitiesArray.map(async coin => {
        const { success, ticker, error } = await getPrice(
          coin.code + '-' + coin.currency
        );
        if (success) {
          return Promise.resolve({ ...coin, price: parseFloat(ticker.price) });
        }
        if (error) {
          return Promise.resolve(coin);
        }
      })
    )
      .then(results => {
        dispatch(actionCreators.fetchDataSuccess(results));
      })
      .catch(error => {
        dispatch(actionCreators.fetchDataFailure(error));
      });
  },
  fetchDataSuccess: coins => {
    return { type: types.FETCH_DATA_SUCCESS, payload: coins };
  },
  fetchDataFailure: error => {
    return { type: types.FETCH_DATA_FAIL, error };
  },
  addCoin: coin => {
    return { type: types.ADD_COIN, payload: { id: uuid.v4(), ...coin } };
  },
  editCoin: coin => {
    return { type: types.EDIT_COIN, payload: coin };
  },
  removeItem: coin => {
    return { type: types.REMOVE_COIN, payload: coin };
  }
};

const initialState = {
  isUpdating: false,
  timestamp: null,
  entities: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.EDIT_COIN:
    case types.ADD_COIN: {
      const entities = {
        ...state.entities,
        [payload.id]: payload
      };
      return {
        ...state,
        entities
      };
    }
    case types.REMOVE_COIN: {
      const { [payload.id]: removed, ...entities } = state.entities;
      return {
        ...state,
        entities
      };
    }
    case types.FETCH_DATA_PENDING: {
      return {
        ...state,
        isUpdating: true,
        timestamp: action.timestamp,
        error: null
      };
    }
    case types.FETCH_DATA_SUCCESS: {
      const coins = action.payload;
      const entities = coins.reduce(
        (entities, coin) => {
          return {
            ...entities,
            [coin.id]: coin
          };
        },
        { ...state.entities }
      );
      return {
        ...state,
        isUpdating: false,
        entities
      };
    }
    case types.FETCH_DATA_FAIL: {
      return {
        ...state,
        isUpdating: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
