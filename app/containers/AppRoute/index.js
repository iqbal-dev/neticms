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
import SectionWiseResult from '../SectionWiseResult';
import SectionWiseAttendance from '../SectionWiseAttendance';
import AllNotice from 'containers/AllNotice';

import StudentWiseAttendance from '../StudentWiseAttendance';
import FailList from 'containers/FailList';
import StudentInfo from 'containers/StudentInfo';
import  MeritList  from 'containers/MeritList';
import SeatInfo  from 'containers/SeatInfo';
import FindPayslip from 'containers/FindPayslip';
import WelcomeSpeech from 'containers/WelcomeSpeech';
import IndividualResult from 'containers/IndividualResult';

export default function AppRoute() {
  const instituteHostNm = window.location.pathname.slice(1).toString();
  const aboutRouteNm = `/${instituteHostNm}${'/about'.toString()}`;
  // console.log('aboutRoute', aboutRouteNm);

  const renderRouting = routerProps => {
    // console.log('routerProps', routerProps);
  };

  return (
    <Switch>
      <Route exact path="/demo" component={HomePage} />
      <Route exact path="/demo1" component={HomePage} />
      <Route exact path="/demo2" component={HomePage} />
      <Route exact path="/ngghs" component={HomePage} />
      <Route exact path="/nhmsc" component={HomePage} />
      <Route exact path="/bgmss" component={HomePage} />
      <Route exact path="/sahighschool73" component={HomePage} />
      <Route exact path="/msmamun" component={HomePage} />
      <Route exact path="/rajuhs" component={HomePage} />
      <Route exact path="/spsngn" component={HomePage} />
      <Route exact path="/ahnmuc" component={HomePage} />
      <Route exact path="/aakhsc" component={HomePage} />

      <Route exact path="/home" component={HomePage} />
      <Route exact path="/about" component={AboutUs} />
      <Route path="/history" exact component={History} />
      <Route exact path="/booklist" component={BookList} />
      <Route exact path="/all_events" component={AllEventsList} />
      <Route exact path="/classRooms" component={ClassRooms} />
      <Route exact path="/donors" component={DonorMembers} />
      <Route exact path="/committee" component={CommitteeMembers} />
      <Route exact path="/download_corner" component={DownloadCorner} />
      <Route exact path="/dressCode" component={DressCode} />
      <Route exact path="/syllabus_info" component={SyllabusInfo} />

      <Route exact path="/sectionWise_attendance" component={SectionWiseAttendance} />
      <Route exact path="/studentWise_attendance" component={StudentWiseAttendance} />
      <Route exact path="/sectionWise_result" component={SectionWiseResult} />
      <Route exact path="/failList" component={FailList} />
      <Route exact path="/example" component={ExampleDesign} />
      <Route exact path="/all_teachers" component={TeacherInformation} />
      <Route exact path="/fees_info" component={FeesInfo} />
      <Route exact path="/Student_info" component={StudentInfo} />
      <Route exact path="/welcome_speech" component={WelcomeSpeech} />
      <Route exact path="/individual_result" component={IndividualResult} />
      <Route exact path="/teacher_attendance" component={TeacherAttendance} />
      <Route exact path="/meritList" component={MeritList} />
      <Route exact path="/seatInfo" component={SeatInfo} />

      <Route exact path="/all_notice" component={AllNotice} />
      <Route exact path="/stuff_information" component={StuffInformation} />
      <Route exact path="/event_gallery" component={EventGallery} />
      <Route exact path="/infrastucture" component={BasicInfrastucture} />
      <Route exact path="/find_paySlip" component={FindPayslip} />

      <Route path="" component={NotFoundPage} />

      {/* <Route exact path='/about-us/:id' component={
        (props) =>
          <AboutUs postId={props.match.params.id}/>
      />     */}

    </Switch>
  );
}
