import Link from "next/link.js";
export default function () {
	return (
		<div>
			<div className="title">
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
								<h3>FARHAN SIDDIQI </h3>
							</div>
							<br />

							<ul className="social-link">
								<li style={{ "--i": 1 }}>
									<Link
										href={
											"https://www.linkedin.com/in/farhan-d-siddiqi-web-developer/"
										}
										target="blank">
										<img className="icon-credit-page" src="linkedin.png" />
									</Link>
								</li>
								<li style={{ "--i": 2 }}>
									<Link href={"https://github.com/FarhanDS-92"} target="blank">
										<img className="icon-credit-page" src="github.png" />
									</Link>
								</li>
								<li style={{ "--i": 3 }}>
									<Link href={"https://farhandev.ca/"} target="blank">
										<img className="icon-credit-page" src="portfolio.png" />
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
								<h3> ALEXANDRA HERNANDEZ </h3> <br />
							</div>
							<ul className="social-link">
								<li style={{ "--i": 1 }}>
									<Link
										href={"https://www.linkedin.com/in/calypso-hernandez/"}
										target="blank">
										<img className="icon-credit-page" src="linkedin.png" />
									</Link>
								</li>
								<li style={{ "--i": 2 }}>
									<Link href={"https://github.com/Calypso90"} target="blank">
										<img className="icon-credit-page" src="github.png" />
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
										target="blank">
										<img className="icon-credit-page" src="linkedin.png" />
									</Link>
								</li>
								<li style={{ "--i": 2 }}>
									<Link href={"https://github.com/Vicpr22"} target="blank">
										<img className="icon-credit-page" src="github.png" />
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
										target="blank">
										<img className="icon-credit-page" src="linkedin.png" />
									</Link>
								</li>
								<li style={{ "--i": 2 }}>
									<Link href={"https://github.com/PimmyPong"} target="blank">
										<img className="icon-credit-page" src="github.png" />
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
