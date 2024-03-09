"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/page";
import Header from "../header/page";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const SallaryOfferedCandidate = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("from1to31");

  const [allData, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [formData, setFormData] = useState({});
  const [formType, setFormType] = useState("");

  const [searchItem, setSearchItem] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const [hrEmailId, setHrEmailId] = useState(null);
  useEffect(() => {
    setHrEmailId(localStorage.getItem("hrEmailId"));
  }, []);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const fetchAlldata = async () => {
    const Status = "Interviewed";
    let data = await fetch(
      `https://api.addrupee.com/api/hr_salary_offered_candidate/${hrEmailId}?Status=${Status}&filter=${selectedFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setData(result);
  };

  const handleDelete = async (_id) => {
    try {
      const response = await fetch(
        `https://api.addrupee.com/api/deleteSalaryOfferedData/${_id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();

      if (response.status === 200) {
        fetchAlldata();
      } else {
        console.error("Error deleting data:", result.error);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleOpenModal = (data) => {
    setSelectedData(data);
    setShowModal(true);
    setFormType("");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormTypeChange = (type) => {
    setFormType(type);
    setFormData({
      ...formData,
      // Status: type === "Rejected" ? "Rejected" : "Confirmed",
      Status:
        type === "Rejected"
          ? "Rejected"
          : type === "Confirmed"
          ? "Confirmed"
          : "Blacklisted",
    });
  };

  const handleConfirmedSubmit = () => {
    if (selectedData && formType === "Confirmed") {
      const confirmedData = {
        ...selectedData,
        ...formData,
        hrEmailId: hrEmailId,
      };

      axios
        .post(
          "https://api.addrupee.com/api/submit-confirmedCandidate-data",
          confirmedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            handleDelete(selectedData._id);
            handleCloseModal();
          } else {
            console.error("Error submitting data");
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        });
    } else {
      console.error("Invalid data for submission");
    }
  };

  const handleRejectedSubmit = () => {
    if (selectedData && formType === "Rejected") {
      const rejectedData = {
        ...selectedData,
        ...formData,
        hrEmailId: hrEmailId,
      };

      axios
        .post(
          "https://api.addrupee.com/api/submit-rejectedCandidate-data",
          rejectedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            handleDelete(selectedData._id);
            handleCloseModal();
          } else {
            console.error("Error submitting data");
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        });
    } else {
      console.error("Invalid data for submission");
    }
  };
  const handleBlacklistedSubmit = () => {
    if (selectedData && formType === "Blacklisted") {
      const blacklistedData = {
        ...selectedData,
        ...formData,
        hrEmailId: hrEmailId,
      };

      axios
        .post(
          "https://api.addrupee.com/api/submit-blacklistedCandidate-data",
          blacklistedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            handleDelete(selectedData._id);
            handleCloseModal();
          } else {
            console.error("Error submitting data");
          }
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        });
    } else {
      console.error("Invalid data for submission");
    }
  };

  useEffect(() => {
    fetchAlldata();
  }, [hrEmailId, selectedFilter]);

  useEffect(() => {
    const sorted = [...allData].sort((a, b) => {
      const dateA = new Date(a.appliedDate);
      const dateB = new Date(b.appliedDate);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setSortedData(sorted);
  }, [allData, sortOrder]);

  const handleSort = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  const filteredData = sortedData.filter((data) => {
    const searchString = searchItem.toLowerCase();

    const lowercaseData = {
      candidateName: (data.Candidate_Name || "").toLowerCase(),
      fatherHusbandName: (data.Father_Husband_Name || "").toLowerCase(),
      MobileNo: (data.Mobile_No || "").toLowerCase(),
      CandidateLocation: (data.Candidate_Location || "").toLowerCase(),
      experience: (data.experience || "").toLowerCase(),
      CandidateEmail: (data.Candidate_Email || "").toLowerCase(),
      appliedDate: (data.appliedDate || "").toLowerCase(),
    };

    return (
      lowercaseData.candidateName.includes(searchString) ||
      lowercaseData.fatherHusbandName.includes(searchString) ||
      lowercaseData.MobileNo.includes(searchString) ||
      lowercaseData.CandidateLocation.includes(searchString) ||
      lowercaseData.experience.includes(searchString) ||
      lowercaseData.CandidateEmail.includes(searchString) ||
      lowercaseData.appliedDate.includes(searchString)
    );
  });

  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

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
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 mb-2">
              <input
                className="form-control"
                type="search"
                placeholder="Search..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
              />
            </div>
            <div className="col-lg-6 col-md-6 col-12 mb-2">
              <select
                className="form-select"
                onChange={(e) => setSelectedFilter(e.target.value)}
                value={selectedFilter}
              >
                <option value="from1to31" selected>
                  Select Date Filter
                </option>
                <option value="lastday">From Last Day</option>
                <option value="last7days">From Last 7 Days</option>
                <option value="last30days">From Last 30 Days</option>
                <option value="all">All Data</option>
              </select>
            </div>
          </div>
          <div class="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th style={{ fontSize: "14px" }} scope="col">
                    S. No.
                  </th>
                  <th style={{ fontSize: "14px" }} scope="col">
                    Candidate Name
                  </th>
                  <th style={{ fontSize: "14px" }} scope="col">
                    Father/Husband Name
                  </th>
                  <th style={{ fontSize: "14px" }} scope="col">
                    Mobile No.
                  </th>
                  <th style={{ fontSize: "14px" }} scope="col">
                    Candidate Email
                  </th>
                  <th style={{ fontSize: "14px" }} scope="col">
                    Location
                  </th>
                  <th style={{ fontSize: "14px" }} scope="col">
                    Experience
                  </th>
                  <th style={{ fontSize: "14px" }} scope="col">
                    Applied Date
                    <span style={{ cursor: "pointer" }} onClick={handleSort}>
                      {sortOrder === "asc" ? " ⬆" : " ⬇"}
                    </span>
                  </th>
                  <th style={{ fontSize: "14px" }} scope="col">
                    View
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((data, index) => (
                  <tr key={index}>
                    <td style={{ fontSize: "14px" }}>
                      {startIndex + index + 1}
                    </td>
                    <td style={{ fontSize: "14px" }}>{data.Candidate_Name}</td>
                    <td style={{ fontSize: "14px" }}>
                      {data.Father_Husband_Name}
                    </td>
                    <td style={{ fontSize: "14px" }}>{data.Mobile_No}</td>
                    <td style={{ fontSize: "14px" }}>{data.Candidate_Email}</td>
                    <td style={{ fontSize: "14px" }}>
                      {data.Candidate_Location}
                    </td>
                    <td style={{ fontSize: "14px" }}>{data.experience}</td>
                    <td style={{ fontSize: "14px" }}>
                      {new Date(data.appliedDate).toLocaleDateString()}
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => handleOpenModal(data)}
                      >
                        {data.Status}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <!-- Modal --> */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                Candidate: {selectedData ? selectedData.Candidate_Name : ""}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="firstDiv">
                <p>
                  Candidate Name:{" "}
                  {selectedData ? selectedData.Candidate_Name : ""}
                </p>
                <p>
                  Father/Husband Name:{" "}
                  {selectedData ? selectedData.Father_Husband_Name : ""}
                </p>
                <p>Mobile No: {selectedData ? selectedData.Mobile_No : ""}</p>
                <p>
                  Candidate Email:{" "}
                  {selectedData ? selectedData.Candidate_Email : ""}
                </p>
                <p>
                  Candidate Location:{" "}
                  {selectedData ? selectedData.Candidate_Location : ""}
                </p>
                <p>Experience: {selectedData ? selectedData.experience : ""}</p>
                <p>
                  Experiene Year:{" "}
                  {selectedData ? selectedData.experience_year : ""}
                </p>
                <p>
                  Experiene Type:{" "}
                  {selectedData ? selectedData.experience_type : ""}
                </p>
                <p>
                  Experiene Other Type:{" "}
                  {selectedData ? selectedData.experience_other_type : ""}
                </p>
              </div>

              <div className="mb-3">
                <Button
                  variant="primary"
                  className="m-3"
                  onClick={() => handleFormTypeChange("Confirmed")}
                >
                  Confirm
                </Button>
                <Button
                  variant="danger"
                  className="m-3"
                  onClick={() => handleFormTypeChange("Rejected")}
                >
                  Reject
                </Button>
                <Button
                  variant="success"
                  className="m-3"
                  onClick={() => handleFormTypeChange("Blacklisted")}
                >
                  Blacklist
                </Button>
              </div>

              {formType === "Confirmed" && (
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Status"
                        className="form-label"
                      >
                        Status:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Status"
                        value={formData.Status}
                        onChange={handleInputChange}
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="DOB"
                        className="form-label"
                      >
                        DOB:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="date"
                        className="form-control mb-2"
                        name="DOB"
                        placeholder="DOB"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="DOJ"
                        className="form-label"
                      >
                        DOJ:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="date"
                        className="form-control mb-2"
                        name="DOJ"
                        placeholder="DOJ"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Aadhar_No"
                        className="form-label"
                      >
                        Aadhar No:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Aadhar_No"
                        placeholder="Aadhar No"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Qualification"
                        className="form-label"
                      >
                        Qualification:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Qualification"
                        placeholder="Qualification"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Local_Outstation"
                        className="form-label"
                      >
                        Local/Outstation:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Local_Outstation"
                        placeholder="Local/Outstation"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Pan_No"
                        className="form-label"
                      >
                        Pan No:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Pan_No"
                        placeholder="Pan No"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Bank_Name"
                        className="form-label"
                      >
                        Bank Name:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Bank_Name"
                        placeholder="Bank Name"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Account_Number"
                        className="form-label"
                      >
                        Account Number:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Account_Number"
                        placeholder="Account Number"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="IFSC_Code"
                        className="form-label"
                      >
                        IFSC Code:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="IFSC_Code"
                        placeholder="IFSC Code"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Branch"
                        className="form-label"
                      >
                        Branch:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Branch"
                        placeholder="Branch"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Process"
                        className="form-label"
                      >
                        Process:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Process"
                        placeholder="Process"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Designation"
                        className="form-label"
                      >
                        Designation:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Designation"
                        placeholder="Designation"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="CTC"
                        className="form-label"
                      >
                        CTC:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="CTC"
                        placeholder="CTC"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="In_Hand"
                        className="form-label"
                      >
                        In Hand:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="In_Hand"
                        placeholder="In Hand"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Permanent_Address"
                        className="form-label"
                      >
                        Permanent Address:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Permanent_Address"
                        placeholder="Permanent Address"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Current_Address"
                        className="form-label"
                      >
                        Current Address:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Current_Address"
                        placeholder="Current Address"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="City"
                        className="form-label"
                      >
                        City:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="City"
                        placeholder="City"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Emergency_Contact_No"
                        className="form-label"
                      >
                        Emergency Contact No:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Emergency_Contact_No"
                        placeholder="Emergency Contact No"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Contact_No_Relation"
                        className="form-label"
                      >
                        Contact No. Relation:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Contact_No_Relation"
                        placeholder="Contact No. Relation"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Verification_Status"
                        className="form-label"
                      >
                        Verification Status:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Verification_Status"
                        placeholder="Verification Status"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Father_Husband_Aadhar_No"
                        className="form-label"
                      >
                        Father/Husband Aadhar No:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Father_Husband_Aadhar_No"
                        placeholder="Father/Husband Aadhar No"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Relation"
                        className="form-label"
                      >
                        Relation:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Relation"
                        placeholder="Relation"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Father_Husband_DOB"
                        className="form-label"
                      >
                        Father/Husband DOB:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="date"
                        className="form-control mb-2"
                        name="Father_Husband_DOB"
                        placeholder="Father/Husband DOB"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Mother_Name"
                        className="form-label"
                      >
                        Mother Name:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Mother_Name"
                        placeholder="Mother Name"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Mother_Aadhar_No"
                        className="form-label"
                      >
                        Mother Aadhar No:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Mother_Aadhar_No"
                        placeholder="Mother Aadhar No"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Mother_DOB"
                        className="form-label"
                      >
                        Mother DOB:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="date"
                        className="form-control mb-2"
                        name="Mother_DOB"
                        placeholder="Mother DOB"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Spouse_Name"
                        className="form-label"
                      >
                        Spouse Name:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Spouse_Name"
                        placeholder="Spouse Name"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Spouse_Aadhar_No"
                        className="form-label"
                      >
                        Spouse Aadhar No:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Spouse_Aadhar_No"
                        placeholder="Spouse Aadhar No"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Spouse_DOB"
                        className="form-label"
                      >
                        Spouse DOB:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="date"
                        className="form-control mb-2"
                        name="Spouse_DOB"
                        placeholder="Spouse DOB"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <Button variant="primary" onClick={handleConfirmedSubmit}>
                    Submit
                  </Button>
                </div>
              )}

              {formType === "Rejected" && (
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Status"
                        className="form-label"
                      >
                        Status:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Status"
                        value={formData.Status}
                        onChange={handleInputChange}
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Rejection_Date"
                        className="form-label"
                      >
                        Rejection Date:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="date"
                        className="form-control mb-2"
                        name="Rejection_Date"
                        placeholder="Rejection Date"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      style={{ fontSize: "14px" }}
                      htmlFor="Rejection_Remark"
                      className="form-label"
                    >
                      Rejection Category:
                    </label>

                    <select
                      type="text"
                      className="form-control mb-2"
                      name="Rejection_Remark"
                      onChange={handleInputChange}
                    >
                      <option selected disabled>
                        Select Rejection Category
                      </option>
                      <option value="Less Salary Offered">
                        Less Salary Offered
                      </option>
                      <option value="Offered accepted but not join">
                        Offered accepted but not join
                      </option>
                      <option value="Left job after joining">
                        Left job after joining
                      </option>
                      <option value="Need time to join">
                        Need time to join
                      </option>
                      <option value="Blacklisted">Blacklisted</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      style={{ fontSize: "14px" }}
                      htmlFor="Rejection_Description"
                      className="form-label"
                    >
                      Rejection Description:
                    </label>

                    <textarea
                      className="form-control mb-2"
                      name="Rejection_Description"
                      placeholder="Rejection Description"
                      rows="3"
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <Button variant="primary" onClick={handleRejectedSubmit}>
                    Submit
                  </Button>
                </div>
              )}
              {formType === "Blacklisted" && (
                <div className="container">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Status"
                        className="form-label"
                      >
                        Status:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        className="form-control mb-2"
                        name="Status"
                        value={formData.Status}
                        onChange={handleInputChange}
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-lg-6">
                      <label
                        style={{ fontSize: "14px" }}
                        htmlFor="Blacklist_Date"
                        className="form-label"
                      >
                        Blacklist Date:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="date"
                        className="form-control mb-2"
                        name="Blacklist_Date"
                        placeholder="Blacklist Date"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      style={{ fontSize: "14px" }}
                      htmlFor="Blacklist_Description"
                      className="form-label"
                    >
                      Blacklist Description:
                    </label>

                    <textarea
                      className="form-control mb-2"
                      name="Blacklist_Description"
                      placeholder="Blacklist Description"
                      rows="3"
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <Button variant="primary" onClick={handleBlacklistedSubmit}>
                    Submit
                  </Button>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <div style={{ textAlign: "center" }}>
            <button
              style={{
                cursor: pageIndex === 0 ? "not-allowed" : "pointer",
                border: "none",
                color: pageIndex === 0 ? "black" : "white",
                backgroundColor: pageIndex === 0 ? "lightgray" : "black",
                borderRadius: "6px",
                marginRight: "4px",
              }}
              onClick={() => handlePageChange(pageIndex - 1)}
              disabled={pageIndex === 0}
            >
              Prev
            </button>
            <span>
              <strong>{pageIndex + 1}</strong> of{" "}
              {Math.ceil(filteredData.length / pageSize)}
            </span>
            <button
              style={{
                cursor:
                  endIndex >= filteredData.length ? "not-allowed" : "pointer",
                border: "none",
                color: endIndex >= filteredData.length ? "black" : "white",
                backgroundColor:
                  endIndex >= filteredData.length ? "lightgray" : "black",
                borderRadius: "6px",
                marginLeft: "4px",
              }}
              onClick={() => handlePageChange(pageIndex + 1)}
              disabled={endIndex >= filteredData.length}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SallaryOfferedCandidate;
