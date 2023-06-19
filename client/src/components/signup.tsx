import PasswordInput from "./passwordInput";

export default function SignUp() {
  return (
    <div className="signup">
      <h1 className="signup__header">Create your account</h1>
      <form className="signup__form">
        <div className="input-field">
          <label htmlFor="fullname">FullName: </label>
          <input id="fullname" type="text" placeholder="FullName" />
        </div>
        <div className="input-field">
          <label htmlFor="email">Email: </label>
          <input id="email" type="text" placeholder="Email" />
        </div>
        <div className="input-field">
          <label htmlFor="username">UserName: </label>
          <input id="username" type="text" placeholder="Username" />
        </div>
        <div className="input-field">
          <label htmlFor="password">Password: </label>
          <PasswordInput id="password" placeholder="Password" />
        </div>
        <div className="input-field">
          <label htmlFor="password-confirmation">Password confirmation: </label>
          <PasswordInput
            id="password-confirmation"
            placeholder="Password confirmation"
          />
        </div>
        <div className="input-field">
          <label htmlFor="birthday">Birthday: </label>
          <input id="birthday" type="date" />
        </div>
      </form>
      <button className="submit-btn">Sign up</button>
    </div>
  );
}
