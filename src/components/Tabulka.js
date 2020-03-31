import React from "react";
import { Table, TableHeader, TableBody, sortable, SortByDirection, wrappable } from "@patternfly/react-table";

const headerTemplate = ["Country", "confirmed today", "confirmed before week", "~weekly", "~weekly%", "koronarip"];

const Tabulka = ({ rows, onSort }) => {
  return (
    <Table
      aria-label="Sortable coronavirus table"
      cells={headerTemplate.map((x) => {
        return { title: x, transforms: [sortable, wrappable] };
      })}
      rows={rows}
      onSort={onSort}
    >
      <TableHeader />
      <TableBody />
    </Table>
  );
};

export default Tabulka;
