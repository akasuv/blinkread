import React from "react";
import "./App.css";

const extractAllText = () => {
	const paragraphNodes = document.querySelectorAll("p");

	const textList = Array.from(paragraphNodes).map(
		(p: HTMLParagraphElement) => p.innerText
	);

	return textList.join(" ");
};

function App() {
	const [text, setText] = React.useState("");
	const [loading, setLoading] = React.useState(true);

	const unmountApp = () => {
		document.getElementById("blinkread-root")?.remove();
		location.reload();
	};

	React.useEffect(() => {
		const allText = extractAllText();
		chrome.runtime.sendMessage({ content: allText }, function(response) {
			console.log(response);
			setLoading(false);
			setText(response.text);
		});
	}, []);

	return (
		<div className="w-[500px] min-h-[100px] max-h-[500px] p-4 text-slate-900 text-base flex flex-col relative">
			<div className="flex items-center mb-2 gap-x-1">
				<h1 className="font-black text-sm">BlinkRead</h1>
				<span className="text-xs">Powered by ChatGPT</span>
			</div>
			<div
				className="w-[12px] absolute top-4 right-4 cursor-pointer"
				onClick={unmountApp}
			>
				<img src={chrome.runtime.getURL("close.png")} width="100%" />
			</div>
			{loading ? (
				<div className="flex flex-col w-full justify-center items-center gap-y-2">
					<div className="w-[100px]">
						<img src={chrome.runtime.getURL("loading.gif")} width="100%" />
					</div>
					<p>Processing the content...</p>
				</div>
			) : (
				<p className="overflow-y-scroll">{text}</p>
			)}
		</div>
	);
}

export default App;
