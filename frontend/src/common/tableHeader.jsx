import React, { Component } from "react";

class TableHeader extends Component {
    render() {
        const { columns } = this.props;
        return (
            <thead>
                <tr className="text-center">
                    {columns.map((column) => (
                        <th key={column.label || column.key}>{column.label}</th>
                    ))}
                </tr>
            </thead>
        );
    }
}

export default TableHeader;
