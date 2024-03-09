"use client";
import Image from "next/image";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import PersonalLoanImg from "../../../../../../public/personalloanimg1.png";
import benefitspersonalloan from "../../../../../../public/benefitspersonalloan.png";
import { IoIosDocument } from "react-icons/io";
import { GrMultimedia } from "react-icons/gr";
import { GiShakingHands } from "react-icons/gi";
import { FcApproval } from "react-icons/fc";
import { RiFundsBoxFill } from "react-icons/ri";
import "../../businessloan/styles.css";

const WhatIsPersonalLoan = () => {
  return (
    <>
      <Navbar expand="lg" className="my-3 persoanl_loan_navbar">
        <Container>
          <Navbar.Brand>
            <Link href="#overview" className="btn btn-persoanl_loan_navbar">
              Overview
            </Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link href="#eligibility" className="btn btn-persoanl_loan_navbar">
              Eligibility
            </Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link href="#process" className="btn btn-persoanl_loan_navbar">
              Process
            </Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link href="#benefits" className="btn btn-persoanl_loan_navbar">
              Benefits
            </Link>
          </Navbar.Brand>
          <Navbar.Brand>
            <Link href="#FAQs" className="btn btn-persoanl_loan_navbar">
              FAQs
            </Link>
          </Navbar.Brand>
        </Container>
      </Navbar>
      <div id="overview" className="pt-3">
        <h2 style={{ fontWeight: 700, color: "#264653" }}>
          What is <span style={{ color: "#3E9B74" }}>Personal Loan ?</span>
        </h2>
        <p>
          Unlocking financial flexibility, a personal loan emerges as a
          versatile solution, offering individuals a lump sum to address diverse
          personal expenses. What sets it apart is its unsecured nature—no need
          to pledge assets like cars or houses, reducing borrower risk. However,
          this lack of collateral might result in slightly higher interest rates
          compared to secured loans.
        </p>
        <p>
          Securing a personal loan is a hassle-free process, accessible through
          various channels. Traditional financial powerhouses like banks and
          credit unions provide competitive terms. The advent of online lending
          platforms in recent years has further democratized access, offering a
          convenient and faster application and approval process.
        </p>
        <p>
          Eligibility for a personal loan revolves around key factors such as
          creditworthiness, stable income, employment history, and a reasonable
          debt-to-income ratio. Lenders conduct a comprehensive assessment,
          including a credit check, to gauge the borrower's ability to repay the
          loan.
        </p>
        <p>
          The application process entails submitting personal and financial
          details along with required documentation. Once approved, borrowers
          receive comprehensive loan terms, including the interest rate and
          repayment schedule. The approved funds are then swiftly disbursed into
          the borrower's account, ensuring quick access to the much-needed
          financial support.
        </p>
      </div>
      <div
        id="eligibility"
        className="row py-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="col-12 col-md-6">
          <h2 style={{ fontWeight: 700, color: "#264653" }}>
            Eligibility <span style={{ color: "#3E9B74" }}>Criteria</span>
          </h2>
          <p>
            To qualify for a personal loan, borrowers generally need to meet
            certain eligibility criteria set by the lending institution. Common
            eligibility factors include:
          </p>
          <p>
            <b>Credit Score:</b> Lenders often consider the borrower's credit
            score to assess their creditworthiness. A higher credit score
            usually increases the chances of loan approval.
          </p>
          <p>
            <b>Income and Employment:</b> Lenders may require proof of a stable
            income and employment history to ensure the borrower's ability to
            repay the loan.
          </p>
          <p>
            <b>Debt-to-Income Ratio:</b> Lenders may evaluate the borrower's
            debt-to-income ratio, comparing their monthly debt payments to their
            monthly income.
          </p>
          <p>
            <b>Residency and Age:</b> Borrowers typically need to be residents
            of the country where they are applying for the loan and meet a
            minimum age requirement, usually 21 or older.
          </p>
        </div>
        <div className="col-12 col-md-6">
          <Image
            src={PersonalLoanImg}
            alt="AddRupee"
            className="img-fluid rounded-start"
          />
        </div>
      </div>
      <div id="process">
        <h2 style={{ fontWeight: 700, color: "#264653" }}>Process</h2>
        <section className="business_loan_proccess_main_section">
          <div className="business_loan_proccess_main_div">
            <div className="business_loan_proccess">
              <IoIosDocument className="business_loan_proccess_icon" />
              <h4>1. Simple signup proccess</h4>
              <p>
                Our Application is fast and free, and won't impact your credit
                score
              </p>
            </div>
            <div className="business_loan_proccess">
              <GrMultimedia className="business_loan_proccess_icon" />
              <h4>2. Choose a product</h4>
              <p>
                We offer a variety of products, so you can find the best fit for
                you
              </p>
            </div>
            <div className="business_loan_proccess">
              <GiShakingHands className="business_loan_proccess_icon" />
              <h4>3. Get approved</h4>
              <p>
                If you're eligible, you'll receive a decision within minutes.
              </p>
            </div>
            <div className="business_loan_proccess">
              <FcApproval className="business_loan_proccess_icon" />
              <h4>4. Review your offer</h4>
              <p>Review your offer and decide whether or not to accept it.</p>
            </div>
            <div className="business_loan_proccess">
              <RiFundsBoxFill className="business_loan_proccess_icon" />
              <h4>5. Get funded</h4>
              <p>
                If you accept your offer, you'll receive funds as soon as the
                next business day
              </p>
            </div>
          </div>
        </section>
      </div>
      <div
        id="benefits"
        className="row py-3"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div className="col-12 col-md-6">
          <Image
            src={benefitspersonalloan}
            alt="AddRupee"
            className="img-fluid rounded-start"
          />
        </div>
        <div className="col-12 col-md-6">
          <h2 style={{ fontWeight: 700, color: "#264653" }}>
            Benefits of <span style={{ color: "#3E9B74" }}>Personal Loans</span>
          </h2>
          <p>
            <b>Versatility:</b> Personal loans can be used for a variety of
            purposes, providing borrowers with financial flexibility.
          </p>
          <p>
            <b>Unsecured Nature:</b> As unsecured loans, personal loans do not
            require collateral, reducing the risk for borrowers.
          </p>
          <p>
            <b>Predictable Payments:</b> Fixed monthly installments make it
            easier for borrowers to budget and plan their finances.
          </p>
          <p>
            <b>Quick Access:</b> Online lenders often offer a streamlined
            application process, allowing for quick approval and funding.
          </p>
        </div>
      </div>
      <section id="FAQs">
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            paddingBottom: "11px",
          }}
        >
          <h2 style={{ fontWeight: 700, color: "#264653" }}>
            Top FAQs for <span style={{ color: "#3E9B74" }}>Personal Loan</span>
          </h2>
          <span
            style={{
              fontWeight: 700,
              fontSize: "22px",
              paddingLeft: "7px",
              cursor: "pointer",
            }}
            className="business_loan_accordion_hash"
          >
            #
          </span>
        </div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                What is the difference between a fixed and variable-interest
                rate? #1
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                A fixed-interest rate remains constant throughout the loan term,
                providing predictability. A variable-interest rate can change
                based on market conditions, potentially leading to fluctuations
                in monthly payments.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                How does debt consolidation with a personal loan work? #2
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Debt consolidation involves taking out a personal loan to pay
                off multiple debts, combining them into a single monthly payment
                with a potentially lower interest rate.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                Can I get a personal loan with bad credit? #3
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                While it might be challenging, some lenders specialize in
                providing personal loans to individuals with less-than-perfect
                credit. However, the interest rates may be higher.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                What happens if I miss a payment? #4
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Missing a payment can result in late fees and negatively impact
                your credit score. It's crucial to communicate with the lender
                if facing difficulties to explore potential solutions.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                Is the interest on a personal loan tax-deductible? #5
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                In most cases, the interest on a personal loan is not
                tax-deductible unless the loan is used for a qualifying business
                purpose or investment, depending on local tax regulations.
                Consult a tax professional for advice.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhatIsPersonalLoan;
