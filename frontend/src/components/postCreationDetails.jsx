import React, { Component } from "react";
import { Link } from "react-router-dom";
import Image from "react-bootstrap/Image";

export class PostCreationDetails extends Component {
    formatDate = (dateAndTime) => {
        const date = new Date(dateAndTime);
        const months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];

        const month = months[Number(date.getMonth())];
        const day = date.getDate();
        const year = `${date.getFullYear()}`.substr(2, 2);
        const time = `${date.getHours()}:${date.getMinutes()}`;

        return `${month} ${day} '${year} at ${time}`;
    };

    render() {
        const { createdAt, user, isPost, avatar } = this.props;
        return (
            <div className=" text-dark">
                <p className="mb-1">
                    {`${isPost ? "Asked" : "Commented"}`}{" "}
                    {this.formatDate(createdAt)}
                </p>
                <span>
                    by
                    <Link
                        title="View profile"
                        to={`/profile/${user._id}`}
                        className="pr-2 clickable text-capitalize text-decoration-none"
                    >
                        {" "}
                        {user.name}
                    </Link>
                </span>
                <Link to={`/profile/${user._id}`}>
                    <Image
                        src={avatar ? avatar : "/assets/images/avatar.png"}
                        alt={user.name}
                        style={{ width: "30px" }}
                    />
                </Link>
            </div>
        );
    }
}

export default PostCreationDetails;
