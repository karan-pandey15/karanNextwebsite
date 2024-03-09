"use client";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { FaEye, FaDownload } from "react-icons/fa";
import Sidebar from "../../sidebar/page";
import Header from "../../header/page";

const CareerData = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [allData, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleRowClick = (rowData) => {
    setSelectedRowData(rowData);
  };

  const fetchCareerFormData = async () => {
    try {
      const response = await fetch(
        "https://api.addrupee.com/api/get_career_form",
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error("Failed to fetch career form data");

        alert("Failed to fetch career form data. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);

      alert(
        "An error occurred while fetching career form data. Please try again."
      );
    }
  };

  const handleDownloadCV = async (cvId) => {
    try {
      const response = await fetch(
        `https://api.addrupee.com/api/get_cv/${cvId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        const blob = await response.blob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error("Failed to fetch CV data");
        alert("Failed to fetch CV data. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching CV data. Please try again.");
    }
  };

  // Download the XLSX file
  const handleDownload = () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to download the file?"
    );

    if (userConfirmed) {
      const filteredDataWithoutIdAndV = filteredData.map(
        ({ _id, __v, Upload_Date, ...rest }) => rest
      );

      const dataArray = filteredDataWithoutIdAndV.map((item) =>
        Object.values(item)
      );

      const headers = Object.keys(filteredDataWithoutIdAndV[0]);
      dataArray.unshift(headers);

      const worksheet = XLSX.utils.aoa_to_sheet(dataArray);
      const book = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(book, worksheet, "Sheet 1");
      XLSX.writeFile(book, "data.xlsx");
    } else {
      alert("Download canceled.");
    }
  };

  useEffect(() => {
    fetchCareerFormData();
  }, []);

  useEffect(() => {
    const sorted = [...allData].sort((a, b) => {
      const dateA = new Date(a.appliedDate);
      const dateB = new Date(b.appliedDate);

      const compareResult = dateB - dateA;
      return sortOrder === "asc" ? compareResult : -compareResult;
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
      JobApplier_Name: data.JobApplier_Name
        ? data.JobApplier_Name.toLowerCase()
        : "",
      Father_Name: data.Father_Name ? data.Father_Name.toLowerCase() : "",
      Mobile_No: data.Mobile_No ? data.Mobile_No.toLowerCase() : "",
      email: data.email ? data.email.toLowerCase() : "",
      JobApplier_Location: data.JobApplier_Location
        ? data.JobApplier_Location.toLowerCase()
        : "",
      experience: data.experience ? data.experience.toLowerCase() : "",
      experiene_year: data.experiene_year
        ? data.experiene_year.toLowerCase()
        : "",
      experiene_type: data.experiene_type
        ? data.experiene_type.toLowerCase()
        : "",
      appliedDate: data.appliedDate ? data.appliedDate.toLowerCase() : "",
    };

    return (
      lowercaseData.JobApplier_Name.includes(searchString) ||
      lowercaseData.Father_Name.includes(searchString) ||
      lowercaseData.Mobile_No.includes(searchString) ||
      lowercaseData.email.includes(searchString) ||
      lowercaseData.JobApplier_Location.includes(searchString) ||
      lowercaseData.experience.includes(searchString) ||
      lowercaseData.experiene_year.includes(searchString) ||
      lowercaseData.experiene_type.includes(searchString) ||
      lowercaseData.appliedDate.includes(searchString)
    );
  });

  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);
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
                {allData.length > 0 ? (
                  <div className="btn btn-danger" onClick={handleDownload}>
                    <span
                      style={{
                        display: "inline-flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      Download
                      <FaDownload
                        style={{ paddingLeft: "5px", fontSize: "18px" }}
                      />
                    </span>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th style={{ fontSize: "14px" }} scope="col">
                      S. No.
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Job Applier Name
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Father Name
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Email
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Location
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Experience
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Experience Type
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Experience Year
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
                    <th style={{ fontSize: "14px" }} scope="col">
                      Download CV
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((data, index) => (
                    <tr key={index} onClick={() => handleRowClick(data)}>
                      <td style={{ fontSize: "14px" }}>
                        {startIndex + index + 1}
                      </td>
                      <td style={{ fontSize: "14px" }}>
                        {data.JobApplier_Name}
                      </td>
                      <td style={{ fontSize: "14px" }}>{data.Father_Name}</td>
                      <td style={{ fontSize: "14px" }}>{data.email}</td>
                      <td style={{ fontSize: "14px" }}>
                        {data.JobApplier_Location}
                      </td>
                      <td style={{ fontSize: "14px" }}>{data.experience}</td>
                      <td style={{ fontSize: "14px" }}>
                        {data.experiene_type}
                      </td>
                      <td style={{ fontSize: "14px" }}>
                        {data.experiene_year}
                      </td>
                      <td style={{ fontSize: "14px" }}>
                        {format(new Date(data.appliedDate), "dd/MM/yyyy")}
                      </td>
                      <td style={{ fontSize: "14px" }}>
                        <button
                          type="button"
                          style={{
                            backgroundColor: "transparent",
                            fontSize: "22px",
                            border: "none",
                            color: "darkblue",
                          }}
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <FaEye />
                        </button>
                      </td>
                      <td style={{ fontSize: "14px" }}>
                        {data.Upload_CV ? (
                          <button
                            type="button"
                            className="m-2"
                            style={{
                              color: "red",
                              backgroundColor: "transparent",
                              fontSize: "22px",
                              border: "none",
                              cursor: "pointer",
                            }}
                            onClick={() => handleDownloadCV(data._id)}
                          >
                            <FaDownload />
                          </button>
                        ) : (
                          <button
                            type="button"
                            style={{
                              color: "red",
                              backgroundColor: "transparent",
                              fontSize: "22px",
                              border: "none",
                              cursor: "not-allowed",
                            }}
                            disabled
                            title="CV not available"
                          >
                            <FaDownload />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* <!-- Modal --> */}
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Career Form Data
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
                        <p>
                          Job Applier Name: {selectedRowData.JobApplier_Name}
                        </p>
                        <p>Father Name: {selectedRowData.Father_Name}</p>
                        <p>Mobile No: {selectedRowData.Mobile_No}</p>
                        <p>Email: {selectedRowData.email}</p>
                        <p>
                          Job Applier Location:{" "}
                          {selectedRowData.JobApplier_Location}
                        </p>
                        <p>Experience: {selectedRowData.experience}</p>
                        <p>Experience Year: {selectedRowData.experiene_year}</p>
                        <p>Experience Type: {selectedRowData.experiene_type}</p>
                        <p>Applied Date: {selectedRowData.appliedDate}</p>
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
    </>
  );
};

export default CareerData;
