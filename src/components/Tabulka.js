import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Table, TableHeader, TableBody, sortable, SortByDirection, wrappable } from "@patternfly/react-table";

const createNumbers = (numbers) => [...Array(31)].map((_value, index) => (numbers ? numbers[index + 1] : index + 1));

const xd = ["rok", "měsíc", 0, 0, 0, 0, ...createNumbers()];

// function createData(shit) {
//   return xd.map((whoa) => {
//     shit.get(whoa);
//   });
// }
const headerTemplate = ["Country", "confirmed", "koronarip"];



// eslint-disable-next-line no-unused-vars
class Tabulkold extends React.Component {
  constructor(data, ...props) {
    console.log("krok2", data);
    super(props);
    this.state = {
      columns: headerTemplate.map((x) => {
        return { title: x, transforms: [sortable, wrappable] };
      }),
      // eslint-disable-next-line react/prop-types
      rows: props.data,
      sortBy: {}
    };
    this.onSort = this.onSort.bind(this);
  }

  onSort(_event, index, direction) {
    const sortedRows = this.state.rows.sort((a, b) => (a[index] < b[index] ? -1 : a[index] > b[index] ? 1 : 0));
    this.setState({
      sortBy: {
        index,
        direction
      },
      rows: direction === SortByDirection.asc ? sortedRows : sortedRows.reverse()
    });
  }

  render() {
    const { columns, rows } = this.state;
    console.log("geez", rows);

    return (
      <Table aria-label="Simple Table" cells={columns} rows={rows}>
        <TableHeader />
        <TableBody />
      </Table>
    );
  }
}

const Tabulka = ({ rows, onSort }) => {
  // console.log("coto", rady);
  // const [rows, setRows] = useState(koronaDedToday(data));
  // useEffect(() => setRows(koronaDedToday(data)), [data]);
  // componentDidUpdate(prevProps) {
  //   if (prevProps.data !== data) {
  //     setRows(koronaDedToday(data))
  //   }
  // }
  console.log("WTF", rows);
  return (
    <Table
      aria-label="Sortable coronavirus table"
      cells={headerTemplate.map((x) => {
        return { title: x, transforms: [sortable, wrappable] };
      })}
      // cells={headerTemplate}
      rows={rows}
      // onSort={sortFunc}
      onSort={onSort}
    >
      <TableHeader />
      <TableBody />
    </Table>
  );
};

export default Tabulka;
