import React from 'react';
import "@babel/polyfill";
import {
    DataLayer,
    Environment,
    WebApp,
    IsomorphicApp
} from "infrastructure-components";

import EmailFormRoute from './email/email-form-route';

export default (
    <IsomorphicApp
        stackName = "e-mail-subscription"
        buildPath = 'build'
        assetsPath = 'assets'
        region='eu-west-1'>

        <Environment name="dev" />

        <DataLayer id="datalayer">
            <WebApp
                id="main"
                path="*"
                method="GET">

                <EmailFormRoute/>

            </WebApp>
        </DataLayer>

    </IsomorphicApp>
);