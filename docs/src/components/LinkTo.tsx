import React from 'react';
import { Link } from 'react-router-dom'
interface Props {
  to: string
}

export default class extends React.Component<Props> {
  constructor(props: Props) {
    super(props)
  }
  render() {
    if (this.props.to.includes("://")) {
      return (
        <a className="toLink" href={this.props.to}>
          {this.props.children} <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      )
    } else {
      return (
        <Link className="toLink" to={this.props.to}>
          {this.props.children} <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </Link>
      )
    }
  }
}
