import type { Task } from "@/example/entities/tasks";
import { assignReactive } from "@/shared/lib/assign-reactive";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const useModal = defineStore("modal", () => {
	const newTask = reactive<Pick<Task, "title" | "description">>({
		title: "",
		description: "",
	});

	const visible = ref(false);

	const $reset = () => {
		assignReactive(newTask, {
			title: "",
			description: "",
		});

		visible.value = false;
	};

	const showModal = () => {
		visible.value = true;
	};

	const closeModal = () => {
		visible.value = false;
	};

	return {
		// States
		newTask,
		visible,

		// Actions
		showModal,
		closeModal,

		// Reset
		$reset,
	};
});
