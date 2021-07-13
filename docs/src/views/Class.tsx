import React from 'react';
import { SliceyJsonClass } from 'src/interfaces';
import LinkTo from '../components/LinkTo'
import CodeBlock from '../components/CodeBlock'
import CreateTable from '../components/CreateTableClass'
import CreateTableMethod from '../components/CreateTableClassMethod'
import Dropdown from '../components/Dropdown'
import ScrollToLink from '../components/ScrollToLink'
import { v4 as uuid } from 'uuid'
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
    sliceyClass.properties = sliceyClass.properties.sort((a,b) => (a.name > b.name) ? 1 : -1)
    sliceyClass.methods = sliceyClass.methods.sort((a,b) => (a.name > b.name) ? 1 : -1)
    const properties = []
    const methods = []
    const events = []

    for (const prop of sliceyClass.properties) {
      properties.push(
        <div key={uuid()}>
          <ScrollToLink id={`class-${sliceyClass.name}-prop-${prop.name}`.toLowerCase()}><h3>.{prop.name}</h3></ScrollToLink>
          <br />
          <p className="colorOffset light">{prop.description}</p>
          <br />
          <p><span className="inline">Type</span>: <LinkTo to={prop.type.link}>{prop.type.name}</LinkTo></p>
          <br />
          <div className="advancedSpacer" />
        </div>
      )
    }
    for (const method of sliceyClass.methods) {
      methods.push(
        <div key={uuid()}>
          <ScrollToLink id={`class-${sliceyClass.name}-method-${method.name}`.toLowerCase()}><h3>.{method.name}({method.parameters.map(p => p.parameter).join(", ")})</h3></ScrollToLink>
          <br />
          <p className="colorOffset light">{method.description}</p>
          <br />
          {
            method.parameters.length > 0
            ? <div>
                <CreateTableMethod columns={Array.from(Object.keys(method.parameters[0]).map(i => i.toUpperCase()))} data={method.parameters}/>
                <br />
              </div>
            : ""
          }
          <p><span className="inline">Returns</span>: { method.type.promise ? (<LinkTo to="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">Promise</LinkTo>) : "" } <LinkTo to={method.type.url}>{method.type.name}</LinkTo></p>
          <br />
          <div className="advancedSpacer" />
        </div>
      )
    }
    for (const event of sliceyClass.events) {
      events.push(
        <div key={uuid()}>
          <ScrollToLink id={`class-${sliceyClass.name}-events-${event.name}`.toLowerCase()}><h3>{event.name}</h3></ScrollToLink>
          <br />
          <p className="colorOffset light">{event.description}</p>
          <br />
          <CreateTableMethod columns={Array.from(Object.keys(event.parameters[0]).map(i => i.toUpperCase()))} data={event.parameters} />
          <br />
          <div className="advancedSpacer" />
        </div>
      )
    }
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
        <br />
        <div className="class-items">
          {
            sliceyClass.properties.length > 0
            ? <Dropdown items={sliceyClass.properties.map(i => { return { name: i.name, route: sliceyClass.route + i.route } })}>Properties</Dropdown>
            : ""
          }
          {
            sliceyClass.methods.length > 0
            ? <Dropdown items={sliceyClass.methods.map(i => { return { name: i.name, route: sliceyClass.route + i.route } })}>Methods</Dropdown>
            : ""
          }
          {
            sliceyClass.events.length > 0
            ? <Dropdown items={sliceyClass.events.map(i => { return { name: i.name, route: sliceyClass.route + i.route } })}>Events</Dropdown>
            : ""
          }
        </div>
        <br /><br /><br /><br />
        {
          sliceyClass.properties.length > 0
          ? <div>
              <br /><br /><br /><br />
              <h2 className="medium">Properties</h2>
              <br /><br />
              {properties}
            </div>
          : ""
        }
        {
          sliceyClass.methods.length > 0
          ? <div>
              <br /><br /><br /><br />
              <h2 className="medium">Methods</h2>
              <br /><br />
              {methods}
            </div>
          : ""
        }
        {
          sliceyClass.events.length > 0
          ? <div>
              <br /><br /><br /><br />
                <h2 className="medium">Events</h2>
              <br /><br />
              {events}
            </div>
          : ""
        }
      </div>
    )
  }
}
