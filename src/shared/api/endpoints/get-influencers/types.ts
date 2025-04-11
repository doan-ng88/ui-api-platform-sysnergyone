import type { CommonPaginationRequest } from "@/shared/config";

export interface GetInfluencersBodyRequest extends CommonPaginationRequest {
	influencerId?: string;
	contentCategoryId?: string;
	collaborationStatus?: boolean;
	fullName?: string;
	phone?: string;
	enabled?: boolean;
}

export interface Influencer {
	influencerID: number;
	typeInfluenceID: number;
	fullName: string;
	phone: string;
	ward: string;
	city: string;
	fullAddress: string;
	mainPlatformID: number;
	notes: string;
	linkAvatar: string;
	enabled: boolean;
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
	collaborationStatus: boolean;
	typeInfluenceName: string;
	mainPlatformName: string;
	influencerPlatforms: Platform[] | null;
	influencerCategories: Category[] | null;
}

export interface Platform {
	influencerPlatformID: number;
	influencerID: number;
	platformID: number;
	username: string;
	socialLinks: string;
	followerCount: number;
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
	enabled: boolean;
	platformName: string;
}

export interface Category {
	influencerCategoryID: number;
	influencerID: number;
	categoryID: number;
	createdAt: string; // ISO 8601 date string
	updatedAt: string; // ISO 8601 date string
	enabled: boolean;
}
