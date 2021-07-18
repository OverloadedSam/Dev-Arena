import React, { Component } from "react";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Loader from "../common/loader";
import ProfileCard from "../components/profileCard";
import { listProfiles } from "../redux/actions/profileActions";

class DevelopersScreen extends Component {
    componentDidMount() {
        this.props.listProfiles();
    }

    render() {
        const { loading, error, success, profiles } = this.props.profiles;

        return (
            <Container>
                <h1 className="text-center my-2 mb-4 py-2">Developers</h1>
                {loading ? (
                    <Loader />
                ) : error ? (
                    <h3 className="text-center text-danger">{error}</h3>
                ) : success ? (
                    profiles.map((profile) => (
                        <ProfileCard key={profile.user._id} {...profile} />
                    ))
                ) : (
                    ""
                )}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return { profiles: state.profiles };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listProfiles: () => dispatch(listProfiles()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DevelopersScreen);
