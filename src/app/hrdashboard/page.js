"use client";
import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import Link from "next/link";
import "../styles.css";
import Sidebar from "./sidebar/page";
import Header from "./header/page";

const HrDashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("from1to31");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [interviewedCandidate, setInterviewedCandidate] = useState([]);
  const [salaryOfferedCandidate, setSalaryOfferedCandidate] = useState([]);
  const [confirmedCandidate, setConfirmedCandidate] = useState([]);
  const [rejectedCandidate, setRejectedCandidate] = useState([]);

  const [hrEmailId, setHrEmailId] = useState(null);
  useEffect(() => {
    setHrEmailId(localStorage.getItem("hrEmailId"));
  }, []);

  useEffect(() => {
    const fetchInterviewedCandidate = async () => {
      try {
        let data = await fetch(
          `https://api.addrupee.com/api/hr_interviewed_candidate/${hrEmailId}?filter=${selectedFilter}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        let result = await data.json();
        setInterviewedCandidate(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchInterviewedCandidate();
  }, [hrEmailId, selectedFilter]);

  const fetchSalaryOfferedCandidate = async () => {
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
    setSalaryOfferedCandidate(result);
  };

  const fetchCanfirmedCandidateData = async () => {
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
    setConfirmedCandidate(result);
  };

  const fetchRejectedCandidateData = async () => {
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
    setRejectedCandidate(result);
  };

  useEffect(() => {
    fetchSalaryOfferedCandidate();
    fetchCanfirmedCandidateData();
    fetchRejectedCandidateData();
  }, [hrEmailId, selectedFilter]);

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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <h1 style={{ fontWeight: 600 }}>Dashboard</h1>
              <div>
                <select
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  value={selectedFilter}
                  className="form-select"
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
            <div className="row">
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card dashboard_card-1">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/hrdashboard/interviewedcandidate"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">INTERVIEWED</h3>
                    <BsFillArchiveFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h1 className="text-white fs-3">
                    {interviewedCandidate.length}
                  </h1>
                </Link>
              </div>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card dashboard_card-2">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/hrdashboard/sallaryofferedcandidate"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">SALARY OFFERED</h3>
                    <BsFillGrid3X3GapFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h1 className="text-white fs-3">
                    {salaryOfferedCandidate.length}
                  </h1>
                </Link>
              </div>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card dashboard_card-3">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/hrdashboard/confirmedcandidate"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">TOTAL EMPLOYEES</h3>
                    <BsPeopleFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h1 className="text-white fs-3">
                    {confirmedCandidate.length}
                  </h1>
                </Link>
              </div>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card dashboard_card-4">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/hrdashboard/rejectedcandidate"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">
                      REJECTED (Follow-up)
                    </h3>
                    <BsFillBellFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h1 className="text-white fs-3">
                    {rejectedCandidate.length}
                  </h1>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default HrDashboard;
