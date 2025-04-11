import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useModal } from "../modal";

describe("Modal Store", () => {
	let modalStore: ReturnType<typeof useModal>;

	beforeEach(() => {
		// Set up a fresh Pinia instance
		setActivePinia(createPinia());

		// Initialize the store
		modalStore = useModal();
	});

	it("should initialize with the modal hidden", () => {
		expect(modalStore.visible).toBe(false);
	});

	it("should show the modal", () => {
		modalStore.showModal();
		expect(modalStore.visible).toBe(true);
	});

	it("should close the modal", () => {
		modalStore.showModal(); // First, show the modal
		modalStore.closeModal(); // Then, close it
		expect(modalStore.visible).toBe(false);
	});

	it("should initialize new task with empty title and description", () => {
		expect(modalStore.newTask.title).toBe("");
		expect(modalStore.newTask.description).toBe("");
	});

	it("should update new task title and description", () => {
		modalStore.newTask.title = "New Task Title";
		modalStore.newTask.description = "New Task Description";

		expect(modalStore.newTask.title).toBe("New Task Title");
		expect(modalStore.newTask.description).toBe("New Task Description");
	});
});
