import "../styles.css";
import { IoIosDocument } from "react-icons/io";
import { GrMultimedia } from "react-icons/gr";
import { GiShakingHands } from "react-icons/gi";
import { FcApproval } from "react-icons/fc";
import { RiFundsBoxFill } from "react-icons/ri";

const BusinessLoanProcess = () => {
  return (
    <>
      <section className="business_loan_proccess_main_section py-4">
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
              your business
            </p>
          </div>
          <div className="business_loan_proccess">
            <GiShakingHands className="business_loan_proccess_icon" />
            <h4>3. Get approved</h4>
            <p>If you're eligible, you'll receive a decision within minutes.</p>
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
              If you accept your offer, you'll receive funds as soon as the next{" "}
              business day
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessLoanProcess;
