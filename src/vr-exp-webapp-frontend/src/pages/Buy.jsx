import BuyTable from "../widgets/BuyTable";
import Footer from "../widgets/Footer";

const dummyData = [];

export default function BuyPage() {
	function descriptionBtnHandler(index) {
		document.getElementById("desc-" + index.toString()).classList.toggle("hidden");
	}
	return (
		<div className="flex flex-col items-center">
			<BuyTable />

			<Footer />
		</div>
	);
}