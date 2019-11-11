import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import { useStateValue } from '../state';
import { actions } from '../state/customer/customerActions';

export default function SettingsScreen() {
    const [{ auth, customers }, dispatch] = useStateValue();

    return (
        <ScrollView style={{ flex: 1 }}>
            <Text>What's going to happen?</Text>
            <TouchableOpacity
                onPress={() =>
                    actions.getAllCustomers(
                        dispatch,
                        auth.currentUser.accountId
                    )
                }
            >
                <Text>Get All Customers</Text>
            </TouchableOpacity>
            {customers.customers && customers.customers.length > 0
                ? customers.customers.map(customer => {
                      return <Text>{customer.name}</Text>;
                  })
                : null}
        </ScrollView>
    );
}

SettingsScreen.navigationOptions = {
    title: 'app.json',
};
