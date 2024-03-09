"use client";
import React, { useState } from "react";
import Sidebar from "../sidebar/page";
import Header from "../header/page";

const CustomerInsurance = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    fatherName: "",
    motherName: "",
    mobileNo: "",
    mailId: "",
    panCardNo: "",
    AadharCardNo: "",
    ImploymentType: "",
    PerMonthSalary: "",
    customerLocation: "",
    companyName: "",
    dob: "",
    gender: "",
    religion: "",
  });

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = { ...formData };

    fetch("https://api.addrupee.com/api/cust_insurance_apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(data.message);

        setFormData({
          customerName: "",
          fatherName: "",
          motherName: "",
          mobileNo: "",
          mailId: "",
          panCardNo: "",
          AadharCardNo: "",
          customerLocation: "",
          companyName: "",
          dob: "",
          gender: "",
          religion: "",
        });
      })
      .catch((error) => {
        alert("Failed to submit the form");
      });
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
                <label htmlFor="customerName" className="form-label">
                  Customer Name As Per Pan Card:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerFatherName" className="form-label">
                  Father Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerMotherName" className="form-label">
                  Mother Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="motherName"
                  value={formData.motherName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerMobileNo" className="form-label">
                  Mobile No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerMailId" className="form-label">
                  Mail Id:
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="mailId"
                  value={formData.mailId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerPanNo" className="form-label">
                  Pan Card No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="panCardNo"
                  value={formData.panCardNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="AadharCardNo" className="form-label">
                  Aadhar Card No:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="AadharCardNo"
                  value={formData.AadharCardNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerLocation" className="form-label">
                  Customer Address:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="customerLocation"
                  value={formData.customerLocation}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerCompanyName" className="form-label">
                  Company Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerDOB" className="form-label">
                  DOB:
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerGender" className="form-label">
                  Gender:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="customerReligion" className="form-label">
                  Religion:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="ImploymentType" className="form-label">
                  Imployment Type:
                </label>
                <select
                  className="form-select"
                  name="ImploymentType"
                  value={formData.ImploymentType}
                  onChange={handleChange}
                  aria-label="Default select example"
                  required
                >
                  <option>Select</option>
                  <option value="Salaried">Salaried</option>
                  <option value="Self Imployed">Self Imployed</option>
                </select>
              </div>
              {formData.ImploymentType === "Salaried" && (
                <div className="mb-3 col-12 col-lg-6 col-md-6">
                  <label htmlFor="PerMonthSalary" className="form-label">
                    Per Month Salary:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="PerMonthSalary"
                    value={formData.PerMonthSalary}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
            </div>
            <button type="submit" className="btn btn-dark mb-3">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default CustomerInsurance;
