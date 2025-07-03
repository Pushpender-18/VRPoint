import DashboardNavBar from "../widgets/DashboardNavBar";

export default function Home() {
	return (
		<div className="flex flex-col items-center">
			<DashboardNavBar />
			<div className="w-7xl mt-24">
				<h1 className="text-6xl font-bold text-[#43A7CB]">My Virtual Worlds</h1>
			</div>
		</div>
	);
}