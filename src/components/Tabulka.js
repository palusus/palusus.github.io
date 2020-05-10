import React, { Fragment } from "react";
import {
    Table,
    TableHeader,
    TableBody,
    SortByDirection,
    wrappable,
    SortColumn,
    ITransform, IFormatterValueType, IExtra
} from "@patternfly/react-table";
import {Button, TextInput} from "@patternfly/react-core";

import ArrowsAltVIcon from "@patternfly/react-icons/dist/js/icons/arrows-alt-v-icon"

import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/components/Table/table';
import buttonStyles from '@patternfly/react-styles/css/components/Button/button';
// import { IExtra, IFormatterValueType, ITransform } from '@patternfly/react-table/src/components/Table/Table';
const sortable: ITransform = (label: IFormatterValueType, { columnIndex, column, property }: IExtra) => {
    const {
        extraParams: { sortBy, onSort }
    } = column;

    const extraData = {
        columnIndex,
        column,
        property
    };

    const isSortedBy = sortBy && columnIndex === sortBy.index;
    /**
     * @param {React.MouseEvent} event - React mouse event
     */
    function sortClicked(event: React.MouseEvent) {
        let reversedDirection: SortByDirection;
        if (!isSortedBy) {
            reversedDirection = SortByDirection.asc;
        } else {
            reversedDirection = sortBy.direction === SortByDirection.asc ? SortByDirection.desc : SortByDirection.asc;
        }
        // tslint:disable-next-line:no-unused-expression
        onSort && onSort(event, columnIndex, reversedDirection, extraData);
    }

    return {
        className: css(styles.tableSort, isSortedBy && styles.modifiers.selected),
        'aria-sort': isSortedBy ? `${sortBy.direction}ending` : 'none',
        children: (<Fragment>
                {label}
                <div style={{float:"left", marginTop:"20px"}}>
                    <ArrowsAltVIcon onClick={sortClicked}></ArrowsAltVIcon>
                {/*<SortColumn*/}
                {/*    isSortedBy={isSortedBy}*/}
                {/*    sortDirection={isSortedBy ? sortBy.direction : ''}*/}
                {/*    onSort={sortClicked}*/}
                {/*    className={css(buttonStyles.button, buttonStyles.modifiers.plain)}*/}
                {/*>*/}
                {/*</SortColumn>*/}
                </div>
            </Fragment>
        )
    };
};


const headerTemplate = [
    {name:"country", explanation:""},
    {name:"total", explanation:""},
    {name:"active", explanation:""},
    {name:"weekly", explanation:""},
    {name:"weekly%", explanation:""},
    {name:"recovered", explanation:""},
    {name:"koronarip", explanation:""},
    {name:"%final", explanation:""},
    ];
const Tabulka = ({ rows, onSort, onSelect, selected, addFilter, filter, ...other }) => {
  const srows =  rows.map((row) => {
    row.selected = selected.has(row[0]);
    return row;
  });
  return (
    <Table
      aria-label="Sortable coronavirus table"
      cells={headerTemplate.map((x) => {
          const index = headerTemplate.map((v) => v["name"]).indexOf(x["name"]);
          const exists = filter[index];
        return {
          title: (
            <Fragment>
                <div>
                    <div style={{float:"left"}}>
                <TextInput placeholder={"min "+x["name"]} value={exists&&(filter[index][0])} onChange={(vala) => {console.log(filter);
    addFilter(index, vala, exists?filter[index][1]:undefined)
}}/>
                    </div>
                    <div style={{float:"left"}}>
                <TextInput placeholder={"max "+x["name"]} value={filter[index]&&(filter[index][1])} onChange={(val) => {console.log(filter);
                    addFilter(index, exists?filter[index][0]:undefined, val)
                }}/>
                    </div>
                </div>
                <div style={{float:"left", marginLeft:"10%"}}><br />{x["name"]}</div>
            </Fragment>
          ),
          transforms: [sortable, wrappable]
        };
      })}
      rows={srows}
      onSort={onSort}
      onSelect={onSelect}
      canSelectAll={false}
      style={{ inlineBlock: "right" }}
      {...other}
    >
      <TableHeader />
      <TableBody />
    </Table>
  );
};

export default Tabulka;
