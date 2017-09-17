// @flow
import { Map } from 'immutable';
import { createReducer } from 'src/utils/actions';
import * as actions from './actions';

type State = {};

const defaultState: State = Map({});

export default createReducer(defaultState, {
  [actions.{{ name }}Action](state) {},
});
