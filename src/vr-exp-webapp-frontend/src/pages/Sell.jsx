import CancelBtn from "../widgets/CancelBtn";
import DescriptionBtn from "../widgets/DescriptionBtn";
import Footer from "../widgets/Footer";

export default function SellPage() {
	const dummyData = [["Roller Coaster World", "4 ICP", "22-04-2025"],
	["Roller Coaster World", "4 ICP", "22-04-2025"],
	["Roller Coaster World", "4 ICP", "22-04-2025"],
	["Roller Coaster World", "4 ICP", "22-04-2025"]];


	return (
		<div className="flex flex-col items-center">
			<section id="sell" className="flex flex-col pt-12">
				<h1 className="text-5xl font-bold text-[#43A7CB]">Sell Your NFTs</h1>
				<div className="mt-12">
					<form action="" className="flex flex-col gap-10 items-end">
						<div className="w-7xl flex justify-between">
							<select name="nft-title" id="nft-title" className="w-[820px] h-16 p-3 block bg-white/10 placeholder-pink-500 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-2xl text-[#BED1D9]">
								<option selected >Select Your NFT</option>
								<option value="volvo" className="bg-white/15">Volvo</option>
								<option value="saab">Saab</option>
								<option value="fiat">Fiat</option>
								<option value="audi">Audi</option>
							</select>
							<input type="text" name="nft-price" id="nft-price" className="w-104 px-3 bg-white/10 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-2xl text-[#BED1D9]" placeholder="Price" />
						</div>
						<textarea name="nft-description" id="nft-description" placeholder="Description" className="w-7xl h-80 p-3 bg-white/10 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-2xl text-[#BED1D9]" ></textarea>
						<button type="submit" className="bg-[#43A7CB] text-[#BED1D9] text-2xl px-8 py-4 rounded-2xl hover:bg-[#43A7CB90] active:bg-[#43A7CB80] transition-all">List NFT For Sale</button>
					</form>
				</div>
			</section>

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
					{/* Entries */}
					{dummyData.map((data, index) => (

						<div className="w-7xl h-[72px] bg-white/3 border-b-2 border-[#BED1D920] flex items-center text-[#BED1D9] text-[18px]">
							<div className="w-[110px] py-3 flex justify-center">{index + 1}</div>
							<div className="w-[470px] py-3 flex justify-center">{data[0]}</div>
							<div className="w-[160px] py-3 flex justify-center">{data[1]}</div>
							<div className="w-[260px] py-3 flex justify-center">{data[2]}</div>
							<div className="w-[130px] py-3 flex justify-center"><DescriptionBtn btnHandler={() => { }} /></div>
							<div className="w-[130px] py-3 flex justify-center"><CancelBtn btnHandler={() => { }} /></div>
						</div>
					))}
				</div>
			</section>

			<Footer/>
		</div>
	);
}