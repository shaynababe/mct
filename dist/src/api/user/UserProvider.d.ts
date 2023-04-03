export default class UserProvider {
    /**
     * @returns {Promise<User>} A promise that resolves with the currently logged in user
     */
    getCurrentUser(): Promise<User>;
    /**
     * @returns {Boolean} true if a user is currently logged in, otherwise false
     */
    isLoggedIn(): boolean;
    /**
    * @param {String} role
    * @returns {Promise<Boolean>} true if the current user has the given role
    */
    hasRole(role: string): Promise<boolean>;
}
//# sourceMappingURL=UserProvider.d.ts.map