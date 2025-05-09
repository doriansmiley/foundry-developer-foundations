import { StateConfig } from "../reasoning";
import { uuidv4 } from ".";

export function getUniqueStateIds(inputArray: StateConfig[], parent?: StateConfig) {
    let statesArray = [...inputArray];
    // the presence of the | character means we've already deduplicated this states
    if (statesArray[0]?.id.indexOf('|') >= 0) {
        return statesArray;
    }
    // first rewrite all the state id values in the top level states
    statesArray = statesArray.map((state, index, original) => {
        switch (state.id) {
            // these states only hve one occurance in all machines
            case 'success':
            case 'failure':
            case 'pause':
                break;
            default:
                //generate unique ID for each state. Without steps that share the same function will collapse to a single one
                // if a parent is supplied append the parent ID so the send to evnt worls
               state.id =  `${state.id}|${uuidv4()}`;
               if (parent) {
                   state.parentId = parent.id;
               }
                break;
        }
        return state;
    });
    // next rewrite the id of transtions by slicing the states array from the current index and fidning the first occurance of that trasitions
    statesArray = statesArray.map((state, index) => {
        switch (state.id) {
            // these states only hve one occurance in all machines
            case 'success':
            case 'failure':
            case 'pause':
                break;
            default:
                // transition states must be ahead of the current state in the states array. 
                // so we slice the array to find all possible candidates
                const futureStates = statesArray.slice(index + 1);
                // rewrite the trasition IDs with the newly generated unique state ID values
                state.transitions = state.transitions?.map(stateTranistion => {
                    const targetState = futureStates.find(futureState => futureState.id.indexOf(stateTranistion.target) >= 0)
                    // set the trasition target to the new ID or default back to the original
                    stateTranistion.target = targetState ? targetState.id : stateTranistion.target;
                    return stateTranistion;
                });
                // defined for parrelell states
                if (state.onDone) {
                    const targetState = futureStates.find(futureState => futureState.id.indexOf(state.onDone!) >= 0)
                    // set the trasition target to the new ID or default back to the original
                    state.onDone = targetState ? targetState.id : state.onDone;
                }
                // defined for parrelell states
                if (state.states) {
                    getUniqueStateIds(state.states, state)
                }
                break;
        }
        return state;
    });
    
    return statesArray;
}