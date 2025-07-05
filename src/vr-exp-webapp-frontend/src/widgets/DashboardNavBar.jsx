export default function DashboardNavBar() {
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

					{/* Bell Icon */}
					<div className="w-12 h-12 p-2 bg-[#43A7CB] rounded-full">
						<img src="/icons/bell.png" alt="notification" />
					</div>
					{/* Account Icon */}
					<div className="w-14 h-14 bg-[#43A7CB] rounded-full">
						<img src="/icons/user.png" alt="profile-pic" />
					</div>
				</div>
			</div>
		</nav>
	);
}