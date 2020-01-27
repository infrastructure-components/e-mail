import React, { useState } from 'react';
import "@babel/polyfill";
import { callService, Environment, Middleware, Route, Service,  ServiceOrientedApp } from "infrastructure-components";

const SUBSCRIPTION_SERVICE_ID = "subscription";
const SENDER_EMAIL = "mail@react-architect.com";

function InputForm (props) {
    const [email, setEmail] = useState("");
    const [sending, setSending] = useState(false);

    return <div>
        <input
            value={email}
            type="text"
            placeholder='Please enter your e-mail address'
            onChange={event => setEmail(event.target.value)}
        />
        <button
            disabled={ sending || !(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email)) }
            onClick={()=>{
                callService(
                    SUBSCRIPTION_SERVICE_ID,
                    { emailAddress: email,},
                    data => setSending(false),
                    error => setSending(false)
                );
                setSending(true);
            }}
        >{ sending ? "Sending..." : "Send" }</button>
    </div>
};

export default (
    <ServiceOrientedApp
        stackName = "e-mail"
        buildPath = 'build'
        assetsPath = 'assets'
        region='eu-west-1'
        iamRoleStatements={[{
            "Effect": "Allow",
            "Action": [ '"ses:SendEmail"', '"ses:SendRawEmail"' ],
            "Resource": `"arn:aws:ses:eu-west-1:xxxxxxxxxxxx:identity/${SENDER_EMAIL}"`,
        }]}>

        <Route
            path='/'
            name='E-Mail Form'
            render={()=><InputForm />}
        />
        <Service
            id={ SUBSCRIPTION_SERVICE_ID }
            path="/subscribe"
            method="POST">

            <Middleware
                callback={async function (req, res) {
                    const { emailAddress } = JSON.parse(req.body);

                    await new Promise(function(resolve, reject) {
                        const AWS = require('aws-sdk');
                        new AWS.SES({apiVersion: '2010-12-01'}).sendEmail({
                            Destination: {
                                BccAddresses: [],
                                CcAddresses: [],
                                ToAddresses: [ emailAddress ]
                            },
                            Message: {
                                Body: {
                                    Html: {
                                        Charset: "UTF-8",
                                        Data: `Hello ${emailAddress}!`
                                    },
                                    Text: {
                                        Charset: "UTF-8",
                                        Data: `Hello ${emailAddress}!`
                                    }
                                },
                                Subject: {
                                    Charset: 'UTF-8',
                                    Data: `Hello ${emailAddress}!`
                                }
                            },
                            Source: SENDER_EMAIL,
                            ReplyToAddresses: [ SENDER_EMAIL ],
                        }).promise().then(data => {
                            res.status(200).set({"Access-Control-Allow-Origin" : "*",}).send("ok");
                            resolve();
                        }).catch(err => {
                            console.error(err, err.stack);
                            res.status(500).set({"Access-Control-Allow-Origin" : "*",}).send("failed");
                            reject(err);
                        });
                    });
                }}/>
        </Service>
        <Environment name="dev" />
    </ServiceOrientedApp>
);