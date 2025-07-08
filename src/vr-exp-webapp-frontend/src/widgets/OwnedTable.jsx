import { useState } from "react";
import PlayBtn from "../widgets/PlayBtn";
import SellBtn from "../widgets/SellBtn";
import { vr_exp_webapp_backend } from "../../../declarations/vr-exp-webapp-backend";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function OwnedTable() {
	async function getPrincipalID() {	// Returns Principal ID from cache
		const principal_id = localStorage.getItem("principal_id");
		if (principal_id == null) {
			naviagtor("/");
		}
		return principal_id;
	}

	async function getData() {	// Fetches NFT data from the backend canister
		const principal_id = await getPrincipalID();
		const data = await vr_exp_webapp_backend.get_my_nfts(principal_id);
		setNftData(data);
	}

	function sellBtnHandler() {	//Sell Button
		naviagtor("/home/sell");
	}

	async function playVRWorld(index) {
		const manifestString = nftData[index].manifest;
		const manifest = JSON.parse(manifestString);
		console.log(manifest[0].hash);

		try {
			const url = "http://127.0.0.1:8080/ipfs/" + manifest[0].hash;
			console.log(url);
			const response = await axios.get(url, {
				responseType: 'blob',
			});
			// const file = new Blob([response.data], { type: response.headers['content-type'] });
			const modelUrl = URL.createObjectURL(response.data);
			sessionStorage.setItem("player-model-url", modelUrl);
		} catch (e) {
			console.log(e);
		}
		naviagtor("/player")
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
			<div className="w-7xl px-4 bg-white/3 border-b-2 border-[#BED1D920] flex items-center text-[#BED1D9] text-[18px]">
				<div className="w-[110px] py-3 flex justify-center">{(index + 1).toString() + "."}</div>
				<div className="w-[470px] py-3 flex justify-center">{data.item_name}</div>
				<div className="w-[160px] py-3 flex justify-center">{data.price.toString() + " ICP"}</div>
				<div className="w-[260px] py-3 flex justify-center">{data.time_stamp.split(" ")[0]}</div>
				<div className="w-[130px] py-3 flex justify-center"><PlayBtn btnHandler={() => { playVRWorld(index) }} /></div>
				<div className="w-[130px] py-3 flex justify-center"><SellBtn btnHandler={sellBtnHandler} /></div>
			</div>
		))
	}

	return (
		<div>
			{content}
		</div>



	);
}