"use client";
import React, { useState } from "react";
import axios from "axios";
import Footer from "@/app/components/footer/page";
import Link from "next/link";
import logo from "../../../../public/logo.png";
import Image from "next/image";
import "../../styles.css";

const CustomerForgotPassword = () => {
  const [email, setEmail] = useState();

  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://api.addrupee.com/api/cust_forgot_password",
        { email }
      );

      if (response.data.status === "Success") {
        alert(response.data.message);
        setEmail("");
      } else {
        alert(response.data.error || "An error occurred");
      }
    } catch (error) {
      alert("An error occurred during forgot Password");
    }
  };

  return (
    <div>
      <div style={{ backgroundColor: "#E7E5E5", overflow: "hidden" }}>
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
        <div className="conatiner">
          <div className="row d-flex justify-content-center align-items-center ">
            <div className="col-12 col-lg-6">
              <form className="signUp_Form">
                <div
                  style={{
                    backgroundColor: "#036E8C",
                    borderTopRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                  }}
                  className=" text-center mb-0"
                >
                  <h1 className="h4 text-white p-2 fw-normal">
                    Forget Your Password
                  </h1>
                </div>
                <div className="p-4">
                  <div>
                    <div className="form-floating mb-2">
                      <input
                        type="email"
                        className="form-control signup_form_control"
                        id="floatingInput"
                        placeholder="Enter Your Email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Enter Your Email</label>
                    </div>
                    <button
                      style={{ backgroundColor: "#036E8C" }}
                      className="btn text-white w-100 py-2 my-3 button_class"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerForgotPassword;
