export interface ImageDetail {
	altimagetext: string;
	url: string;
	width: number;
}

export interface ItemImagesDetail {
	main: ImageDetail;
	media: {
		urls: ImageDetail[];
	};
}

export interface PriceScheduleItem {
	maximumquantity?: number;
	minimumquantity: number;
	price: number;
	price_formatted: string;
}

export interface VisibilityDetail {
	inpersonalizedcatalog: boolean;
	bycurrentuserloginstatus?: boolean;
	bystockavailability?: boolean;
}

export interface CustomerPriceDetail {
	onlinecustomerprice_formatted: string;
	onlinecustomerprice: number;
	priceschedule: PriceScheduleItem[];
}

export interface Product {
	custitem_ef_badges: string;
	ispricevisible_detail: VisibilityDetail;
	ispurchasable_detail: VisibilityDetail;
	ispricevisible: boolean;
	custitem_is_variable_amount: boolean;
	ispurchasable: boolean;
	stockdescription: string;
	pricelevel1: number;
	pricelevel2: number;
	pricelevel5: number;
	pricelevel7: number;
	pricelevel9: number;
	pricelevel10: number;
	pricelevel11: number;
	pricelevel12: number;
	pricelevel13: number;
	pricelevel14: number;
	pricelevel15: number;
	pricelevel16: number;
	pricelevel18: number;
	pricelevel24: number;
	pricelevel26: number;
	itemimages_detail: ItemImagesDetail;
	onlinecustomerprice_detail: CustomerPriceDetail;
	pricelevel5_formatted: string;
	pricelevel1_formatted: string;
	internalid: number;
	outofstockmessage: string;
	storedescription: string;
	isinstock: boolean;
	onlinecustomerprice: number;
	itemid: string;
	onlinecustomerprice_formatted: string;
	isbackorderable: boolean;
	showoutofstockmessage: boolean;
	outofstockbehavior: string;
	quantityavailable: number;
	displayname: string;
	storedisplayname2: string;
	urlcomponent: string;
}
