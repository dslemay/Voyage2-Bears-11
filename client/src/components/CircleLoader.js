import React from 'react';
import { CircularProgress } from 'material-ui/Progress';

function CircleLoader(props) {
  if (props.large) {
    return <CircularProgress size={180} thickness={4} />;
  }
  return <CircularProgress size={70} />;
}

export default CircleLoader;
