"use client";
import React, { useState } from "react";
import axios from "axios";
import contactUsImg from "../../../public/inquiry.png";
import addrupeelogo from "../../../public/logo.png";
import Image from "next/image";
import "../styles.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    state: "",
    employmentType: "",
    monthlySalary: "",
    haveGST: "",
    selectedCheckboxes: [],
  });

  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [showGSTError, setShowGSTError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;

    const isAlreadySelected =
      formData.selectedCheckboxes.includes(checkboxValue);

    if (
      (isAlreadySelected && !isChecked) ||
      (!isAlreadySelected && isChecked)
    ) {
      if (isChecked && formData.selectedCheckboxes.length >= 2) {
        return;
      }

      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedCheckboxes: isChecked
          ? [...prevFormData.selectedCheckboxes, checkboxValue]
          : prevFormData.selectedCheckboxes.filter(
              (item) => item !== checkboxValue
            ),
      }));
    }
  };

  const handleStateChange = (event) => {
    setFormData({
      ...formData,
      state: event.target.value,
    });
  };

  const handleEmploymentTypeChange = (event) => {
    setFormData({
      ...formData,
      employmentType: event.target.value,
      monthlySalary: "",
    });
  };

  const haveGST = (event) => {
    setFormData({
      ...formData,
      haveGST: event.target.value,
    });
    setShowGSTError(event.target.value === "No");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const minimumSalary = 30000;
    if (
      formData.employmentType === "Salaried" &&
      (formData.monthlySalary === "" ||
        parseInt(formData.monthlySalary, 10) < minimumSalary)
    ) {
      alert(
        `Sorry, You are not eligible. Your monthly Salary should be at least ${minimumSalary}.`
      );
      return;
    }

    if (
      formData.employmentType === "Self-employed" &&
      formData.haveGST === "No"
    ) {
      alert("Sorry, You are not eligible. You should have a valid GST.");
      return;
    }

    axios
      .post("https://api.addrupee.com/api/contact-submit-form", formData)
      .then((response) => {
        alert("Inquiry form submitted successfully");
        setFormData({
          fullName: "",
          mobileNo: "",
          state: "",
          employmentType: "",
          monthlySalary: "",
          haveGST: "",
          selectedCheckboxes: [],
        });
        window.location.href = "https://addrupee.com";
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
      });
  };

  const checkboxes = [
    "Personal Loan",
    "Business Loan",
    "Property Loan",
    "Home Loan",
    "OD/CC",
    "Mutual Fund",
  ];
  const moreOptions = [
    "Education Loan",
    "Car Loan",
    "Health Insurance",
    "General Insurance",
  ];

  return (
    <div>
      <div style={{ backgroundColor: "#E7E5E5" }}>
        <div
          style={{ backgroundColor: "#edf2f4" }}
          className="container contact_box-shadow"
        >
          <Image
            style={{ height: "60px", width: "160px" }}
            className="m-2"
            src={addrupeelogo}
            alt="..."
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="row inquiry_form"
          >
            <div className="col-12 col-lg-6 col-md-6 contact_form-shadow">
              <Image
                className="img-fluid rounded-start"
                src={contactUsImg}
                alt="..."
              />
            </div>
            <div className="col-12 col-lg-6 col-md-6 py-3 contact_form-shadow">
              <h2
                style={{ color: "#264653", fontWeight: 600 }}
                className="text-center"
              >
                Explore Loan Options
              </h2>
              <form
                style={{ width: "90%", paddingLeft: "50px" }}
                onSubmit={handleSubmit}
              >
                <div className="form-group py-2">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter Your Name"
                    required
                  />
                </div>
                <div className="form-group py-2">
                  <label htmlFor="mobileNo">Mobile No</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobileNo"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleInputChange}
                    placeholder="Enter Your Mobile No"
                    required
                    pattern="[0-9]*"
                    maxLength="10"
                    title="Please enter a valid 10-digit mobile number"
                  />
                </div>
                <div className="form-group py-2">
                  <label htmlFor="state">State</label>
                  <select
                    className="form-control"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleStateChange}
                  >
                    <option value="">Select Your State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Chhattisgarh">Chhattisgarh</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Manipur">Manipur</option>
                    <option value="Meghalaya">Meghalaya</option>
                    <option value="Mizoram">Mizoram</option>
                    <option value="Nagaland">Nagaland</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Sikkim">Sikkim</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Tripura">Tripura</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Andaman and Nicobar Islands">
                      Andaman and Nicobar Islands
                    </option>
                    <option value="Chandigarh">Chandigarh</option>
                    <option value="Dadra and Nagar Haveli and Daman and Diu">
                      Dadra and Nagar Haveli and Daman and Diu
                    </option>
                    <option value="Lakshadweep">Lakshadweep</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Puducherry">Puducherry</option>
                  </select>
                </div>
                <div className="form-group py-2">
                  <label htmlFor="employmentType">Employment Type</label>
                  <select
                    className="form-control"
                    id="employmentType"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleEmploymentTypeChange}
                  >
                    <option value="">Select Employment Type</option>
                    <option value="Salaried">Salaried</option>
                    <option value="Self-employed">Self-employed</option>
                  </select>
                </div>

                {formData.employmentType === "Salaried" && (
                  <div className="form-group py-2">
                    <label htmlFor="monthlySalary">Monthly Salary</label>
                    <input
                      type="text"
                      className="form-control"
                      id="monthlySalary"
                      name="monthlySalary"
                      value={formData.monthlySalary}
                      onChange={handleInputChange}
                      placeholder="Enter Your Monthly Salary"
                      required
                      aria-describedby="monthlySalaryHelp"
                    />
                    <div id="monthlySalaryHelp" class="form-text">
                      Your monthly Salary should be at least 30000.
                    </div>
                  </div>
                )}

                {formData.employmentType === "Self-employed" && (
                  <div className="form-group py-2">
                    <label htmlFor="haveGST">Do you have valid GST</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="haveGST"
                        id="flexRadioDefault1"
                        value="Yes"
                        checked={formData.haveGST === "Yes"}
                        onChange={haveGST}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Yes
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="haveGST"
                        id="flexRadioDefault2"
                        value="No"
                        checked={formData.haveGST === "No"}
                        onChange={haveGST}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        No
                      </label>
                    </div>
                    {formData.employmentType === "Self-employed" &&
                      showGSTError && (
                        <p style={{ color: "red", marginTop: 5 }}>
                          Sorry, You are not eligible. You should have a valid
                          GST.
                        </p>
                      )}
                  </div>
                )}
                <div className="container mt-5">
                  <div className="row">
                    {(showMoreOptions
                      ? [...checkboxes, ...moreOptions]
                      : checkboxes
                    ).map((item, index) => (
                      <div key={index} className="col-12 col-md-6">
                        <div className="form-check m-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`checkbox-${index}`}
                            value={item}
                            checked={formData.selectedCheckboxes.includes(item)}
                            onChange={handleCheckboxChange}
                            disabled={
                              (formData.employmentType === "Self-employed" &&
                                item === "Personal Loan") ||
                              (formData.employmentType === "Salaried" &&
                                item === "Business Loan")
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`checkbox-${index}`}
                          >
                            {item}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p
                    style={{
                      cursor: "pointer",
                      marginLeft: 10,
                      color: "blue",
                      marginTop: 10,
                    }}
                    onClick={() => setShowMoreOptions(!showMoreOptions)}
                  >
                    {showMoreOptions ? "See less" : "See more"}
                  </p>
                  <button
                    style={{
                      backgroundColor: "#036E8C",
                      width: 160,
                      marginLeft: 100,
                      marginTop: 20,
                    }}
                    type="submit"
                    className="btn text-white mt-3 button_class text-center"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
