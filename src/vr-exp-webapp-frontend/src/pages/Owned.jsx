import Footer from "../widgets/Footer";
import PlayBtn from "../widgets/PlayBtn";
import SellBtn from "../widgets/SellBtn";

const dummyData = [["Roller Coaster World", "4 ICP", "22-04-2025"],
["Roller Coaster World", "4 ICP", "22-04-2025"],
["Roller Coaster World", "4 ICP", "22-04-2025"],
["Roller Coaster World", "4 ICP", "22-04-2025"]];

export default function OwnedPage() {

	return (
		<div className="flex flex-col items-center">
			<div className="w-7xl mt-14 mb-26 bg-[#ffffff03] border-2 border-[#BED1D920] rounded-2xl">
				{/* Heading */}
				<div className="w-7xl bg-[#43A7CB20] px-4 border-b-2 border-[#BED1D920] rounded-t-2xl flex items-center text-[#BED1D9] text-[20px] font-bold">
					<div className="w-[110px] py-3 flex justify-center">S No.</div>
					<div className="w-[470px] py-3 flex justify-center">Item Name</div>
					<div className="w-[160px] py-3 flex justify-center">Price</div>
					<div className="w-[260px] py-3 flex justify-center">Date</div>
					<div className="w-[130px] py-3 flex justify-center">Play</div>
					<div className="w-[130px] py-3 flex justify-center">Sell</div>
				</div>
				{/* Entries */}
				{dummyData.map((data, index) => (
					<div className="w-7xl h-[72px] px-4 bg-white/3 border-b-2 border-[#BED1D920] flex items-center text-[#BED1D9] text-[18px]">
						<div className="w-[110px] py-3 flex justify-center">{index + 1}</div>
						<div className="w-[470px] py-3 flex justify-center">{data[0]}</div>
						<div className="w-[160px] py-3 flex justify-center">{data[1]}</div>
						<div className="w-[260px] py-3 flex justify-center">{data[2]}</div>
						<div className="w-[130px] py-3 flex justify-center"><PlayBtn btnHandler={() => { }} /></div>
						<div className="w-[130px] py-3 flex justify-center"><SellBtn btnHandler={() => { }} /></div>
					</div>
				))}
			</div>

			<Footer />
		</div>
	);
}