import React, { Component } from 'react';
import Slides from '../components/common/Slides';

const SLIDE_DATA = [
    { text: 'Yo ma nigga!', color: '#03A9F4' },
    { text: 'set your location and blah blah', color: '#009688' },
    { text: 'Woohoo!', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
        );
    }
}

export default WelcomeScreen;
