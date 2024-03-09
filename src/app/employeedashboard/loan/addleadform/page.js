"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../sidebar/page";
import Header from "../../header/page";

const AddLeadForm = () => {
  const [formData, setFormData] = useState({
    Status: "Pending",
    Product_Loan: "Personal Loan-PL",
    Bank_Name: "HDFC Bank",
    Customer_Name: "",
    Father_Name: "",
    Mother_Name: "",
    Mobile: "",
    Personal_Email: "",
    Pan_Card: "",
    Customer_Location: "",
    Company_Name: "",
    Dob: "",
    Login_Date: "",
    Gender: "",
    Religion: "",
    Income_Source: "",
    Marital_Status: "",
    Spouse_Name: "",
    Qualification: "",
    Property_Status: "",
    Aadhar_Card_No: "",
    Current_Address_Line1: "",
    Current_Address_Line2: "",
    Current_City: "",
    Current_Landmark: "",
    Current_State: "",
    Current_Pin: "",
    Permanent_Address_Line1: "",
    Permanent_Address_Line2: "",
    Permanent_City: "",
    Permanent_Landmark: "",
    Permanent_State: "",
    Permanent_Pin: "",
    Designation: "",
    Current_Company_Work_Experience: "",
    Total_Work_Experience: "",
    Company_Type: "",
    Official_Mail: "",
    Company_Address: "",
    Company_City: "",
    Company_State: "",
    Company_Pin: "",
    Salary_Account_BankName: "",
    Annual_Ctc: "",
    Net_Salary: "",
    Obligations: "",
    Scheme_Offered: "",
    Loan_Amount_Applied: "",
    Tenure_Of_Loan: "",
    Credit_Card_Obligation: "",
    Reference1_FullName_Relative: "",
    Reference1_MobileNo: "",
    Reference1_Address1: "",
    Reference1_City: "",
    Reference1_State: "",
    Reference1_Pin: "",
    Reference2_FullName_Friend: "",
    Reference2_MobileNo: "",
    Reference2_Address1: "",
    Reference2_City: "",
    Reference2_State: "",
    Reference2_Pin: "",
    Caller_Name: "",
    TL_Name: "",
    Manager_Name: "",
    email: "",
  });

  const [sameAsCurrent, setSameAsCurrent] = useState(false);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [employeeEmail, setEmployeeEmail] = useState(null);

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

  const handleCheckboxChange = () => {
    setSameAsCurrent((prevValue) => !prevValue);

    if (!sameAsCurrent) {
      setFormData((prevData) => ({
        ...prevData,
        Permanent_Address_Line1: formData.Current_Address_Line1,
        Permanent_Address_Line2: formData.Current_Address_Line2,
        Permanent_City: formData.Current_City,
        Permanent_Landmark: formData.Current_Landmark,
        Permanent_State: formData.Current_State,
        Permanent_Pin: formData.Current_Pin,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        Permanent_Address_Line1: "",
        Permanent_Address_Line2: "",
        Permanent_City: "",
        Permanent_Landmark: "",
        Permanent_State: "",
        Permanent_Pin: "",
      }));
    }
  };

  useEffect(() => {
    setEmployeeEmail(localStorage.getItem("employeeEmail"));
  }, []);

  const HandleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      email: employeeEmail,
      Reference1_MobileNo: `+91${formData.Reference1_MobileNo}`,
      Reference2_MobileNo: `+91${formData.Reference2_MobileNo}`,
      Mobile: `+91${formData.Mobile}`,
    };

    fetch("https://api.addrupee.com/api/all_data", {
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
          Product_Loan: "Personal Loan-PL",
          Bank_Name: "HDFC Bank",
          Customer_Name: "",
          Father_Name: "",
          Mother_Name: "",
          Mobile: "",
          Personal_Email: "",
          Pan_Card: "",
          Customer_Location: "",
          Company_Name: "",
          Dob: "",
          Login_Date: "",
          Gender: "",
          Religion: "",
          Income_Source: "",
          Marital_Status: "",
          Spouse_Name: "",
          Qualification: "",
          Property_Status: "",
          Aadhar_Card_No: "",
          Current_Address_Line1: "",
          Current_Address_Line2: "",
          Current_City: "",
          Current_Landmark: "",
          Current_State: "",
          Current_Pin: "",
          Permanent_Address_Line1: "",
          Permanent_Address_Line2: "",
          Permanent_City: "",
          Permanent_Landmark: "",
          Permanent_State: "",
          Permanent_Pin: "",
          Designation: "",
          Current_Company_Work_Experience: "",
          Total_Work_Experience: "",
          Company_Type: "",
          Official_Mail: "",
          Company_Address: "",
          Company_City: "",
          Company_State: "",
          Company_Pin: "",
          Salary_Account_BankName: "",
          Annual_Ctc: "",
          Net_Salary: "",
          Obligations: "",
          Scheme_Offered: "",
          Loan_Amount_Applied: "",
          Tenure_Of_Loan: "",
          Credit_Card_Obligation: "",
          Reference1_FullName_Relative: "",
          Reference1_MobileNo: "",
          Reference1_Address1: "",
          Reference1_City: "",
          Reference1_State: "",
          Reference1_Pin: "",
          Reference2_FullName_Friend: "",
          Reference2_MobileNo: "",
          Reference2_Address1: "",
          Reference2_City: "",
          Reference2_State: "",
          Reference2_Pin: "",
          Caller_Name: "",
          TL_Name: "",
          Manager_Name: "",
        });
      })
      .catch((error) => {
        console.log("Failed to submit the form", error);
        alert("Failed to submit the form");
      });
  };

  return (
    <>
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
            <h5 style={{ color: "#d90429", fontWeight: 600 }}>
              All fields are required
            </h5>
            <form onSubmit={HandleSubmit}>
              <div className="row">
                <div className="mb-3 col-12 col-lg-6 col-md-6">
                  <label htmlFor="appliedLoan" className="form-label">
                    Which Loan You Want To Apply:
                  </label>
                  <select
                    className="form-select"
                    name="Product_Loan"
                    value={formData.Product_Loan}
                    onChange={handleChange}
                    aria-label="Default select example"
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
                    name="Bank_Name"
                    value={formData.Bank_Name}
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
                    <option value="Hero Finance Ltd">
                      Hero Finance Limited
                    </option>
                    <option value="Bajaj Finance">Bajaj Finance</option>
                    <option value="Shriram Finance Ltd">
                      Shriram Finance Ltd
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Customer_Name" className="form-label">
                    Customer Name As Per Pan Card:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Customer_Name"
                    value={formData.Customer_Name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Father_Name" className="form-label">
                    Father's Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Father_Name"
                    value={formData.Father_Name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Mother_Name" className="form-label">
                    Mother's Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Mother_Name"
                    value={formData.Mother_Name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Mobile" className="form-label">
                    Mobile Number:
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">+91</span>
                    <input
                      type="tel"
                      className="form-control"
                      name="Mobile"
                      pattern="[0-9]{10}"
                      title="Mobile Number should be a 10-digit numeric value."
                      value={formData.Mobile}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Personal_Email" className="form-label">
                    Personal Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="Personal_Email"
                    value={formData.Personal_Email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Pan_Card" className="form-label">
                    Pan Card Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Pan_Card"
                    pattern="[A-Za-z0-9]{10}"
                    title="Pan Card Number should be a 10-digit alphanumeric value."
                    value={formData.Pan_Card}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Customer_Location" className="form-label">
                    Customer Location:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Customer_Location"
                    value={formData.Customer_Location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Company_Name" className="form-label">
                    Company Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Company_Name"
                    value={formData.Company_Name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Dob" className="form-label">
                    Date of Birth:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="Dob"
                    value={formData.Dob}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Login_Date" className="form-label">
                    Login Date:
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="Login_Date"
                    value={formData.Login_Date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Gender" className="form-label">
                    Gender:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Gender"
                    value={formData.Gender}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Religion" className="form-label">
                    Religion:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Religion"
                    value={formData.Religion}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Income_Source" className="form-label">
                    Income Source:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Income_Source"
                    value={formData.Income_Source}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Marital_Status" className="form-label">
                    Marital Status:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Marital_Status"
                    value={formData.Marital_Status}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Spouse_Name" className="form-label">
                    Spouse Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Spouse_Name"
                    value={formData.Spouse_Name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Qualification" className="form-label">
                    Qualification:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Qualification"
                    value={formData.Qualification}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Property_Status" className="form-label">
                    Property Status:
                  </label>

                  <select
                    className="form-select"
                    name="Property_Status"
                    value={formData.Property_Status}
                    onChange={handleChange}
                    aria-label="Default select example"
                    required
                  >
                    <option selected>Select</option>
                    <option value="Own">Own</option>
                    <option value="Rented">Rented</option>
                  </select>
                </div>

                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Aadhar_Card_No" className="form-label">
                    Aadhar Card Number:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Aadhar_Card_No"
                    pattern="[0-9]{12}"
                    title="Aadhar Card Number should be a 12-digit numeric value."
                    value={formData.Aadhar_Card_No}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Current_Address_Line1" className="form-label">
                    Current Address Line 1:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Current_Address_Line1"
                    value={formData.Current_Address_Line1}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Current_Address_Line2" className="form-label">
                    Current Address Line 2:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Current_Address_Line2"
                    value={formData.Current_Address_Line2}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Current_City" className="form-label">
                    Current City:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Current_City"
                    value={formData.Current_City}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Current_Landmark" className="form-label">
                    Current Landmark:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Current_Landmark"
                    value={formData.Current_Landmark}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Current_State" className="form-label">
                    Current State:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Current_State"
                    value={formData.Current_State}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Current_Pin" className="form-label">
                    Current Pin Code:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Current_Pin"
                    pattern="[0-9]{6}"
                    title="Pin Code should be a 6-digit numeric value."
                    value={formData.Current_Pin}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <label
                className="fw-300 my-3"
                checked={sameAsCurrent}
                onChange={handleCheckboxChange}
                style={{ color: "#d90429", fontWeight: 500 }}
              >
                Same as Current Adress
              </label>
              <input
                type="checkbox"
                className="mx-2"
                checked={sameAsCurrent}
                onChange={handleCheckboxChange}
              />

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label
                    htmlFor="Permanent_Address_Line1"
                    className="form-label"
                  >
                    Permanent Address Line 1:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Permanent_Address_Line1"
                    value={formData.Permanent_Address_Line1}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label
                    htmlFor="Permanent_Address_Line2"
                    className="form-label"
                  >
                    Permanent Address Line 2:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Permanent_Address_Line2"
                    value={formData.Permanent_Address_Line2}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Permanent_City" className="form-label">
                    Permanent City:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Permanent_City"
                    value={formData.Permanent_City}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Permanent_Landmark" className="form-label">
                    Permanent Landmark:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Permanent_Landmark"
                    value={formData.Permanent_Landmark}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Permanent_State" className="form-label">
                    Permanent State:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Permanent_State"
                    value={formData.Permanent_State}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Permanent_Pin" className="form-label">
                    Permanent Pin Code:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Permanent_Pin"
                    pattern="[0-9]{6}"
                    title="Pin Code should be a 6-digit numeric value."
                    value={formData.Permanent_Pin}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Designation" className="form-label">
                    Designation:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Designation"
                    value={formData.Designation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label
                    htmlFor="Current_Company_Work_Experience"
                    className="form-label"
                  >
                    Current Company Work Experience:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Current_Company_Work_Experience"
                    value={formData.Current_Company_Work_Experience}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Total_Work_Experience" className="form-label">
                    Total Work Experience:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Total_Work_Experience"
                    value={formData.Total_Work_Experience}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Company_Type" className="form-label">
                    Company Type:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Company_Type"
                    value={formData.Company_Type}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Official_Mail" className="form-label">
                    Official Mail:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="Official_Mail"
                    value={formData.Official_Mail}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Company_Address" className="form-label">
                    Company Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Company_Address"
                    value={formData.Company_Address}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Company_City" className="form-label">
                    Company City:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Company_City"
                    value={formData.Company_City}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Company_State" className="form-label">
                    Company State:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Company_State"
                    value={formData.Company_State}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Company_Pin" className="form-label">
                    Company Pin Code:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Company_Pin"
                    pattern="[0-9]{6}"
                    title="Pin Code should be a 6-digit numeric value."
                    value={formData.Company_Pin}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label
                    htmlFor="Salary_Account_BankName"
                    className="form-label"
                  >
                    Salary Account Bank Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Salary_Account_BankName"
                    value={formData.Salary_Account_BankName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Annual_Ctc" className="form-label">
                    Annual CTC:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Annual_Ctc"
                    pattern="[0-9]+"
                    title="Please enter a valid numeric value."
                    value={formData.Annual_Ctc}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Net_Salary" className="form-label">
                    Net Salary:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Net_Salary"
                    pattern="[0-9]+"
                    title="Please enter a valid numeric value."
                    value={formData.Net_Salary}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Obligations" className="form-label">
                    Obligations:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Obligations"
                    pattern="[0-9]+"
                    title="Please enter a valid numeric value."
                    value={formData.Obligations}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Scheme_Offered" className="form-label">
                    Scheme Offered:
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    name="Scheme_Offered"
                    value={formData.Scheme_Offered}
                    onChange={handleChange}
                  >
                    <option selected>Choose Offered Scheme...</option>
                    <option value="FRESH">FRESH</option>
                    <option value="BT">BT</option>
                    <option value="Top Up">Top Up</option>
                    <option value="BT + Top Up">BT + Top Up</option>
                    <option value="Parallel">Parallel</option>
                  </select>
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Loan_Amount_Applied" className="form-label">
                    Loan Amount Applied:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Loan_Amount_Applied"
                    pattern="[0-9]+"
                    title="Please enter a valid numeric value."
                    value={formData.Loan_Amount_Applied}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Tenure_Of_Loan" className="form-label">
                    Tenure of Loan:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Tenure_Of_Loan"
                    value={formData.Tenure_Of_Loan}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label
                    htmlFor="Credit_Card_Obligation"
                    className="form-label"
                  >
                    Credit Card Obligation:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Credit_Card_Obligation"
                    pattern="[0-9]+"
                    title="Please enter a valid numeric value."
                    value={formData.Credit_Card_Obligation}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label
                    htmlFor="Reference1_FullName_Relative"
                    className="form-label"
                  >
                    Reference 1 Full Name (Relative):
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Reference1_FullName_Relative"
                    value={formData.Reference1_FullName_Relative}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Reference1_MobileNo" className="form-label">
                    Reference 1 Mobile Number:
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">+91</span>
                    <input
                      type="tel"
                      className="form-control"
                      name="Reference1_MobileNo"
                      pattern="[0-9]{10}"
                      value={formData.Reference1_MobileNo}
                      onChange={handleChange}
                      required
                      title="Mobile Number should be a 10-digit numeric value."
                    />
                  </div>
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Reference1_Address1" className="form-label">
                    Reference 1 Address Line:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Reference1_Address1"
                    value={formData.Reference1_Address1}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Reference1_City" className="form-label">
                    Reference 1 City:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Reference1_City"
                    value={formData.Reference1_City}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Reference1_State" className="form-label">
                    Reference 1 State:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Reference1_State"
                    value={formData.Reference1_State}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Reference1_Pin" className="form-label">
                    Reference 1 Pin Code:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Reference1_Pin"
                    pattern="[0-9]{6}"
                    title="Pin Code should be a 6-digit numeric value."
                    value={formData.Reference1_Pin}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label
                    htmlFor="Reference2_FullName_Friend"
                    className="form-label"
                  >
                    Reference 2 Full Name (Friend):
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Reference2_FullName_Friend"
                    value={formData.Reference2_FullName_Friend}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Reference2_MobileNo" className="form-label">
                    Reference 2 Mobile Number:
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">+91</span>
                    <input
                      type="tel"
                      className="form-control"
                      name="Reference2_MobileNo"
                      pattern="[0-9]{10}"
                      value={formData.Reference2_MobileNo}
                      onChange={handleChange}
                      required
                      title="Mobile Number should be a 10-digit numeric value."
                    />
                  </div>
                </div>

                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Reference2_Address1" className="form-label">
                    Reference 2 Address Line:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Reference2_Address1"
                    value={formData.Reference2_Address1}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Reference2_City" className="form-label">
                    Reference 2 City:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Reference2_City"
                    value={formData.Reference2_City}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Reference2_State" className="form-label">
                    Reference 2 State:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Reference2_State"
                    value={formData.Reference2_State}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Reference2_Pin" className="form-label">
                    Reference 2 Pin Code:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Reference2_Pin"
                    pattern="[0-9]{6}"
                    title="Pin Code should be a 6-digit numeric value."
                    value={formData.Reference2_Pin}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Caller_Name" className="form-label">
                    Caller Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Caller_Name"
                    value={formData.Caller_Name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="TL_Name" className="form-label">
                    TL Name:
                  </label>
                  <select
                    type="text"
                    className="form-control"
                    name="TL_Name"
                    onChange={handleChange}
                    required
                  >
                    <option selected disabled>
                      Select TL Name
                    </option>
                    <option value="CHAHAT SHARMA">CHAHAT SHARMA</option>
                    <option value="GAURAV TIWARI">GAURAV TIWARI</option>
                    <option value="RAJENDRA SINGH">RAJENDRA SINGH</option>
                    <option value="HIMANSHU GUJJAR">HIMANSHU GUJJAR</option>
                    <option value="FAIZAN KHAN">FAIZAN KHAN</option>
                    <option value="DEEPAK KUMAR">DEEPAK KUMAR</option>
                    <option value="BHAGWAN SINGH">BHAGWAN SINGH</option>
                    <option value="SACHIN KUMAR">SACHIN KUMAR</option>
                  </select>
                </div>
                <div className="mb-3 col-12 col-lg-4 col-md-6">
                  <label htmlFor="Manager_Name" className="form-label">
                    Manager Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Manager_Name"
                    value={formData.Manager_Name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary mb-3">
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default AddLeadForm;
