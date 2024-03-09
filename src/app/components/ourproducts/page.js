import Image from "next/image";
import plCard from "../../../../public/pl_card.jpg";
import blCard from "../../../../public/bl_card.jpg";
import hlCard from "../../../../public/hl_card.jpg";
import clCard from "../../../../public/cl_card.jpg";
import creditCard from "../../../../public/credit_card.jpg";
import lapCard from "../../../../public/lap_card.jpg";
import odCard from "../../../../public/od_card.jpg";
import MutualFund from "../../../../public/MutualFunds.jpg";
import ImproveCibil from "../../../../public/ImproveCibil.jpg";
import LifeInsurance from "../../../../public/Life Insurance.jpg";
import HealthInsurance from "../../../../public/Health Insurance.jpg";
import GeneralInsurance from "../../../../public/General Insurance.jpg";
import "../../styles.css";
import Link from "next/link";

const OurProducts = () => {
  return (
    <>
      <section style={{ backgroundColor: "#EEECED" }} className="py-3">
        <div className="container">
          <h3
            className="text-center"
            style={{ color: "#264653", fontWeight: "700", fontSize: "32px" }}
          >
            Our Products
          </h3>
          <p
            style={{
              color: "gray",
              fontWeight: "500",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            We have range of product for your loan solutions
          </p>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div className="card ourProducts_card">
              <Image src={plCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Personal Loan</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Personal loans provide financial flexibility, helping
                  individuals meet diverse needs. Unsecured, they require no
                  collateral, simplifying access to funds.
                </p>
                <Link
                  href={"/pages/loan/personalloan"}
                  className="btn btn-success"
                >
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <Image src={blCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Business Loan</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Business loans empower enterprises with capital for growth,
                  operations, and expansion. Tailored to business needs, they
                  fuel entrepreneurial success.
                </p>
                <Link
                  href={"/pages/loan/businessloan"}
                  className="btn btn-success"
                >
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <Image src={hlCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Home Loan</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Home loans make homeownership a reality, providing funds for
                  property purchases. Repaid over time, they facilitate
                  long-term housing aspirations.
                </p>
                <Link href={"/pages/loan/homeloan"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <Image src={lapCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Laon Against Property</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Loan Against Property leverages property value for substantial
                  funds. Secured, it offers financial flexibility for various
                  needs with extended repayment.
                </p>
                <Link
                  href={"/pages/loan/loanagainstproperty"}
                  className="btn btn-success"
                >
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <Image src={clCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Used Card Loan</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Used Car Loans offer financing for pre-owned vehicles,
                  enabling buyers to afford quality cars. Convenient repayment
                  plans simplify the process.
                </p>
                <Link href={"/pages/loan/carloan"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <Image src={odCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">OD/CC/Working Capital</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  OD/CC/Working Capital loans provide businesses with flexible
                  funds to manage day-to-day operations, ensuring liquidity and
                  supporting growth initiatives.
                </p>
                <Link
                  href={"/pages/loan/odccworkingcapital"}
                  className="btn btn-success"
                >
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <Image src={creditCard} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Credit Card</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Credit cards provide convenient, cashless transactions,
                  offering a revolving credit line. They're versatile for
                  purchases, and often include rewards.
                </p>
                <Link
                  href={"/pages/loan/creditcard"}
                  className="btn btn-success"
                >
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <Image src={MutualFund} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Mutual Funds</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Mutual funds pool money from investors to invest in
                  diversified securities. They offer a convenient way for wealth
                  growth.
                </p>
                <Link
                  href={"/pages/insurance/mutalfunds"}
                  className="btn btn-success"
                >
                  Read More
                </Link>
              </div>
            </div>
            <div className="card ourProducts_card">
              <Image src={ImproveCibil} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Improve Your Cibil</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Enhance your CIBIL score by timely payments, reducing debt,
                  and monitoring credit reports. Boost financial health for
                  better loan approvals.
                </p>
                <Link href={"/pages/cibilissue"} className="btn btn-success">
                  Read More
                </Link>
              </div>
            </div>

            <div className="card ourProducts_card">
              <Image src={HealthInsurance} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Health Insurance</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Health insurance provides financial protection by covering
                  medical expenses, ensuring access to quality healthcare, and
                  promoting overall well-being for individuals and families.
                </p>
                <Link
                  href={"/pages/insurance/healthinsurance"}
                  className="btn btn-success"
                >
                  Read More
                </Link>
              </div>
            </div>

            <div className="card ourProducts_card">
              <Image
                src={GeneralInsurance}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">General Insurance</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  General insurance protects against diverse risks like property
                  damage, liability, and unforeseen events, providing
                  comprehensive financial security.
                </p>
                <Link
                  href={"/pages/insurance/generalinsurance"}
                  className="btn btn-success"
                >
                  Read More
                </Link>
              </div>
            </div>

            <div className="card ourProducts_card">
              <Image src={LifeInsurance} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Life Insurance</h5>
                <p className="card-text" style={{ color: "gray" }}>
                  Life insurance safeguards your family's financial future,
                  providing a safety net in times of need. Ensure peace of mind,
                  protect loved ones, and build a legacy with a reliable policy
                  today.
                </p>
                <Link
                  href={"/pages/insurance/generalinsurance"}
                  className="btn btn-success"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OurProducts;
