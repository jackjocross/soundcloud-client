'use strict';

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import { example } from 'actions';
import { mapActions } from 'utils';
import SC from 'soundcloud';
import css from 'react-css-modules';
import styles from './dasbhoard.css';

const mapState = (state) => {
  return {
    example: state.example
  };
};

console.log('Soundcloud', SC);

SC.initialize({
  client_id: 'a843a2cf052ffb2078c6a48851e6e598'
});

SC.get('/tracks/76323507').then((response) => {
  let context = new (window.AudioContext || window.webkitAudioContext)(),
      audio = new Audio(),
      source,
      url = `${response.stream_url}?client_id=a843a2cf052ffb2078c6a48851e6e598`;

      console.log(url);

  audio.crossOrigin = 'anonymous';
  audio.src = url;
  console.log(audio);

  source = context.createMediaElementSource(audio);
  source.connect(context.destination);

  let analyser = context.createAnalyser();
  source.connect(analyser);

  source.mediaElement.play();

});

//   .then(function(player){
//   player.play();
// });

@connect(mapState, mapActions(example))
@css(styles)
export default class Dashboard extends Component {
  static propTypes = {
    actions: PropTypes.shape({
      increment: PropTypes.function,
      decrement: PropTypes.function
    }).isRequired,
    example: PropTypes.instanceOf(Immutable.Map)
  }

  increment() {
    this.props.actions.increment(1);
  }

  decrement() {
    this.props.actions.decrement(1);
  }

  render() {
    return (
      <div>
        <h1 styleName='heading'>Dashboard</h1>
        <p>Counter: { this.props.example.get('counter') }</p>

        <button onClick={ ::this.increment }>Add</button>
        <button onClick={ ::this.decrement }>Remove</button>
      </div>
    );
  }

}
