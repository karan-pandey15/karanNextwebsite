"use client";
import React, { useState } from "react";
import Sidebar from "../sidebar/page";
import Header from "../header/page";

const CustomerLoanApply = () => {
  const [formData, setFormData] = useState({
    loanType: "Personal Loan-PL",
    bankName: "HDFC Bank",
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
    appliedAmount: "",
  });

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

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

    fetch("https://api.addrupee.com/api/cust_loan_apply", {
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
          loanType: "Personal Loan-PL",
          bankName: "HDFC Bank",
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
          appliedAmount: "",
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
                <label htmlFor="loanType" className="form-label">
                  Which Loan You Want To Apply:
                </label>
                <select
                  className="form-select"
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                  aria-label="Default select example"
                  required
                >
                  <option value="Personal Loan-PL">Personal Loan-PL</option>
                  <option value="Business Loan-BL">Business Loan-BL</option>
                  <option value="Home Loan-HL">Home Loan-HL</option>
                  <option value="Loan Against Property-LAP">
                    Loan Against Property-LAP
                  </option>
                  <option value="Auto Loan-AL">Auto Loan-AL</option>
                  <option value="Over Draft_OD">Over Draft-OD</option>
                </select>
              </div>
              <div className="mb-3 col-12 col-lg-6 col-md-6">
                <label htmlFor="appliedBank" className="form-label">
                  Which Bank You Want To Apply:
                </label>
                <select
                  className="form-select"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  aria-label="Default select example"
                  required
                >
                  <option value="HDFC Bank">HDFC Bank</option>
                  <option value="AXIS Bank">AXIS Bank</option>
                  <option value="AXIS Finacnce">AXIS Finacnce</option>
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
                  <option value="Cholamandalam Investment and Finance Company">
                    Cholamandalam Investment and Finance Company
                  </option>
                  <option value="Incred Financial Services ">
                    Incred Financial Services
                  </option>
                  <option value="Finnable Credit Pvt Ltd">
                    Finnable Credit Pvt Ltd
                  </option>
                  <option value="Paysense Services">Paysense Services</option>

                  <option value="IDFC first Bank">IDFC First Bank</option>
                  <option value="Tata Capital Finance Services Pvt Ltd">
                    Tata Capital Finance Services Pvt Ltd
                  </option>

                  <option value="Aditya Birla">Aditya Birla</option>
                  <option value="Kotak Mahindra Bank">
                    Kotak Mahindra Bank
                  </option>

                  <option value="Standard Chartered Bank">
                    Standard Chartered Bank
                  </option>
                  <option value="Piramal Capital">Piramal Capital</option>
                  <option value="RBL Bank">RBL Bank</option>

                  <option value="Muthoot Finance Ltd">
                    Muthoot Finance Ltd
                  </option>
                  <option value="IndusInd Bank Limited">
                    IndusInd Bank Limited
                  </option>
                  <option value="L&T Finance Ltd">L&T Finance Limited</option>
                  <option value="Hero Finance Ltd">Hero Finance Limited</option>
                  <option value="Bajaj Finance">Bajaj Finance</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
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
                <label htmlFor="appliedAmount" className="form-label">
                  Applied Amount:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="appliedAmount"
                  value={formData.appliedAmount}
                  onChange={handleChange}
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
                  onChange={handleChange}
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
                    onChange={handleChange}
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

export default CustomerLoanApply;
