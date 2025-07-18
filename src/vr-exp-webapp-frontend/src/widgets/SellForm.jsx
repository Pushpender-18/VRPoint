import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { vr_exp_webapp_backend } from "../../../declarations/vr-exp-webapp-backend";
import "../animation.css";

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
		const data = await vr_exp_webapp_backend.get_my_nfts(principal_id);	// NFT Data
		const buyData = await vr_exp_webapp_backend.get_buy_marketplace(principal_id);	// Buy Marketplace
		const listed_nft = [];
		const filteredData = [];
		buyData.forEach((nft) => {
			if (nft.owner == principal_id) {
				listed_nft.push(nft);	// Get owners sell orders
			}
		})

		data.forEach((nft) => {	// Filter listed sell orders
			let flag = true;
			for (let i in listed_nft) {
				if (listed_nft[i].id == nft.id) {
					flag = false;
				}
			}
			if (flag) { filteredData.push(nft); }
		})

		setNftData(filteredData);
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
		if (!processing) {
			processing = true;
			const formData = new FormData(event.target);
			const data = Object.fromEntries(formData.entries());
			const sellBtn = document.getElementById("sell-btn")

			clearForm();	// Clear Form
			sellBtn.innerHTML = "Processing Request";
			sellBtn.onSubmit = null;
			const principal_id = await getPrincipalID();	// Get Principal ID
			// Place sell order through canister api
			const result = await vr_exp_webapp_backend.sell_nft(principal_id, parseInt(data.nft_token_id), data.nft_description, parseInt(data.nft_price));

			processing = false;
			sellBtn.innerHTML = "List NFT For Sale";
			// Feedback to the user
			if (result) {
				const popup = document.getElementById("sell-card");
				const popLine = document.getElementById("sell-line");

				popup.classList.toggle("popup-card");
				popLine.classList.toggle("popup-line");
			} else {
				alert("Error Occured");
			}
			setTimeout(() => {
				window.location.reload();
			}, 2500 )
		}
	}

	const navigator = useNavigate();
	const [nftData, setNftData] = useState([]);
	const [tries, setTries] = useState(0);
	let processing = false;

	useEffect(() => {
		if ((nftData.length == 0) && (tries < 5)) {	// Fetch NFT data from canister
			getData();
			setTries(tries + 1);
		}

		if (nftData.length != 0) {	// Fetch data for quick sell
			const sellID = sessionStorage.getItem("sell-nft-token");
			const nftTitle = document.getElementById("nft-title");
			const nftPriceInput = document.getElementById("nft-price");
			const nftDescInput = document.getElementById("nft-description");

			nftData.forEach(nft => {	// Fetch data from nft
				if (nft.id == sellID) {
					nftTitle.value = nft.id;
					nftPriceInput.value = nft.price;
					nftDescInput.innerHTML = nft.description;
				}
			})

			sessionStorage.removeItem("sell-nft-token");
		}
	});

	return (
		<section id="sell" className="flex flex-col pt-12">
			<h1 className="text-5xl font-bold text-[#43A7CB]">Sell Your NFTs</h1>
			<div className="mt-12">
				<form className="flex flex-col gap-10 items-end" onSubmit={submitForm}>
					<div className="w-7xl flex justify-between">
						<select name="nft_token_id" id="nft-title" onChange={updateForm} className="w-[820px] h-16 p-3 block bg-white/10 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-2xl text-[#BED1D9] ">
							<option value="default-option">Select Your NFT</option>
							{nftData.map(nft => (
								<option key={nft.id} value={nft.id}>{nft.item_name}</option>
							))}
						</select>
						<input type="text" name="nft_price" id="nft-price" className="w-104 px-3 bg-white/10 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-2xl text-[#BED1D9]" placeholder="Price" />
					</div>
					<textarea name="nft_description" id="nft-description" placeholder="Description" className="w-7xl h-80 p-3 bg-white/10 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-2xl text-[#BED1D9]" ></textarea>
					<button id="sell-btn" type="submit" className="bg-[#43A7CB] text-[#BED1D9] text-2xl px-8 py-4 rounded-2xl hover:bg-[#43A7CB90] active:bg-[#43A7CB80] transition-all duration-200">List NFT For Sale</button>
				</form>
			</div>
			<div id="sell-card" className="bg-[#237597] text-[#BED1D9] flex flex-col translate-y-136 translate-x-96 right-0 rounded-tl-2xl rounded-bl-2xl z-40 text-2xl font-bold absolute">
				<div className="py-8 px-12 pr-24">
					Sell Ordered Placed
				</div>
				<div id="sell-line" className="bg-[#BED1D9] h-1 w-[21rem] rounded-tl-full rounded-bl-full self-end"></div>
			</div>
		</section>
	);
}