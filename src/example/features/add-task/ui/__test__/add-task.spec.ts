import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AddTask from "../add-task.vue";

describe("AddTask", () => {
	it("renders the button properly", () => {
		const wrapper = mount(AddTask, {
			slots: {
				default: "Add Task",
			},
		});

		// Check if the button text is rendered correctly
		expect(wrapper.text()).toContain("Add Task");

		// Check if the button has the correct class
		expect(wrapper.find("button").classes()).toContain("btn-primary");
	});
});
