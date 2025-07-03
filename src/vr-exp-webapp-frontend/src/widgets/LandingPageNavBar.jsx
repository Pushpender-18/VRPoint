import { useNavigate } from "react-router-dom";

export default function LandingPageNavBar() {
	const n = useNavigate();

	async function btnHandler() {
		const result = await window.ic.plug.isConnected();
		if (!result) {
			try {
				const publicKey = await window.ic.plug.requestConnect();
				console.log(`The connected user's public key is:`, publicKey);
			} catch (e) {
				console.log(e);
				return
			}
		}
		n("/home");
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