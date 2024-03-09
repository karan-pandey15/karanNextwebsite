import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AddRupee: Your Trusted Loan Distribution Partner",
  description:
    "Discover financial flexibility with AddRupee, your trusted loan distribution partner. We connect you with a diverse range of banks, ensuring tailored solutions for your unique needs. Secure your future with AddRupee's seamless loan services - where opportunities meet financial empowerment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        />
        <meta
          name="keywords"
          content="AddRupee, addrupee, ADDRUPEE, Addrupee, Loan distribution, Financial solutions, Loan options, Banking partnerships, Personal loans, Business loans, Loan brokerage, Credit solutions, Loan diversity, Financial empowerment, Quick loans, Flexible financing, Competitive interest rates, Loan assistance, Borrowing options, Loan approval process, Loan comparison, Secure loans, Transparent lending, Reliable financial support, loan against property, car loan, general insurance, mutual fund, health insurance, home loan, over draft, wokring capital"
        />
      </head>
      <body className={inter.className}>
        {children}
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossOrigin="anonymous"
        ></script>
      </body>
    </html>
  );
}
