"use client";
import React, { useEffect, useState } from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";
import Link from "next/link";
import "../../styles.css";
import Sidebar from "./sidebar/page";
import Header from "./header/page";

const TlDashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("from1to31");
  const [selectedBankFilter, setSelectedBankFilter] = useState("all");

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Loan States
  const [allData, setData] = useState([]);
  const [pendingData, setPendingData] = useState([]);
  const [approvedData, setApprovedData] = useState([]);
  const [rejectData, setRejectedData] = useState([]);

  // Card States
  const [cardAllData, setCardAllData] = useState([]);
  const [cardPendingData, setCardPendingData] = useState([]);
  const [cardApprovedData, setCardApprovedData] = useState([]);
  const [cardRejectData, setCardRejectedData] = useState([]);

  const [tlName, setTlName] = useState(null);
  useEffect(() => {
    setTlName(localStorage.getItem("TL_Name"));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = await fetch(
          `https://api.addrupee.com/api/p_fetchAlldata/${tlName}?filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        let result = await data.json();
        setData((prevData) => {
          console.log("this is state", prevData);
          return result;
        });
        console.log("the result is ", result);
        console.log("this is state data", allData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tlName, selectedFilter, selectedBankFilter]);

  const fetchPendingData = async () => {
    const Status = "Pending";
    let data = await fetch(
      `https://api.addrupee.com/api/p_getpendingtldatas/${tlName}?Status=${Status}&filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setPendingData(result);
  };

  const fetchApprovedData = async () => {
    const Status = "Disbursed";
    let data = await fetch(
      `https://api.addrupee.com/api/p_getdisbursedtldatas/${tlName}?Status=${Status}&filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setApprovedData(result);
    console.log(result);
  };

  const fetchRejectedData = async () => {
    const Status = "Rejected";
    let data = await fetch(
      `https://api.addrupee.com/api/p_getrejectedtldatas/${tlName}?Status=${Status}&filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setRejectedData(result);
    console.log(result);
  };

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        let data = await fetch(
          `https://api.addrupee.com/api/p_card_fetchAlldata/${tlName}?filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
          {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );

        let result = await data.json();
        setCardAllData((prevData) => {
          console.log("this is state", prevData);
          return result;
        });
        console.log("the result is ", result);
        console.log("this is state data", cardAllData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCardData();
  }, [tlName, selectedFilter, selectedBankFilter]);

  const fetchCardPendingData = async () => {
    const Status = "Pending";
    let data = await fetch(
      `https://api.addrupee.com/api/p_card_getpendingtldatas/${tlName}?Status=${Status}&filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setCardPendingData(result);
  };

  const fetchCardApprovedData = async () => {
    const Status = "Disbursed";
    let data = await fetch(
      `https://api.addrupee.com/api/p_card_getdisbursedtldatas/${tlName}?Status=${Status}&filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setCardApprovedData(result);
    console.log(result);
  };

  const fetchCardRejectedData = async () => {
    const Status = "Rejected";
    let data = await fetch(
      `https://api.addrupee.com/api/p_card_getrejectedtldatas/${tlName}?Status=${Status}&filter=${selectedFilter}&bankFilter=${selectedBankFilter}`,
      {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );

    let result = await data.json();
    setCardRejectedData(result);
    console.log(result);
  };

  useEffect(() => {
    fetchPendingData();
    fetchApprovedData();
    fetchRejectedData();
    fetchCardPendingData();
    fetchCardApprovedData();
    fetchCardRejectedData();
  }, [tlName, selectedFilter, selectedBankFilter]);

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
            overflowY: "scroll",
            width: "100%",
            height: "100vh",
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
              <div>
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
            <div className="row">
              <h2 style={{ fontWeight: 600 }}>Loan</h2>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card dashboard_card-1">
                <div className="card-inner">
                  <h3 className="fs-5 fs-bold text-white">LOGIN LEADS</h3>
                  <BsFillArchiveFill
                    className="card_icon"
                    style={{ color: "white" }}
                  />
                </div>
                <h3 className="text-white fs-3">{allData.length}</h3>
              </div>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card dashboard_card-2">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/partner/teamleaderdashboard/loan/pendingdata"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">PENDING</h3>
                    <BsFillGrid3X3GapFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h1 className="text-white fs-3">{pendingData.length}</h1>
                </Link>
              </div>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card dashboard_card-3">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/partner/teamleaderdashboard/loan/disburseddata"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">DISBURSED</h3>
                    <BsPeopleFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h1 className="text-white fs-3">{approvedData.length}</h1>
                </Link>
              </div>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card dashboard_card-4">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/partner/teamleaderdashboard/loan/rejecteddata"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">REJECTED</h3>
                    <BsFillBellFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h1 className="text-white fs-3">{rejectData.length}</h1>
                </Link>
              </div>
            </div>
            <div className="row">
              <h2 style={{ fontWeight: 600 }}>Credit Card</h2>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card dashboard_card-1">
                <div className="card-inner">
                  <h3 className="fs-5 fs-bold text-white">LOGIN LEADS</h3>
                  <BsFillArchiveFill
                    className="card_icon"
                    style={{ color: "white" }}
                  />
                </div>
                <h3 className="text-white fs-3">{cardAllData.length}</h3>
              </div>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card dashboard_card-2">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/partner/teamleaderdashboard/card/pendingdata"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">PENDING</h3>
                    <BsFillGrid3X3GapFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h1 className="text-white fs-3">{cardPendingData.length}</h1>
                </Link>
              </div>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card dashboard_card-3">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/partner/teamleaderdashboard/card/disburseddata"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">DISBURSED</h3>
                    <BsPeopleFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h1 className="text-white fs-3">{cardApprovedData.length}</h1>
                </Link>
              </div>
              <div className="col-12 col-md-6 col-lg-3 my-2 m-md-3 dashboard_card dashboard_card-4">
                <Link
                  style={{ textDecoration: "none" }}
                  href="/partner/teamleaderdashboard/card/rejecteddata"
                >
                  <div className="card-inner">
                    <h3 className="fs-5 fs-bold text-white">REJECTED</h3>
                    <BsFillBellFill
                      className="card_icon"
                      style={{ color: "white" }}
                    />
                  </div>
                  <h1 className="text-white fs-3">{cardRejectData.length}</h1>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
export default TlDashboard;
