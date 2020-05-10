import React from "react";
import { Table, TableHeader, TableBody, sortable, SortByDirection, wrappable } from "@patternfly/react-table";

const headerTemplate = ["Country", "confirmed today", "confirmed before week", "~weekly", "~weekly%", "koronarip"];
const Tabulka = ({ rows, onSort, onSelect, selected, ...other }) => {
    const srows = rows.map((row) => {row.selected = selected.has(row[0]); return row})
  return (
    <Table
      aria-label="Sortable coronavirus table"
      cells={headerTemplate.map((x) => {
        return { title: x, transforms: [sortable, wrappable] };
      })}
      rows={srows}
      onSort={onSort}
      onSelect={onSelect}
      canSelectAll={false}
      style={{inlineBlock:"right"}}
        {...other}
    >
      <TableHeader />
      <TableBody />
    </Table>
  );
};

export default Tabulka;
