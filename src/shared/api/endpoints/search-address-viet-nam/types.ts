export interface Location {
	code: string;
	name: string;
	name_en: string;
	name_vi: string;
	full_name: string;
	full_name_en: string;
	full_name_vi: string;
	districts: null | Location[];
	wards: null | Location[];
}

export interface SearchAddressVietNamBodyRequest {
	provinceCode?: string;
	districtCode?: string;
	pageSize: number;
}
