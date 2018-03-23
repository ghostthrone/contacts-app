import React, { Component } from 'react';
import { Divider, Caption } from '@shoutem/ui';

const SwipeableListSectionHeader = ({ title }) => (
	<Divider styleName="section-header">
		<Caption>{title}</Caption>
	</Divider>
);

export default SwipeableListSectionHeader;