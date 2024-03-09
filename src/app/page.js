import Navbar from "./components/navbar/page";
import TopNav from "./components/topnav/page";
import "./styles.css";
import addrupeeText from "../../public/addrupeeText.png";
import homeImg from "../../public/homeImg.png";
import Image from "next/image";
import HomeWrapper from "./components/homewrapper/page";
import OurProducts from "./components/ourproducts/page";
import WhyChooseAddRupee from "./components/whychooseaddrupee/page";
import SimpleLoanProcess from "./components/simpleloanprocess/page";
import BankSlider from "./components/bankslider/page";
import OurBlogSummary from "./components/ourblogsummary/page";
import Footer from "./components/footer/page";
import ApplynowBtn from "./components/applynowbtn/page";

export default function Home() {
  return (
    <>
      <TopNav />
      <Navbar />
      <main>
        <section className="home_background">
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              className="row"
            >
              <div className="col-12 col-lg-6">
                <h1 style={{ color: "#264653", fontWeight: 700 }}>
                  If you need <span style={{ color: "#3E9D7C" }}>Rupee</span>?
                  Think
                  <Image
                    style={{ height: "50px", width: "170px" }}
                    src={addrupeeText}
                    alt="..."
                  />
                </h1>
                <p
                  style={{
                    fontSize: "19px",
                    fontWeight: 400,
                    color: "#264653",
                  }}
                >
                  Addrupee is Distributor of secured and un secured loans. We
                  have wide range of loans products like Personal Loans,
                  Business Loan, Home Loan, Loans against Property, OD against
                  Property, and Loan for Purchase of Commercial Property, Lease
                  Rental Discounting, and Business Loans etc. Mind For Cost is
                  professionally managed, having about two decades of domain
                  knowledge and expertise.
                </p>
              </div>
              <div className="col-12 col-lg-6">
                <Image
                  className="img-fluid rounded-start"
                  // style={{ width: "100%", borderRadius: "15px" }}
                  src={homeImg}
                  alt="..."
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <div>
        <HomeWrapper />
      </div>
      <div>
        <OurProducts />
      </div>
      <div>
        <WhyChooseAddRupee />
      </div>
      <div>
        <SimpleLoanProcess />
      </div>
      <div>
        <BankSlider />
      </div>
      <div>
        <OurBlogSummary />
      </div>
      <ApplynowBtn />
      <Footer />
    </>
  );
}
