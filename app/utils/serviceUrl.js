
//for production only
// export const BASE_URL = 'http://34.202.31.220:9001';

//for Development only

export const BASE_URL_NETI_CMS = 'https://api.neticms.com'; //https://api.netizendev.com:2096 https://api.neticms.com
export const BASE_URL_EM = 'https://api.edumanbd.com';  //https://api.netizendev.com:2083
export const BASE_URL_NW = 'https://api.netiworld.com'; //https://api.netizendev.com:2087

export const fetch_em_token = '/oauth/token';
export const login_URL = '/oauth/token';
// export const fetch_urlMappingInfoBy_urlName = '/client_dws/url-mapping/dws/dws/by';
export const fetch_urlMappingInfoBy_urlName = '/public/cms-info/find/';
export const fetch_menu_urlName = '/client_dws/menu/config/by/urlid';
export const fetch_welcomeSpeechBy_cmsId = '/public/welcome/speechs';
export const fetch_usefullLinksBy_cmsId = '/public/importantLinks';
export const fetch_downloadLinksBy_cmsId = '/public/downloadCorners';
export const fetch_noticeBy_cmsId = '/public/notices';
export const fetch_instituteHistoryBy_cmsId = '/public/aboutus/by/type';
export const fetch_instituteTopEventBy_cmsId = '/public/events';
export const fetch_galleryImageBy_cmsId = '/public/photoGallerys';
export const fetch_syllabusBy_cmsId = '/public/syllabus';
export const fetch_syllabusFileBy_cmsId = '/syllabus-info/file/find';
export const fetch_classListBy_cmsId = '/public/classes';
export const fetch_bookListBy_classId = '/public/classWise/book';
export const submit_footerContactForm = '';
export const fetch_latestNews = '';
export const FETCH_STAFF_INFORMATION = '/nw/sa-point/basic/list/by/category/with/photo';
export const fetch_coreSettingsListBy_typeId = '/core/setting/list/by-type-id'; // fetch list by typeid
export const fetch_coreSettingsClassConfigurationListBy_instituteId = '/core/setting/class-configuration/list'; // class-shift-section list

export const fetch_examListBy_classConfigID = '/exam/configuration/list/by/class-config-id';
export const fetchTeacherListByCategoryName = '/nw/sa-point/basic/list/by/category/with/photo';

export const fetch_sectionWiseFailList = '/nw/sa-point/student/section-wise/result/failed/details';
export const fetch_student_paySlipList = '/nw/student-point/accounts/unpaid-invoice/search/by/custom-student-id';

export const fetch_group_names_by_classConfigId = '/core/setting/group-configuration/list/by/class-config-id';

export const FETCH_STUDEN_INFO_BY_GROUP_CONFIG_ID = '/nw/sa-point/student/list/by/class-config-id';

export const FETCH_SECTION_WISE_MERIT_LIST = '/nw/sa-point/student/section-wise/result/merit/details';

export const fetch_teacherAttendanceListBy_date = '/nw/staff-attendance/date-wise/multiple/staff/attendance/details';

export const FETCH_SECTION_WISE_ATTENDANCE = '/nw/student-attendance/period-wise/attendance/summary/by/date';
export const FETCH_STUDENT_ID_WISE_ATTENDANCE = '/nw/student-attendance/details/single-student/date-to-date';

export const fetch_examListBy_studentID_and_year = '/exam/configuration/list/by/custom-student-id';
export const fetch_individual_result_data = '/nw/sa-point/student/result-details/by/custom-student-id';

export const fetch_student_sectionWise_resultList = '/nw/sa-point/student/section-wise/result/details';

export const fetch_typeWise_memberList = '/public/typeWise/members';
export const fetch_genderWise_dressList = '/public/genderWise/dress';
export const fetch_seats_details = '/public/seats';
export const fetch_welcomeSpeechList = '/public/speechs';
export const fetch_public_classList = '/public/classes';
export const fetch_feesInfoBy_class = '/public/classWise/fees';

export const fetch_syllabusInfoList = '/syllabus-info/list';

// Admin Panel
export const fetch_feesInfoList = '/fee-info/list';
export const save_newFeeInfo = '/fee-info/save';
export const update_newFeeInfo = '/fee-info/update';

export const fetch_classList = '/class-info/list';
export const fetch_groupList = '/group-info/list';
export const fetch_seatInfoList = '/seat-info/list';
export const fetch_seatInfoSave = '/seat-info/save';
export const fetch_seatInfoUpdate = '/seat-info/update';
export const fetch_seatInfoDelete = '/seat-info/delete';

export const fetch_downloadCornerList = '/seat-info/list';

// fetch_downloadCornerList

export const fetch_dressInfoList = '/dress-info/list';
export const save_newDressInfo = '/dress-info/save';
export const update_newDressInfo = '/dress-info/update';

export const fetch_downloadFileContent = '/public/downloadcorner/file/find';
export const fetch_sliderImage_cmsId = '/public/typeWise/photoGallerys';
export const fetch_infrastructureListBy_cmsId = '/public/aboutus';

export const fetch_notice_file_content = '/public/notice/file/find';

// class routine
export const fetch_classRoutineList = '/nw/sa-point/class-routine';
export const fetch_examRoutineList = '/nw/sa-point/exam-routine/by/exam-config-id';

// Exam Routine
export const fetch_examTypeByClassId = '/exam/configuration/list/by/class-id';

export const fetch_examSessionList = '/routine/exam-session/list';

// fetch_sessionList
// https://api.netizendev.com:2096/public/notice/file/find?noticeId=2236
// fetch_classRoutineList

export const FETCH_ONLINE_CLASS_ROUTINE = "/nw/sa-point/online-routine/by/section/group/date";