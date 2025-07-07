import Footer from "../widgets/Footer";
import Hero from "../widgets/Hero";
import LandingPageNavBar from "../widgets/LandingPageNavBar";
import Works from "../widgets/Works";
import "../index.css";

export default function Index() {

	return (
		<div className="absolute">
			<div className="bg-gd-l"></div>
			<div className="bg-gd-r"></div>
			<div className="gd-l"></div>
			<div className="gd-r"></div>
			<div className="flex flex-col items-center">
				<LandingPageNavBar />
				<Hero />
				<Works />
				<Footer />
			</div>
		</div>
	);
}