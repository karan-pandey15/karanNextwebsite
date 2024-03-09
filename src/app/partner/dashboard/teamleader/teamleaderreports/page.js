"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "../../sidebar/page";
import Header from "../../header/page";

const TeamLeaderReports = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [teamLeaders, setTeamLeaders] = useState([]);

  const Router = useRouter();

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const fetchTeamLeaders = async () => {
    try {
      const response = await fetch(
        "https://api.addrupee.com/api/getpartnerteamleaderdetails"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setTeamLeaders(result.employees);
    } catch (error) {
      console.error("Error fetching team leader details:", error.message);
    }
  };

  const handleTeamLeaderClick = (tlName) => {
    localStorage.setItem("TL_Name", tlName);
    Router.push(`/partner/dashboard/teamleader/teamleaderreports/${tlName}`);
  };

  useEffect(() => {
    fetchTeamLeaders();
  }, []);

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
            <h3>Team Details:</h3>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
              }}
            >
              {teamLeaders.map((tl, index) => (
                <Link
                  href={`/partner/dashboard/teamleader/teamleaderreports/${tl.name}`}
                  style={{ textDecoration: "none" }}
                  key={index}
                >
                  <div
                    style={{
                      margin: 10,
                      width: "200px",
                      height: "150px",
                      borderRadius: "5px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                      wordBreak: "break-word",
                      boxSizing: "border-box",
                      position: "relative",
                    }}
                    onClick={() => handleTeamLeaderClick(tl.name)}
                  >
                    <p
                      style={{
                        fontWeight: "bolder",
                        color: "#22333b",
                        padding: "8px",
                      }}
                    >
                      {tl.name}
                    </p>
                    <p
                      style={{
                        fontWeight: 500,
                        color: "#22333b",
                        margin: "0 10px",
                        fontSize: "14px",
                      }}
                    >
                      {tl.email}
                    </p>
                    <button
                      style={{
                        border: "none",
                        width: "100%",
                        position: "absolute",
                        bottom: 0,
                        padding: "4px 0px",
                        backgroundColor: "#17A2B8",
                        borderBottomLeftRadius: "5px",
                        borderBottomRightRadius: "5px",
                        fontWeight: 500,
                        fontSize: "16px",
                      }}
                    >
                      See Details 👉🏻
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TeamLeaderReports;
