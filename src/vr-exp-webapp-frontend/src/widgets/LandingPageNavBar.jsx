import { useNavigate } from "react-router-dom";

export default function LandingPageNavBar() {
	const navigator = useNavigate();

	async function btnHandler() {
		const result = await window.ic.plug.isConnected();
		if (!result) {
			try {
				await window.ic.plug.requestConnect({
					whitelist: "uxrrr-q7777-77774-qaaaq-cai",
					host: "http://127.0.0.1:4943"
				});
			} catch (e) {
				console.log("Error: " + e);
				return
			}
		}
		const principal_id = await window.ic.plug.getPrincipal();
		localStorage.setItem("principal_id", principal_id.toText());
		navigator("/home");
	}

	return (
		<nav className="w-screen h-18 bg-[#ffffff03] flex items-center justify-center border-b-1 border-[#ffffff10]">
			<div className="w-7xl  flex justify-between items-center">
				<div className="flex items-center">
					<p className="text-4xl font-bold">VRPoint</p>
				</div>
				<div className="flex gap-12 text-[#BED1D9]">
					<a href="#hero" className="hover:text-[#BED1D9aa]">Home</a>
					<a href="#works" className="hover:text-[#BED1D9aa]">How It Works?</a>
					<a href="#" className="hover:text-[#BED1D9aa]">Explore</a>
				</div>
				<div className="bg-[#43A7CB] py-2 px-8 rounded-2xl font-bold text-3xs hover:bg-[#43A7CBab]" onClick={btnHandler}>Log In</div>
			</div>
		</nav>
	);
}