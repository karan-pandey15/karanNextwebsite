import Footer from "@/app/components/footer/page";
import Navbar from "@/app/components/navbar/page";
import TopNav from "@/app/components/topnav/page";

import Link from "next/link";
import OdCcWorking from "../../../../../public/OdCcWorking.png";
import Image from "next/image";

const OdCcWorkingCapital = () => {
  return (
    <div>
      <TopNav />
      <Navbar />
      <div style={{ backgroundColor: "#E7E5E5" }}>
        <div className="container py-5">
          <div className="row ">
            <div className="col-12 col-lg-6">
              <h1 style={{ color: "#264653", fontWeight: 600 }}>
                Apply For{" "}
                <span style={{ color: "#3E9B74" }}>OD/CC/Working Capital</span>
              </h1>
              <p>
                Operating cycle (OD), also known as the cash conversion cycle
                (CC), is a crucial metric for managing working capital. It
                represents the time it takes for a company to convert its
                investments in raw materials and labor into cash from sales. The
                shorter the OD/CC, the more efficient a company is at managing
                its working capital. A shorter cycle means that a company can
                quickly reinvest cash and generate more profits. To calculate
                OD/CC, add the number of days it takes to sell inventory to the
                number of days it takes to collect accounts receivable, and then
                subtract the number of days it takes to pay accounts payable. A
                shorter OD/CC typically indicates better liquidity and financial
                health.
              </p>
              <button
                className="py-2 px-4 button_class"
                style={{
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#036E8C",
                }}
              >
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  href="/pages/customersignup"
                >
                  Apply Now
                </Link>
              </button>
            </div>
            <div className="col-12 col-lg-6">
              <Image style={{ width: "100%" }} src={OdCcWorking} alt="..." />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OdCcWorkingCapital;
