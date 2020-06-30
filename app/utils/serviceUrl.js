
//for production only
// export const BASE_URL = 'http://34.202.31.220:9001';

//for Development only

export const BASE_URL_NETI_CMS = 'https://api.netizendev.com:2096';
export const BASE_URL_EM = 'https://api.netizendev.com:2083';
export const BASE_URL_NW = 'https://api.netizendev.com:2087';

export const fetch_em_token = '/oauth/token';
// export const fetch_urlMappingInfoBy_urlName = '/client_dws/url-mapping/dws/dws/by';
export const fetch_urlMappingInfoBy_urlName = '/public/cms-info/find/';
export const fetch_menu_urlName = '/client_dws/menu/config/by/urlid';
export const fetch_welcomeSpeechBy_urlId = '/client_dws/speech/get/by/welcome-status-urlid';
export const fetch_noticeBy_urlId = '/client_dws/top-notices/get/by';
export const fetch_instituteHistoryBy_urlId = '/client_dws/aboutus/by/url-type';
export const fetch_instituteTopEventBy_urlId = '/client_dws/event/top-five/by/urlid';
export const submit_footerContactForm = '';
export const fetch_latestNews = '';
export const fetch_staffsInformaions = '/nw/sa-point/basic/list/by/category/with/photo'
export const fetch_coreSettingsListBy_typeId = '/core/setting/list/by-type-id'; // fetch list by typeid
export const fetch_coreSettingsClassConfigurationListBy_instituteId = '/core/setting/class-configuration/list'; // class-shift-section list

export const fetch_examListBy_classConfigID = '/exam/configuration/list/by/class-config-id';
export const fetchTeacherListByCategoryName = '/nw/sa-point/basic/list/by/category/with/photo';

export const fetch_sectionWiseFailList = '/nw/sa-point/student/section-wise/result/failed/details';
