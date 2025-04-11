import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it, vi } from "vitest";
import NewTaskModal from "../new-task-modal.vue";

vi.mock("../model/modal", () => ({
	useModal: vi.fn(() => ({
		showModal: vi.fn(),
		visible: false,
	})),
}));

describe("NewTaskModal", () => {
	beforeEach(() => {
		// Set up a fresh Pinia instance
		setActivePinia(createPinia());
	});

	it("renders the button properly", () => {
		const wrapper = mount(NewTaskModal);

		// Check if the button text is rendered correctly
		expect(wrapper.text()).toContain("Add"); // Adjust based on actual translation
		expect(wrapper.find("button").classes()).toContain("btn-primary");
	});
});
