import React, { Component } from "react";
import BootstrapTable from "react-bootstrap/Table";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component {
    render() {
        const { data, columns } = this.props;

        return (
            <BootstrapTable striped bordered hover size="sm">
                <TableHeader columns={columns} />
                <TableBody columns={columns} data={data} />
            </BootstrapTable>
        );
    }
}

export default Table;
