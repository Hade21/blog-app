import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { loginUser } from "../../lib/auth";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

class Login extends React.Component<WithRouterProps> {
  state = {
    email: "",
    password: "",
    status: 0,
    emailLabel: false,
    passLabel: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    const { email, password } = this.state;
    event.preventDefault();
    let datas;
    let statuss;
    try {
      const { data, status } = await loginUser(email, password);
      datas = data;
      statuss = status;
      sessionStorage.setItem("token", data.success.token);
    } catch (error) {
      statuss = 401;
    }
    this.setState({ data: datas, status: statuss });
    console.log(datas, statuss);
  };

  render() {
    const { router } = this.props;

    if (this.state.status === 200) {
      router.push("/");
    } else if (this.state.status === 401) {
      this.setState({ status: 0 });
      alert("Akun tidak memiliki akses!");
    }

    return (
      <div className="login w-full h-screen bg-gradient-to-br from-blue-500 to bg-purple-900 text-white flex items-center overflow-auto">
        <div className="wrapper w-1/3 h-fit m-auto">
          <h1 className="text-center font-Chivo font-black text-3xl mb-10">
            Login
          </h1>
          <form onSubmit={this.handleSubmit} className="flex flex-col gap-3">
            <div className="email bg-slate-400 rounded-lg flex gap-2 p-3 w-full items-center justify-between">
              <label
                htmlFor="email"
                className={
                  this.state.emailLabel
                    ? "w-fit text-sm"
                    : "font-Commisioner font-medium text-xl w-fit"
                }
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-transparent focus:outline-none w-full"
                onFocus={() => {
                  this.setState({ emailLabel: !this.state.emailLabel });
                }}
                onChange={this.handleChange}
              />
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="password bg-slate-400 rounded-lg flex gap-2 p-3 w-full items-center justify-between">
              <label
                htmlFor="password"
                className={
                  this.state.passLabel
                    ? "w-fit text-sm"
                    : "font-Commisioner font-medium text-xl w-fit"
                }
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-transparent focus:outline-none w-full"
                onChange={this.handleChange}
                required
                onClick={() => {
                  this.setState({ passLabel: !this.state.passLabel });
                }}
              />
              <FontAwesomeIcon icon={faEyeSlash} />
            </div>
            <a
              href=""
              className="font-Commisioner text-base text-slate-300 self-end"
            >
              Forget password?
            </a>
            <button
              type="submit"
              className="w-full py-2 bg-blue-200 rounded-full text-slate-600 mt-8 font-Commisioner font-medium text-lg"
            >
              Login
            </button>
            <Link href="/register">
              <a className="w-full py-2 bg-slate-400 rounded-full text-center font-Commisioner font-medium text-lg">
                Register
              </a>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
