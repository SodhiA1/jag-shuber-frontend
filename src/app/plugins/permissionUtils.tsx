// TODO: Doc this!
export const buildPluginPermissions = (getPluginPermissions: Function | undefined) => {
    let grantAll = false;
    const permissions = (getPluginPermissions)
        ? getPluginPermissions() || []
        : [];

    grantAll = permissions === true;

    return { grantAll, permissions };
};

export const userCan = (permissions: boolean | string[] = [], permissionName: string): boolean => {
    return (typeof permissions === 'boolean')
        ? permissions : permissions instanceof Array
        ? permissions.indexOf(permissionName) > -1 : false;
}