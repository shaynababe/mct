/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

import { checkIfOld } from "./time";

describe('time related utils', () => {
    let subscription;
    let mockListener;

    beforeEach(() => {
        mockListener = jasmine.createSpy('listener');
        subscription = checkIfOld(mockListener, 100);
    });

    describe('check if old', () => {
        it('should call listeners when old', (done) => {
            setTimeout(() => {
                expect(mockListener).toHaveBeenCalled();
                done();
            }, 200);
        });

        it('should update the subscription', (done) => {
            function updated() {
                setTimeout(() => {
                    expect(mockListener).not.toHaveBeenCalled();
                    done();
                }, 50);
            }

            setTimeout(() => {
                subscription.update();
                updated();
            }, 50);
        });

        it('should clear the subscription', (done) => {
            subscription.clear();

            setTimeout(() => {
                expect(mockListener).not.toHaveBeenCalled();
                done();
            }, 200);
        });
    });

});
