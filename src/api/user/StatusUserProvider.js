/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import UserProvider from "./UserProvider";

export default class StatusUserProvider extends UserProvider {
    /**
     * @param {('statusChange'|'pollQuestionChange')} event the name of the event to listen to
     * @param {Function} callback a function to invoke when this event occurs
     */
    on(event, callback) {}
    /**
     * @param {('statusChange'|'pollQuestionChange')} event the name of the event to stop listen to
     * @param {Function} callback the callback function used to register the listener
     */
    off(event, callback) {}
    /**
     * @returns {import("./StatusAPI").PollQuestion} the current status poll question
     */
    async getPollQuestion() {}
    /**
     * @param {import("./StatusAPI").PollQuestion} pollQuestion a new poll question to set
     * @returns {Promise<Boolean>} true if operation was successful, otherwise false
     */
    async setPollQuestion(pollQuestion) {}
    /**
     * @returns {Promise<Boolean>} true if the current user can set the poll question, otherwise false
     */
    async canSetPollQuestion() {}
    /**
     * @returns {Promise<Array<import("./StatusAPI").Status>>} a list of the possible statuses that an operator can be in
     */
    async getPossibleStatuses() {}
    /**
     * @param {import("./UserAPI").Role} role
     * @returns {Promise<import("./StatusAPI").Status}
     */
    async getStatusForRole(role) {}
    /**
     * @param {import("./UserAPI").Role} role
     * @returns {Promise<import("./StatusAPI").Status}
     */
    async getDefaultStatusForRole(role) {}
    /**
     * @param {import("./UserAPI").Role} role
     * @param {*} status
     * @returns {Promise<Boolean>} true if operation was successful, otherwise false.
     */
    async setStatusForRole(role, status) {}
    /**
     * @param {import("./UserAPI").Role} role
     * @returns {Promise<Boolean} true if the user provider can provide status for the given role
     */
    async canProvideStatusForRole(role) {}
    /**
     * @returns {Promise<Array<import("./UserAPI").Role>>} a list of all available status roles, if user permissions allow it.
     */
    async getAllStatusRoles() {}
    /**
     * @returns {Promise<import("./UserAPI").Role>} the active status role for the currently logged in user
     */
    async getStatusRoleForCurrentUser() {}
}
