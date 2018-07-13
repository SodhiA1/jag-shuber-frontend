import * as courtroomRequests from './requests/courtrooms';
import * as runRequests from './requests/runs';
import * as jailRoleRequests from './requests/jailRoles';
import * as sheriffRankRequests from './requests/sheriffRankCodes';
import * as courtRoleRequests from './requests/courtRoles';
import NestedReducer from '../../infrastructure/NestedReducer';
import { ReducersMapObject } from 'redux';
import { STATE_KEY } from './common';
import { addReducerToMap } from '../../infrastructure/reduxUtils';

export {
    CourthouseModuleState,
    STATE_KEY
} from './common';

const nestedReducer = new NestedReducer ([
    // Courtrooms
    courtroomRequests.courtroomMapRequest.reducer,  

    // Runs
    runRequests.runMapRequest.reducer,

    // Jail Roles
    jailRoleRequests.jailRoleMapRequest.reducer,

    // Sheriff Rank
    sheriffRankRequests.sheriffRankCodeMapRequest.reducer,

    // Court Roles
    courtRoleRequests.courtRoleMapRequest.reducer
]);

const reducer = nestedReducer.reducer;
export default reducer;

export function registerReducer(reducersMap: ReducersMapObject) {
  return addReducerToMap(reducersMap, STATE_KEY, reducer);
}