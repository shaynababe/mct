/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

import {
    createOpenMct,
    resetApplicationState
} from '../../utils/testing';

describe("The User Status API", () => {
    let openmct;
    let userProvider;
    let mockUser;

    beforeEach(() => {
        userProvider = jasmine.createSpyObj("userProvider", [
            "setPollQuestion",
            "getPollQuestion",
            "getCurrentUser",
            "getPossibleStatuses",
            "getAllStatusRoles",
            "canSetPollQuestion",
            "isLoggedIn",
            "on"
        ]);
        openmct = createOpenMct();
        mockUser = new openmct.user.User("test-user", "A test user");
        userProvider.getCurrentUser.and.returnValue(Promise.resolve(mockUser));
        userProvider.getPossibleStatuses.and.returnValue(Promise.resolve([]));
        userProvider.getAllStatusRoles.and.returnValue(Promise.resolve([]));
        userProvider.canSetPollQuestion.and.returnValue(Promise.resolve(false));
        userProvider.isLoggedIn.and.returnValue(true);
    });

    afterEach(() => {
        return resetApplicationState(openmct);
    });

    describe("the poll question", () => {
        it('can be set via a user status provider if supported', () => {
            openmct.user.setProvider(userProvider);
            userProvider.canSetPollQuestion.and.returnValue(Promise.resolve(true));

            return openmct.user.status.setPollQuestion('This is a poll question').then(() => {
                expect(userProvider.setPollQuestion).toHaveBeenCalledWith('This is a poll question');
            });
        });
        // fit('emits an event when the poll question changes', () => {
        //     const pollQuestionChangeCallback = jasmine.createSpy('pollQuestionChangeCallback');
        //     let pollQuestionListener;

        //     userProvider.canSetPollQuestion.and.returnValue(Promise.resolve(true));
        //     userProvider.on.and.callFake((eventName, listener) => {
        //         if (eventName === 'pollQuestionChange') {
        //             pollQuestionListener = listener;
        //         }
        //     });

        //     openmct.user.on('pollQuestionChange', pollQuestionChangeCallback);

        //     openmct.user.setProvider(userProvider);

        //     return openmct.user.status.setPollQuestion('This is a poll question').then(() => {
        //         expect(pollQuestionListener).toBeDefined();
        //         pollQuestionListener();
        //         expect(pollQuestionChangeCallback).toHaveBeenCalled();

        //         const pollQuestion = pollQuestionChangeCallback.calls.mostRecent().args[0];
        //         expect(pollQuestion.question).toBe('This is a poll question');

        //         openmct.user.off('pollQuestionChange', pollQuestionChangeCallback);
        //     });
        // });
        it('cannot be set if the user is not permitted', () => {
            openmct.user.setProvider(userProvider);
            userProvider.canSetPollQuestion.and.returnValue(Promise.resolve(false));

            return openmct.user.status.setPollQuestion('This is a poll question').catch((error) => {
                expect(error).toBeInstanceOf(Error);
            }).finally(() => {
                expect(userProvider.setPollQuestion).not.toHaveBeenCalled();
            });
        });
    });
});
