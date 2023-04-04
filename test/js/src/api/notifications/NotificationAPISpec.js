/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


import NotificationAPI from './NotificationAPI';

describe('The Notifiation API', () => {
    let notificationAPIInstance;
    let defaultTimeout = 4000;

    beforeAll(() => {
        notificationAPIInstance = new NotificationAPI();
    });

    describe('the info method', () => {
        let message = 'Example Notification Message';
        let severity = 'info';
        let notificationModel;

        beforeAll(() => {
            notificationModel = notificationAPIInstance.info(message).model;
        });

        afterAll(() => {
            notificationAPIInstance.dismissAllNotifications();
        });

        it('shows a string message with info severity', () => {
            expect(notificationModel.message).toEqual(message);
            expect(notificationModel.severity).toEqual(severity);
        });

        it('auto dismisses the notification after a brief timeout', (done) => {
            window.setTimeout(() => {
                expect(notificationAPIInstance.notifications.length).toEqual(0);
                done();
            }, defaultTimeout);
        });
    });

    describe('the alert method', () => {
        let message = 'Example alert message';
        let severity = 'alert';
        let notificationModel;

        beforeAll(() => {
            notificationModel = notificationAPIInstance.alert(message).model;
        });

        afterAll(() => {
            notificationAPIInstance.dismissAllNotifications();
        });

        it('shows a string message, with alert severity', () => {
            expect(notificationModel.message).toEqual(message);
            expect(notificationModel.severity).toEqual(severity);
        });

        it('does not auto dismiss the notification', (done) => {
            window.setTimeout(() => {
                expect(notificationAPIInstance.notifications.length).toEqual(1);
                done();
            }, defaultTimeout);
        });
    });

    describe('the error method', () => {
        let message = 'Example error message';
        let severity = 'error';
        let notificationModel;

        beforeAll(() => {
            notificationModel = notificationAPIInstance.error(message).model;
        });

        afterAll(() => {
            notificationAPIInstance.dismissAllNotifications();
        });

        it('shows a string message, with severity error', () => {
            expect(notificationModel.message).toEqual(message);
            expect(notificationModel.severity).toEqual(severity);
        });

        it('does not auto dismiss the notification', (done) => {
            window.setTimeout(() => {
                expect(notificationAPIInstance.notifications.length).toEqual(1);
                done();
            }, defaultTimeout);
        });
    });

    describe('the error method notificiation', () => {
        let message = 'Minimized error message';

        afterAll(() => {
            notificationAPIInstance.dismissAllNotifications();
        });

        it('is not shown if configured to show minimized', (done) => {
            notificationAPIInstance.activeNotification = undefined;
            notificationAPIInstance.error(message, { minimized: true });
            window.setTimeout(() => {
                expect(notificationAPIInstance.notifications.length).toEqual(1);
                expect(notificationAPIInstance.activeNotification).toEqual(undefined);
                done();
            }, defaultTimeout);
        });
    });

    describe('the progress method', () => {
        let title = 'This is a progress notification';
        let message1 = 'Example progress message 1';
        let message2 = 'Example progress message 2';
        let percentage1 = 50;
        let percentage2 = 99.9;
        let severity = 'info';
        let notification;
        let updatedPercentage;
        let updatedMessage;

        beforeAll(() => {
            notification = notificationAPIInstance.progress(title, percentage1, message1);
            notification.on('progress', (percentage, text) => {
                updatedPercentage = percentage;
                updatedMessage = text;
            });
        });

        afterAll(() => {
            notificationAPIInstance.dismissAllNotifications();
        });

        it ('shows a notification with a message, progress message, percentage and info severity', () => {
            expect(notification.model.message).toEqual(title);
            expect(notification.model.severity).toEqual(severity);
            expect(notification.model.progressText).toEqual(message1);
            expect(notification.model.progressPerc).toEqual(percentage1);
        });

        it ('allows dynamically updating the progress attributes', () => {
            notification.progress(percentage2, message2);

            expect(updatedPercentage).toEqual(percentage2);
            expect(updatedMessage).toEqual(message2);
        });

        it ('allows dynamically dismissing of progress notification', () => {
            notification.dismiss();

            expect(notificationAPIInstance.notifications.length).toEqual(0);
        });
    });
});
