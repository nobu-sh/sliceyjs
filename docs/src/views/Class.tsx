import React from 'react';
import { SliceyJsonClass } from 'src/interfaces';

import './Class.scss'

interface props {
  sliceyClass: SliceyJsonClass
}

export default class extends React.Component<props> {
  constructor(props: props) {
    super(props)
  }
  render() {
    return (
      <div>
        {JSON.stringify(this.props.sliceyClass, undefined, 2)}
      </div>
    )
  }
}
