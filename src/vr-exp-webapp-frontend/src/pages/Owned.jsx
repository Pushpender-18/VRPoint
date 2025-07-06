import Footer from "../widgets/Footer";
import OwnedTable from "../widgets/OwnedTable";

export default function OwnedPage() {
	return (
		<div className="flex flex-col items-center">
			<section id="owned-nft-table" className="w-7xl mt-14 mb-26 bg-[#ffffff03] border-2 border-[#BED1D920] rounded-2xl">
				{/* Heading */}
				<div className="w-7xl bg-[#43A7CB20] px-4 border-b-2 border-[#BED1D920] rounded-t-2xl flex items-center text-[#BED1D9] text-[20px] font-bold">
					<div className="w-[110px] py-3 flex justify-center">S No.</div>
					<div className="w-[470px] py-3 flex justify-center">Item Name</div>
					<div className="w-[160px] py-3 flex justify-center">Price</div>
					<div className="w-[260px] py-3 flex justify-center">Date</div>
					<div className="w-[130px] py-3 flex justify-center">Play</div>
					<div className="w-[130px] py-3 flex justify-center">Sell</div>
				</div>
				<OwnedTable></OwnedTable>
			</section>

			<Footer />
		</div>
	);

}