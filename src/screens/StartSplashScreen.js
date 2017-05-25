import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
// import { NavigationActions } from 'react-navigation'
import { Spinner } from '../components/common';
import * as actions from '../actions';

class StartSplashScreen extends Component {
    componentDidMount() {
        // AsyncStorage.removeItem('api_token');
        // this.onAuthComplete(this.props);

        this.props.authCheck();


        // setTimeout(() => {
        //     this.props.authCheck();
        // }, 1000);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    onAuthComplete(props) {
        if (props.api_token) {
            this.props.navigation.navigate('grid');
            // this.props.navigation.dispatch(resetAction);
        } else {
            this.props.navigation.navigate('auth');
        }
    }

    // onAuthComplete(props) {
    //     if (props.token) {
    //         this.props.navigation.navigate('main');
    //     } else {
    //         this.props.navigation.navigate('auth');
    //     }
    // }

    render() {
        return (
            <View
                style={styles.slideStyle}
            >
                <Spinner large />
            </View>
        );
    }
}

// const resetAction = NavigationActions.reset({
// index: 0,
// key: null,
// actions: [
// NavigationActions.navigate({ routeName: 'review'})
// ]
// })

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'red'
    }
};

function mapStateToProps({ auth }) {
    return { api_token: auth.api_token };
}

export default connect(mapStateToProps, actions)(StartSplashScreen);
