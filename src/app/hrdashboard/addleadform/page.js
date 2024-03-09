"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/page";
import Header from "../header/page";

const AddLeadForm = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const router = useRouter();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [formData, setFormData] = useState({
    Status: "Interviewed",
    Candidate_Name: "",
    Father_Husband_Name: "",
    Mobile_No: "",
    Candidate_Email: "",
    Candidate_Location: "",
    experience: "",
    experience_year: "",
    experience_type: "",
    experience_other_type: "",
    hrEmailId: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleExperienceChange = (e) => {
    const { value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      experience: value,
    }));
  };

  const [hrEmailId, setHrEmailId] = useState(null);
  useEffect(() => {
    setHrEmailId(localStorage.getItem("hrEmailId"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      hrEmailId: hrEmailId,
      Mobile_No: `+91${formData.Mobile_No}`,
    };

    fetch("https://api.addrupee.com/api/hr_submit_form_data", {
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
        router("/hrdashboard");

        setFormData({
          Status: "Interviewed",
          Candidate_Name: "",
          Father_Husband_Name: "",
          Mobile_No: "",
          Candidate_Email: "",
          Candidate_Location: "",
          experience: "",
          experience_year: "",
          experience_type: "",
          experience_other_type: "",
        });
      })
      .catch((error) => {
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
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3 col-12 col-lg-6 col-md-6">
                  <label htmlFor="Candidate_Name" className="form-label">
                    Candidate Name*:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Candidate_Name"
                    value={formData.Candidate_Name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3 col-12 col-lg-6 col-md-6">
                  <label htmlFor="Father_Husband_Name" className="form-label">
                    Father/Husband Name*:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Father_Husband_Name"
                    value={formData.Father_Husband_Name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-6 col-md-6">
                  <label htmlFor="Mobile_No" className="form-label">
                    Mobile Number*:
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">+91</span>
                    <input
                      type="tel"
                      className="form-control"
                      name="Mobile_No"
                      pattern="[0-9]{10}"
                      title="Mobile No Number should be a 10-digit numeric value."
                      value={formData.Mobile_No}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3 col-12 col-lg-6 col-md-6">
                  <label htmlFor="Candidate_Email" className="form-label">
                    Email Id*:
                  </label>
                  <input
                    type="Candidate_Email"
                    className="form-control"
                    name="Candidate_Email"
                    value={formData.Candidate_Email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-12 col-lg-6 col-md-6">
                  <label htmlFor="Candidate_Location" className="form-label">
                    Candidate Location*:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="Candidate_Location"
                    value={formData.Candidate_Location}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-12 col-lg-6 col-md-6">
                  <label htmlFor="experience" className="form-label">
                    Experience*:
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    class="form-select"
                    aria-label="Default select example"
                    value={formData.experience}
                    onChange={handleExperienceChange}
                    required
                  >
                    <option selected>Select</option>
                    <option value="Experienced">Experienced</option>
                    <option value="Fresher">Fresher</option>
                  </select>
                </div>
              </div>
              {formData.experience === "Experienced" && (
                <div className="row">
                  <div className="col-12 col-lg-6 mb-3 col-md-6">
                    <label htmlFor="experience_year" className="form-label">
                      Year of Experience*
                    </label>
                    <input
                      type="text"
                      id="experience_year"
                      name="experience_year"
                      className="form-control"
                      value={formData.experience_year}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-12 col-lg-6 mb-3 col-md-6">
                    <label htmlFor="experience_type" className="form-label">
                      Experience Type*
                    </label>
                    <select
                      id="experience_type"
                      name="experience_type"
                      className="form-select"
                      aria-label="Default select example"
                      value={formData.experience_type}
                      onChange={handleChange}
                      required
                    >
                      <option selected>Select</option>
                      <option value="Telesales">Telesales</option>
                      <option value="Finance">Finance</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                </div>
              )}
              {formData.experience === "Experienced" &&
                formData.experience_type === "Others" && (
                  <div className="row">
                    <div className="col-12 col-lg-6 mb-3 col-md-6">
                      <label
                        htmlFor="experience_other_type"
                        className="form-label"
                      >
                        Other Type of Experience*
                      </label>
                      <input
                        type="text"
                        id="experience_other_type"
                        name="experience_other_type"
                        className="form-control"
                        value={formData.experience_other_type}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                )}
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
