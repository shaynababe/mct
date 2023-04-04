/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

export default class UserProvider {
    /**
     * @returns {Promise<User>} A promise that resolves with the currently logged in user
     */
    getCurrentUser() {}
    /**
     * @returns {Boolean} true if a user is currently logged in, otherwise false
     */
    isLoggedIn() {}
    /**
    * @param {String} role
    * @returns {Promise<Boolean>} true if the current user has the given role
    */
    hasRole(role) {}
}
