import { useTaskModel } from "@/example/entities/tasks";
import { defineStore } from "pinia";

export const useDeleteTaskStore = defineStore("deleteTask", () => {
	const taskStore = useTaskModel();

	// biome-ignore lint/suspicious/noEmptyBlockStatements: <explanation>
	const $reset = () => {};

	const deleteTask = (id: string) => {
		taskStore.taskItems = taskStore.taskItems.filter((task) => task.id !== id);
	};

	return {
		// States
		taskStore,

		// Actions
		deleteTask,

		// Reset
		$reset,
	};
});
