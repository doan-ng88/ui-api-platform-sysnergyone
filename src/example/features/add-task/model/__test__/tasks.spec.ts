import { type Task, TaskStatus } from "@/example/entities/tasks";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from "vitest";
import { useAddTaskStore } from "../tasks";

describe("Add Task Store", () => {
	let addTaskStore: ReturnType<typeof useAddTaskStore>;

	// Mock data
	const mockTask: Task = {
		id: "1",
		title: "Test Task",
		description: "This is a test task",
		status: TaskStatus.ACTIVE,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(() => {
		// Set up a fresh Pinia instance
		setActivePinia(createPinia());

		// Initialize the store
		addTaskStore = useAddTaskStore();
	});

	it("should add a task to the task store", () => {
		// Add a task
		addTaskStore.addTask(mockTask);

		// Check if the task is added
		expect(addTaskStore.taskStore.taskItems).toContainEqual(mockTask);
	});

	it("should have an empty task list initially", () => {
		// Check if the task list is initially empty
		expect(addTaskStore.taskStore.taskItems).toHaveLength(0);
	});

	it("should add multiple tasks to the task store", () => {
		const anotherTask: Task = {
			id: "2",
			title: "Another Task",
			description: "This is another test task",
			status: TaskStatus.ACTIVE,
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		// Add multiple tasks
		addTaskStore.addTask(mockTask);
		addTaskStore.addTask(anotherTask);

		// Check if both tasks are added
		expect(addTaskStore.taskStore.taskItems).toContainEqual(mockTask);
		expect(addTaskStore.taskStore.taskItems).toContainEqual(anotherTask);
	});
});
