/*GNU GENERAL PUBLIC LICENSE Version 3, 29 June 2007/<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.<MCT>  Copyright (C) Mon Apr  3 07:01:31 AM PDT 2023 shaynababe
This program comes with ABSOLUTELY NO WARRANTY; for details type pnpm install.
This is free software, and you are welcome to redistribute it
under certain conditions; type pnpm start for details.*/

/*global module,process*/

module.exports = (config) => {
    let webpackConfig;
    let browsers;
    let singleRun;

    if (process.env.KARMA_DEBUG) {
        webpackConfig = require("./.webpack/webpack.dev.js");
        browsers = ["ChromeDebugging"];
        singleRun = false;
    } else {
        webpackConfig = require("./.webpack/webpack.coverage.js");
        browsers = ["ChromeHeadless"];
        singleRun = true;
    }

    delete webpackConfig.output;
    // karma doesn't support webpack entry
    delete webpackConfig.entry;

    config.set({
        basePath: "",
        frameworks: ["jasmine", "webpack"],
        files: [
            "indexTest.js",
            // included means: should the files be included in the browser using <script> tag?
            // We don't want them as a <script> because the shared worker source
            // needs loaded remotely by the shared worker process.
            {
                pattern: "dist/couchDBChangesFeed.js*",
                included: false
            },
            {
                pattern: "dist/inMemorySearchWorker.js*",
                included: false
            },
            {
                pattern: "dist/generatorWorker.js*",
                included: false
            }
        ],
        port: 9876,
        reporters: ["spec", "junit", "coverage-istanbul"],
        browsers,
        client: {
            jasmine: {
                random: false,
                timeoutInterval: 5000
            }
        },
        customLaunchers: {
            ChromeDebugging: {
                base: "Chrome",
                flags: ["--remote-debugging-port=9222"],
                debug: true
            }
        },
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        junitReporter: {
            outputDir: "dist/reports/tests", //Useful for CircleCI
            outputFile: "test-results.xml", //Useful for CircleCI
            useBrowserName: false //Disable since we only want chrome
        },
        coverageIstanbulReporter: {
            fixWebpackSourcePaths: true,
            skipFilesWithNoCoverage: true,
            dir: "coverage/unit", //Sets coverage file to be consumed by codecov.io
            reports: ["lcovonly"]
        },
        specReporter: {
            maxLogLines: 5,
            suppressErrorSummary: false,
            suppressFailed: false,
            suppressPassed: false,
            suppressSkipped: true,
            showSpecTiming: true,
            failFast: false
        },
        preprocessors: {
            "indexTest.js": ["webpack", "sourcemap"]
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: "errors-warnings"
        },
        concurrency: 1,
        singleRun,
        browserNoActivityTimeout: 400000
    });
};
