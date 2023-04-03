/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


define([

], function (

) {

    var PURPLE = {
            sin: 2.2,
            cos: 2.2
        },
        RED = {
            sin: 0.9,
            cos: 0.9
        },
        ORANGE = {
            sin: 0.7,
            cos: 0.7
        },
        YELLOW = {
            sin: 0.5,
            cos: 0.5
        },
        CYAN = {
            sin: 0.45,
            cos: 0.45
        },
        LIMITS = {
            rh: {
                cssClass: "is-limit--upr is-limit--red",
                low: RED,
                high: Number.POSITIVE_INFINITY,
                name: "Red High"
            },
            rl: {
                cssClass: "is-limit--lwr is-limit--red",
                high: -RED,
                low: Number.NEGATIVE_INFINITY,
                name: "Red Low"
            },
            yh: {
                cssClass: "is-limit--upr is-limit--yellow",
                low: YELLOW,
                high: RED,
                name: "Yellow High"
            },
            yl: {
                cssClass: "is-limit--lwr is-limit--yellow",
                low: -RED,
                high: -YELLOW,
                name: "Yellow Low"
            }
        };

    function SinewaveLimitProvider() {

    }

    SinewaveLimitProvider.prototype.supportsLimits = function (domainObject) {
        return domainObject.type === 'generator';
    };

    SinewaveLimitProvider.prototype.getLimitEvaluator = function (domainObject) {
        return {
            evaluate: function (datum, valueMetadata) {
                var range = valueMetadata && valueMetadata.key;

                if (datum[range] > RED[range]) {
                    return LIMITS.rh;
                }

                if (datum[range] < -RED[range]) {
                    return LIMITS.rl;
                }

                if (datum[range] > YELLOW[range]) {
                    return LIMITS.yh;
                }

                if (datum[range] < -YELLOW[range]) {
                    return LIMITS.yl;
                }
            }
        };
    };

    SinewaveLimitProvider.prototype.getLimits = function (domainObject) {

        return {
            limits: function () {
                return Promise.resolve({
                    WATCH: {
                        low: {
                            color: "cyan",
                            sin: -CYAN.sin,
                            cos: -CYAN.cos
                        },
                        high: {
                            color: "cyan",
                            ...CYAN
                        }
                    },
                    WARNING: {
                        low: {
                            color: "yellow",
                            sin: -YELLOW.sin,
                            cos: -YELLOW.cos
                        },
                        high: {
                            color: "yellow",
                            ...YELLOW
                        }
                    },
                    DISTRESS: {
                        low: {
                            color: "orange",
                            sin: -ORANGE.sin,
                            cos: -ORANGE.cos
                        },
                        high: {
                            color: "orange",
                            ...ORANGE
                        }
                    },
                    CRITICAL: {
                        low: {
                            color: "red",
                            sin: -RED.sin,
                            cos: -RED.cos
                        },
                        high: {
                            color: "red",
                            ...RED
                        }
                    },
                    SEVERE: {
                        low: {
                            color: "purple",
                            sin: -PURPLE.sin,
                            cos: -PURPLE.cos
                        },
                        high: {
                            color: "purple",
                            ...PURPLE
                        }
                    }
                });
            }
        };
    };

    return SinewaveLimitProvider;
});
