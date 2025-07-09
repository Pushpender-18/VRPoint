import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vr_exp_webapp_backend } from "../../../declarations/vr-exp-webapp-backend";


export default function SellForm() {
	async function getPrincipalID() {	// Returns Principal ID from cache
		const principal_id = localStorage.getItem("principal_id");
		if (principal_id == null) {
			navigator("/");
		}
		return principal_id;
	}

	async function getData() {	// Fetches NFT data from the backend canister
		const principal_id = await getPrincipalID();
		const data = await vr_exp_webapp_backend.get_my_nfts(principal_id);
		setNftData(data);
	}


	function updateForm(event) {
		const nftPriceInput = document.getElementById("nft-price");
		const nftDescInput = document.getElementById("nft-description");
		if (event.target.value == "default-option") {
			nftPriceInput.value = null;
			nftDescInput.innerHTML = null;
		} else {
			const nftTokenId = event.target.value;
			nftData.forEach(nft => {
				if (nft.id == nftTokenId) {
					nftPriceInput.value = nft.price;
					nftDescInput.innerHTML = nft.description;
				}
			})
		}
	}

	function clearForm() {
		const nftTitleInput = document.getElementById("nft-title");
		const nftPriceInput = document.getElementById("nft-price");
		const nftDescInput = document.getElementById("nft-description");

		nftTitleInput.value = "default-option";
		nftPriceInput.value = null;
		nftDescInput.value = "";
	}

	async function submitForm(event) {	// Submit Form
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());

		clearForm();	// Clear Form
		// const principal_id = await getPrincipalID();	// Get Principal ID
		// // Place sell order through canister api
		// const result = await vr_exp_webapp_backend.sell_nft(principal_id, parseInt(data.nft_token_id), data.nft_description,parseInt(data.nft_price));

		// // Feedback to the user
		// if (result) {
		// 	alert("Sell Order Placed");
		// } else {
		// 	alert("Error Occured");
		// }

		// window.location.reload();
	}

	const navigator = useNavigate();
	const [nftData, setNftData] = useState([]);
	const [tries, setTries] = useState(0);

	useEffect(() => {
		if (nftData.length != 0) {
			const sellID = sessionStorage.getItem("sell-nft-token");
			const nftTitle = document.getElementById("nft-title");
			const nftPriceInput = document.getElementById("nft-price");
			const nftDescInput = document.getElementById("nft-description");

			console.log(sellID);
				nftData.forEach(nft => {
				if (nft.id == sellID) {
					nftTitle.value = nft.id;
					nftPriceInput.value = nft.price;
					nftDescInput.innerHTML = nft.description;
				}
			})

			sessionStorage.removeItem("sell-nft-token");
		}
	});

	if ((nftData.length == 0) && (tries < 5)) {	// Fetch NFT data from canister
		getData();
		setTries(tries + 1);
	}

	return (
		<section id="sell" className="flex flex-col pt-12">
			<h1 className="text-5xl font-bold text-[#43A7CB]">Sell Your NFTs</h1>
			<div className="mt-12">
				<form className="flex flex-col gap-10 items-end" onSubmit={submitForm}>
					<div className="w-7xl flex justify-between">
						<select name="nft_token_id" id="nft-title" onChange={updateForm} className="w-[820px] h-16 p-3 block bg-white/10 placeholder-pink-500 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-2xl text-[#BED1D9]">
							<option value="default-option">Select Your NFT</option>
							{nftData.map(nft => (
								<option key={nft.id} value={nft.id}>{nft.item_name}</option>
							))}
						</select>
						<input type="text" name="nft_price" id="nft-price" className="w-104 px-3 bg-white/10 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-2xl text-[#BED1D9]" placeholder="Price" />
					</div>
					<textarea name="nft_description" id="nft-description" placeholder="Description" className="w-7xl h-80 p-3 bg-white/10 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-2xl text-[#BED1D9]" ></textarea>
					<button type="submit" className="bg-[#43A7CB] text-[#BED1D9] text-2xl px-8 py-4 rounded-2xl hover:bg-[#43A7CB90] active:bg-[#43A7CB80] transition-all">List NFT For Sale</button>
				</form>
			</div>
		</section>
	);
}