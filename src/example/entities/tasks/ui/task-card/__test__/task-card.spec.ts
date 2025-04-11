import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { type Task, TaskStatus } from "../../../model";
import TaskCard from "../task-card.vue";

describe("TaskCard", () => {
	it("renders task title and description properly", () => {
		const mockTask: Task = {
			id: "1",
			title: "Test Task",
			description: "This is a test task",
			status: TaskStatus.ACTIVE,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const wrapper = mount(TaskCard, {
			props: {
				task: mockTask,
			},
		});

		// Check if the task title and description are rendered correctly
		expect(wrapper.text()).toContain(mockTask.title);
		expect(wrapper.text()).toContain(mockTask.description);
	});
});
