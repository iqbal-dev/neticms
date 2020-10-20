import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AboutUs from 'containers/AboutUs';
import History from 'containers/History';
import BookList from 'containers/BookList';
import AllEventsList from 'containers/AllEventsList';
import ClassRooms from 'containers/ClassRooms';
import DonorMembers from 'containers/DonorMembers';
import CommitteeMembers from 'containers/CommitteeMembers';
import DownloadCorner from 'containers/DownloadCorner';

import DressCode from 'containers/DressCode';
import SyllabusInfo from 'containers/SyllabusInfo';
import ExampleDesign from 'containers/ExampleDesign';
import TeacherInformation from 'containers/TeacherInformation';
import FeesInfo from 'containers/FeesInfo';
import TeacherAttendance from 'containers/TeacherAttendance';

import StuffInformation from 'containers/StuffInformation';
import EventGallery from 'containers/EventGallery';
import BasicInfrastucture from 'containers/BasicInfrastucture';
import AllNotice from 'containers/AllNotice';

import FailList from 'containers/FailList';
import StudentInfo from 'containers/StudentInfo';
import MeritList from 'containers/MeritList';
import SeatInfo from 'containers/SeatInfo';
import FindPayslip from 'containers/FindPayslip';
import WelcomeSpeech from 'containers/WelcomeSpeech';
import IndividualResult from 'containers/IndividualResult';
import GalleryImage from 'containers/admin/GalleryImage';
import AdminFeesInfo from 'containers/admin/AdminFeesInfo';
// import AdminDressInfo from 'containers/admin/AdminDressInfo';

import StudentWiseAttendance from 'containers/StudentWiseAttendance';
import SectionWiseAttendance from 'containers/SectionWiseAttendance';
import SectionWiseResult from 'containers/SectionWiseResult';
import AdminSeatInfo from 'containers/admin/AdminSeatInfo';

import AdminLogin from 'containers/AdminLogin';
import AdminDownloadCorner from 'containers/admin/AdminDownloadCorner';
import AdminHomepage from 'containers/admin/AdminHomepage';
import AdminSyllabus from 'containers/admin/AdminSyllabus';
import PrivateRoute from '../../components/PrivateRoute';
import { getAuthenticatedStatus } from '../../utils/localStorageMethod';
import ClassRoutine from 'containers/ClassRoutine';
import OnlineClassRoutine from 'containers/OnlineClassRoutine';
import ExamRoutine from 'containers/ExamRoutine';
import Awards from 'containers/Awards';
import TopStudents from 'containers/TopStudents';
import Alumnus from 'containers/Alumnus';
import OnlineAdmission from 'containers/admisia/OnlineAdmission';
import ApplicationForm from 'containers/admisia/ApplicationForm';

export default function AppRoute() {

  const instituteHostNm = window.location.pathname.slice(1).toString();
  const aboutRouteNm = `/${instituteHostNm}${'/about'.toString()}`;
  // console.log('aboutRoute', aboutRouteNm);

  const renderRouting = routerProps => {
    // console.log('routerProps', routerProps);
  };
  console.log('appRoute-getAuthenticatedStatus()', getAuthenticatedStatus());

  return (
    <Switch>

      <Route exact path="/:id" component={HomePage} />
      <Route exact path="/institute/home" component={HomePage} />
      <Route exact path="/institute/about" component={AboutUs} />
      <Route path="/institute/history" exact component={History} />
      <Route exact path="/institute/booklist" component={BookList} />
      <Route exact path="/institute/all_events" component={AllEventsList} />
      <Route exact path="/institute/classRooms" component={ClassRooms} />
      <Route exact path="/institute/donors" component={DonorMembers} />
      <Route exact path="/institute/committee" component={CommitteeMembers} />
      <Route exact path="/institute/download_corner" component={DownloadCorner} />
      <Route exact path="/institute/dressCode" component={DressCode} />
      <Route exact path="/institute/syllabus_info" component={SyllabusInfo} />

      <Route exact path="/institute/sectionWise_attendance" component={SectionWiseAttendance} />
      <Route exact path="/institute/studentWise_attendance" component={StudentWiseAttendance} />
      <Route exact path="/institute/sectionWise_result" component={SectionWiseResult} />
      <Route exact path="/institute/failList" component={FailList} />
      <Route exact path="/institute/example" component={ExampleDesign} />
      <Route exact path="/institute/all_teachers" component={TeacherInformation} />
      <Route exact path="/institute/fees_info" component={FeesInfo} />
      <Route exact path="/institute/Student_info" component={StudentInfo} />
      <Route exact path="/institute/welcome_speech" component={WelcomeSpeech} />
      <Route exact path="/institute/individual_result" component={IndividualResult} />
      <Route exact path="/institute/teacher_attendance" component={TeacherAttendance} />
      <Route exact path="/institute/meritList" component={MeritList} />
      <Route exact path="/institute/seatInfo" component={SeatInfo} />

      <Route exact path="/institute/all_notice" component={AllNotice} />
      <Route exact path="/institute/stuff_information" component={StuffInformation} />
      <Route exact path="/institute/photo_gallery" component={EventGallery} />
      <Route exact path="/institute/infrastructure" component={BasicInfrastucture} />
      <Route exact path="/institute/find_paySlip" component={FindPayslip} />

      {/* Routine Route*/}
      <Route exact path="/institute/class_routine" component={ClassRoutine} />
      <Route exact path="/institute/online_class_routine" component={OnlineClassRoutine} />
      <Route exact path="/institute/exam_routine" component={ExamRoutine} />

      <Route exact path="/institute/awards" component={Awards} />
      <Route exact path="/institute/top_students" component={TopStudents} />
      <Route exact path="/institute/alumnus" component={Alumnus} />

      {/* <Route exact path="/admin/login" component={AdminLogin} /> */}

      {/** **** Admin Route ******** */}
      {/* <Route exact path="/admin/homepage" component={AdminHomepage} />
      <Route exact path="/admin/gallery_image" component={GalleryImage} />
      <Route exact path="/admin/seat_info" component={AdminSeatInfo} />
      <PrivateRoute exact path="/admin/fees_info" component={AdminFeesInfo} />
      <PrivateRoute exact path="/admin/dress_info" component={AdminDressInfo} />

      <Route exact path="/admin/download_corner" component={AdminDownloadCorner} />

      <PrivateRoute path="/admin/homepage" exact component={AdminHomepage} />
      <PrivateRoute path="/admin/syllabus" exact component={AdminSyllabus} /> */}

      {/* Admisia Menu Start */}
      <Route exact path="/institute/online_admission" component={OnlineAdmission} />
      <Route exact path="/institute/application_form" component={ApplicationForm} />


      <Route path="" component={NotFoundPage} />

    </Switch>
  );
}
