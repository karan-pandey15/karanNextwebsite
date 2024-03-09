"use client";
import React, { useState } from "react";
import Link from "next/link";
import logo from "../../../../public/logo.png";
import Image from "next/image";

const PartnerRegisterform = () => {
  const [formData, setFormData] = useState({
    name: "",
    fathername: "",
    mothername: "",
    spousename: "",
    gender: "",
    religion: "",
    citizenship: "",
    mobileno: "",
    AadharCardNo: "",
    PanCardNo: "",
    personalemailid: "",
    officialemailid: "",
    currentAddress: "",
    currentCity: "",
    currentState: "",
    currentPincode: "",
    permanentAddress: "",
    permanentCity: "",
    permanentState: "",
    permanentPincode: "",
    companyName: "",
    companyType: "",
    companyGSTNo: "",
    websiteLink: "",
    totalWorkExperience: "",
    companyCity: "",
    companyState: "",
    companyPincode: "",
    reference1name: "",
    reference1mobile: "",
    reference1pincode: "",
    reference1address: "",
    reference1city: "",
    reference1state: "",
    reference2name: "",
    reference2mobile: "",
    reference2pincode: "",
    reference2address: "",
    reference2city: "",
    reference2state: "",
    branchName: "",
    termsAndCondition: false,
  });
  const [sameAsCurrent, setSameAsCurrent] = useState(false);

  const handleCheckboxChange = () => {
    setSameAsCurrent((prevValue) => !prevValue);

    if (!sameAsCurrent) {
      setFormData((prevData) => ({
        ...prevData,
        permanentAddress: formData.currentAddress,
        permanentCity: formData.currentCity,
        permanentState: formData.currentState,
        permanentPincode: formData.currentPincode,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        permanentAddress: "",
        permanentCity: "",
        permanentState: "",
        permanentPincode: "",
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://api.addrupee.com/api/sendPartnerdata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        console.log("User registered successfully");
        alert("User registered successfully");
        setFormData({
          name: "",
          fathername: "",
          mothername: "",
          spousename: "",
          gender: "",
          religion: "",
          citizenship: "",
          mobileno: "",
          AadharCardNo: "",
          PanCardNo: "",
          personalemailid: "",
          officialemailid: "",
          currentAddress: "",
          currentCity: "",
          currentState: "",
          currentPincode: "",
          permanentAddress: "",
          permanentCity: "",
          permanentState: "",
          permanentPincode: "",
          companyName: "",
          companyType: "",
          companyGSTNo: "",
          websiteLink: "",
          totalWorkExperience: "",
          companyCity: "",
          companyState: "",
          companyPincode: "",
          reference1name: "",
          reference1mobile: "",
          reference1pincode: "",
          reference1address: "",
          reference1city: "",
          reference1state: "",
          reference2name: "",
          reference2mobile: "",
          reference2pincode: "",
          reference2address: "",
          reference2city: "",
          reference2state: "",
          branchName: "",
          termsAndCondition: false,
        });
      } else {
        console.error("Failed to register user");
        alert("Failed to register user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section style={{ backgroundColor: "#E7E5E5" }}>
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
          href={"/partner"}
        >
          Go Back
        </Link>
      </div>
      <div className="container py-5">
        <form onSubmit={handleSubmit}>
          <h2
            style={{
              textAlign: "center",
              fontWeight: 700,
              color: "#264653",
              paddingBottom: "21px",
            }}
          >
            Registration Form
          </h2>
          <h5 className="py-3">Personal Information</h5>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                id="name"
                name="name"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="fathername" className="form-label">
                Father Name
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.fathername}
                onChange={handleInputChange}
                id="fathername"
                name="fathername"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="mothername" className="form-label">
                Mother Name
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.mothername}
                onChange={handleInputChange}
                id="mothername"
                name="mothername"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="spousename" className="form-label">
                Spouse Name
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.spousename}
                onChange={handleInputChange}
                id="spousename"
                name="spousename"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="gender" className="form-label">
                Gender
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.gender}
                onChange={handleInputChange}
                id="gender"
                name="gender"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="religion" className="form-label">
                Religion
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.religion}
                onChange={handleInputChange}
                id="religion"
                name="religion"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="citizenship" className="form-label">
                Country
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.citizenship}
                onChange={handleInputChange}
                id="citizenship"
                name="citizenship"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="mobileno" className="form-label">
                Mobile No.
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.mobileno}
                onChange={handleInputChange}
                id="mobileno"
                name="mobileno"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="AadharCardNo" className="form-label">
                Aadhar Card No.
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.AadharCardNo}
                onChange={handleInputChange}
                id="AadharCardNo"
                name="AadharCardNo"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="PanCardNo" className="form-label">
                Pan Card No.
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.PanCardNo}
                onChange={handleInputChange}
                id="PanCardNo"
                name="PanCardNo"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="personalemailid" className="form-label">
                Personal Email Id
              </label>
              <input
                type="email"
                className="form-control"
                value={formData.personalemailid}
                onChange={handleInputChange}
                id="personalemailid"
                name="personalemailid"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="officialemailid" className="form-label">
                Official Email Id
              </label>
              <input
                type="email"
                className="form-control"
                value={formData.officialemailid}
                onChange={handleInputChange}
                id="officialemailid"
                name="officialemailid"
              />
            </div>
          </div>
          <h5 className="py-3">Current Address Information</h5>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="currentAddress" className="form-label">
                Current Address
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.currentAddress}
                onChange={handleInputChange}
                id="currentAddress"
                name="currentAddress"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="currentCity" className="form-label">
                Current City
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.currentCity}
                onChange={handleInputChange}
                id="currentCity"
                name="currentCity"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="currentState" className="form-label">
                Current State
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.currentState}
                onChange={handleInputChange}
                id="currentState"
                name="currentState"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="currentPincode" className="form-label">
                Current Pincode
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.currentPincode}
                onChange={handleInputChange}
                id="currentPincode"
                name="currentPincode"
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="checkbox"
              style={{ marginRight: "10px" }}
              id="sameAsCurrent"
              checked={sameAsCurrent}
              onChange={handleCheckboxChange}
            />
            <label
              htmlFor="sameAsCurrent"
              checked={sameAsCurrent}
              onChange={handleCheckboxChange}
            >
              Same as Current Address
            </label>
          </div>
          <h5 className="py-3">Permanent Address Information</h5>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="permanentAddress" className="form-label">
                Permanent Address
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                id="permanentAddress"
                name="permanentAddress"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="permanentCity" className="form-label">
                Permanent City
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.permanentCity}
                onChange={handleInputChange}
                id="permanentCity"
                name="permanentCity"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="permanentState" className="form-label">
                Permanent State
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.permanentState}
                onChange={handleInputChange}
                id="permanentState"
                name="permanentState"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="permanentPincode" className="form-label">
                Permanent Pincode
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.permanentPincode}
                onChange={handleInputChange}
                id="permanentPincode"
                name="permanentPincode"
              />
            </div>
          </div>
          <h5 className="py-3">Company Information</h5>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="companyName" className="form-label">
                Company Name
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.companyName}
                onChange={handleInputChange}
                id="companyName"
                name="companyName"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="companyType" className="form-label">
                Company Type
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.companyType}
                onChange={handleInputChange}
                id="companyType"
                name="companyType"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="companyGSTNo" className="form-label">
                Company GST No.
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.companyGSTNo}
                onChange={handleInputChange}
                id="companyGSTNo"
                name="companyGSTNo"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="companyCity" className="form-label">
                Company City
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.companyCity}
                onChange={handleInputChange}
                id="companyCity"
                name="companyCity"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="companyState" className="form-label">
                Company State
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.companyState}
                onChange={handleInputChange}
                id="companyState"
                name="companyState"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="companyPincode" className="form-label">
                Company Pincode
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.companyPincode}
                onChange={handleInputChange}
                id="companyPincode"
                name="companyPincode"
              />
            </div>
          </div>
          <h5 className="py-3">Reference 1 Information</h5>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="reference1name" className="form-label">
                Reference 1 Name
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.reference1name}
                onChange={handleInputChange}
                id="reference1name"
                name="reference1name"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="reference1mobile" className="form-label">
                Reference 1 Mobile
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.reference1mobile}
                onChange={handleInputChange}
                id="reference1mobile"
                name="reference1mobile"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="reference1address" className="form-label">
                Reference 1 Address
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.reference1address}
                onChange={handleInputChange}
                id="reference1address"
                name="reference1address"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="reference1city" className="form-label">
                Reference 1 City
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.reference1city}
                onChange={handleInputChange}
                id="reference1city"
                name="reference1city"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="reference1state" className="form-label">
                Reference 1 State
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.reference1state}
                onChange={handleInputChange}
                id="reference1state"
                name="reference1state"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="reference1pincode" className="form-label">
                Reference 1 Pincode
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.reference1pincode}
                onChange={handleInputChange}
                id="reference1pincode"
                name="reference1pincode"
              />
            </div>
          </div>
          <h5 className="py-3">Reference 2 Information</h5>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="reference2name" className="form-label">
                Reference 2 Name
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.reference2name}
                onChange={handleInputChange}
                id="reference2name"
                name="reference2name"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="reference2mobile" className="form-label">
                Reference 2 Mobile
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.reference2mobile}
                onChange={handleInputChange}
                id="reference2mobile"
                name="reference2mobile"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="reference2address" className="form-label">
                Reference 2 Address
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.reference2address}
                onChange={handleInputChange}
                id="reference2address"
                name="reference2address"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="reference2city" className="form-label">
                Reference 2 City
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.reference2city}
                onChange={handleInputChange}
                id="reference2city"
                name="reference2city"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="reference2state" className="form-label">
                Reference 2 State
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.reference2state}
                onChange={handleInputChange}
                id="reference2state"
                name="reference2state"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="reference2pincode" className="form-label">
                Reference 2 Pincode
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.reference2pincode}
                onChange={handleInputChange}
                id="reference2pincode"
                name="reference2pincode"
              />
            </div>
          </div>
          <h5 className="py-3">Other Information</h5>
          <div className="row">
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="totalWorkExperience" className="form-label">
                Total Work Experience
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.totalWorkExperience}
                onChange={handleInputChange}
                id="totalWorkExperience"
                name="totalWorkExperience"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="websiteLink" className="form-label">
                Website Link If Any (optional)
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.websiteLink}
                onChange={handleInputChange}
                id="websiteLink"
                name="websiteLink"
              />
            </div>
            <div className="col-12 col-lg-4 col-md-4 mb-3">
              <label htmlFor="branchName" className="form-label">
                Branch Name
              </label>
              <input
                type="text"
                className="form-control"
                value={formData.branchName}
                onChange={handleInputChange}
                id="branchName"
                name="branchName"
              />
            </div>
          </div>
          <div className="mb-3">
            <input
              type="checkbox"
              style={{ marginRight: "10px" }}
              id="termsAndCondition"
              name="termsAndCondition"
              value={formData.termsAndCondition}
              onChange={handleInputChange}
            />
            <label htmlFor="termsAndCondition">
              I Agree to{" "}
              <Link
                href={"/partner/termsandcanditions"}
                style={{ textDecoration: "none", fontWeight: 600 }}
              >
                Terms & Conditions
              </Link>
            </label>
          </div>
          <button className="btn btn-dark">Register</button>
        </form>
      </div>
    </section>
  );
};

export default PartnerRegisterform;
