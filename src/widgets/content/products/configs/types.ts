/**
 * Represents a product in the content management system
 * @interface Product
 */
export interface Product {
	/** Unique identifier for the product */
	id: string;

	/** Stock Keeping Unit - unique product identifier code */
	sku: string;

	/** Price of the product in the default currency unit */
	price: number;

	/** Quantity of the product */
	quantity: number;
}
