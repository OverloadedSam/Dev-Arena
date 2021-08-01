import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Loader from "../common/loader";
import CreatePost from "../components/createPost";
import PostCard from "../components/postCard";
import { getAllPosts } from "../redux/actions/postActions";

class PostsScreen extends Component {
    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {
        const { loading, error, success, data } = this.props.posts;

        return (
            <Container>
                <h1 className="text-center my-2 mb-3 py-2">Create a Post</h1>

                <CreatePost />

                <h1 className="text-center my-4 mb-4 py-2">Recent Posts</h1>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <h3 className="text-center text-danger">{error}</h3>
                ) : data && success ? (
                    data.map((post) => <PostCard key={post._id} {...post} />)
                ) : (
                    ""
                )}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { posts: state.posts };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllPosts: () => dispatch(getAllPosts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsScreen);
