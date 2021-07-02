import React from 'react';
import { Link } from 'react-router-dom'
interface Props {
  id: string
}

import "./ScrollToLink.scss"

export default class extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    return (
      <Link className="scrollToLink" to={`?scrollTo=${this.props.id}`} id={this.props.id}>
        {this.props.children}
      </Link>
    )
  }
}
