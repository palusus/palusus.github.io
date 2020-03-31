import React from "react";
import { Table, TableHeader, TableBody } from "@patternfly/react-table";

const createNumbers = (numbers) => [...Array(31)].map((_value, index) => (numbers ? numbers[index + 1] : index + 1));

const xd = ["rok", "měsíc", 0, 0, 0, 0, ...createNumbers()];

function createData(shit) {
  return xd.map((whoa) => {
    shit.get(whoa);
  });
}
const headerTemplate = ["Country", "koronarip"];

// eslint-disable-next-line no-unused-vars
class Tabulkold extends React.Component {
  constructor(data, ...props) {
    console.log("krok2", data);
    super(props);
    this.state = {
      columns: headerTemplate,
      // eslint-disable-next-line react/prop-types
      rows: props.data
      //.map((data) => {
      //console.log(createData(data));
      //return createData(data);
      //}) //props.data.map()
    };
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

const Tabulka = ({ rows }) => {
  const meow = rows.map((row) => {
    return [row["rok"], row["měsíc"], ...Object.values(row).slice(0, 31)];
    //return [1,2,3,4];
  });
  console.log("whoa", meow);
  return (
    <Table aria-label="Simple Table" cells={headerTemplate} rows={meow}>
      <TableHeader />
      <TableBody />
    </Table>
  );
};

export default Tabulka;
