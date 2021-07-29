import React, { Component } from "react";
import Table from "../common/table";

class EducationTable extends Component {
    educationColumns = [
        {
            path: "school",
            label: "School/College",
        },
        {
            path: "location",
            label: "Location",
        },
        {
            path: "fieldOfStudy",
            label: "Field of Study",
        },
        {
            path: "degree",
            label: "Degree",
        },
    ];

    render() {
        const data = this.props.data;

        const { column } = this.props;
        if (column) {
            this.educationColumns[4] = column;
        }

        return <Table data={data} columns={this.educationColumns} />;
    }
}

export default EducationTable;
