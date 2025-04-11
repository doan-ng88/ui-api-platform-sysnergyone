import type { BooleanString } from "@/shared/config";

export interface SetUpdateInfluencerProps {
	influencerId?: string;
	typeInfluencerId?: string;
	fullName?: string;
	phone?: string;
	fullAddress?: string;
	notes?: string;
	enabled?: boolean;
	platforms?: SetUpdateInfluencer_Platform[];
	collaborationStatus?: boolean;
	mainPlatformId?: string;
	categories?: SetUpdateInfluencer_Category[];
	linkAvatar?: string;
}

export interface SetUpdateInfluencer_Platform {
	influencerPlatformID?: string;
	platformID?: string;
	socialLinks?: string;
	followerCount?: string;
	username?: string;
	enabled?: BooleanString;
}

export interface SetUpdateInfluencer_Category {
	influencerCategoryID?: string;
	influencerID?: string;
	categoryID?: string;
	createdAt?: string;
	updatedAt?: string;
	enabled?: BooleanString;
}
