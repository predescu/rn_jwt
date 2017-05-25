import React, { Component } from 'react';
import { View } from 'react-native';
import LoginForm from '../components/LoginForm';

class AuthScreen extends Component {

    render() {
        return (
            <View>
                <LoginForm />
            </View>
        );
    }
}

export default AuthScreen;
