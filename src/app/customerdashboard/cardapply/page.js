"use client";
import React, { useState } from "react";
import Sidebar from "../sidebar/page";
import Header from "../header/page";

const CustomerCardApply = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    customerName: "",
    fatherName: "",
    motherName: "",
    mobileNo: "",
    mailId: "",
    panCardNo: "",
    aadharCardNo: "",
    ImploymentType: "",
    PerMonthSalary: "",
    customerLocation: "",
    companyName: "",
    dob: "",
    gender: "",
    religion: "",
  });

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = Object.values(formData).every(
      (value) => value.trim() !== ""
    );

    if (!isFormValid) {
      alert("Fill all the fields before submitting");
      return;
    }

    try {
      const response = await fetch(
        "https://api.addrupee.com/api/cust_card_apply",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Form submitted successfully! Our Team will connect you soon");
        setFormData({
          bankName: "",
          customerName: "",
          fatherName: "",
          motherName: "",
          mobileNo: "",
          mailId: "",
          panCardNo: "",
          aadharCardNo: "",
          ImploymentType: "",
          PerMonthSalary: "",
          customerLocation: "",
          companyName: "",
          dob: "",
          gender: "",
          religion: "",
        });
      } else {
        console.error("Failed to send customer card data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex" }}>
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <section
        style={{
          backgroundColor: "#E7E5E5",
          width: "100%",
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        <Header OpenSidebar={OpenSidebar} />
        <div className="container" style={{ padding: "20px" }}>
          <h2>Basic Form for Loan</h2>
          <h5 style={{ color: "#d90429", fontWeight: 600 }}>
            All fields are required
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="appliedBank" className="form-label">
                  Which Bank You Want To Apply:
                </label>
                <select
                  className="form-select"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleInputChange}
                  aria-label="Default select example"
                  required
                >
                  <option selected>Select Bank</option>
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="AXIS Bank">AXIS Bank</option>
                  <option value="AU Small Finance Bank">
                    AU Small Finance Bank
                  </option>
                  <option value="Yes Bank">Yes Bank</option>
                  <option value="IndusInd Bank">IndusInd Bank</option>
                  <option value="ICICI Bank">ICICI Bank</option>
                  <option value="Standard Chartered Bank">
                    Standard Chartered Bank
                  </option>
                  <option value="Bajaj">Bajaj</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerName" className="form-label">
                  Customer Name As Per Pan Card:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerFatherName" className="form-label">
                  Father Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerMotherName" className="form-label">
                  Mother Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerMobileNo" className="form-label">
                  Mobile No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerMailId" className="form-label">
                  Mail Id:
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="mailId"
                  value={formData.mailId}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerPanNo" className="form-label">
                  Pan Card No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="panCardNo"
                  value={formData.panCardNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="aadharCardNo" className="form-label">
                  Aadhar Card No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="aadharCardNo"
                  value={formData.aadharCardNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerLocation" className="form-label">
                  Customer Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="customerLocation"
                  value={formData.customerLocation}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerCompanyName" className="form-label">
                  Company Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerDOB" className="form-label">
                  DOB:
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerGender" className="form-label">
                  Gender:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerReligion" className="form-label">
                  Religion:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="religion"
                  value={formData.religion}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="ImploymentType" className="form-label">
                  Imployment Type:
                </label>
                <select
                  className="form-select"
                  name="ImploymentType"
                  value={formData.ImploymentType}
                  onChange={handleInputChange}
                  aria-label="Default select example"
                  required
                >
                  <option>Select</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Self Imployed">Self Imployed</option>
                </select>
              </div>
            </div>
            {formData.ImploymentType === "Salaried" && (
              <div className="row">
                <div className="mb-3 col-12 col-lg-6 col-md-6">
                  <label htmlFor="PerMonthSalary" className="form-label">
                    Per Month Salary:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="PerMonthSalary"
                    value={formData.PerMonthSalary}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            )}
            <button type="submit" className="btn btn-dark mb-3">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CustomerCardApply;
