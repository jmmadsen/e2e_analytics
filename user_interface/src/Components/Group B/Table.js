import React, { Component } from 'react'
import axios from 'axios';
import { Table, Spinner } from 'react-bootstrap';
import { useTable } from 'react-table'


function ReactTable({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <Table striped bordered hover size="sm" {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}

class FinalTable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      error: false,
      data: null,
      columns: [
        {
          Header: 'Name',
          columns: [
            {
              Header: 'First Name',
              accessor: 'firstName',
            },
            {
              Header: 'Last Name',
              accessor: 'lastName',
            },
          ],
        },
        {
          Header: 'Info',
          columns: [
            {
              Header: 'Age',
              accessor: 'age',
            },
            {
              Header: 'Visits',
              accessor: 'visits',
            },
            {
              Header: 'Status',
              accessor: 'status',
            },
            {
              Header: 'Profile Progress',
              accessor: 'progress',
            },
          ],
        },
      ]
    }
  }

  componentDidMount = async () => {

    try {

      const { data } = await axios.get('/data/table_data');

      this.setState({ loaded: true, data });

    } catch(err) {

      console.error(err);
      this.setState({ loaded: true, error: true });

    }

  }

  render = () => {

    const { loaded, error, data, columns } = this.state;

    if (!loaded) {
      return (
        <Spinner animation="border" variant="primary"/>
      )
    }

    if (error) {
      return (
        <div style={{ color: 'red' }}>
          Data failed to load
        </div>
      )
    }

    return (
      <div>
        <ReactTable columns={columns} data={data} />
      </div>
    )

  }

}

export default FinalTable;
