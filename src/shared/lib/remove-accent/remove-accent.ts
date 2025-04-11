export const removeAccent = (str: string) => {
	let newStr = str;
	const from =
		"àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ";
	const to =
		"aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
	for (let i = 0, l = from.length; i < l; i++) {
		const removeAccentRegex = new RegExp(from[i], "gi");
		newStr = newStr.replace(removeAccentRegex, to[i]);
	}

	return newStr;
};
