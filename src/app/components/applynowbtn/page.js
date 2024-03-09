import Link from "next/link";

function ApplynowBtn() {
  const roundButtonStyle = {
    position: "fixed",
    textDecoration: "none",
    bottom: "20px",
    right: "20px",
    backgroundColor: "#3E9D7C",
    color: "#fff",
    border: "none",
    fontWeight: "600",
    borderRadius: "45%",
    padding: "15px",
    cursor: "pointer",
  };
  return (
    <div>
      <div>
        <Link style={roundButtonStyle} href="/pages/customersignup">
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export default ApplynowBtn;
