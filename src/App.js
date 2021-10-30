import React from "react";
import firebase from "./firebase";
import "./App.css";

class App extends React.Component {
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };
  configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("Recaptca varified");
        },
        defaultCountry: "IN",
      }
    );
  };
  onSignInSubmit = (e) => {
    e.preventDefault();
    this.configureCaptcha();
    const phoneNumber = "+91" + this.state.mobile;
    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("Otp not sent. Some error has occured");
      });
  };
  onSubmitOTP = (e) => {
    e.preventDefault();
    const code = this.state.otp;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        alert("User is verified");
        // ...
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
        alert("Please enter correct otp");
      });
  };
  render() {
    return (
      <div className="container">
        <h1 className="phone">Phone Verification</h1>
        <hr className="new5" />
        <div className="container">
          <div className="container__item">
            <form className="form" onSubmit={this.onSignInSubmit}>
              <div id="sign-in-button"></div>
              <input
                type="number"
                className="form__field"
                name="mobile"
                placeholder="Your mobile number"
                required
                onChange={this.handleChange}
              />
              <button type="button" className="button button2">
                Send OTP
              </button>
            </form>
            <hr className="new5" />
            <form className="form">
              <input
                type="number"
                className="form__field"
                name="otp"
                placeholder="Please enter your otp"
                required
              />
              <button type="button" className="button button2">
                Verify your OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
