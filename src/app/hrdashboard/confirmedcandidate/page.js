"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/page";
import Header from "../header/page";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

const ConfirmedCandidate = () => {
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
    const Status = "Confirmed";
    let data = await fetch(
      `https://api.addrupee.com/api/fetch-confirmedCandidate-data/${hrEmailId}?Status=${Status}&filter=${selectedFilter}`,
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
        `https://api.addrupee.com/api/deleteConfirmedCandidateData/${_id}`,
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
      Status: type === "Blacklisted" ? "Blacklisted" : "Exited",
    });
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
          "https://api.addrupee.com/api/submit-blacklistConfirmedCandidate-data",
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

  const handleExitedCandidateSubmit = () => {
    if (selectedData && formType === "Exited") {
      const blacklistedData = {
        ...selectedData,
        ...formData,
        hrEmailId: hrEmailId,
      };

      axios
        .post(
          "https://api.addrupee.com/api/submit-exitConfirmedCandidate-data",
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
      DOJ: (data.DOJ || "").toLowerCase(),
    };

    return (
      lowercaseData.candidateName.includes(searchString) ||
      lowercaseData.fatherHusbandName.includes(searchString) ||
      lowercaseData.MobileNo.includes(searchString) ||
      lowercaseData.CandidateLocation.includes(searchString) ||
      lowercaseData.experience.includes(searchString) ||
      lowercaseData.CandidateEmail.includes(searchString) ||
      lowercaseData.DOJ.includes(searchString)
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
                    Joining Date
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
                      {new Date(data.DOJ).toLocaleDateString()}
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
                <p>
                  DOB:{" "}
                  {selectedData
                    ? new Date(selectedData.DOB).toLocaleDateString()
                    : ""}
                </p>
                <p>
                  DOJ:{" "}
                  {selectedData
                    ? new Date(selectedData.DOJ).toLocaleDateString()
                    : ""}
                </p>
                <p>
                  Aadhar Card No: {selectedData ? selectedData.Aadhar_No : ""}
                </p>
                <p>
                  Qualification:{" "}
                  {selectedData ? selectedData.Qualification : ""}
                </p>
                <p>
                  Local/Outstation:{" "}
                  {selectedData ? selectedData.Local_Outstation : ""}
                </p>
                <p>Pan Card No: {selectedData ? selectedData.Pan_No : ""}</p>
                <p>Bank Name: {selectedData ? selectedData.Bank_Name : ""}</p>
                <p>
                  Account Number:{" "}
                  {selectedData ? selectedData.Account_Number : ""}
                </p>
                <p>IFSC Code: {selectedData ? selectedData.IFSC_Code : ""}</p>
                <p>Branch Name: {selectedData ? selectedData.Branch : ""}</p>
                <p>Process: {selectedData ? selectedData.Process : ""}</p>
                <p>
                  Designation: {selectedData ? selectedData.Designation : ""}
                </p>
                <p>CTC: {selectedData ? selectedData.CTC : ""}</p>
                <p>In Hand: {selectedData ? selectedData.In_Hand : ""}</p>
                <p>
                  Permanent Address:{" "}
                  {selectedData ? selectedData.Permanent_Address : ""}
                </p>
                <p>
                  Current Address:{" "}
                  {selectedData ? selectedData.Current_Address : ""}
                </p>
                <p>City: {selectedData ? selectedData.City : ""}</p>
                <p>
                  Emergency Contact No:{" "}
                  {selectedData ? selectedData.Emergency_Contact_No : ""}
                </p>
                <p>
                  Contact No Relation:{" "}
                  {selectedData ? selectedData.Contact_No_Relation : ""}
                </p>
                <p>
                  Verification Status:{" "}
                  {selectedData ? selectedData.Verification_Status : ""}
                </p>
                <p>
                  Father/Husband Aadhar No:{" "}
                  {selectedData ? selectedData.Father_Husband_Aadhar_No : ""}
                </p>
                <p>Relation: {selectedData ? selectedData.Relation : ""}</p>
                <p>
                  Father/Husband DOB:{" "}
                  {selectedData
                    ? new Date(
                        selectedData.Father_Husband_DOB
                      ).toLocaleDateString()
                    : ""}
                </p>
                <p>
                  Mother Name: {selectedData ? selectedData.Mother_Name : ""}
                </p>
                <p>
                  Mother Aadhar Card No:{" "}
                  {selectedData ? selectedData.Mother_Aadhar_No : ""}
                </p>
                <p>
                  Mother DOB:{" "}
                  {selectedData
                    ? new Date(selectedData.Mother_DOB).toLocaleDateString()
                    : ""}
                </p>
                <p>
                  Spouse Name: {selectedData ? selectedData.Spouse_Name : ""}
                </p>
                <p>
                  Spouse Aadhar Card No:{" "}
                  {selectedData ? selectedData.Spouse_Aadhar_No : ""}
                </p>
                <p>
                  Spouse DOB:{" "}
                  {selectedData
                    ? new Date(selectedData.Spouse_DOB).toLocaleDateString()
                    : ""}
                </p>
                <p>
                  Applied Date:{" "}
                  {selectedData
                    ? new Date(selectedData.appliedDate).toLocaleDateString()
                    : ""}
                </p>
                <p>Hr Email Id: {selectedData ? selectedData.hrEmailId : ""}</p>
              </div>

              <div className="mb-3">
                <Button
                  variant="success"
                  className="m-3"
                  onClick={() => handleFormTypeChange("Blacklisted")}
                >
                  Blacklist
                </Button>
                <Button
                  variant="danger"
                  className="m-3"
                  onClick={() => handleFormTypeChange("Exited")}
                >
                  Exit
                </Button>
              </div>
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
              {formType === "Exited" && (
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
                        htmlFor="Exit_Date"
                        className="form-label"
                      >
                        Exit Date:
                      </label>
                      <input
                        style={{ fontSize: "14px" }}
                        type="date"
                        className="form-control mb-2"
                        name="Exit_Date"
                        placeholder="Exit Date"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      style={{ fontSize: "14px" }}
                      htmlFor="Exit_Description"
                      className="form-label"
                    >
                      Exit Description:
                    </label>

                    <textarea
                      className="form-control mb-2"
                      name="Exit_Description"
                      placeholder="Exit Description"
                      rows="3"
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <Button
                    variant="primary"
                    onClick={handleExitedCandidateSubmit}
                  >
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

export default ConfirmedCandidate;
