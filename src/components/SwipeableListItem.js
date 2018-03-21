import React, { Component } from 'react';
import { 
	Subtitle, 
	Text, 
	View, 
	Icon, 
	Row, 
	Caption,
	TouchableOpacity
} from '@shoutem/ui';
import Swipeable from 'react-native-swipeable';

const generalTouchableOpacityStyle = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'flex-start'
}

export default class SwipeableListItem extends Component {
	constructor(props) {
		super(props);
		this.swipeable = null;
	}

	handleUserBeganScrollingParentView = () => this.swipeable.recenter();

	componentWillReceiveProps = nextProps => {
		if (nextProps.isScrolling)
			this.handleUserBeganScrollingParentView();
	}

	renderSwipeableRightButtons = () => {
		return [
			<TouchableOpacity style={{ ...generalTouchableOpacityStyle, backgroundColor: 'blue' }}>
				<Icon name="edit" />
			</TouchableOpacity>,
			<TouchableOpacity style={{ ...generalTouchableOpacityStyle, backgroundColor: 'red' }}>
				<Icon name="close" />
			</TouchableOpacity>
		]
	}

	render = () => {
		const {
			name,
			email,
			phone
		} = this.props.data;

		return (
			<Swipeable
				rightButtons={this.renderSwipeableRightButtons()}
				onSwipeStart={this.props.onSwipeStart}
				onSwipeRelease={this.props.onSwipeRelease}
				onRef={ref => this.swipeable = ref}
			>
				<Row styleName="small">
					<Icon name="user-profile" />
					<View styleName="vertical">
						<Subtitle>{name}</Subtitle>
						<Caption numberOfLines={1} style={{ color: '#9e9e9e' }}>{phone}</Caption>
					</View>
					<Icon styleName="disclosure" name="back" />
				</Row>
			</Swipeable>
		);
	}
}