"use client";
import React, { useState } from "react";
import Axios from "axios";
import Sidebar from "../../sidebar/page";
import Header from "../../header/page";

const UploadData = () => {
  const [file, setFile] = useState(null);
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const allowedExtensions = ["csv"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      alert("You have chosen the wrong format file. Please upload a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("csvFile", file);

    try {
      const response = await Axios.post(
        "https://api.addrupee.com/api/p_import-csv",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("CSV file uploaded successfully");
    } catch (error) {
      alert(`Error uploading CSV file: ${error.response.data}`);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch("https://api.addrupee.com/download");
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "sample.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading CSV:", error.message);
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
          <div
            className="container"
            style={{
              marginTop: "20px",
              boxShadow:
                "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
              backgroundColor: "#dad7cd",
            }}
          >
            <h2 style={{ fontWeight: 600, textAlign: "center" }}>
              Upload CSV File
            </h2>
            <div className="row mt-5">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                className="col-lg-6 col-md-6 col-12"
              >
                <form onSubmit={handleUpload}>
                  <input
                    onChange={handleFileChange}
                    type="file"
                    name="csvFile"
                    accept=".csv"
                    className="form-control"
                  />
                  <button className="btn btn-dark my-3" type="submit">
                    Upload
                  </button>
                </form>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
                className="col-lg-6 col-md-6 col-12"
              >
                <p style={{ fontWeight: 600 }}>Download Detail Sheet</p>
                <button className="btn btn-danger" onClick={handleDownload}>
                  Download
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default UploadData;
