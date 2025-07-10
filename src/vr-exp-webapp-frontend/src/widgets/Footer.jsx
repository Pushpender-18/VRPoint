import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
	return (
		<footer className="w-screen bg-[#040B11] text-[#BED1D9] flex flex-col items-center mt-7">
			{/* Links */}
			<div className="w-6xl py-12 flex justify-around">
				<a href="#" className="hover:text-[#BED1D9cc]">About</a>
				<a href="#" className="hover:text-[#BED1D9cc]">Contact</a>
				<a href="#" className="hover:text-[#BED1D9cc]">Terms of Services</a>
				<a href="#" className="hover:text-[#BED1D9cc]">Privacy Policy</a>
			</div>
			{/* Social Media Links */}
			<div className="flex gap-18">
				<a href="https://facebook.com" target="_blank" className=" hover:text-[#BED1D9cc]  text-2xl">
					<FaFacebook />
				</a>
				<a href="https://twitter.com" target="_blank" className="hover:text-[#BED1D9cc] text-2xl">
					<FaTwitter />
				</a>
				<a href="https://instagram.com" target="_blank" className="hover:text-[#BED1D9cc] text-2xl">
					<FaInstagram />
				</a>
			</div>
			{/* Copyright ©2024 */}
			<div className="mt-8 mb-16">
				<h3>
					©2024 NeuroPoint. All rights reserved.
				</h3>
			</div>
		</footer>
	);
}