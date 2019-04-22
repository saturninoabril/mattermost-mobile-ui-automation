// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

const wd = require('wd');
const path = require('path');
const test = require('tape');

const localServerConfig = {host: 'localhost', port: 4723};

const str = '../../Mattermost.apk';
const localCapabilities = {
    platformName: 'Android',
    platformVersion: '8.1.0',
    deviceName: 'Android Emulator',
    autoGrantPermissions: true,
    app: path.resolve(__dirname, str),
    automationName: 'UiAutomator2',
    appActivity: '.MainActivity',
    appWaitActivity: 'com.reactnativenavigation.controllers.NavigationActivity',
};

let driver;

test('Setup and open Android app', (t) => {
    var serverConfig = localServerConfig;
    var capabilities = localCapabilities;

    driver = wd.promiseChainRemote(serverConfig);
    driver.init(capabilities).setImplicitWaitTimeout(1000).then(() => {
        t.end();
    });
});

test('...', (t) => {
    require('../../src/android/smoke.js')(driver, t);
    t.end();
});

test('Teardown', (t) => {
    driver.quit().then(() => {
        t.end();
    });
});
