import * as Icon from "react-bootstrap-icons";

export default function Reset() {
  return (
    <div className="login reset-page">
      <h1 className="login__header">Reset your password</h1>
      <form className="login__form">
        <div className="input-field">
          <Icon.PeopleFill className="login-icon email-label" />
          <input type="email" placeholder="Email" />
        </div>
        <button className="submit-btn">Send email</button>
      </form>
    </div>
  );
}
