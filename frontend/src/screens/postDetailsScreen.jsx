import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Loader from "../common/loader";
import PostDetails from "../components/postDetails";
import Comments from "../components/comments";
import { getPostById } from "../redux/actions/postActions";

export class PostDetailsScreen extends Component {
    componentDidMount() {
        const { id } = this.props.match.params;
        this.props.getPostById(id);
    }

    render() {
        const { loading, error, success, postData } = this.props.post;

        return (
            <Container>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <h3 className="text-center text-danger mt-4">{error}</h3>
                ) : success && postData ? (
                    <>
                        <PostDetails {...postData} />
                        <Comments {...postData} />
                    </>
                ) : (
                    ""
                )}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { post: state.post };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPostById: (id) => dispatch(getPostById(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsScreen);
