import BuyBtn from "../widgets/BuyBtn";
import DescriptionBtn from "../widgets/DescriptionBtn";
import Footer from "../widgets/Footer";

// const dummyData = [["Roller Coaster World", "4 ICP", "22-04-2025"],
// ["Roller Coaster World", "4 ICP", "22-04-2025"],
// ["Roller Coaster World", "4 ICP", "22-04-2025"],
// ["Roller Coaster World", "4 ICP", "22-04-2025"]];

const dummyData = [];

export default function BuyPage() {
	function descriptionBtnHandler(index) {
		document.getElementById("desc-" + index.toString()).classList.toggle("hidden");
	}

	let content = null;

	if (dummyData.length == 0) {
		content = <div className="w-7xl mt-14 mb-26 bg-[#ffffff03] border-2 border-[#BED1D920] rounded-2xl">
				{/* Heading */}
				<div className="w-7xl bg-[#43A7CB20] px-4 border-b-2 border-[#BED1D920] rounded-t-2xl flex items-center text-[#BED1D9] text-[20px] font-bold">
					<div className="w-[110px] py-3 flex justify-center">S No.</div>
					<div className="w-[470px] py-3 flex justify-center">Item Name</div>
					<div className="w-[160px] py-3 flex justify-center">Price</div>
					<div className="w-[260px] py-3 flex justify-center">Date</div>
					<div className="w-[130px] py-3 flex justify-center">Description</div>
					<div className="w-[130px] py-3 flex justify-center">Buy</div>
				</div>
				
				<div className="h-96 flex justify-center items-center text-[#BED1D950] text-2xl tracking-wider">Nothing to show</div>
			</div>
	} else { 
		content = <section id="buy-nft-list" className="w-7xl mt-14 mb-26 bg-[#ffffff03] border-2 border-[#BED1D920] rounded-2xl">
				{/* Heading */}
				<div className="w-7xl bg-[#43A7CB20] px-4 border-b-2 border-[#BED1D920] rounded-t-2xl flex items-center text-[#BED1D9] text-[20px] font-bold">
					<div className="w-[110px] py-3 flex justify-center">S No.</div>
					<div className="w-[470px] py-3 flex justify-center">Item Name</div>
					<div className="w-[160px] py-3 flex justify-center">Price</div>
					<div className="w-[260px] py-3 flex justify-center">Date</div>
					<div className="w-[130px] py-3 flex justify-center">Description</div>
					<div className="w-[130px] py-3 flex justify-center">Buy</div>
				</div>
				{/* Entries */}
				{dummyData.map((data, index) => (
					<div className="flex flex-col bg-white/3 border-b-2 border-[#BED1D920]">
						<div className="w-7xl px-4 flex items-center text-[#BED1D9] text-[18px]">
							<div className="w-[110px] py-3 flex justify-center">{(index + 1).toString() + "."}</div>
							<div className="w-[470px] py-3 flex justify-center">{data[0]}</div>
							<div className="w-[160px] py-3 flex justify-center">{data[1]}</div>
							<div className="w-[260px] py-3 flex justify-center">{data[2]}</div>
							<div className="w-[130px] py-3 flex justify-center"><DescriptionBtn btnHandler={function () { descriptionBtnHandler(index) }} /></div>
							<div className="w-[130px] py-3 flex justify-center"><BuyBtn btnHandler={() => { }} /></div>
						</div>
						<div id={"desc-" + index.toString()} className="w-7xl px-16 text-justify text-[#BED1D9] mb-8 hidden">
							<h1 className="font-bold mb-2">Description:</h1>
							<h3 className="">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</h3>
						</div>
					</div>
				))}
			</section>
	}

	return (
		<div className="flex flex-col items-center">
			{content}

			<Footer />
		</div>
	);
}