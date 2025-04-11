import { type Task, useTaskModel } from "@/example/entities/tasks";
import { defineStore } from "pinia";

export const useAddTaskStore = defineStore("add-task", () => {
	const taskStore = useTaskModel();

	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	const $reset = () => {};

	const addTask = (task: Task) => {
		taskStore.taskItems.push(task);
	};

	return {
		// States
		taskStore,

		// Actions
		addTask,

		// Reset
		$reset,
	};
});
