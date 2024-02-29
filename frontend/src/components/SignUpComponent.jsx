import { useState } from "react";
import styles from "../styles/styles";
import { Link } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import axios from "axios";

const SignUpComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    let newForm = new FormData();
    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email);
    newForm.append("password", password);

    axios
      .post("http://localhost:8080/api/v2/user/create-user", newForm, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-full bg-gray-200 justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm-max-w-md">
        <h4 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
          Register as a new user
        </h4>
      </div>
      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form action="" className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="name"
                  name="text"
                  className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  autoComplete="name"
                  required
                  value={name}
                  placeholder="Alfred Ochieng"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  autoComplete="email"
                  required
                  value={email}
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  id="password"
                  name="password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {visible ? (
                  <>
                    <IoEyeOutline
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(false)}
                    />
                  </>
                ) : (
                  <>
                    <FaRegEyeSlash
                      className="absolute right-2 top-2 cursor-pointer"
                      size={25}
                      onClick={() => setVisible(true)}
                    />
                  </>
                )}
              </div>
            </div>
            <div className={`${styles.normalFlex} justify-between`}>
              <div className={`${styles.normalFlex}`}>
                <label
                  htmlFor="avatar"
                  className="block ml-2 text-sm font-medium text-gray-700"
                ></label>
                <div className=" flex items-center">
                  <span className="inline-block h-12 w-12 rounded-full overflow-hidden">
                    {avatar ? (
                      <>
                        <img
                          src={URL.createObjectURL(avatar)}
                          alt="avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </>
                    ) : (
                      <>
                        <div className="flex justify-center items-center cursor-pointer ">
                          <CgProfile className="w-full h-full" />
                        </div>
                      </>
                    )}
                  </span>
                  <label
                    htmlFor="file-input"
                    className="ml-5 flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    <span>upload a file</span>
                    <input
                      type="file"
                      name="file"
                      id="file-input"
                      accept=".jpg,.jpeg,.png"
                      className=" sr-only"
                      onChange={handleFileInputChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.normalFlex} w-full`}>
              <h5>Already have an account?</h5>
              <Link to="/login" className="text-blue-600 pl-2">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpComponent;
