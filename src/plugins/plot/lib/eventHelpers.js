/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */

/*jscs:disable disallowDanglingUnderscores */

const helperFunctions = {
    listenTo: function (object, event, callback, context) {
        if (!this._listeningTo) {
            this._listeningTo = [];
        }

        const listener = {
            object: object,
            event: event,
            callback: callback,
            context: context,
            _cb: context ? callback.bind(context) : callback
        };
        if (object.addEventListener) {
            object.addEventListener(event, listener._cb);
        } else {
            object.on(event, listener._cb);
        }

        this._listeningTo.push(listener);
    },

    stopListening: function (object, event, callback, context) {
        if (!this._listeningTo) {
            this._listeningTo = [];
        }

        this._listeningTo.filter(function (listener) {
            if (object && object !== listener.object) {
                return false;
            }

            if (event && event !== listener.event) {
                return false;
            }

            if (callback && callback !== listener.callback) {
                return false;
            }

            if (context && context !== listener.context) {
                return false;
            }

            return true;
        })
            .map(function (listener) {
                if (listener.unlisten) {
                    listener.unlisten();
                } else if (listener.object.removeEventListener) {
                    listener.object.removeEventListener(listener.event, listener._cb);
                } else {
                    listener.object.off(listener.event, listener._cb);
                }

                return listener;
            })
            .forEach(function (listener) {
                this._listeningTo.splice(this._listeningTo.indexOf(listener), 1);
            }, this);
    },

    extend: function (object) {
        object.listenTo = helperFunctions.listenTo;
        object.stopListening = helperFunctions.stopListening;
    }
};

export default helperFunctions;

/**
@typedef {{
    listenTo: (object: any, event: any, callback: any, context: any) => void
    stopListening: (object: any, event: any, callback: any, context: any) => void
}} EventHelpers
*/
