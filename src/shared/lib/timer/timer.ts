import { reactive, ref, watch } from "vue"; // Importing ref and watch from Vue for reactive state and watching changes.

/**
 * Interface defining the properties for the timer.
 *
 * @interface TimerProps
 * @property startMs - The starting time in milliseconds.
 * @property countdown - Optional flag indicating if the timer should count down.
 * @property onFinish - Optional callback function to be called when the timer finishes.
 */
export interface TimerProps {
	startMs: number; // The starting time in milliseconds.
	countdown?: boolean; // Indicates if the timer should count down.
	onFinish?: () => void; // Callback function to execute when the timer finishes.
}

/**
 * Custom hook to manage a timer.
 *
 * This hook provides functionality to start and stop a timer, and it
 * reacts to changes in the timer's state.
 *
 * @param props - The properties for the timer.
 * @returns An object containing the current timer value and methods to start and stop the timer.
 *
 * @public
 * @example
 * const { timer, start, stop } = useTimer({ startMs: 60000, countdown: true, onFinish: () => console.log("Timer finished!") });
 * start(); // Starts the countdown timer.
 */
export const useTimer = (props: TimerProps) => {
	const timer = ref<number>(); // Reactive reference to hold the current timer value.

	const timerTimeoutRef = ref<NodeJS.Timeout>(); // Reactive reference to hold the timeout ID for the timer.

	/**
	 * Clears the timer timeout reference.
	 *
	 * This function stops the timer if it is currently running and resets the timeout reference.
	 *
	 * @private
	 */
	const clearTimerTimeoutRef = () => {
		if (timerTimeoutRef.value) {
			clearInterval(timerTimeoutRef.value); // Clears the existing interval.
			timerTimeoutRef.value = undefined; // Resets the timeout reference.
		}
	};

	/**
	 * Starts the timer.
	 *
	 * This function initializes the timer based on the countdown flag and
	 * sets up an interval to update the timer value every second.
	 *
	 * @public
	 * @example
	 * start(); // Starts the timer.
	 */
	const start = () => {
		clearTimerTimeoutRef(); // Clears any existing timer before starting a new one.

		if (props.countdown) {
			timer.value = props.startMs; // Sets the timer to the starting value.
			timerTimeoutRef.value = setInterval(() => {
				if (timer.value) {
					timer.value -= 1000; // Decrements the timer value by 1 every second.
				} else {
					stop(); // Stops the timer when it reaches zero.
				}
			}, 1000); // Sets the interval to 1000 milliseconds (1 second).
		}
	};

	/**
	 * Stops the timer.
	 *
	 * This function clears the timer and calls the onFinish callback if provided.
	 *
	 * @public
	 * @example
	 * stop(); // Stops the timer and triggers the onFinish callback if defined.
	 */
	const stop = () => {
		clearTimerTimeoutRef(); // Clears the timer timeout reference.
		timer.value = undefined; // Resets the timer value.
		props.onFinish?.(); // Calls the onFinish callback if it exists.
	};

	// Watcher to react to changes in the timer value.
	watch(timer, (value) => {
		if (value === 0 && props.countdown) {
			stop(); // Stops the timer when it reaches zero in countdown mode.
		} else if (value === props.startMs && !props.countdown) {
			stop(); // Stops the timer when it reaches the starting value in non-countdown mode.
		}
	});

	// Returns the current timer value and methods to control the timer.
	return reactive({ timer, start, stop });
};
