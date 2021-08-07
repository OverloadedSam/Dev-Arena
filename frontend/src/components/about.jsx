import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";

class About extends Component {
    renderCardList = (list, title, icon) => {
        const iconClass = icon ? <i className={`fa fa-${icon}`}></i> : "";
        return (
            <Card style={{ width: "20rem" }}>
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <ListGroup variant="flush">
                        {list.map((item) => {
                            return (
                                <ListGroup.Item key={item}>
                                    {iconClass} {item}
                                </ListGroup.Item>
                            );
                        })}
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    };

    render() {
        const askAbout = [
            "Software Related Problems",
            "Coding Problems",
            "Algorithms",
            "Coding Techniques",
            "Tools and Softwares",
        ];

        const portfolioPoints = [
            "Add your educational quication",
            "Add your experiences",
            "Showcase your skills",
            "See other developer's portfolio",
        ];

        return (
            <Container>
                {/* Welcome */}
                <h2 className="text-center my-4 py-2 shadow rounded">
                    Welcome To{" "}
                    <span className="text-warning text-bold text-shadow">
                        DEV ARENA
                    </span>
                </h2>
                <p className="lead text-center">
                    <span>Dev Arena</span> is a platform for the Developers,
                    Engineers, Students, Teachers and other tech related people.
                </p>
                <p className="lead text-center">
                    With Dev Arena you can build your portfolio by showcasing
                    your skills.
                </p>

                <hr className="my-4" />

                {/* Build Portfolio */}
                <h3 className="text-center mb-3">
                    <i className="fa fa-address-card text-danger"></i> Build{" "}
                    <span className="text-success">Portfolio</span>
                </h3>
                <p className="lead text-center">
                    Build your portfolio with us! Here you can build your
                    portfolio so that every body can see your skills.
                </p>

                <div className="d-flex justify-content-center">
                    {this.renderCardList(
                        portfolioPoints,
                        "You can",
                        "star text-danger"
                    )}
                </div>

                <hr className="my-4" />

                {/* Ask for help */}
                <h3 className="text-center mb-3">
                    <i className="fa fa-bullhorn text-success"></i> Ask For{" "}
                    <span className="text-danger">Help</span>
                </h3>
                <p className="lead text-center">
                    You can get help on your doubts/problems from other people
                    on the platform.
                </p>
                <p className="lead text-center">
                    Dev Arena is about sharing and caring. You can ask questions
                    by sharing posts and can get replies from other
                    professionals that are on the platform.
                </p>
                <p className="lead text-center">
                    Ask specific questions. Specify all the necessary details
                    about the problem you are facing. Tell other people about
                    your problem what you are currently doing and what are to
                    trying to achieve.
                </p>
                <div className="d-flex justify-content-center">
                    {this.renderCardList(
                        askAbout,
                        "Ask About",
                        "check text-success"
                    )}
                </div>

                <hr className="my-4" />

                {/* Help Others */}
                <h3 className="text-center mb-3">
                    <i className="fa fa-handshake-o text-warning"></i> Help{" "}
                    <span className="text-info">Others</span>
                </h3>
                <p className="lead text-center">
                    You are always welcome to help other people on the platform.
                </p>
                <p className="lead text-center">
                    If you know something you can help other people by replying
                    to their posts. You can tell them exactly where the are
                    making mistakes and why their solution is not working.
                </p>
                <p className="lead text-center">
                    Try not to explain the whole scenario but rather try to give
                    brief and concrete information. Don't give opinions always
                    answer with facts and logic so that it would be easier for
                    others to understand.
                </p>
                <p className="lead text-center mb-5">
                    Sometimes questions are not related to technology. You can
                    UpVote a post so that people can see that the question is
                    legit and can be answered by other. You can also DownVote a
                    post if you find that the post is not helpful or not related
                    to tech or programming.
                </p>
            </Container>
        );
    }
}

export default About;
