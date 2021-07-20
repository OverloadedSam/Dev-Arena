import React, { Component } from "react";

class TableBody extends Component {
    renderCell = (item, column) => {
        if (column.content) return column.content(item);

        return item[column.path];
    };

    createKey = (item, column) => {
        return item._id + (column.path || column.key);
    };

    render() {
        const { columns, data } = this.props;

        return (
            <tbody>
                {data.map((item) => (
                    <tr key={item._id}>
                        {columns.map((column) => (
                            <td
                                key={this.createKey(item, column)}
                                className="text-center text-capitalize"
                            >
                                {this.renderCell(item, column)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        );
    }
}

export default TableBody;
