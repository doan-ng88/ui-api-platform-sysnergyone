import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import type { Task } from "./types";

export const useTaskStore = defineStore("tasks", () => {
	// Begin: AI Code Generation 2024.11.08
	const taskItems = reactive<Task[]>([]);

	const completedTaskItems = ref<Task[]>([]);
	const uncompletedTaskItems = ref<Task[]>([]);

	const $reset = () => {
		taskItems.length = 0;
		completedTaskItems.value = [];
		uncompletedTaskItems.value = [];
	};

	return {
		// States
		taskItems,
		completedTaskItems,
		uncompletedTaskItems,

		// Reset
		$reset,
	};
	// End: AI Code Generation 2024.11.08
});
