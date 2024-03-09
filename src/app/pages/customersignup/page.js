"use client";
import React, { useState } from "react";
import googleLogo from "../../../../public/googleLogo.png";
import signUp from "../../../../public/signupImg.png";
import Link from "next/link";
import logo from "../../../../public/logo.png";
import "../../styles.css";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

const CustomerSignUp = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  axios.defaults.withCredentials = true;

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("https://api.addrupee.com/api/cust_register", registerData)
      .then((res) => {
        if (res.status !== 200 || !res.data) {
          alert("Error while registering. Please try again.");
        } else if (res.data.Status === "Success") {
          alert(res.data.Message);
          router.push("/customerdashboard");
        } else {
          alert(res.data.Error);
        }
      })
      .catch((err) => {
        alert("Error while registering. Please try again.");
      });
  };

  return (
    <div>
      <div style={{ backgroundColor: "#E7E5E5" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "4px 0",
            boxShadow:
              "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
          }}
          className="px-lg-5 px-md-4 px-2 "
        >
          <Link href={"/"}>
            <Image
              style={{ height: "60px", width: "150px" }}
              src={logo}
              alt="AddRupee"
            />
          </Link>
          <Link
            style={{
              border: "2px solid #036E8C",
              color: "#036E8C",
              fontWeight: 600,
            }}
            className="btn"
            href={"/pages/customersignin"}
          >
            Go Back
          </Link>
        </div>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="row"
          >
            <div className="col-12 col-lg-6">
              <form className="register_form">
                <div
                  style={{
                    backgroundColor: "#036E8C",
                    borderTopRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                  }}
                  className=" text-center mb-0"
                >
                  <h1 className="h4 text-white p-2 fw-normal">
                    Sign Up as a Customer
                  </h1>
                </div>
                <div className="p-4">
                  <div className="form-floating mb-1">
                    <input
                      type="text"
                      className="form-control signup_form_control"
                      id="floatingInput"
                      placeholder="Name"
                      name="name"
                      value={registerData.name}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="floatingInput">Name</label>
                  </div>
                  <div className="form-floating mb-1">
                    <input
                      type="tel"
                      className="form-control signup_form_control"
                      id="floatingInput"
                      name="phone"
                      value={registerData.phone}
                      placeholder="Phone No."
                      onChange={handleInputChange}
                      pattern="[0-9]*"
                      maxLength="10"
                      title="Please enter a valid 10-digit mobile number"
                    />
                    <label htmlFor="floatingInput">Phone No.</label>
                  </div>
                  <div className="form-floating mb-1">
                    <input
                      type="email"
                      className="form-control signup_form_control"
                      id="floatingInput"
                      name="email"
                      value={registerData.email}
                      placeholder="name@example.com"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="floatingInput">Email address</label>
                  </div>
                  <div className="form-floating mt-1">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="form-control signup_form_control"
                      id="floatingPassword"
                      name="password"
                      value={registerData.password}
                      placeholder="Password"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    <span
                      onClick={togglePasswordVisibility}
                      style={{
                        position: "absolute",
                        right: "15px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? (
                        <span
                          style={{
                            backgroundColor: "#dedbd2",
                            padding: "2px 6px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            color: "#2f3e46",
                            fontSize: "16px",
                            fontWeight: 500,
                          }}
                        >
                          Hide
                        </span>
                      ) : (
                        <span
                          style={{
                            backgroundColor: "#dedbd2",
                            padding: "2px 6px",
                            cursor: "pointer",
                            borderRadius: "4px",
                            color: "#2f3e46",
                            fontSize: "16px",
                            fontWeight: 500,
                          }}
                        >
                          Show
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="form-check text-start my-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="remember-me"
                      id="flexCheckDefault"
                      required
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Agree to
                      <Link
                        style={{ textDecoration: "none", fontWeight: 600 }}
                        href="/pages/termsconditions"
                      >
                        {" "}
                        terms & conditions
                      </Link>
                    </label>
                  </div>
                  <button
                    style={{ backgroundColor: "#036E8C" }}
                    className="btn text-white w-100 py-2 button_class"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Sign Up
                  </button>
                  <p className="mt-2 ">
                    Already a User?{" "}
                    <Link
                      href={"/pages/customersignin"}
                      style={{ textDecoration: "none", fontWeight: 500 }}
                    >
                      Sign In
                    </Link>
                  </p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="mt-2"
                  >
                    <span
                      style={{
                        width: "40%",
                        height: "1px",
                        color: "#036E8C",
                        border: "1px solid",
                        opacity: 0.5,
                      }}
                    ></span>
                    <span
                      style={{
                        fontSize: "19px",
                        color: "#264653",
                        fontWeight: 500,
                      }}
                    >
                      Or
                    </span>
                    <span
                      style={{
                        width: "40%",
                        height: "1px",
                        color: "#036E8C",
                        border: "1px solid",
                        opacity: 0.5,
                      }}
                    ></span>
                  </div>
                  <div className="text-center">
                    <p
                      style={{
                        fontSize: "19px",
                        fontWeight: 500,
                        color: "#264653",
                      }}
                    >
                      Sign In With
                    </p>
                    <span
                      style={{
                        padding: "13px 22px",
                        borderRadius: "5px",
                        marginRight: "25px",
                      }}
                      className="google_facebook_link"
                    >
                      <Link href={"#"}>
                        {" "}
                        <Image
                          style={{ height: "42px", width: "42px" }}
                          src={googleLogo}
                          alt="..."
                        />
                      </Link>
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12 col-lg-6 ">
              <Image
                className="img-fluid rounded-start"
                src={signUp}
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignUp;
