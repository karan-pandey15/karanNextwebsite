"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import successIcon from "../../../../../public/successIcon.gif";
import Image from "next/image";
import TopNav from "@/app/components/topnav/page";
import Navbar from "@/app/components/navbar/page";
import Footer from "@/app/components/footer/page";

const EmployeeEmailVerification = () => {
  const { code } = useParams();

  const [countdown, setCountdown] = useState(5);
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      axios
        .get(`https://api.addrupee.com/api/email-verification/${code}`)
        .then((response) => {
          if (
            response.data.VerificationStatus === "Verified" ||
            response.data.VerificationStatus === "AlreadyVerified"
          ) {
            setVerificationStatus("Mail verified successfully..");

            setTimeout(() => {
              router.push("/pages/employeesignin");
            }, 3000);
          } else {
            setVerificationStatus(response.data.Error);
          }
        })
        .catch((error) => {
          setVerificationStatus(error.response.data.Error);
        });
    }, 5000);

    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
      clearTimeout(timer);
    };
  }, [code, router]);

  return (
    <div>
      <TopNav />
      <Navbar />
      <div
        style={{
          backgroundColor: "#E7E5E5",
          width: "100%",
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {countdown > 0 ? (
          <div>
            <h2
              style={{
                color: "#264653",
                fontWeight: 600,
                paddingBottom: "10px",
              }}
            >
              {verificationStatus}
            </h2>
            <p style={{ color: "darkgray", fontWeight: 500 }}>
              Please wait for {countdown} seconds...
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Image
              style={{ height: "250px" }}
              src={successIcon}
              alt="Success Icon"
            />
            <h2
              style={{
                color: "#264653",
                fontWeight: 600,
                paddingBottom: "10px",
              }}
            >
              {verificationStatus}
            </h2>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EmployeeEmailVerification;
