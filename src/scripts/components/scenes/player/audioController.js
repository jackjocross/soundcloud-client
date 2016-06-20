'use strict';

import SC from 'soundcloud';

export default class AudioController {
	constructor() {
		// SoundCloud client id
		this.clientId = 'a843a2cf052ffb2078c6a48851e6e598';

		SC.initialize({
			client_id: this.clientId
		});
	}
	createSourceFromId = (trackId) => {
		SC.get(`/tracks/${trackId}`).then((response) => {
			let context = new (window.AudioContext || window.webkitAudioContext)(),
				audio = new Audio(),
				source,
				url = `${response.stream_url}?client_id=${this.clientId}`;

			// Prevent CORS errors
			audio.crossOrigin = 'anonymous';
			audio.src = url;

			source = context.createMediaElementSource(audio);
			source.connect(context.destination);

			let analyser = context.createAnalyser();
			source.connect(analyser);

			return source;
		});
	};
}
