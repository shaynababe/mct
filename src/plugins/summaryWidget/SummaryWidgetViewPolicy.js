/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([

], function (

) {

    /**
     * Policy determining which views can apply to summary widget.  Disables
     * any view other than normal summary widget view.
     */
    function SummaryWidgetViewPolicy() {
    }

    SummaryWidgetViewPolicy.prototype.allow = function (view, domainObject) {
        if (domainObject.getModel().type === 'summary-widget') {
            return view.key === 'summary-widget-viewer';
        }

        return true;

    };

    return SummaryWidgetViewPolicy;
});
