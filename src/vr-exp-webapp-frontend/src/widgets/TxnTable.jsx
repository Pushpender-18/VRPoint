import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vr_exp_webapp_backend } from "../../../declarations/vr-exp-webapp-backend";
import CancelBtn from "./CancelBtn";

export default function TxnTable() {
	async function getPrincipalID() {	// Returns Principal ID from cache
		const principal_id = localStorage.getItem("principal_id");
		if (principal_id == null) {
			naviagtor("/");
		}
		console.log(principal_id);
		return principal_id;
	}

	async function getRecords() {	// Fetches Transaction data from the backend canister
		const principal_id = await getPrincipalID();
		const txn = await vr_exp_webapp_backend.get_transactions(principal_id);
		setTxnRecord(txn);
		await getData(txn);
	}

	async function getData(txn_record) {	// Fetches NFT data from the backend canister
		let _nftData = [];
		for (let i = 0; i < txn_record.length; i++) {	// Get each txn nft data
			const nft = await vr_exp_webapp_backend.get_nft_data(txn_record[i].nft_token_id);
			_nftData.push(nft[0]);
		}
		// Reverse to get newest txn first
		_nftData.reverse();
		setNftData(_nftData);
	}

	const [txnRecord, setTxnRecord] = useState([]);
	const [nftData, setNftData] = useState([]);
	const [tries, setTries] = useState(0);
	const naviagtor = useNavigate();

	// Fetching Data
	if ((txnRecord.length == 0) && (tries < 5)) {
		getRecords();
		console.log(tries);
		setTries(tries + 1);
	}

	let content = null;
	if ((txnRecord.length == 0) || (nftData.length == 0)) {
		content = <div className="h-96 flex justify-center items-center text-[#BED1D950] text-2xl tracking-wider">Nothing to show</div>;
	} else {
		console.log(nftData);
		content = nftData.map((data, index) => {
			const classString = `w-7xl px-4 bg-white/3 ${(nftData.length-1) == index ? "rounded-b-2xl" : "border-b-2"} border-[#BED1D920] flex items-center text-[#BED1D9] text-[18px]`;
			return (
				<div className={classString}>
					<div className="w-[110px] py-3 flex justify-center">{(index + 1).toString() + "."}</div>
					<div className="w-[450px] py-3 flex justify-center overflow-ellipsis">{data.item_name}</div>
					<div className="w-[160px] py-3 flex justify-center">{data.price.toString() + " ICP"}</div>
					<div className="w-[310px] py-3 flex justify-center">{data.time_stamp.split(" ")[0]}</div>
					<div className="w-[130px] py-3 flex justify-center">{txnRecord[index].txn_type}</div>
				</div>
			)
		})
	}

	return (
		<section id="txn-list" className="w-7xl mt-14 mb-36 bg-[#ffffff03] border-2 border-[#BED1D920] rounded-2xl">
			{/* Heading */}
			<div className="w-7xl px-4 bg-[#43A7CB20] border-b-2 border-[#BED1D920] rounded-t-2xl flex items-center text-[#BED1D9] text-[20px] font-bold">
				<div className="w-[110px] py-3 flex justify-center">S No.</div>
				<div className="w-[450px] py-3 flex justify-center">Item Name</div>
				<div className="w-[160px] py-3 flex justify-center">Price</div>
				<div className="w-[310px] py-3 flex justify-center">Date</div>
				<div className="w-[130px] py-3 flex justify-center">Type</div>
			</div>

			{content}
		</section>
	);
}