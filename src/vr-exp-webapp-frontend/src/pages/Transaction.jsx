export default function TransactionPage() {
	const entries = [1, 2, 3, 4, 5];
	return (
		<div className="w-7xl mt-14 bg-[#ffffff03] border-2 border-[#BED1D920] rounded-2xl">
			{/* Heading */}
			<div className="w-7xl bg-[#43A7CB20] border-b-2 border-[#BED1D920] rounded-t-2xl flex justify-around items-center text-[#BED1D9] text-[20px] font-bold">
				<div className="py-3 px-4">S No.</div>
				<div className="py-3 px-32">Item Name</div>
				<div className="py-3 px-8">Price</div>
				<div className="py-3 px-18">Date</div>
				<div className="py-3 px-8">Description</div>
				<div className="py-3 px-8">Delete</div>
			</div>
			{/* Entries */}
			{ entries.map((e) => (

				<div className="w-7xl h-[72px] bg-white/3 border-b-2 border-[#BED1D920]">
					<div className="py-3 "></div>
					<div className="py-3"></div>
					<div className="py-3"></div>
					<div className="py-3"></div>
					<div className="py-3"></div>
					<div className="py-3"></div>
				</div>
			)) }
		</div>
	);
}