/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([],
    function () {
        // Set of connection states; changing among these states will be
        // reflected in the indicator's appearance.
        // CONNECTED: Everything nominal, expect to be able to read/write.
        // DISCONNECTED: HTTP failed; maybe misconfigured, disconnected.
        // PENDING: Still trying to connect, and haven't failed yet.
        const CONNECTED = {
            statusClass: "s-status-on"
        };
        const PENDING = {
            statusClass: "s-status-warning-lo"
        };
        const DISCONNECTED = {
            statusClass: "s-status-warning-hi"
        };
        function URLIndicator(options, simpleIndicator) {
            this.bindMethods();
            this.count = 0;

            this.indicator = simpleIndicator;
            this.setDefaultsFromOptions(options);
            this.setIndicatorToState(PENDING);

            this.fetchUrl();
            setInterval(this.fetchUrl, this.interval);
        }

        URLIndicator.prototype.setIndicatorToState = function (state) {
            switch (state) {
            case CONNECTED: {
                this.indicator.text(this.label + " is connected");
                this.indicator.description(this.label + " is online, checking status every " + this.interval + " milliseconds.");
                break;
            }

            case PENDING: {
                this.indicator.text("Checking status of " + this.label + " please stand by...");
                this.indicator.description("Checking status of " + this.label + " please stand by...");
                break;
            }

            case DISCONNECTED: {
                this.indicator.text(this.label + " is offline");
                this.indicator.description(this.label + " is offline, checking status every " + this.interval + " milliseconds");
                break;
            }
            }

            this.indicator.statusClass(state.statusClass);
        };

        URLIndicator.prototype.fetchUrl = function () {
            fetch(this.URLpath)
                .then(response => {
                    if (response.ok) {
                        this.handleSuccess();
                    } else {
                        this.handleError();
                    }
                })
                .catch(error => {
                    this.handleError();
                });
        };

        URLIndicator.prototype.handleError = function (e) {
            this.setIndicatorToState(DISCONNECTED);
        };

        URLIndicator.prototype.handleSuccess = function () {
            this.setIndicatorToState(CONNECTED);
        };

        URLIndicator.prototype.setDefaultsFromOptions = function (options) {
            this.URLpath = options.url;
            this.label = options.label || options.url;
            this.interval = options.interval || 10000;
            this.indicator.iconClass(options.iconClass || 'icon-chain-links');
        };

        URLIndicator.prototype.bindMethods = function () {
            this.fetchUrl = this.fetchUrl.bind(this);
            this.handleSuccess = this.handleSuccess.bind(this);
            this.handleError = this.handleError.bind(this);
            this.setIndicatorToState = this.setIndicatorToState.bind(this);
        };

        return URLIndicator;
    });
