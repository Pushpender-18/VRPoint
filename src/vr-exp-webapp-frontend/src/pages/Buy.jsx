import BuyTable from "../widgets/BuyTable";
import Footer from "../widgets/Footer";
import "../animation.css"

const dummyData = [];

export default function BuyPage() {
	function descriptionBtnHandler(index) {
		document.getElementById("desc-" + index.toString()).classList.toggle("hidden");
	}
	return (
		<div className="flex flex-col items-center relative">
			<BuyTable />
			<Footer />
		</div>
	);
}