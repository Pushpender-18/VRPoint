import { Outlet, useLocation, Link } from "react-router-dom";
import DashboardNavBar from "../widgets/DashboardNavBar";

export default function Home() {
	const url = useLocation();

	let ownedStyling, buyStyling, sellStyling, transactionStyling;
	switch (url.pathname) {
		case ("/home/buy"):
			buyStyling = "font-bold text-[#43A7CB] border-[#43A7CB] border-b-4 ";
			break;
		case ("/home/sell"):
			sellStyling = "font-bold text-[#43A7CB] border-[#43A7CB] border-b-4 ";
			break;
		case ("/home/transaction"):
			transactionStyling = "font-bold text-[#43A7CB] border-[#43A7CB] border-b-4 ";

			break;
		case ("/home/"):
		default:
			ownedStyling = "font-bold text-[#43A7CB] border-[#43A7CB] border-b-4 ";
	}

	return (
		<div className="flex flex-col items-center">
			<DashboardNavBar />
			<div className="w-7xl mt-18">
				<h1 className="text-6xl font-bold text-[#43A7CB]">My Virtual Worlds</h1>
			</div>
			<div className="w-7xl mt-8 flex text-3xl gap-14 text-[#BED1D9] border-[#BED1D9] border-b-2">
				<div className={"p-2 px-4" + ownedStyling}>
					<Link to="/home/">Owned</Link>
				</div>
				<div className={"p-2 px-4" + buyStyling}>
					<Link to="/home/buy">Buy</Link>
				</div>
				<div className={"p-2 px-4" + sellStyling}>
					<Link to="/home/sell">Sell</Link>
				</div>
				<div className={"p-2 px-4" + transactionStyling}>
					<Link to="/home/transaction">Transaction</Link>
				</div>
			</div>
			<div className="content">
				<Outlet />
			</div>
		</div>
	);
}