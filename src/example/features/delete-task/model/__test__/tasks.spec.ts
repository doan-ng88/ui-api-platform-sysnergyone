import { type Task, TaskStatus } from "@/example/entities/tasks";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useDeleteTaskStore } from "../tasks";

describe("Delete Task Store", () => {
	let deleteTaskStore: ReturnType<typeof useDeleteTaskStore>;

	// Mock data
	const mockTask1: Task = {
		id: "1",
		title: "Test Task 1",
		description: "This is a test task 1",
		status: TaskStatus.ACTIVE,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	const mockTask2: Task = {
		id: "2",
		title: "Test Task 2",
		description: "This is a test task 2",
		status: TaskStatus.ACTIVE,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(() => {
		// Set up a fresh Pinia instance
		setActivePinia(createPinia());

		// Initialize the store
		deleteTaskStore = useDeleteTaskStore();

		// Add mock tasks to the store
		deleteTaskStore.taskStore.taskItems.push(mockTask1, mockTask2);
	});

	it("should delete a task from the task store", () => {
		// Delete a task
		deleteTaskStore.deleteTask(mockTask1.id);

		// Check if the task is deleted
		expect(deleteTaskStore.taskStore.taskItems).not.toStrictEqual([mockTask1]);
		expect(deleteTaskStore.taskStore.taskItems).toStrictEqual([mockTask2]);
	});

	it("should not delete any task if the id does not exist", () => {
		// Attempt to delete a non-existent task
		deleteTaskStore.deleteTask("non-existent-id");

		// Check if the task list remains unchanged
		expect(deleteTaskStore.taskStore.taskItems).toContainEqual(mockTask1);
		expect(deleteTaskStore.taskStore.taskItems).toContainEqual(mockTask2);
	});

	it("should have the correct number of tasks after deletion", () => {
		// Delete a task
		deleteTaskStore.deleteTask(mockTask1.id);

		// Check the number of tasks
		expect(deleteTaskStore.taskStore.taskItems).toHaveLength(1);
	});
});
