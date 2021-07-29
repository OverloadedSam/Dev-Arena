import React, { Component } from "react";
import Table from "../common/table";

class ExperienceTable extends Component {
    experienceColumns = [
        {
            path: "organization",
            label: "Company",
        },
        {
            path: "title",
            label: "Title",
        },
        {
            path: "from",
            label: "Year",
            content: (item) => {
                let date = item.from.slice(0, 4);
                date += item.to ? " - " + item.to.slice(0, 4) : "";
                return date;
            },
        },
    ];

    render() {
        const data = this.props.data;

        const { column } = this.props;
        if (column) {
            this.experienceColumns[3] = column;
        }

        return <Table data={data} columns={this.experienceColumns} />;
    }
}

export default ExperienceTable;
