import { useNavigate } from "react-router-dom";
import { vr_exp_webapp_backend } from "../../../declarations/vr-exp-webapp-backend";
import { useState } from "react";
import DescriptionBtn from "./DescriptionBtn";
import BuyBtn from "./BuyBtn";

export default function BuyTable() {
	async function getPrincipalID() {	// Returns Principal ID from cache
		const principal_id = localStorage.getItem("principal_id");
		if (principal_id == null) {	// If Principal ID is not cached (Not logged In)
			naviagtor("/");			// Re-direct to landing page
		}
		return principal_id;
	}

	async function getData() {	// Fetches Buy Marketplace data from the backend canister
		const raw_data = await vr_exp_webapp_backend.get_buy_marketplace();	// Fetch raw data
		const principal_id = await getPrincipalID();
		const data = [];
		raw_data.forEach((d) => {	// Filter buy order
			if (d.owner != principal_id) {	// Only add other owners nft listings
				data.push(d);
			}
		})
		// Reverse the data to get newest order first
		data.reverse();

		// Update NFT Data
		setNftData(data);
	}

	function descriptionBtnHandler(index) {	// Description Button Handler
		document.getElementById("desc-" + index.toString()).classList.toggle("hidden");
	}

	async function buyBtnHandler(nftTokenId) {	// Buy Btn Handler
		if (!processing) {
			processing = true;
			const principal_id = await getPrincipalID();
			const result = await vr_exp_webapp_backend.buy_nft(principal_id, parseInt(nftTokenId));	// Call backend api

			if (result) {	// User feedback
				const buyCard = document.getElementById("buy-card");
				const buyLine = document.getElementById("buy-line");
				buyCard.classList.toggle("popup-card");
				buyLine.classList.toggle("popup-line");
			} else {
				alert("Something went wrong");
			}

			// Reload to fetch updated data
			setTimeout(() => { window.location.reload() }, 2500);
		}
	}

	const [nftData, setNftData] = useState([]);
	const [tries, setTries] = useState(0);
	const naviagtor = useNavigate();
	let processing = false;

	// Fetching Data
	if ((nftData.length == 0) && (tries < 5)) {
		getData();
		setTries(tries + 1);
	}

	let content = null;
	if (nftData.length == 0) {	// Render empty table if NFT Data is not present
		content = <div className="h-96 flex justify-center items-center text-[#BED1D950] text-2xl tracking-wider">Nothing to show</div>;
	} else {	// Render NFT Data
		content = nftData.map((data, index) => {
			const classString = `flex flex-col bg-white/3 ${(nftData.length - 1) == index ? "rounded-b-2xl" : "border-b-2"} border-[#BED1D920]`;

			return (
				<div>
					<div className={classString}>
						<div className="w-7xl px-4 flex items-center text-[#BED1D9] text-[18px]">
							<div className="w-[110px] py-3 flex justify-center">{(index + 1).toString() + "."}</div>
							<div className="w-[470px] py-3 flex justify-center">{data.item_name}</div>
							<div className="w-[160px] py-3 flex justify-center">{data.price.toString() + " ICP"}</div>
							<div className="w-[260px] py-3 flex justify-center">{data.time_stamp.split(" ")[0]}</div>
							<div className="w-[130px] py-3 flex justify-center"><DescriptionBtn btnHandler={function () { descriptionBtnHandler(index) }} /></div>
							<div className="w-[130px] py-3 flex justify-center"><BuyBtn btnHandler={() => { buyBtnHandler(data.id) }} /></div>
						</div>
						<div id={"desc-" + index.toString()} className="w-7xl px-16 text-justify text-[#BED1D9] mb-8 hidden">
							<h1 className="font-bold mb-2">Description:</h1>
							<h3 className="">{data.description}</h3>
						</div>
					</div>
					<div id="buy-card" className="bg-[#237597] text-[#BED1D9] flex flex-col right-0 translate-x-96 rounded-tl-2xl rounded-bl-2xl z-40 text-2xl font-bold absolute">
						<div className="py-8 px-12 pr-24">
							Virutal NFT Bought
						</div>
						<div id="buy-line" className="bg-[#BED1D9] h-1 w-[21rem] rounded-tl-full rounded-bl-full self-end"></div>
					</div>
				</div>
			)
		})
	}

	return (
		<section id="buy-table" className="w-screen flex justify-center">
			<div className="w-7xl mt-14 mb-36 bg-[#ffffff03] border-2 border-[#BED1D920] rounded-2xl">
				{/* Heading */}
				<div className="w-7xl bg-[#43A7CB20] px-4 border-b-2 border-[#BED1D920] rounded-t-2xl flex items-center text-[#BED1D9] text-[20px] font-bold">
					<div className="w-[110px] py-3 flex justify-center">S No.</div>
					<div className="w-[470px] py-3 flex justify-center">Item Name</div>
					<div className="w-[160px] py-3 flex justify-center">Price</div>
					<div className="w-[260px] py-3 flex justify-center">Date</div>
					<div className="w-[130px] py-3 flex justify-center">Description</div>
					<div className="w-[130px] py-3 flex justify-center">Buy</div>
				</div>

				{content}
			</div>
		</section>
	);
}