'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const stateHistory = [];
  const cloneState = Object.assign({}, state);

  for (const action of actions) {
    if (action.type === 'addProperties') {
      for (const key in action.extraData) {
        cloneState[key] = action.extraData[key];
      }

      stateHistory.push({ ...cloneState });
    }

    if (action.type === 'removeProperties') {
      for (const keyRemove of action.keysToRemove) {
        delete cloneState[keyRemove];
      }

      stateHistory.push({ ...cloneState });
    }

    if (action.type === 'clear') {
      for (const keys in cloneState) {
        delete cloneState[keys];
      }

      stateHistory.push({ ...cloneState });
    }
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
