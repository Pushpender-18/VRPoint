import { useNavigate } from "react-router-dom";
import { vr_exp_webapp_backend } from "../../../declarations/vr-exp-webapp-backend";
import Footer from "../widgets/Footer";
import PlayBtn from "../widgets/PlayBtn";
import SellBtn from "../widgets/SellBtn";
import { useState } from "react";


async function getPrincipalID() {
	if (window.ic.plug) {
		const isConnected = await window.ic.plug.isConnected();
		if (!isConnected) {
			await window.ic.plug.requestConnect();
		}
		const principal_id = await window.ic.plug.getPrincipal();
		return principal_id;
	}
}

export default function OwnedPage() {
	async function getData() {
		const principal_id = await getPrincipalID();
		const data = await vr_exp_webapp_backend.get_my_nfts(principal_id.toText());
		setNftData(data);
	}

	const [nftData, setNftData] = useState([]);
	const naviagtor = useNavigate();
	function sellBtnHandler() {
		naviagtor("/home/sell");
	}
	
	getData();

	let content = null;
	if (nftData.length == 0) {
		content =
			<section id="owned-nft-table" className="w-7xl mt-14 mb-26 bg-[#ffffff03] border-2 border-[#BED1D920] rounded-2xl">
				{/* Heading */}
				<div className="w-7xl bg-[#43A7CB20] px-4 border-b-2 border-[#BED1D920] rounded-t-2xl flex items-center text-[#BED1D9] text-[20px] font-bold">
					<div className="w-[110px] py-3 flex justify-center">S No.</div>
					<div className="w-[470px] py-3 flex justify-center">Item Name</div>
					<div className="w-[160px] py-3 flex justify-center">Price</div>
					<div className="w-[260px] py-3 flex justify-center">Date</div>
					<div className="w-[130px] py-3 flex justify-center">Play</div>
					<div className="w-[130px] py-3 flex justify-center">Sell</div>
				</div>
				<div className="h-96 flex justify-center items-center text-[#BED1D950] text-2xl tracking-wider">Nothing to show</div>
			</section>
	} else {
		content = <section id="owned-nft-table" className="w-7xl mt-14 mb-26 bg-[#ffffff03] border-2 border-[#BED1D920] rounded-2xl">
			{/* Heading */}
			<div className="w-7xl bg-[#43A7CB20] px-4 border-b-2 border-[#BED1D920] rounded-t-2xl flex items-center text-[#BED1D9] text-[20px] font-bold">
				<div className="w-[110px] py-3 flex justify-center">S No.</div>
				<div className="w-[470px] py-3 flex justify-center">Item Name</div>
				<div className="w-[160px] py-3 flex justify-center">Price</div>
				<div className="w-[260px] py-3 flex justify-center">Date</div>
				<div className="w-[130px] py-3 flex justify-center">Play</div>
				<div className="w-[130px] py-3 flex justify-center">Sell</div>
			</div>

			{/* Entries */}
			{nftData.map((data, index) => (
				<div className="w-7xl px-4 bg-white/3 border-b-2 border-[#BED1D920] flex items-center text-[#BED1D9] text-[18px]">
					<div className="w-[110px] py-3 flex justify-center">{(index + 1).toString() + "."}</div>
					<div className="w-[470px] py-3 flex justify-center">{data.item_name}</div>
					<div className="w-[160px] py-3 flex justify-center">{data.price.toString() + " ICP"}</div>
					<div className="w-[260px] py-3 flex justify-center">{data.time_stamp.split(" ")[0]}</div>
					<div className="w-[130px] py-3 flex justify-center"><PlayBtn btnHandler={() => { }} /></div>
					<div className="w-[130px] py-3 flex justify-center"><SellBtn btnHandler={sellBtnHandler} /></div>
				</div>
			))}
		</section>
	}


	return (
		<div className="flex flex-col items-center">
			{content}

			<Footer />
		</div>
	);

}