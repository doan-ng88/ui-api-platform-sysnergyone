import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import DeleteTask from "../delete-task.vue";

describe("DeleteTask", () => {
	it("renders the button properly", () => {
		const wrapper = mount(DeleteTask, {
			slots: {
				default: "Delete Task",
			},
		});

		// Check if the button text is rendered correctly
		expect(wrapper.text()).toContain("Delete Task");

		// Check if the button has the correct class
		expect(wrapper.find("button").classes()).toContain("btn-error");
	});
});
