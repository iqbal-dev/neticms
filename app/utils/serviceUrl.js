
//for production only
// export const BASE_URL = 'http://34.202.31.220:9001';

//for Development only

export const BASE_URL_NETI_CMS = 'https://api.netizendev.com:2096';
export const BASE_URL_EM = 'https://api.netizendev.com:2083';
export const BASE_URL_NW = 'https://api.netizendev.com:2087';

export const fetch_em_token = '/oauth/token';
export const login_URL = '/oauth/token';
// export const fetch_urlMappingInfoBy_urlName = '/client_dws/url-mapping/dws/dws/by';
export const fetch_urlMappingInfoBy_urlName = '/public/cms-info/find/';
export const fetch_menu_urlName = '/client_dws/menu/config/by/urlid';
export const fetch_welcomeSpeechBy_cmsId = '/public/welcome/speechs';
export const fetch_usefullLinksBy_cmsId = '/public/importantLinks';
export const fetch_noticeBy_cmsId = '/public/notices';
export const fetch_instituteHistoryBy_cmsId = '/public/aboutus/by/type';
export const fetch_instituteTopEventBy_cmsId = '/public/events';
export const submit_footerContactForm = '';
export const fetch_latestNews = '';
export const fetch_staffsInformaions = '/nw/sa-point/basic/list/by/category/with/photo'
export const fetch_coreSettingsListBy_typeId = '/core/setting/list/by-type-id'; // fetch list by typeid
export const fetch_coreSettingsClassConfigurationListBy_instituteId = '/core/setting/class-configuration/list'; // class-shift-section list

export const fetch_examListBy_classConfigID = '/exam/configuration/list/by/class-config-id';
export const fetchTeacherListByCategoryName = '/nw/sa-point/basic/list/by/category/with/photo';

export const fetch_sectionWiseFailList = '/nw/sa-point/student/section-wise/result/failed/details';
export const fetch_student_paySlipList = '/nw/student-point/accounts/unpaid-invoice/search/by/custom-student-id';

export const fetch_group_names_by_classConfigId = '/core/setting/group-configuration/list/by/class-config-id';

export const fetch_student_info_by_groupConfigId = '/nw/sa-point/student/list/by/class-config-id';

export const fetch_sectionWiseMeritList = '/nw/sa-point/student/section-wise/result/merit/details';

export const fetch_teacherAttendanceListBy_date = '/nw/staff-attendance/date-wise/multiple/staff/attendance/details';

export const fetch_sectionWise_attendance = '/nw/student-attendance/period-wise/attendance/summary/by/date';

export const fetch_examListBy_studentID_and_year = '/exam/configuration/list/by/custom-student-id';
export const fetch_individual_result_data = '/nw/sa-point/student/result-details/by/custom-student-id';

export const fetch_student_sectionWise_resultList = '/nw/sa-point/student/section-wise/result/details';


// Admin Panel
export const fetch_feesInfoList = '/fee-info/list';
export const fetch_classList = '/class-info/list';
export const fetch_groupList = '/group-info/list';
export const fetch_seatInfoList = '/seat-info/list';

