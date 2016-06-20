'use strict';

import React, { Component } from 'react';
import AudioController from './audioController.js';

export default class Player extends Component {
	constructor(props) {
		super(props);

		let audio = new AudioController();
		this.audioSource = audio.createSourceFromId('76323507');
		console.log(this.audioSource);
	}
	render() {
		return (
			<div></div>
		);
	}
}
