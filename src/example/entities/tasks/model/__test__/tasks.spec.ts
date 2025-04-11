import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useTaskStore } from "../tasks";
import { type Task, TaskStatus } from "../types";

describe("Task Store", () => {
	let taskStore: ReturnType<typeof useTaskStore>;

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
		status: TaskStatus.COMPLETED,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(() => {
		// Set up a fresh Pinia instance
		setActivePinia(createPinia());

		// Initialize the store
		taskStore = useTaskStore();

		// Add mock tasks to the store
		taskStore.taskItems.push(mockTask1, mockTask2);
	});

	it("should add tasks to the task store", () => {
		// Check if the tasks are added
		expect(taskStore.taskItems).toContainEqual(mockTask1);
		expect(taskStore.taskItems).toContainEqual(mockTask2);
	});

	it("should separate completed and uncompleted tasks", () => {
		// Separate tasks based on their status
		taskStore.completedTaskItems = taskStore.taskItems.filter(
			(task) => task.status === TaskStatus.COMPLETED,
		);
		taskStore.uncompletedTaskItems = taskStore.taskItems.filter(
			(task) => task.status !== TaskStatus.COMPLETED,
		);

		// Check if tasks are separated correctly
		expect(taskStore.completedTaskItems).toContainEqual(mockTask2);
		expect(taskStore.uncompletedTaskItems).toContainEqual(mockTask1);
	});

	it("should have the correct number of tasks in each category", () => {
		// Separate tasks based on their status
		taskStore.completedTaskItems = taskStore.taskItems.filter(
			(task) => task.status === TaskStatus.COMPLETED,
		);
		taskStore.uncompletedTaskItems = taskStore.taskItems.filter(
			(task) => task.status !== TaskStatus.COMPLETED,
		);

		// Check the number of tasks in each category
		expect(taskStore.completedTaskItems).toHaveLength(1);
		expect(taskStore.uncompletedTaskItems).toHaveLength(1);
	});
});
