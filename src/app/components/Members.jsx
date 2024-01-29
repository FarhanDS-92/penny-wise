import { fetchUser } from "@/lib/fetchUser.js";
import Link from "next/link.js";
export default async function () {
  const user = await fetchUser();

  return (
    <section>
      <title>Meet our team</title>
      <div className={user.isDarkMode ? "title-dark" : "title"}>
        <h4>MEET OUR TEAM</h4>
      </div>
      <div className="wrapper">
        <div className="card_Container">
          <div className="card">
            <div className="imbBx">
              <img className="" src="FarhanPic.jpg" alt="farhan" />
            </div>

            <div className="content">
              <div className="contentBx">
                <h3>FARHAN D. SIDDIQI </h3>
                <br />
              </div>

              <ul className="social-link">
                <li style={{ "--i": 1 }}>
                  <Link
                    href={
                      "https://www.linkedin.com/in/farhan-d-siddiqi-web-developer/"
                    }
                    target="blank"
                  >
                    <img
                      className="icon-credit-page"
                      src="linkedin.png"
                      alt="Farhan D. Siddiqi linkedin link"
                    />
                  </Link>
                </li>
                <li style={{ "--i": 2 }}>
                  <Link href={"https://github.com/FarhanDS-92"} target="blank">
                    <img
                      className="icon-credit-page"
                      src="github.png"
                      alt="Farhan D. Siddiqi github link"
                    />
                  </Link>
                </li>
                <li style={{ "--i": 3 }}>
                  <Link href={"https://farhandev.ca/"} target="blank">
                    <img
                      className="icon-credit-page"
                      src="portfolio.png"
                      alt="Farhan D. Siddiqi portfolio site link"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card_Container">
          <div className="card">
            <div className="imbBx">
              <img className="" src="CalypsoPic.jpg" alt="calypso" />
            </div>

            <div className="content">
              <div className="contentBx">
                <h3> CALYPSO HERNANDEZ </h3> <br />
              </div>
              <ul className="social-link">
                <li style={{ "--i": 1 }}>
                  <Link
                    href={"https://www.linkedin.com/in/calypso-hernandez/"}
                    target="blank"
                  >
                    <img
                      className="icon-credit-page"
                      src="linkedin.png"
                      alt="Calypso Hernandez linkedin link"
                    />
                  </Link>
                </li>
                <li style={{ "--i": 2 }}>
                  <Link href={"https://github.com/Calypso90"} target="blank">
                    <img
                      className="icon-credit-page"
                      src="github.png"
                      alt="Calypso Hernandez github link"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card_Container">
          <div className="card">
            <div className="imbBx">
              <img className="member-pic" src="VictorPic.jpg" alt="victor" />
            </div>

            <div className="content">
              <div className="contentBx">
                <h3>VICTOR TROCHE </h3> <br />
              </div>
              <ul className="social-link">
                <li style={{ "--i": 1 }}>
                  <Link
                    href={
                      "https://www.linkedin.com/in/victor-troche-8ba209287/"
                    }
                    target="blank"
                  >
                    <img
                      className="icon-credit-page"
                      src="linkedin.png"
                      alt="Victor Troche linkedin link"
                    />
                  </Link>
                </li>
                <li style={{ "--i": 2 }}>
                  <Link href={"https://github.com/Vicpr22"} target="blank">
                    <img
                      className="icon-credit-page"
                      src="github.png"
                      alt="Victor Troche github link"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="card_Container">
          <div className="card">
            <div className="imbBx">
              <img className="member-pic" src="PimpaPic.jpg" alt="pimpa" />
            </div>

            <div className="content">
              <div className="contentBx">
                <h3>PIMPA STEPHENS</h3> <br />
              </div>
              <ul className="social-link">
                <li style={{ "--i": 1 }}>
                  <Link
                    href={
                      "https://www.linkedin.com/in/pimpa-stephens-97538b299/"
                    }
                    target="blank"
                  >
                    <img
                      className="icon-credit-page"
                      src="linkedin.png"
                      alt="Pimpa Stephens linkedin link"
                    />
                  </Link>
                </li>
                <li style={{ "--i": 2 }}>
                  <Link href={"https://github.com/PimmyPong"} target="blank">
                    <img
                      className="icon-credit-page"
                      src="github.png"
                      alt="Victor Troche github link"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
