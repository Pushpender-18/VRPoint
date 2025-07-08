import { useState } from "react";
import { vr_exp_webapp_backend } from "../../../declarations/vr-exp-webapp-backend";
import Editor from "../widgets/Editor";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
	async function getPrincipalID() {	// Returns Principal ID from cache
		const principal_id = localStorage.getItem("principal_id");
		if (principal_id == null) {
			navigator("/");
		}
		return principal_id;
	}
	function fileHandler(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		const file = formData.get("file");
		setFileData(formData);
		const url = URL.createObjectURL(file);
		setModelURL(url);
	}

	async function formHandler(event) {
		event.preventDefault();
		const formData = new FormData(event.target);
		if (formData.get("title") == "") {
			alert("Title is empty");
		} else {
			const loading = document.getElementById("loading");
			loading.classList.toggle("hidden");

			const response = await axios.post('http://127.0.0.1:5001/api/v0/add',
				fileData,
				{
					headers: { 'Content-Type': 'multipart/form-data' }
				}
			);
			const cid = response.data.Hash;
			const manifest = {cid : [1, 2, 3]};
			const principal_id = await getPrincipalID();
			const title = formData.get("title");
			const now = new Date();
			const time_stamp = formatDateTime(now);
			const result = await vr_exp_webapp_backend.create_nft(principal_id, title, time_stamp, "", JSON.stringify(manifest));
			if (result) {
				alert("NFT Created");
			} else {
				alert("Error Occured");
			}
			navigator("/home/");
		}
	}

	function fileNameHandler(event) {
		const nameLabel = document.getElementById("model-label");
		const file = event.target.files[0];
		nameLabel.innerHTML = file.name;
	}

	function handleClose() {
		URL.revokeObjectURL(modelURL);
		navigator("/home/");
	}

	const [modelURL, setModelURL] = useState();
	const [fileData, setFileData] = useState();
	const navigator = useNavigate();

	let content = null;
	if (modelURL) {
		content = <Editor url={modelURL} />
	}

	return (
		<div className="w-screen h-screen bg-black overflow-hidden relative" id="editor-div">
			<div id="loading" className="w-screen h-screen absolute bg-white/20 backdrop-blur-lg z-10 flex justify-center items-center text-white text-5xl hidden">Creating NFT</div>
			<div className="h-12 flex items-center justify-center relative">
				<form onSubmit={fileHandler} className="flex gap-6 ml-9">
					<label id="model-label" htmlFor="file" className="h-10 border-2 px-4 border-white rounded-lg flex justify-center items-center hover:bg-white/40 active:bg-white/50 transition-all duration-200">Select Model</label>
					<input type="file" name="file" id="file" className="hidden" accept=".glb" onChange={fileNameHandler} />
					<button type="submit" className="h-10 border-2 px-4 border-white rounded-lg flex justify-center items-center hover:bg-white/40 active:bg-white/50 transition-all">Upload</button>
				</form>
				<div className="font-bold text-red-500 text-5xl absolute right-6 hover:text-red-600 active:text-red-700 cursor-pointer" onClick={handleClose}>X</div>
			</div>
			<div className="h-[calc(100vh-6rem)]">
				{content}
			</div>
			<div className="h-12 flex items-center justify-center">
				<form className="flex gap-6 ml-9" onSubmit={formHandler}>
					<input type="text" name="title" id="title" placeholder="Title" className="h-10 border-2 px-4 border-white rounded-lg flex justify-center items-center hover:bg-white/10 transition-all" />
					<button type="submit" className="h-10 border-2 px-4 border-white rounded-lg flex justify-center items-center hover:bg-white/40 active:bg-white/50 transition-all">Create NFT</button>
				</form>
			</div>
		</div>);
}