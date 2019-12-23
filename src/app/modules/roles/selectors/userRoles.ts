import { createSelector } from 'reselect';
import * as userRoleRequests from '../requests/userRoles';
import mapToArray from '../../../infrastructure/mapToArray';
import { RootState } from '../../../store';

export const getUserRoles = createSelector(
    userRoleRequests.userRoleMapRequest.getData,
    (map) => {
        const result = mapToArray(map);
        return result;
    }
);

export const getAllUserRoles = (state: RootState) => {
    if (state) {
        return getUserRoles(state);
    }
    return undefined;
};