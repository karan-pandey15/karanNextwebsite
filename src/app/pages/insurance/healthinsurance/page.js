import Footer from "@/app/components/footer/page";
import Navbar from "@/app/components/navbar/page";
import TopNav from "@/app/components/topnav/page";

import Link from "next/link";
import healthInsurance from "../../../../../public/healthInsurance.png";
import Image from "next/image";

const HealthInsurance = () => {
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
                <span style={{ color: "#3E9B74" }}>Health Insurance</span>
              </h1>
              <p>
                Health insurance is a financial arrangement that provides
                individuals with coverage for medical expenses. Policyholders
                pay regular premiums to an insurance company, which then helps
                cover the cost of healthcare services, including doctor visits,
                hospital stays, prescription medications, and preventive care.
                Health insurance can protect individuals and families from the
                financial burden of unexpected medical bills and ensure access
                to necessary healthcare. It comes in various forms, such as
                private plans, employer-sponsored coverage, and government
                programs like Medicare and Medicaid, offering a range of
                benefits and costs. Health insurance plays a crucial role in
                promoting healthcare access and financial security for many
                individuals.
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
              <Image
                style={{ width: "100%" }}
                src={healthInsurance}
                alt="..."
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HealthInsurance;
