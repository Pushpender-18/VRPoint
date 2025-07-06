import Footer from "../widgets/Footer";
import SellForm from "../widgets/SellForm";
import ListedNFT from "../widgets/ListedNFT";


export default function SellPage() {
	return (
		<div className="flex flex-col items-center">
			<SellForm />
			<ListedNFT />
			<Footer />
		</div>
	);
}