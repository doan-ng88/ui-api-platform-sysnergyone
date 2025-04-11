import type { BooleanString } from "@/shared/config";

/**
 * Parameters for updating content information
 */
export interface SetUpdateContentParams {
	contentID?: string;
	platformID?: string;
	contentName?: string;
	contentURL?: string;
	contentThumbnail?: string;
	contentDescription?: string;
	contentPublishedDate?: string;
	likeCount?: string;
	loveCount?: string;
	shareCount?: string;
	commentCount?: string;
	enabled?: BooleanString;
}

/**
 * Parameters for updating content category association
 */
export interface SetUpdateContentCategoryParams {
	contentCategoryID?: string;
	contentID?: string;
	categoryID?: string;
	enabled?: BooleanString;
}

/**
 * Parameters for updating content product information
 */
export interface SetUpdateContentProductParams {
	contentProductID?: string;
	contentID?: string;
	sku?: string;
	quantity?: string;
	price?: string;
	enabled?: BooleanString;
}

/**
 * Parameters for updating content influencer association
 */
export interface SetUpdateContentInfluencerParams {
	contentInfluencerID?: string;
	contentID?: string;
	influencerID?: string;
	enabled?: BooleanString;
}

/**
 * Main interface containing all update parameters
 */
export interface SetUpdateContentUpdateProps {
	setUpdateContentParams?: SetUpdateContentParams;
	setUpdateContentCategoryParams?: SetUpdateContentCategoryParams[];
	setUpdateContentProductParams?: SetUpdateContentProductParams[];
	setUpdateContentInfluencerParams?: SetUpdateContentInfluencerParams[];
}
