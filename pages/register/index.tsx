import React from "react";
import Link from "next/link";
import { useState } from "react";
import { registerUser } from "../../lib/auth";
import { useRouter } from "next/router";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setC_Password] = useState("");

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleC_Password = (event) => {
    setC_Password(event.target.value);
  };
  const route = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    const register = registerUser(name, email, password, c_password);
    register.then((res) => {
      sessionStorage.setItem("token", res.data.success.token);
      sessionStorage.setItem("name", res.data.success.name);
      if (res.status === 200) {
        route.push("/login");
      }
    });
  };

  return (
    <div className="register w-full h-screen bg-gradient-to-br from-blue-500 to bg-purple-900 text-white flex items-center">
      <div className="wrapper w-1/3 h-fit m-auto px-4">
        <h1 className="font-Chivo font-black text-3xl mb-10 text-center">
          Register
        </h1>
        <form
          onSubmit={handleSubmit}
          className="font-Commisioner font-medium text-lg flex flex-col gap-4"
        >
          <div className="name bg-slate-400 rounded-lg flex gap-2 p-3 w-full items-center justify-between">
            <label htmlFor="name" className="text-xl">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="bg-transparent focus:outline-none w-full"
              onChange={handleName}
            />
          </div>
          <div className="email bg-slate-400 rounded-lg flex gap-2 p-3 w-full items-center justify-between">
            <label htmlFor="email" className="text-xl">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="bg-transparent focus:outline-none w-full"
              onChange={handleEmail}
            />
          </div>
          <div className="password bg-slate-400 rounded-lg flex gap-2 p-3 w-full items-center justify-between">
            <label htmlFor="password" className="text-xl">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="bg-transparent focus:outline-none w-full"
              onChange={handlePassword}
            />
          </div>
          <div className="confirm bg-slate-400 rounded-lg flex gap-2 p-3 w-full items-center justify-between">
            <label htmlFor="c_password" className="text-xl">
              Confirm Password
            </label>
            <input
              type="password"
              name="c_password"
              id="c_password"
              required
              className="bg-transparent focus:outline-none w-full"
              onChange={handleC_Password}
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
};

export default Register;
