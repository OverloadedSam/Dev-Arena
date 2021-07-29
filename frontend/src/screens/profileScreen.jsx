import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import { getUserProfile } from "../redux/actions/profileActions";
import Loader from "../common/loader";
import ProfileFeaturette from "../components/profileFeaturette";
import ProfileBio from "../components/profileBio";
import ProfileSocialHandles from "../components/profileSocialHandles";

class ProfileScreen extends Component {
    componentDidMount() {
        const { match, history, getUserProfile } = this.props;
        if (match.params.id.length < 24) return history.push("/not-found");
        getUserProfile(match.params.id);
    }

    render() {
        const { loading, error, profileData: profile } = this.props.profile;
        return (
            <Container>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <h3 className="text-center text-danger">{error}</h3>
                ) : profile ? (
                    <>
                        <ProfileFeaturette {...profile} />
                        <ProfileBio {...profile} />
                        <ProfileSocialHandles {...profile} />
                    </>
                ) : (
                    ""
                )}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { profile: state.profile };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserProfile: (id) => dispatch(getUserProfile(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
