/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

define([], function () {
    function DOMObserver(element) {
        this.element = element;
        this.observers = [];
    }

    DOMObserver.prototype.when = function (latchFunction) {
        return new Promise(function (resolve, reject) {
            //Test latch function at least once
            if (latchFunction()) {
                resolve();
            } else {
                //Latch condition not true yet, create observer on DOM and test again on change.
                const config = {
                    attributes: true,
                    childList: true,
                    subtree: true
                };
                const observer = new MutationObserver(function () {
                    if (latchFunction()) {
                        resolve();
                    }
                });
                observer.observe(this.element, config);
                this.observers.push(observer);
            }
        }.bind(this));
    };

    DOMObserver.prototype.destroy = function () {
        this.observers.forEach(function (observer) {
            observer.disconnect();
        }.bind(this));
    };

    return DOMObserver;
});
