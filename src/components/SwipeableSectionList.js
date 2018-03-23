import React, { Component } from 'react';
import { SectionList } from 'react-native';
import { Divider } from '@shoutem/ui';

import SwipeableListSectionHeader from './SwipeableListSectionHeader';
import SwipeableListItem from './SwipeableListItem';

export default class SwipeableSectionList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isScrolling: false
		}

		this.sectionListRef = null;
	}

	normalizeData = (data, sectionBy) => {
		const result = [];
		const sectionedData = {};

		data.forEach(item => {
			const firstLetter = item[sectionBy][0].toUpperCase();
			if (firstLetter in sectionedData)
				sectionedData[firstLetter].data.push(item);
			else {
				sectionedData[firstLetter] = {
					data: [item],
					title: firstLetter
				}
			}
		});

		for (const key in sectionedData)
			result.push(sectionedData[key]);

		return result.sort((a, b) => {
			if (a.title < b.title)
				return -1;
			if (a.title > b.title)
				return 1;
			return 0;
		});
	}

	renderListItem = ({ item }) => (
		<SwipeableListItem
			data={item}
			onSwipeStart={this.disableScroll}
			onSwipeRelease={this.enableScroll}
			isScrolling={this.state.isScrolling}
			onEdit={id => this.props.onEditItem(id)}
			onRemove={id => this.props.onRemoveItem(id)}
			onContactPressed={id => this.props.onContactPressed(id)}
		/>
	);

	renderListSectionHeader = ({ section }) => (
		<SwipeableListSectionHeader title={section.title} />
	);

	disableScroll = () => {
		this.sectionListRef.getScrollResponder().setNativeProps({
			scrollEnabled: false
		});
	}

	enableScroll = () => {
		this.sectionListRef.getScrollResponder().setNativeProps({
			scrollEnabled: true
		});
	}

	render = () => (
		<SectionList
			sections={this.normalizeData(this.props.data, this.props.sectionBy)}
			renderItem={this.renderListItem}
			renderSectionHeader={this.renderListSectionHeader}
			keyExtractor={item => item.id}
			scrollEnabled={!this.state.isSwiping}
			onScrollBeginDrag={() => this.setState({ isScrolling: true })}
			onScrollEndDrag={() => this.setState({ isScrolling: false })}
			ref={ref => this.sectionListRef = ref}
			ItemSeparatorComponent={() => <Divider styleName="line" />}
		/>
	);
}  