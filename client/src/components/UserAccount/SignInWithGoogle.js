import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";
import GlobalContext from "../../context/";
import Buttons from "../Buttons/Buttons";
import API from "../Utility/API";

class SignInGoogleBase extends Component {
  static contextType = GlobalContext;

  state = {
    error: null
  };

  onSubmit = event => {
    event.preventDefault();

    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        const authUser = {
          name: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          photoUrl: socialAuthUser.user.photoURL,
          uid: socialAuthUser.user.uid
        };
        return authUser;
      })
      .then(authUser => {
        this.props.firebase
          .user(authUser.uid)
          .set(authUser)
          .then(() => {
            this.setState({ error: null });
            // make call to backend to get id that makes the link
            // take the id out the response
            API.getUser(authUser)
              .then(res => {
                console.log(res.data)
                if (res.data.length) {
                  const { id } = res.data;
                  this.context.setUser({ ...authUser, id });
                  this.props.history.push("/planner");
                } else {
                  API.createUser(authUser).then(res => {
                    const { id } = res.data;
                    this.context.setUser({ ...authUser, id });
                    this.props.history.push("/planner");
                  });
                }
              })
              .catch(err => console.log(err));
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        
        {/* <button type="submit">Sign In with Google</button> */}
        <Buttons btnStyle="success" btnName="Sign in with Google" />
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInWithGoogle = compose(
  withRouter,
  withFirebase
)(SignInGoogleBase);

export default SignInWithGoogle;
