"use client";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { MdDelete } from "react-icons/md";
import { FaEye, FaDownload } from "react-icons/fa";
import { format } from "date-fns";
import Sidebar from "../../sidebar/page";
import Header from "../../header/page";

const CibilData = () => {
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

  const fetchAlldata = async () => {
    let data = await fetch(`https://api.addrupee.com/api/get_cibilIssue_data`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    let result = await data.json();
    console.log(result);
    if (!Array.isArray(result)) {
      console.log("API response is not an array:", result);
      return;
    }
    setData(result);
    console.log(result);
  };

  const handleCustomerLoanDataDelete = async (_id) => {
    try {
      const response = await fetch(
        `https://api.addrupee.com/api/delete_cibilIssue_data/${_id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();

      if (response.status === 200) {
        console.log(result.message);
        fetchAlldata();
      } else {
        console.error("Error deleting data:", result.error);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    fetchAlldata();
  }, []);

  useEffect(() => {
    const sorted = [...allData].sort((a, b) => {
      const dateA = new Date(a.applyDate);
      const dateB = new Date(b.applyDate);

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
      Customer_Name: data.Customer_Name ? data.Customer_Name.toLowerCase() : "",
      Father_Name: data.Father_Name ? data.Father_Name.toLowerCase() : "",
      Mother_Name: data.Mother_Name ? data.Mother_Name.toLowerCase() : "",
      Mobile_No: data.Mobile_No ? data.Mobile_No.toLowerCase() : "",
      email: data.email ? data.email.toLowerCase() : "",
      Pan_No: data.Pan_No ? data.Pan_No.toLowerCase() : "",
      Customer_Location: data.Customer_Location
        ? data.Customer_Location.toLowerCase()
        : "",
      Company_Name: data.Company_Name ? data.Company_Name.toLowerCase() : "",
      dob: data.dob ? data.dob.toLowerCase() : "",
      Monthly_Salary: data.Monthly_Salary
        ? data.Monthly_Salary.toLowerCase()
        : "",
      Resi_Status: data.Resi_Status ? data.Resi_Status.toLowerCase() : "",
    };

    return (
      lowercaseData.Customer_Name.includes(searchString) ||
      lowercaseData.Father_Name.includes(searchString) ||
      lowercaseData.Mother_Name.includes(searchString) ||
      lowercaseData.Mobile_No.includes(searchString) ||
      lowercaseData.email.includes(searchString) ||
      lowercaseData.Pan_No.includes(searchString) ||
      lowercaseData.Customer_Location.includes(searchString) ||
      lowercaseData.Company_Name.includes(searchString) ||
      lowercaseData.dob.includes(searchString) ||
      lowercaseData.Monthly_Salary.includes(searchString) ||
      lowercaseData.Resi_Status.includes(searchString)
    );
  });

  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

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
                      Customer Name{" "}
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Father Name{" "}
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Pan No.
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Customer Location
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Company Name{" "}
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      DOB
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Monthly Salary.
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Resi Status
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
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((data, index) => (
                    <tr key={index} onClick={() => handleRowClick(data)}>
                      <td style={{ fontSize: "14px" }}>
                        {startIndex + index + 1}
                      </td>
                      <td style={{ fontSize: "14px" }}>{data.Customer_Name}</td>
                      <td style={{ fontSize: "14px" }}>{data.Father_Name}</td>
                      <td style={{ fontSize: "14px" }}>{data.Pan_No}</td>
                      <td style={{ fontSize: "14px" }}>
                        {data.Customer_Location}
                      </td>
                      <td style={{ fontSize: "14px" }}>{data.Company_Name}</td>
                      <td style={{ fontSize: "14px" }}>{data.dob}</td>
                      <td style={{ fontSize: "14px" }}>
                        {data.Monthly_Salary}
                      </td>
                      <td style={{ fontSize: "14px" }}>{data.Resi_Status}</td>
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
                        <div
                          className="m-2"
                          style={{
                            color: "red",
                            backgroundColor: "transparent",
                            fontSize: "22px",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onClick={() => handleCustomerLoanDataDelete(data._id)}
                        >
                          <MdDelete />
                        </div>
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
                      Loan Data
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
                        <p>Customer Name: {selectedRowData.Customer_Name}</p>
                        <p>Father Name: {selectedRowData.Father_Name}</p>
                        <p>Mother Name: {selectedRowData.Mother_Name}</p>
                        <p>Mobile: {selectedRowData.Mobile_No}</p>
                        <p>Email : {selectedRowData.email}</p>
                        <p>Pan No : {selectedRowData.Pan_No}</p>
                        <p>Location.: {selectedRowData.Customer_Location}</p>
                        <p>Company Name: {selectedRowData.Company_Name}</p>

                        <p>dob : {selectedRowData.dob}</p>
                        <p>Monthly Salary.: {selectedRowData.Monthly_Salary}</p>
                        <p>Resi Status: {selectedRowData.Resi_Status}</p>
                        <p>
                          Applied Date:{" "}
                          {format(
                            new Date(selectedRowData.appliedDate),
                            "dd/MM/yyyy"
                          )}
                        </p>
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

export default CibilData;
