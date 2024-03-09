"use client";
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { MdDelete } from "react-icons/md";
import { FaEye, FaDownload } from "react-icons/fa";
import Sidebar from "../../sidebar/page";
import Header from "../../header/page";

const LoanData = () => {
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
    let data = await fetch(`https://api.addrupee.com/api/get_cust_loan_data`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    let result = await data.json();
    if (!Array.isArray(result)) {
      return;
    }
    setData(result);
  };

  const handleCustomerLoanDataDelete = async (_id) => {
    try {
      const response = await fetch(
        `https://api.addrupee.com/api/delete_cust_loan_data/${_id}`,
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

  useEffect(() => {
    fetchAlldata();
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
      customerName: data.customerName ? data.customerName.toLowerCase() : "",
      companyName: data.companyName ? data.companyName.toLowerCase() : "",
      panCard: data.panCardNo ? data.panCardNo.toLowerCase() : "",
      aadharCardNo: data.AadharCardNo ? data.AadharCardNo.toLowerCase() : "",
      location: data.customerLocation
        ? data.customerLocation.toLowerCase()
        : "",
      loanType: data.loanType ? data.loanType.toLowerCase() : "",
      appliedBank: data.bankName ? data.bankName.toLowerCase() : "",
      mobileNo: data.mobileNo ? data.mobileNo.toLowerCase() : "",
      mailId: data.mailId ? data.mailId.toLowerCase() : "",
      appliedDate: data.appliedDate ? data.appliedDate.toLowerCase() : "",
      appliedAmount: data.appliedAmount ? data.appliedAmount.toLowerCase() : "",
    };

    return (
      lowercaseData.customerName.includes(searchString) ||
      lowercaseData.companyName.includes(searchString) ||
      lowercaseData.panCard.includes(searchString) ||
      lowercaseData.aadharCardNo.includes(searchString) ||
      lowercaseData.location.includes(searchString) ||
      lowercaseData.loanType.includes(searchString) ||
      lowercaseData.appliedBank.includes(searchString) ||
      lowercaseData.mobileNo.includes(searchString) ||
      lowercaseData.mailId.includes(searchString) ||
      lowercaseData.appliedAmount.includes(searchString) ||
      lowercaseData.appliedDate.includes(searchString)
    );
  });

  const startIndex = pageIndex * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Download the csv File with xlsx
  const handleDownload = () => {
    const fieldsToExclude = ["_id", "__v"];

    const filteredDataWithoutFieldsToExclude = filteredData.map((data) => {
      const newData = { ...data };
      fieldsToExclude.forEach((field) => delete newData[field]);
      newData.appliedDate = new Date(data.appliedDate).toLocaleDateString(
        "en-GB"
      );
      return newData;
    });

    const ws = XLSX.utils.json_to_sheet(filteredDataWithoutFieldsToExclude);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    const userConfirmed = window.confirm(
      "Are you sure you want to download the file?"
    );

    if (userConfirmed) {
      XLSX.writeFile(wb, "data.xlsx");
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
                      Company Name
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Pan No.
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Aadhar No.
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Applied Bank
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Location
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Loan Type
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Applied Amount
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
                      <td style={{ fontSize: "14px" }}>{data.customerName}</td>
                      <td style={{ fontSize: "14px" }}>{data.companyName}</td>
                      <td style={{ fontSize: "14px" }}>{data.panCardNo}</td>
                      <td style={{ fontSize: "14px" }}>{data.AadharCardNo}</td>
                      <td style={{ fontSize: "14px" }}>{data.bankName}</td>
                      <td style={{ fontSize: "14px" }}>
                        {data.customerLocation}
                      </td>
                      <td style={{ fontSize: "14px" }}>{data.loanType}</td>
                      <td style={{ fontSize: "14px" }}>{data.appliedAmount}</td>
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
                      Customer Loan Data
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
                        <p>Customer Name: {selectedRowData.customerName}</p>
                        <p>Company Name: {selectedRowData.companyName}</p>
                        <p>Pan No: {selectedRowData.panCardNo}</p>
                        <p>Aadhar Card No: {selectedRowData.AadharCardNo}</p>
                        <p>Location: {selectedRowData.customerLocation}</p>
                        <p>Loan Type: {selectedRowData.loanType}</p>
                        <p>Applied Bank: {selectedRowData.bankName}</p>
                        <p>Mail Id: {selectedRowData.mailId}</p>
                        <p>Mobile No.: {selectedRowData.mobileNo}</p>
                        <p>Applied Amount: {selectedRowData.appliedAmount}</p>
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

export default LoanData;
