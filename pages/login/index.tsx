import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { loginUser } from "../../lib/auth";
import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const route = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const login = loginUser(email, password);
    login
      .then((res) => {
        sessionStorage.setItem("token", res.data.success.token);
        if (res.status === 200) {
          route.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login w-full h-screen bg-gradient-to-br from-blue-500 to bg-purple-900 text-white flex items-center overflow-auto">
      <div className="wrapper w-1/3 h-fit m-auto">
        <h1 className="text-center font-Chivo font-black text-3xl mb-10">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="email bg-slate-400 rounded-lg flex gap-2 p-3 w-full items-center justify-between">
            <label
              htmlFor="email"
              className="font-Commisioner font-medium text-xl"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-transparent focus:outline-none"
              onChange={handleEmail}
            />
            <FontAwesomeIcon icon={faUser} />
          </div>
          <div className="password bg-slate-400 rounded-lg flex gap-2 p-3 w-full items-center justify-between">
            <label
              htmlFor="password"
              className="font-Commisioner font-medium text-xl"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="bg-transparent focus:outline-none"
              onChange={handlePassword}
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
};

export default Login;
