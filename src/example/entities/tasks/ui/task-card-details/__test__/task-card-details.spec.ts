import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { type Task, TaskStatus } from "../../../model";
import TaskCardDetails from "../task-card-details.vue";

describe("TaskCardDetails", () => {
	it("renders task details properly", () => {
		const mockTask: Task = {
			id: "1",
			title: "Test Task",
			description: "This is a test task",
			status: TaskStatus.ACTIVE,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		const wrapper = mount(TaskCardDetails, {
			props: {
				task: mockTask,
			},
		});

		// Check if the task details are rendered correctly
		expect(wrapper.text()).toContain(mockTask.title);
		expect(wrapper.text()).toContain(mockTask.description);
		expect(wrapper.text()).toContain(mockTask.status);
		expect(wrapper.text()).toContain(mockTask.createdAt);
		expect(wrapper.text()).toContain(mockTask.updatedAt);
	});
});
