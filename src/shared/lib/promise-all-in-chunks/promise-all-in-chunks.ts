export const promiseAllInChunks = async <T>(
	promises: Promise<T>[],
	chunkSize = 5,
) => {
	const results: PromiseSettledResult<Awaited<T>>[] = [];
	for (let i = 0; i < promises.length; i += chunkSize) {
		const chunk = promises.slice(i, i + chunkSize);
		const chunkResults = await Promise.allSettled(chunk);

		results.push(...chunkResults);
	}
	return results;
};
