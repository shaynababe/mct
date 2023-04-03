/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it 
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe */


(function () {

    var FIFTEEN_MINUTES = 15 * 60 * 1000;

    var handlers = {
        subscribe: onSubscribe,
        unsubscribe: onUnsubscribe,
        request: onRequest
    };

    var subscriptions = {};

    function workSubscriptions(timestamp) {
        var now = Date.now();
        var nextWork = Math.min.apply(Math, Object.values(subscriptions).map(function (subscription) {
            return subscription(now);
        }));
        var wait = nextWork - now;
        if (wait < 0) {
            wait = 0;
        }

        if (Number.isFinite(wait)) {
            setTimeout(workSubscriptions, wait);
        }
    }

    function onSubscribe(message) {
        var data = message.data;

        // Keep
        var start = Date.now();
        var step = 1000 / data.dataRateInHz;
        var nextStep = start - (start % step) + step;
        let work;
        if (data.spectra) {
            work = function (now) {
                while (nextStep < now) {
                    const messageCopy = Object.create(message);
                    message.data.start = nextStep - (60 * 1000);
                    message.data.end = nextStep;
                    onRequest(messageCopy);
                    nextStep += step;
                }

                return nextStep;
            };
        } else {
            work = function (now) {
                while (nextStep < now) {
                    self.postMessage({
                        id: message.id,
                        data: {
                            name: data.name,
                            utc: nextStep,
                            yesterday: nextStep - 60 * 60 * 24 * 1000,
                            sin: sin(nextStep, data.period, data.amplitude, data.offset, data.phase, data.randomness, data.infinityValues),
                            wavelengths: wavelengths(),
                            intensities: intensities(),
                            cos: cos(nextStep, data.period, data.amplitude, data.offset, data.phase, data.randomness, data.infinityValues)
                        }
                    });
                    nextStep += step;
                }

                return nextStep;
            };
        }

        subscriptions[message.id] = work;
        workSubscriptions();
    }

    function onUnsubscribe(message) {
        delete subscriptions[message.data.id];
    }

    function onRequest(message) {
        var request = message.data;
        if (request.end === undefined) {
            request.end = Date.now();
        }

        if (request.start === undefined) {
            request.start = request.end - FIFTEEN_MINUTES;
        }

        var now = Date.now();
        var start = request.start;
        var end = request.end > now ? now : request.end;
        var amplitude = request.amplitude;
        var period = request.period;
        var offset = request.offset;
        var dataRateInHz = request.dataRateInHz;
        var phase = request.phase;
        var randomness = request.randomness;
        var loadDelay = Math.max(request.loadDelay, 0);
        var infinityValues = request.infinityValues;

        var step = 1000 / dataRateInHz;
        var nextStep = start - (start % step) + step;

        var data = [];

        for (; nextStep < end && data.length < 5000; nextStep += step) {
            data.push({
                utc: nextStep,
                yesterday: nextStep - 60 * 60 * 24 * 1000,
                sin: sin(nextStep, period, amplitude, offset, phase, randomness, infinityValues),
                wavelengths: wavelengths(),
                intensities: intensities(),
                cos: cos(nextStep, period, amplitude, offset, phase, randomness, infinityValues)
            });
        }

        if (loadDelay === 0) {
            postOnRequest(message, request, data);
        } else {
            setTimeout(() => postOnRequest(message, request, data), loadDelay);
        }
    }

    function postOnRequest(message, request, data) {
        self.postMessage({
            id: message.id,
            data: request.spectra ? {
                wavelength: data.map((item) => {
                    return item.wavelength;
                }),
                cos: data.map((item) => {
                    return item.cos;
                })
            } : data
        });
    }

    function cos(timestamp, period, amplitude, offset, phase, randomness, infinityValues) {
        if (infinityValues && Math.random() > 0.5) {
            return Number.POSITIVE_INFINITY;
        }

        return amplitude
            * Math.cos(phase + (timestamp / period / 1000 * Math.PI * 2)) + (amplitude * Math.random() * randomness) + offset;
    }

    function sin(timestamp, period, amplitude, offset, phase, randomness, infinityValues) {
        if (infinityValues && Math.random() > 0.5) {
            return Number.POSITIVE_INFINITY;
        }

        return amplitude
            * Math.sin(phase + (timestamp / period / 1000 * Math.PI * 2)) + (amplitude * Math.random() * randomness) + offset;
    }

    function wavelengths() {
        let values = [];
        while (values.length < 5) {
            const randomValue = Math.random() * 100;
            if (!values.includes(randomValue)) {
                values.push(String(randomValue));
            }
        }

        return values;
    }

    function intensities() {
        let values = [];
        while (values.length < 5) {
            const randomValue = Math.random() * 10;
            if (!values.includes(randomValue)) {
                values.push(String(randomValue));
            }
        }

        return values;
    }

    function sendError(error, message) {
        self.postMessage({
            error: error.name + ': ' + error.message,
            message: message,
            id: message.id
        });
    }

    self.onmessage = function handleMessage(event) {
        var message = event.data;
        var handler = handlers[message.request];

        if (!handler) {
            sendError(new Error('unknown message type'), message);
        } else {
            try {
                handler(message);
            } catch (e) {
                sendError(e, message);
            }
        }
    };

}());
