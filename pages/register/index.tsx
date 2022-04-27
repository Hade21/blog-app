import React from "react";
import Link from "next/link";
import { registerUser } from "../../lib/auth";
import { withRouter } from "next/router";
import { WithRouterProps } from "next/dist/client/with-router";

class Register extends React.Component<WithRouterProps> {
  state = {
    name: "",
    email: "",
    password: "",
    c_password: "",
    status: 0,
    emailfoc: false,
    nameFoc: false,
    pasFoc: false,
    c_passFoc: false,
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    const { email, name, password, c_password } = this.state;
    event.preventDefault();
    let datas;
    let statuss;
    try {
      const { data, status } = await registerUser(
        name,
        email,
        password,
        c_password
      );
      datas = data;
      statuss = status;
      sessionStorage.setItem("name", data.success.name);
    } catch (error) {
      statuss = 401;
    }
    this.setState({ status: statuss });
  };

  render() {
    const { router } = this.props;

    if (this.state.status === 200) {
      router.push("/login");
    } else if (this.state.status === 401) {
      this.setState({ status: 0 });
      alert("Periksa kelengkapan data Anda!");
    }

    return (
      <div className="register w-full h-screen bg-gradient-to-br from-blue-500 to bg-purple-900 text-white flex items-center overflow-auto">
        <div className="wrapper w-1/3 h-fit m-auto px-4">
          <h1 className="font-Chivo font-black text-3xl mb-10 text-center">
            Register
          </h1>
          <form
            onSubmit={this.handleSubmit}
            className="font-Commisioner font-medium text-lg flex flex-col gap-4"
          >
            <div className="name bg-slate-400 rounded-lg flex gap-2 p-3 w-full items-center justify-between">
              <label
                htmlFor="name"
                className={
                  this.state.nameFoc ? "text-sm w-fit" : "text-xl w-fit"
                }
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="bg-transparent focus:outline-none w-full"
                onChange={this.handleChange}
                onClick={() => {
                  this.setState({ nameFoc: !this.state.nameFoc });
                }}
              />
            </div>
            <div className="email bg-slate-400 rounded-lg flex gap-2 p-3 w-full items-center justify-between">
              <label
                htmlFor="email"
                className={
                  this.state.emailfoc ? "text-sm w-fit" : "text-xl w-fit"
                }
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="bg-transparent focus:outline-none w-full"
                onChange={this.handleChange}
                onClick={() => {
                  this.setState({ emailfoc: !this.state.emailfoc });
                }}
              />
            </div>
            <div className="password bg-slate-400 rounded-lg flex gap-2 p-3 w-full items-center justify-between">
              <label
                htmlFor="password"
                className={
                  this.state.pasFoc ? "text-sm w-fit" : "text-xl w-fit"
                }
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="bg-transparent focus:outline-none w-full"
                onChange={this.handleChange}
                onClick={() => {
                  this.setState({ pasFoc: !this.state.pasFoc });
                }}
              />
            </div>
            <div className="confirm bg-slate-400 rounded-lg flex gap-2 p-3 w-full items-center justify-between">
              <label
                htmlFor="c_password"
                className={
                  this.state.c_passFoc ? "text-sm w-fit" : "text-xl w-fit"
                }
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="c_password"
                id="c_password"
                required
                className="bg-transparent focus:outline-none w-full"
                onChange={this.handleChange}
                onClick={() => {
                  this.setState({ c_passFoc: !this.state.c_passFoc });
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-200 rounded-full text-slate-600 mt-8 font-Commisioner font-medium text-lg"
            >
              Register
            </button>
            <Link href="/login">
              <a className="w-full py-2 bg-slate-400 rounded-full text-center font-Commisioner font-medium text-lg">
                Login
              </a>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
