import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

class HomeScreen extends Component {
    render() {
        return (
            <section className="showcase">
                <div className="video-container">
                    <video
                        src="/assets/videos/backgroundvideo.mp4"
                        autoPlay
                        muted
                        loop
                    ></video>
                </div>
                <div className="content">
                    <h1>Welcome to Dev Arena</h1>
                    <p className="lead d-none d-sm-block ">
                        Post and get help from community. Build your portfolio
                        with us!
                    </p>
                    <Button
                        as={Link}
                        to="/about"
                        variant="outline-warning text-light"
                    >
                        About us
                    </Button>
                </div>
            </section>
        );
    }
}

export default HomeScreen;
