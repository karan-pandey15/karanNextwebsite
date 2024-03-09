"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import logo from "../../../../../../public/logo.png";
import Link from "next/link";
import "../../../../styles.css";
import Image from "next/image";
import Footer from "@/app/components/footer/page";

const PartnerResetPassword = () => {
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { id, token } = useParams();

  const HandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `https://api.addrupee.com/api/p_reset_password/${id}/${token}`,
        { password }
      );

      if (response.data.status === "Success") {
        alert("Password Reset Successfully");
        router.push("/partner/signin");
      }
    } catch (error) {
      console.error("Error during resetPassword:", error);
      if (error.response && error.response.status === 404) {
        alert("Link not found or expired. Please request a new link.");
      } else {
        alert("An error occurred during password reset");
      }
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
            href={"/partner/signin"}
          >
            Go Back
          </Link>
        </div>
        <div className="conatiner">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-12 col-lg-6">
              <form className="signUp_Form" onSubmit={HandleSubmit}>
                <div
                  style={{
                    backgroundColor: "#036E8C",
                    borderTopRightRadius: "8px",
                    borderTopLeftRadius: "8px",
                  }}
                  className=" text-center mb-0"
                >
                  <h1 className="h4 text-white p-2 fw-normal">
                    Reset Your Password
                  </h1>
                </div>
                <div className="p-4">
                  <div>
                    <div className="form-floating">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control signup_form_control"
                        id="floatingPassword"
                        placeholder="New Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label htmlFor="floatingPassword">New Password</label>
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
                    <button
                      style={{ backgroundColor: "#036E8C" }}
                      className="btn text-white w-100 py-2 my-3 button_class"
                      type="submit"
                    >
                      Reset
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

export default PartnerResetPassword;
