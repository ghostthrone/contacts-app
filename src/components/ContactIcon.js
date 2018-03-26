import React from 'react';
import { View, Icon } from '@shoutem/ui';

const textInputMargins = {
	marginLeft: 20,
	marginRight: 20,
	marginTop: 10,
	marginBottom: 10
};

const styles = {
	container: {
		flexDirection: 'row',
		justifyContent: 'center',
		...textInputMargins,
		padding: 20
	},

	iconContainer: {
		backgroundColor: 'white',
		borderRadius: 100,
		width: 64,
		padding: 10,
		height: 64,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	icon: {
		fontSize: 40
	}
}

const ContactIcon = () => (
	<View style={styles.container}>
		<View style={styles.iconContainer}>
			<Icon name="user-profile" style={styles.icon} />
		</View>
	</View>
);

export default ContactIcon;