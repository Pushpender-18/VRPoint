export default function ListedNFT() {
	return (
		<section id="listed-nfts">
			<div className="w-7xl border-b-1 border-[#BED1D9] mt-16"></div>

			<h1 className="text-[#43A7CB] text-5xl font-bold pt-8">Listed NFTs</h1>

			<div className="w-7xl mt-8 mb-26 bg-[#ffffff03] border-2 border-[#BED1D920] rounded-2xl">
				{/* Heading */}
				<div className="w-7xl px-4 bg-[#43A7CB20] border-b-2 border-[#BED1D920] rounded-t-2xl flex items-center text-[#BED1D9] text-[20px] font-bold">
					<div className="w-[110px] py-3 flex justify-center">S No.</div>
					<div className="w-[470px] py-3 flex justify-center">Item Name</div>
					<div className="w-[160px] py-3 flex justify-center">Price</div>
					<div className="w-[260px] py-3 flex justify-center">Date</div>
					<div className="w-[130px] py-3 flex justify-center">Description</div>
					<div className="w-[130px] py-3 flex justify-center">Cancel</div>
				</div>
				<div className="h-96 flex justify-center items-center text-[#BED1D950] text-2xl tracking-wider">Nothing to show</div>
			</div>
		</section>
	);
}