import React from 'react';
import { SliceyJsonClassParameter } from 'src/interfaces';
import { v4 as uuid } from 'uuid'
import LinkTo from './LinkTo';

export interface tableProps {
  columns: string[]
  data: SliceyJsonClassParameter[]
}

function RenderHeaders(props: { headers: string[] }) {
  const headerArr = []
  for (const header of props.headers) {
    headerArr.push(<th key={uuid()}>{header}</th>)
  }
  return (
    <thead>
      <tr>
        {headerArr}
      </tr>
    </thead>
  )
}

function RenderRows(props: { rows: SliceyJsonClassParameter[] }) {
  const tbodyStuff = []
  for (const row of props.rows) {
      // items.push(<td key={uuid()}>{item}</td>)
    tbodyStuff.push(
      <tr key={uuid()}>
        <td>{row.parameter}</td>
        <td><LinkTo to={row.type.url}>{row.type.name}</LinkTo></td>
        <td>{row.optional ? "✔️" : ""}</td>
        <td>{JSON.stringify(row.default).replace(/"/g, "") || "none"}</td>
        <td>{row.description}</td>
      </tr>
    )
  }

  return (
    <tbody>
      {tbodyStuff}
    </tbody>
  )
}

export default class extends React.Component<tableProps> {
  constructor(props: tableProps) {
    super(props)
  }
  render() {
    
    return (
      <div className="table">
        <table>
          <RenderHeaders headers={this.props.columns} />
          <RenderRows rows={this.props.data} />
        </table>  
      </div>
    )
  }
}