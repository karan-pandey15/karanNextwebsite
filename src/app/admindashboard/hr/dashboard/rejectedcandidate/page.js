"use client";
import Header from "@/app/admindashboard/header/page";
import Sidebar from "@/app/admindashboard/sidebar/page";
import React, { useState, useEffect } from "react";

const RejectedCandidate = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("from1to31");

  const [allData, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const [selectedRowData, setSelectedRowData] = useState(null);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
  };

  const [hrEmailId, setHrEmailId] = useState(null);
  useEffect(() => {
    setHrEmailId(localStorage.getItem("hrEmailId"));
  }, []);

  useEffect(() => {
    const fetchAlldata = async () => {
      const Status = "Rejected";
      let data = await fetch(
        `https://api.addrupee.com/api/fetch-rejectedCandidate-data/${hrEmailId}?Status=${Status}&filter=${selectedFilter}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      let result = await data.json();
      setData(result);
    };

    fetchAlldata();
  }, [hrEmailId, selectedFilter]);

  useEffect(() => {
    const sorted = [...allData].sort((a, b) => {
      const dateA = new Date(a.Rejection_Date);
      const dateB = new Date(b.Rejection_Date);
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
      Rejection_Date: (data.Rejection_Date || "").toLowerCase(),
    };

    return (
      lowercaseData.candidateName.includes(searchString) ||
      lowercaseData.fatherHusbandName.includes(searchString) ||
      lowercaseData.MobileNo.includes(searchString) ||
      lowercaseData.CandidateLocation.includes(searchString) ||
      lowercaseData.experience.includes(searchString) ||
      lowercaseData.CandidateEmail.includes(searchString) ||
      lowercaseData.Rejection_Date.includes(searchString)
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
                    Rejection Date
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
                  <tr key={index} onClick={() => handleRowClick(data)}>
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
                      {new Date(data.Rejection_Date).toLocaleDateString()}
                    </td>
                    <td style={{ fontSize: "14px" }}>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
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
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Rejected Candidate
                  </h1>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  {selectedRowData && (
                    <div>
                      <p>Candidate Name: {selectedRowData.Candidate_Name}</p>
                      <p>
                        Father/Husband Name:{" "}
                        {selectedRowData.Father_Husband_Name}
                      </p>
                      <p>Mobile No: {selectedRowData.Mobile_No}</p>
                      <p>Candidate Email: {selectedRowData.Candidate_Email}</p>
                      <p>
                        Candidate Location: {selectedRowData.Candidate_Location}
                      </p>
                      <p>Experience: {selectedRowData.experience}</p>
                      <p>Experiene Year: {selectedRowData.experience_year}</p>
                      <p>Experiene Type: {selectedRowData.experience_type}</p>
                      <p>
                        Experiene Other Type:{" "}
                        {selectedRowData.experience_other_type}
                      </p>
                      <p>
                        Rejection Date:{" "}
                        {new Date(
                          selectedRowData.Rejection_Date
                        ).toLocaleDateString()}
                      </p>
                      <p>
                        Rejection Remark: {selectedRowData.Rejection_Remark}
                      </p>
                      <p>
                        Rejection Description:{" "}
                        {selectedRowData.Rejection_Description}
                      </p>
                      <p>
                        Applied Date:{" "}
                        {new Date(
                          selectedRowData.appliedDate
                        ).toLocaleDateString()}
                      </p>
                      <p>Hr Email Id: {selectedRowData.hrEmailId}</p>
                    </div>
                  )}
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
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

export default RejectedCandidate;
