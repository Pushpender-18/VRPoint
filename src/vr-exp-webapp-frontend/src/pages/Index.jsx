import Footer from "../widgets/Footer";
import Hero from "../widgets/Hero";
import LandingPageNavBar from "../widgets/LandingPageNavBar";
import Works from "../widgets/Works";

export default function Index() {

	return (
		<div className="flex flex-col items-center">
			<LandingPageNavBar />
			<Hero />
			<Works />
			<Footer />
		</div>
	);
}