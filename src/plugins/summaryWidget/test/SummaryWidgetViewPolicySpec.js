/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([
    '../SummaryWidgetViewPolicy'
], function (
    SummaryWidgetViewPolicy
) {

    describe('SummaryWidgetViewPolicy', function () {
        let policy;
        let domainObject;
        let view;
        beforeEach(function () {
            policy = new SummaryWidgetViewPolicy();
            domainObject = jasmine.createSpyObj('domainObject', [
                'getModel'
            ]);
            domainObject.getModel.and.returnValue({});
            view = {};
        });

        it('returns true for other object types', function () {
            domainObject.getModel.and.returnValue({
                type: 'random'
            });
            expect(policy.allow(view, domainObject)).toBe(true);
        });

        it('allows summary widget view for summary widgets', function () {
            domainObject.getModel.and.returnValue({
                type: 'summary-widget'
            });
            view.key = 'summary-widget-viewer';
            expect(policy.allow(view, domainObject)).toBe(true);
        });

        it('disallows other views for summary widgets', function () {
            domainObject.getModel.and.returnValue({
                type: 'summary-widget'
            });
            view.key = 'other view';
            expect(policy.allow(view, domainObject)).toBe(false);
        });

    });
});
