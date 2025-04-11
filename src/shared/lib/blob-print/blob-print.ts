export const blobPrint = async (fileUrl: string) => {
	const blobPrintIframe = document.createElement("iframe");
	blobPrintIframe.style.display = "none";

	document.body.appendChild(blobPrintIframe);

	const pdfFile = await fetch(fileUrl);
	const data = await pdfFile.blob();

	const url = URL.createObjectURL(data);
	blobPrintIframe.src = url;
	blobPrintIframe.onload = () => {
		setTimeout(() => {
			blobPrintIframe.focus();
			const cleanup = () => {
				URL.revokeObjectURL(url);
				document.body.removeChild(blobPrintIframe);
				window.removeEventListener("focus", cleanup);
			};

			// Add an event listener to detect when the window gains focus again
			window.addEventListener("focus", cleanup);

			blobPrintIframe.contentWindow?.print();
		}, 1);
	};
};
