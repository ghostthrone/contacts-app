import React, { Component } from 'react';
import { Heading, View } from '@shoutem/ui';

const styles = {
	paddingLeft: 15,
	backgroundColor: 'black'
}

const SwipeableListSectionHeader = ({ title }) => (
	<View style={styles}>
		<Heading style={{ color: 'white' }}>
			{title}
		</Heading>
	</View>
);

export default SwipeableListSectionHeader;