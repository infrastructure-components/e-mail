import React from 'react';
import { Entry } from "infrastructure-components";
import { GraphQLString }  from 'graphql';

export const SUBSCRIPTION_ENTRY_ID = "subscription_entry";

export const SUBSCRIPTION_STATE = {
    ACTIVE: "ACTIVE",
    CONFIRMED: "CONFIRMED",
    CANCELLED: "CANCELLED"
};

export interface ISubscriptionEntry {
    emailidentity: string,
    email: string,
    subscriptionstate: string,
    subscriptiondate: string
}

export default function SubscriptionEntry (props)  {
    return <Entry
        id={ SUBSCRIPTION_ENTRY_ID }
        primaryKey="email"
        rangeKey="subscriptionstate"
        data={{
            subscriptiondate: GraphQLString,
            emailidentity: GraphQLString
        }}
    />

};