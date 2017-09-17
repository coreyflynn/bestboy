// @flow
import { Map } from 'immutable';
import { handleActions } from 'src/utils/actions';
import * as actions from './actions';

type State = {};

const defaultState: State = Map({});

export default handleActions(defaultState, {
  [actions.{{ name }}Action](state) {},
});
