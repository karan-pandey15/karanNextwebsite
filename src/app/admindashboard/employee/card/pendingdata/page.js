"use client";
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as XLSX from "xlsx";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaDownload } from "react-icons/fa";
import Sidebar from "@/app/admindashboard/sidebar/page";
import Header from "@/app/admindashboard/header/page";

const PendingData = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("from1to31");
  const [selectedBankFilter, setSelectedBankFilter] = useState("all");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
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

  const fetchAlldata = async () => {
    const Status = "Pending";
    let data = await fetch(
      `https://api.addrupee.com/api/getCardpendingadmindatas/${Status}?filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
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
        `https://api.addrupee.com/api/card_deletePendingData/${_id}`,
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

  const handleAdminDelete = async (_id) => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to delete this data?"
      );

      if (isConfirmed) {
        const response = await fetch(
          `https://api.addrupee.com/api/deleteCardadminPendingData/${_id}`,
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
      } else {
        console.log("Deletion canceled");
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
      Status: type === "Rejected" ? "Rejected" : "Disbursed",
    });
  };

  const handleSubmit = () => {
    if (selectedData && formType === "Approved") {
      const approvedData = {
        ...selectedData,
        ...formData,
      };

      axios
        .post(
          "https://api.addrupee.com/api/card_submit-approved-data",
          approvedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            console.log("Data submitted successfully");
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

  const handleRejectSubmit = () => {
    if (selectedData && formType === "Rejected") {
      const approvedData = {
        ...selectedData,
        ...formData,
      };

      axios
        .post(
          "https://api.addrupee.com/api/card_submit-rejct-data",
          approvedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            handleDelete(selectedData._id);
            console.log("Data submitted successfully");

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
  }, [selectedFilter, selectedBankFilter]);

  useEffect(() => {
    const sorted = [...allData].sort((a, b) => {
      const dateA = new Date(a.Upload_Date);
      const dateB = new Date(b.Upload_Date);
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
      customerName: data.Customer_Name.toLowerCase(),
      companyName: data.Company_Name.toLowerCase(),
      panCard: data.Pan_Card.toLowerCase(),
      location: data.Customer_Location.toLowerCase(),
      callerName: data.Caller_Name.toLowerCase(),
      appliedBank: data.Bank_Name.toLowerCase(),
      loginDate: data.Login_Date.toLowerCase(),
      uploadDate: data.Upload_Date.toLowerCase(),
    };

    return (
      lowercaseData.customerName.includes(searchString) ||
      lowercaseData.companyName.includes(searchString) ||
      lowercaseData.panCard.includes(searchString) ||
      lowercaseData.location.includes(searchString) ||
      lowercaseData.callerName.includes(searchString) ||
      lowercaseData.appliedBank.includes(searchString) ||
      lowercaseData.loginDate.includes(searchString) ||
      lowercaseData.uploadDate.includes(searchString)
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
              <div className="col-lg-3 col-md-6 col-12 mb-2">
                <input
                  className="form-control"
                  type="search"
                  placeholder="Search..."
                  value={searchItem}
                  onChange={(e) => setSearchItem(e.target.value)}
                />
              </div>
              <div className="col-lg-3 col-md-6 col-12 mb-2">
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
              <div className="col-lg-3 col-md-6 col-12 mb-2">
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
              <div className="col-lg-3 col-md-6 col-12 mb-2">
                <select
                  onChange={(e) => setSelectedBankFilter(e.target.value)}
                  value={selectedBankFilter}
                  className="form-select"
                >
                  <option value="all">All Banks</option>
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
            <div class="table-responsive">
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
                      Applied Bank
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Location
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      AQM Name
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Upload Date
                      <span style={{ cursor: "pointer" }} onClick={handleSort}>
                        {sortOrder === "asc" ? " ⬆" : " ⬇"}
                      </span>
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Status
                    </th>
                    <th style={{ fontSize: "14px" }} scope="col">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((data, index) => (
                    <tr key={data.id}>
                      <td style={{ fontSize: "14px" }}>
                        {startIndex + index + 1}
                      </td>
                      <td style={{ fontSize: "14px" }}>{data.Customer_Name}</td>
                      <td style={{ fontSize: "14px" }}>{data.Company_Name}</td>
                      <td style={{ fontSize: "14px" }}>{data.Pan_Card}</td>
                      <td style={{ fontSize: "14px" }}>{data.Bank_Name}</td>
                      <td style={{ fontSize: "14px" }}>
                        {data.Customer_Location}
                      </td>
                      <td style={{ fontSize: "14px" }}>{data.Caller_Name}</td>
                      <td style={{ fontSize: "14px" }}>
                        {new Date(data.Upload_Date).toLocaleDateString()}
                      </td>
                      <td style={{ fontSize: "14px" }}>
                        <div
                          style={{
                            backgroundColor: "transparent",
                            fontSize: "22px",
                            border: "none",
                            color: "darkblue",
                            cursor: "not-allowed",
                          }}
                          // onClick={() => handleOpenModal(data)}
                          onClick={(e) => e.preventDefault()}
                        >
                          <FaEdit />
                        </div>
                      </td>
                      <td style={{ fontSize: "14px" }}>
                        <div
                          className="m-2"
                          style={{
                            color: "red",
                            fontSize: "22px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleAdminDelete(data._id)}
                        >
                          <MdDelete />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal show={showModal} onHide={handleCloseModal}>
              <Modal.Header closeButton>
                <Modal.Title>Loan Application</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="firstDiv">
                  <p>Name: {selectedData ? selectedData.Customer_Name : ""}</p>
                  <p>
                    Company Name:{" "}
                    {selectedData ? selectedData.Company_Name : ""}
                  </p>
                  <p>Pan No: {selectedData ? selectedData.Pan_Card : ""}</p>
                  <p>
                    Applied Bank: {selectedData ? selectedData.Bank_Name : ""}
                  </p>
                  <p>
                    Customer Location:{" "}
                    {selectedData ? selectedData.Customer_Location : ""}
                  </p>
                  <p>
                    AQM Name: {selectedData ? selectedData.Caller_Name : ""}
                  </p>
                </div>

                <div className="mb-3">
                  <Button
                    variant="primary"
                    className="m-3"
                    onClick={() => handleFormTypeChange("Approved")}
                  >
                    Disbursed
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleFormTypeChange("Rejected")}
                  >
                    Rejected
                  </Button>
                </div>

                {formType === "Approved" && (
                  <div className="container">
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Status" className="form-label">
                          Status:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Status"
                          value={formData.Status}
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Card_Issue_Date" className="form-label">
                          Card Issue Date:
                        </label>
                        <input
                          type="date"
                          className="form-control mb-2"
                          name="Card_Issue_Date"
                          placeholder="Card Issue Date"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12 col-lg-12">
                        <label
                          htmlFor="Card_Application_No"
                          className="form-label"
                        >
                          Card Application No:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Card_Application_No"
                          placeholder="Card Application No"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <Button variant="primary" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </div>
                )}

                {formType === "Rejected" && (
                  <div className="container">
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Status" className="form-label">
                          Status:
                        </label>
                        <input
                          type="text"
                          className="form-control mb-2"
                          name="Status"
                          value={formData.Status}
                          onChange={handleInputChange}
                          readOnly
                        />
                      </div>
                      <div className="col-12 col-lg-6">
                        <label htmlFor="Rejection_Date" className="form-label">
                          Rejected Date:
                        </label>
                        <input
                          type="date"
                          className="form-control mb-2"
                          name="Rejection_Date"
                          placeholder="Rejected Date"
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="Rejection_Category"
                        className="form-label"
                      >
                        Rejected Category:
                      </label>

                      <select
                        type="text"
                        className="form-control mb-2"
                        name="Rejection_Category"
                        onChange={handleInputChange}
                      >
                        <option selected disabled>
                          Select Rejected Category
                        </option>
                        <option value="CIBIL ISSUE">CIBIL ISSUE</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="Rejection_Remark" className="form-label">
                        Rejection Remark:
                      </label>

                      <textarea
                        className="form-control mb-2"
                        name="Rejection_Remark"
                        placeholder="Rejection Remark"
                        rows="3"
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    <Button variant="primary" onClick={handleRejectSubmit}>
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
    </>
  );
};

export default PendingData;
