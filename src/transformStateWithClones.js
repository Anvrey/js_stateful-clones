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
    switch (action.type) {
      case 'addProperties':
        for (const key in action.extraData) {
          cloneState[key] = action.extraData[key];
        }
        break;

      case 'removeProperties':
        for (const keyRemove of action.keysToRemove) {
          delete cloneState[keyRemove];
        }
        break;

      case 'clear':
        for (const keys in cloneState) {
          delete cloneState[keys];
        }
        break;
      default:
        break;
    }
    stateHistory.push({ ...cloneState });
  }

  return stateHistory;
}

module.exports = transformStateWithClones;
