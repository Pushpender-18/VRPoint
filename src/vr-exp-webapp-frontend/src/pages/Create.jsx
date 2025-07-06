import { vr_exp_webapp_backend } from "../../../declarations/vr-exp-webapp-backend";
import "../create.css";

const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

export default function CreatePage() {
	async function formHandler(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const data = Object.fromEntries(formData.entries());

		// Get Time Stamp
		const now = new Date();
		const time_stamp = formatDateTime(now);
		
		// Get principal id
		
		if (window.ic.plug) {
			const isConnected = await window.ic.plug.isConnected();
			if (!isConnected) {
				await window.ic.plug.requestConnect();
			}
			const principal_id = await window.ic.plug.getPrincipal();
			console.log(principal_id.toText());
			const result = await vr_exp_webapp_backend.create_nft(principal_id.toText(), data.name, time_stamp, data.description, "link");
			console.log(result);
		}


	}

	return (
		<section id="create-form" className="w-screen h-screen flex justify-center items-center">
			<form onSubmit={formHandler} className="flex flex-col gap-10 items-end">
				<input type="text" name="name" id="nft-name" className="p-3 bg-white/10 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-xl text-[#BED1D9]" />
				<textarea name="description" id="description" className="p-3 bg-white/10 border-2 border-[#BED1D970] focus:border-[#BED1D9] rounded-xl text-xl text-[#BED1D9]"></textarea>
				<button type="submit" className="bg-[#43A7CB] text-[#BED1D9] text-2xl px-4 py-2 rounded-xl hover:bg-[#43A7CB90] active:bg-[#43A7CB80] transition-all">Create</button>
			</form>

		</section>);
}