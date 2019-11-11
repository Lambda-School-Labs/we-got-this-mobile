import * as WebBrowser from 'expo-web-browser';
import React, { useState, useEffect } from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    View,
    KeyboardAvoidingView,
    Button,
    Alert,
} from 'react-native';

import { MonoText } from '../components/StyledText';

import Firebase from '../config/firebase';
import { auth } from 'firebase';
import * as Google from 'expo-google-app-auth';
import { actions } from '../state/auth/authActions';
import { useStateValue } from '../state';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [calEvents, setCalEvents] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ name: '' });
    const [{ customers }, dispatch] = useStateValue();

    async function signIn() {
        try {
            let result = await Google.logInAsync({
                androidClientId:
                    '566987245774-qm5hddje6qaqdok7n61qenthkusr6j58.apps.googleusercontent.com',
                iosClientId:
                    '566987245774-e3s3a5j4tc5i6bsm1o4vhkruas3p83hc.apps.googleusercontent.com',
                scopes: [
                    'profile',
                    'email',
                    'https://www.googleapis.com/auth/calendar',
                ],
            });
            console.log(result);

            if (result.type == 'success') {
                Alert.alert('Successfully SignedIn');
                setAccessToken(result.accessToken);
                let credential = auth.GoogleAuthProvider.credential(
                    result.idToken
                );
                await Firebase.signInWithCredential(credential);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function getUsersCalendars(accessToken) {
        console.log(accessToken);
        let now = new Date().toISOString();
        let calendarsList = await fetch(
            `https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10&timeMin=${now}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );
        console.log(calendarsList);
        let data = await calendarsList.json();
        console.log(data);
    }

    useEffect(() => {
        Firebase.onAuthStateChanged(user => {
            if (user == null) {
                Alert.alert('Firebase got called!');
                console.log(user);
            } else {
                actions.getOrCreateCurrentUser(dispatch, user);
            }
        });
    }, []);
    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
            >
                <View style={styles.welcomeContainer}>
                    <Image
                        source={
                            __DEV__
                                ? require('../assets/images/robot-dev.png')
                                : require('../assets/images/robot-prod.png')
                        }
                        style={styles.welcomeImage}
                    />
                </View>

                <View style={styles.getStartedContainer}>
                    <DevelopmentModeNotice />

                    <Text style={styles.getStartedText}>
                        Get started by opening YES!
                    </Text>

                    <View
                        style={[
                            styles.codeHighlightContainer,
                            styles.homeScreenFilename,
                        ]}
                    >
                        <MonoText>screens/HomeScreen.js</MonoText>
                    </View>

                    <Text style={styles.getStartedText}>
                        Change this text and your app will automatically reload.
                    </Text>
                </View>

                <View style={styles.helpContainer}>
                    <TouchableOpacity onPress={signIn} style={styles.helpLink}>
                        <Text style={styles.helpLinkText}>
                            Sign In With google?
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => getUsersCalendars(accessToken)}
                        style={styles.helpLink}
                    >
                        <Text style={styles.helpLinkText}>Get Calendars?</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.tabBarInfoContainer}>
                <Text style={styles.tabBarInfoText}>
                    Add New Customer Name:
                </Text>

                <View>
                    <TextInput
                        style={{ height: 40, width: 100 }}
                        placeholder="Franky"
                        onChangeText={text => setNewCustomer({ name: text })}
                    />
                    {customers.loadingNewCustomer ? (
                        <Text>Loading</Text>
                    ) : (
                        <TouchableOpacity
                            onPressIn={() =>
                                Haptics.impact(
                                    Haptics.ImpactFeedbackStyle.Medium
                                )
                            }
                            onPress={() => {
                                // actions.addCustomer(dispatch, newCustomer);
                                Alert.alert('Adding Customer!');
                            }}
                        >
                            <Text style={styles.helpLinkText}>
                                Add New Customer
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

HomeScreen.navigationOptions = {
    header: null,
};

function DevelopmentModeNotice() {
    if (__DEV__) {
        const learnMoreButton = (
            <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
                Learn more
            </Text>
        );

        return (
            <Text style={styles.developmentModeText}>
                Development mode is enabled: your app will be slower but you can
                use useful development tools. {learnMoreButton}
            </Text>
        );
    } else {
        return (
            <Text style={styles.developmentModeText}>
                You are not in development mode: your app will run at full
                speed.
            </Text>
        );
    }
}

function handleLearnMorePress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/workflow/development-mode/'
    );
}

function handleHelpPress() {
    WebBrowser.openBrowserAsync(
        'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 10,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
});
