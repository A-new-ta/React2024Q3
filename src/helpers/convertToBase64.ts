export const convertToBase64 = (file: File | null): Promise<string> | null => {
	if (file) {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		return new Promise((resolve) => {
			reader.onloadend = () => {
				resolve(reader.result as string);
			};
		});
	} else {
		return null;
	}
};
