import { useNavigate } from "react-router-dom";

export default function DashboardNavBar() {
	function logoutHandler() {
		localStorage.removeItem("principal_id")
		navigator("/");
	}

	function profileHandler() {
		document.getElementById("logout").classList.toggle("opacity-100");
	}

	const navigator = useNavigate();

	return (
		<nav className="w-screen h-18 bg-[#ffffff03] flex items-center justify-center border-b-1 border-[#ffffff10]">
			<div className="w-7xl  flex justify-between items-center">
				{/* Left Side */}
				<div className="flex items-center gap-24">
					<p className="text-4xl font-bold">VRPoint</p>
					<div className="flex gap-11 text-[#BED1D9]">
						<a href="#" className="hover:text-[#BED1D970]">Home</a>
						<a href="#" className="hover:text-[#BED1D970]">Explore</a>
						<a href="/create" className="hover:text-[#BED1D970]">Create</a>
					</div>
				</div>

				{/* Right Side */}
				<div className="flex gap-7 items-center">
					{/* Searchbox */}
					<form action="">
						<input type="text" name="search-box" id="search-box" className="bg-[#ffffff10] backdrop-blur-md border-2 border-[#BED1D9] w-3xs h-10 rounded-2xl placeholder:text-[#BED1D970] pl-6 text-[#BED1D9]" placeholder="Search" />
					</form>

					{/* Account Icon */}
					<div className="w-12 h-12 z-20 bg-[#06121B90] rounded-full relative">
						<div id="logout" className="absolute bg-[#23759790] top-13 left-8 z-10 px-3 py-2 opacity-0 hover:bg-[#23759780] active:bg-[#23759770] transition-opacity duration-200" onClick={logoutHandler}>Logout</div>
						<img src="/icons/user.png" alt="profile-pic" className="opacity-80" onClick={profileHandler} />
					</div>
				</div>
			</div>
		</nav>
	);
}