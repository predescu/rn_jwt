import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Image } from 'react-native';
// import { createStore, applyMiddleware } from 'redux';
// import ReduxThunk from 'redux-thunk';
import { TabNavigator, StackNavigator, DrawerNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import store from './store';
// import reducers from './reducers';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import GridScreen from './screens/GridScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';
import StartSplashScreen from './screens/StartSplashScreen';

// USE ONLY FOR DEBUGGING NETWORK REQUESTS
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

class App extends Component {

    render() {
        const MainNavigator = TabNavigator({
            start_splash: { screen: StartSplashScreen },
            welcome: { screen: WelcomeScreen },
            auth: { screen: AuthScreen },
            main: {
                screen: DrawerNavigator({
                    grid: { screen: GridScreen },
                    review: {
                        screen: StackNavigator({
                            review: { screen: ReviewScreen },
                            settings: { screen: SettingsScreen }
                        })
                    }
                })
            }
        }, { // temporary workaround
            navigationOptions: {
                tabBarVisible: false,
            },
            // tabBarVisible: false,
            swipeEnabled: false,
            lazy: true,
            // animationEnabled: false
        });

        // reducers, default state, store enhancers
        // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }
}

export default App;
