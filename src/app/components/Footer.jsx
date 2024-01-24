import Link from "next/link.js";

export default function Footer({ user }) {
  return (
    <footer
      className={user.isDarkMode ? "footer-copyright-dark" : "footer-copyright"}
    >
      <div className="footer-copyright-wrapper">
        <div className="footer-copyright-text">
          ©2023 Designed By:{" "}
          <Link
            className="footer-copyright-link"
            href={"https://www.linkedin.com/in/farhan-d-siddiqi-web-developer/"}
            target="_blank"
          >
            Farhan
          </Link>{" "}
          <Link
            className="footer-copyright-link"
            href={"https://www.linkedin.com/in/calypso-hernandez/"}
            target="_blank"
          >
            | Calypso
          </Link>{" "}
          <Link
            className="footer-copyright-link"
            href={"https://www.linkedin.com/in/victor-troche-8ba209287/"}
            target="_blank"
          >
            | Victor
          </Link>{" "}
          <Link
            className="footer-copyright-link"
            href={"https://www.linkedin.com/in/pimpa-stephens-97538b299/"}
            target="_blank"
          >
            | Pimpa
          </Link>
        </div>
      </div>
    </footer>
  );
}
