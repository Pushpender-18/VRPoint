import { useState } from "react";
import CancelBtn from "../widgets/CancelBtn";
import DescriptionBtn from "../widgets/DescriptionBtn";
import Footer from "../widgets/Footer";
import { vr_exp_webapp_backend } from "../../../declarations/vr-exp-webapp-backend";

const dummyData = [];

async function getPrincipalID() {
	if (window.ic.plug) {
		const isConnected = await window.ic.plug.isConnected();
		if (!isConnected) {
			await window.ic.plug.requestConnect({
				whitelist: "uxrrr-q7777-77774-qaaaq-cai",
				host: "http://127.0.0.1:4943"
			});
		}
		const principal_id = await window.ic.plug.getPrincipal();
		return principal_id;
	}
}

export default function SellPage() {

	function descriptionBtnHandler(index) {
		const box = document.getElementById("desc-" + index.toString());
		box.classList.toggle("hidden");
	}

	async function getData() {
		const principal_id = await getPrincipalID();
		const data = await vr_exp_webapp_backend.get_my_nfts(principal_id.toText());
		setNftData(data);
	}

	const [nftData, setNftData] = useState([]);
	if (nftData.length == 0) {
		getData();
	}

	let content = null;
	let options = null;

	if (nftData.length > 0) {
		options = <select name="nft-title" id="nft-title" className="w-[820px] h-16 p-3 block bg-white/10 placeholder-pink-500 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-2xl text-[#BED1D9]">
			<option selected >Select Your NFT</option>
			{
				nftData.map((nft) => {
					<option >
						"Option"
					</option>
				})
			}
		</select>;
	}




	if (dummyData.length == 0) {
		content = <section id="listed-nfts">
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
	} else {
		content = <section id="listed-nfts">
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

			</div>
		</section>
	}

	return (
		<div className="flex flex-col items-center">
			<section id="sell" className="flex flex-col pt-12">
				<h1 className="text-5xl font-bold text-[#43A7CB]">Sell Your NFTs</h1>
				<div className="mt-12">
					<form className="flex flex-col gap-10 items-end">
						<div className="w-7xl flex justify-between">
							{options}
							<input type="text" name="nft-price" id="nft-price" className="w-104 px-3 bg-white/10 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-2xl text-[#BED1D9]" placeholder="Price" />
						</div>
						<textarea name="nft-description" id="nft-description" placeholder="Description" className="w-7xl h-80 p-3 bg-white/10 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-2xl text-[#BED1D9]" ></textarea>
						<button type="submit" className="bg-[#43A7CB] text-[#BED1D9] text-2xl px-8 py-4 rounded-2xl hover:bg-[#43A7CB90] active:bg-[#43A7CB80] transition-all">List NFT For Sale</button>
					</form>
				</div>
			</section>

			{content}

			<Footer />
		</div>
	);
}