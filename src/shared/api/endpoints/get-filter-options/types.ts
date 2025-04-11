export interface GetFilterOptionsBodyRequest {
	listOption?: GetFilterOptions_Name[];
	option?: GetFilterOptions_Name;
}

export type GetFilterOptions_Name =
	| "Categories"
	| "Platforms"
	| "TypeInfluencers"
	| "Departments";

export interface GetFilterOptionsResponse {
	typeInfluencer: GetFilterOptions_TypeInfluencer[] | null;
	platform: GetFilterOptions_Platform[] | null;
	category: GetFilterOptions_Category[] | null;
	department: GetFilterOptions_Department[] | null;
}

export interface GetFilterOptions_TypeInfluencer {
	typeInfluencerID: number;
	typeInfluencerName: string;
	createdAt: Date;
	updatedAt: Date;
	enabled: boolean;
}

export interface GetFilterOptions_Platform {
	platformID: number;
	platformName: string;
	createdAt: Date;
	updatedAt: Date;
	enabled: boolean;
}

export interface GetFilterOptions_Category {
	categoryID: number;
	categoryName: string;
	createdAt: Date;
	updatedAt: Date;
	enabled: boolean;
}

export interface GetFilterOptions_Department {
	departmentID: number;
	departmentName: string;
	createdAt: Date;
	updatedAt: Date;
	enabled: boolean;
}
