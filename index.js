import React from 'react';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { Icon } from '@shoutem/ui';

import configureStore from './src/redux/configureStore';
import { registerScreens } from "./src/screens/registerScreens";
import { ContactListScreen } from "./src/screens/constants";
import rootSaga from './src/redux/sagas/rootSaga';

const { store, sagaMiddleware } = configureStore();
registerScreens(store, Provider);
sagaMiddleware.run(rootSaga);

Navigation.startSingleScreenApp({
	screen: {
		screen: ContactListScreen,
		title: 'Contactos',
		navigatorStyle: {
			navBarHidden: true,
			drawUnderNavBar: true,
			orientation: 'auto',
			screenBackgroundColor: 'black',
			statusBarColor: 'transparent',
			drawUnderStatusBar: true
		}
	},
	animationType: 'fade'
});