/**
 * Assign reactive object source to target. This do not replace the target object. it just assign the data that souce have
 *
 * const a = reactive({a: 'abc', c: 'def'})
 *
 * const b = { c: 'ftg' }
 *
 * assignReactive(a, b)
 *
 * console.log(a) // { a: 'abc', c: 'ftg' }
 * @param target - Target object
 * @param source - Source object
 */
export const assignReactive = <T extends object>(target: T, source: T) => {
	Object.assign(target, JSON.parse(JSON.stringify(source)));
};
