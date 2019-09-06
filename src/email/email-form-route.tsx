import React from 'react';
import { Route } from "infrastructure-components";
import SubscriptionInput from './subscription-input';

export default function () {
    return <Route
        path='/'
        name='E-Mail Subscription Form'
        render={()=><SubscriptionInput />}
    />
};