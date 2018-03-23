import { Navigation } from "react-native-navigation";

import ContactListScreen from './ContactListScreen';
import ContactFormScreen from './ContactFormScreen';
import NotificationScreen from './NotificationScreen';
import ContactDetailScreen from './ContactDetailScreen';
import * as screens from './constants';

export function registerScreens(store, Provider) {
	Navigation.registerComponent(screens.ContactListScreen, () => ContactListScreen, store, Provider);
	Navigation.registerComponent(screens.ContactFormScreen, () => ContactFormScreen, store, Provider);
	Navigation.registerComponent(screens.ContactDetailScreen, () => ContactDetailScreen, store, Provider);
	Navigation.registerComponent(screens.NotificationScreen, () => NotificationScreen);
}