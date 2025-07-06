import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vr_exp_webapp_backend } from "../../../declarations/vr-exp-webapp-backend";
import DescriptionBtn from "./DescriptionBtn";
import CancelBtn from "./CancelBtn";

export default function ListedNFT() {
	async function getPrincipalID() {	// Returns Principal ID from cache
		const principal_id = localStorage.getItem("principal_id");
		if (principal_id == null) {
			naviagtor("/");
		}
		return principal_id;
	}

	async function getData() {	// Fetches NFT data from the backend canister
		const principal_id = await getPrincipalID();
		const data = await vr_exp_webapp_backend.get_sell_orders(principal_id);
		setNftData(data);
	}

	function descriptionBtnHandler(index) {	// Description Button Handler
		document.getElementById("desc-" + index.toString()).classList.toggle("hidden");
	}

	async function cancelSellOrder(nftTokenId) {	// Cancel Sell Order
		const principal_id = await getPrincipalID();
		const result = await vr_exp_webapp_backend.remove_sell_order(principal_id, parseInt(nftTokenId));

		if (result) {
			alert("Order Cancelled");
		} else {
			alert("Failed");
		}
		window.location.reload();
	}

	const [nftData, setNftData] = useState([]);
	const [tries, setTries] = useState(0);
	const naviagtor = useNavigate();

	// Fetching Data
	if ((nftData.length == 0) && (tries < 5)) {
		getData();
		console.log(tries);
		setTries(tries + 1);
	}

	// Rendering Content
	let content = null;
	if (nftData.length == 0) {
		content = <div className="h-96 flex justify-center items-center text-[#BED1D950] text-2xl tracking-wider">Nothing to show</div>;
	} else {
		content = nftData.map((data, index) => (
			<div className="flex flex-col bg-white/3 border-b-2 border-[#BED1D920]">
				<div className="w-7xl px-4 flex items-center text-[#BED1D9] text-[18px]">
					<div className="w-[110px] py-3 flex justify-center">{(index + 1).toString() + "."}</div>
					<div className="w-[470px] py-3 flex justify-center">{data.item_name}</div>
					<div className="w-[160px] py-3 flex justify-center">{data.price.toString() + " ICP"}</div>
					<div className="w-[260px] py-3 flex justify-center">{data.time_stamp.split(" ")[0]}</div>
					<div className="w-[130px] py-3 flex justify-center"><DescriptionBtn btnHandler={() => { descriptionBtnHandler(index)}} /></div>
					<div className="w-[130px] py-3 flex justify-center"><CancelBtn btnHandler={() => {  cancelSellOrder(data.id)}} /></div>
				</div>
				<div id={"desc-" + index.toString()} className="w-7xl px-16 text-justify text-[#BED1D9] mb-8 hidden">
					<h1 className="font-bold mb-2">Description:</h1>
					<h3 className="">{data.description}</h3>
				</div>
			</div>
		))
	}

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
				{content}
			</div>
		</section>
	);
}