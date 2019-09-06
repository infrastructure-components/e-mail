import * as React from 'react';

import {
    callService,
    Middleware,
    mutate,
    Service,
    serviceWithDataLayer
} from "infrastructure-components";

import { SUBSCRIPTION_ENTRY_ID, SUBSCRIPTION_STATE, ISubscriptionEntry } from './subscription-entry';
import { getIpHash, encrypt } from '../libs/identification';
import { datestring } from '../libs/dates';

const SUBSCRIPTION_SERVICE_ID = "subscription";

export async function callSubscriptionService (email: string, onData: (data: any) => void, onError: (data: any) => void) {

    await callService(
        SUBSCRIPTION_SERVICE_ID,
        {
            email: email,
        },
        (data: any) => {
            //console.log("received data: ", data);
            onData(data);
        },
        (error) => {
            //console.log("error: " , error)
            onError(error);
        }
    );

};

export default function SubscribeService () {

    return <Service
        id={ SUBSCRIPTION_SERVICE_ID }
        path="/subscribe"
        method="POST">

        <Middleware
            callback={serviceWithDataLayer(async function (dataLayer, req, res, next) {

                const { email } = JSON.parse(req.body);

                await mutate(
                    dataLayer.client,
                    dataLayer.setEntryMutation(SUBSCRIPTION_ENTRY_ID, {
                        email: encrypt(email),
                        subscriptionstate: SUBSCRIPTION_STATE.ACTIVE,
                        subscriptiondate: datestring(new Date()),
                        emailidentity: getIpHash(req),

                    })
                );

                res.status(200).set({
                    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
                }).send("ok");

            })}/>

    </Service>
};