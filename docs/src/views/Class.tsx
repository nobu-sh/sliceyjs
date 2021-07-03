import React from 'react';
import { SliceyJsonClass } from 'src/interfaces';
import LinkTo from '../components/LinkTo'
import CodeBlock from '../components/CodeBlock'
import CreateTable from '../components/CreateTable'

import './Class.scss'

interface props {
  sliceyClass: SliceyJsonClass
}

export default class extends React.Component<props> {
  constructor(props: props) {
    super(props)
  }
  render() {
    const sliceyClass = this.props.sliceyClass
    return (
      <div>
        <h1 className="bold">{sliceyClass.name}</h1>
        { sliceyClass.extends ? <h4 className="heavyOffset light">extends <LinkTo to={sliceyClass.extends.link}>{sliceyClass.extends.class}</LinkTo></h4> : "" }
        <br />
        <p className="colorOffset light">{sliceyClass.description}</p>
        {
          sliceyClass.constructorItem
          ? <div>
              <br />
              <h2 className="medium">Constructor</h2>
              <CodeBlock language="javascript" className="spacecode">{sliceyClass.constructorItem}</CodeBlock>
              <br />
              {
                sliceyClass.parameters[0]
                ? <CreateTable columns={Array.from(Object.keys(sliceyClass.parameters[0]).map(i => i.toUpperCase()))} data={sliceyClass.parameters} />
                : ""
              }
            </div>
          : ""
        }
      </div>
    )
  }
}
