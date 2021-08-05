import React, { Component } from "react";
import { connect } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import PostCreationDetails from "../components/postCreationDetails";
import { getCurrentUser } from "../services/authService";
import {
    upVotePost,
    downVotePost,
    resetVoting,
} from "../redux/actions/postActions";

export class PostDetails extends Component {
    calculateVotes = (votes) => votes.upVotes.length - votes.downVotes.length;

    countComments = (comments) => comments.length;

    state = {
        upVote: false,
        downVote: false,
    };

    // Check whether user upVote or downVoted the post.
    checkUserVote = () => {
        const votes = this.props.post.postData.votes;
        const userId = getCurrentUser().id;
        const upVote = votes.upVotes.includes(userId);
        const downVote = votes.downVotes.includes(userId);
        return { upVote, downVote };
    };

    doVote = (e) => {
        const id = e.currentTarget.id;
        let state = { ...this.state };

        if (id === "upVote") {
            if (state.downVote) {
                state.downVote = false;
                state.upVote = !state.upVote;
            } else state.upVote = !state.upVote;

            this.props.upVotePost(this.props.post.postData._id);
            return this.setState({ ...state });
        }

        if (id === "downVote") {
            if (state.upVote) {
                state.upVote = false;
                state.downVote = !state.downVote;
            } else state.downVote = !state.downVote;

            this.props.downVotePost(this.props.post.postData._id);
            return this.setState({ ...state });
        }
    };

    constructor(props) {
        super(props);

        const vote = this.checkUserVote();
        this.state = vote;
    }

    componentDidUpdate(prevProps) {
        const { votedSuccessfully, votingError } = this.props.post;

        const prevVotingError = prevProps.post.votingError;
        const prevVotedSuccessfully = prevProps.post.votedSuccessfully;

        if (
            (votedSuccessfully && !prevVotedSuccessfully) ||
            (votingError && !prevVotingError)
        ) {
            const votes = this.checkUserVote();
            this.setState({ ...votes });
            this.props.resetVoting();
        }
    }

    render() {
        const { title, body, votes, user, avatar, createdAt } =
            this.props.post.postData;
        return (
            <div>
                <h2 className="my-3">Q: {title}</h2>
                <hr />

                <Row>
                    <Col
                        xs={2}
                        className="d-flex flex-column align-items-center px-2"
                    >
                        <i
                            id="upVote"
                            className={`fa fa-chevron-circle-up vote-icon clickable ${
                                this.state.upVote && "voted"
                            }`}
                            onClick={this.doVote}
                        ></i>
                        <h4 className="my-3">{this.calculateVotes(votes)}</h4>
                        <i
                            id="downVote"
                            className={`fa fa-chevron-circle-down vote-icon clickable ${
                                this.state.downVote && "voted"
                            }`}
                            onClick={this.doVote}
                        ></i>
                    </Col>

                    <Col xs={10} className="p-0">
                        <p
                            className="px-3 lead"
                            style={{ whiteSpace: "pre-line" }}
                        >
                            {body}
                        </p>
                    </Col>
                </Row>

                <div className="text-right">
                    <PostCreationDetails
                        user={user}
                        avatar={avatar}
                        isPost={true}
                        createdAt={createdAt}
                    />
                </div>
                <hr />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { post: state.post };
};

const mapDispatchToProps = (dispatch) => {
    return {
        upVotePost: (id) => dispatch(upVotePost(id)),
        downVotePost: (id) => dispatch(downVotePost(id)),
        resetVoting: () => dispatch(resetVoting()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
