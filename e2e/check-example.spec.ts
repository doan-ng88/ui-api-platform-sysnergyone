import { expect, test } from "@playwright/test";
import * as m from "../src/shared/lib/i18n/messages";

test.describe("Auth E2E Tests", () => {
	test("go to dashboard page should redirect to sign in page", async ({
		page,
	}) => {
		// Navigate to the page where the button should be
		await page.goto("/"); // Adjust the URL as needed

		// Check if the 'Add' button exists
		const addButton = page.locator(
			`h1:has-text("${m.careful_house_earthworm_push()}")`,
		);
		await expect(addButton).toBeVisible(); // Ensure there's exactly one 'Add' button
	});

	test("after sign in system should redirect to OTP page", async ({ page }) => {
		// Navigate to the page where the button should be
		await page.goto("/"); // Adjust the URL as needed

		await page
			.getByLabel(m.icy_proof_dove_mend())
			.fill("test.actsone@gmail.com");

		await page.getByLabel(m.tame_keen_donkey_praise()).fill("123456");

		const verifyButton = page.locator(
			`button:has-text("${m.careful_house_earthworm_push()}")`,
		);
		await verifyButton.click();
		await expect(verifyButton).toBeDisabled(); // Ensure there's exactly one 'Add' button

		await page.waitForURL("**/verify-otp**");

		const verifyPageHeader = page.locator(
			`h1:has-text("${m.every_zany_crow_arise()}")`,
		);
		await expect(verifyPageHeader).toBeVisible(); // Ensure there's exactly one 'Add' button
	});
});
