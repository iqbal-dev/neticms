import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import HomePage from 'containers/HomePage';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import AboutUs from 'containers/AboutUs';
import History from 'containers/History';
import AppLayout from 'containers/AppLayout';
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
import FailList from '../FailList';
import StudentInfo from '../StudentInfo';
import { MeritList } from '../MeritList';
import { SeatInfo } from '../SeatInfo';
import FindPayslip from '../FindPayslip';
import WelcomeSpeech from '../WelcomeSpeech';
import IndividualResult from '../IndividualResult';

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
      <Route exact path="/about" component={AboutUs} />
      <Route path="/demo2/history" exact component={History} />
      {/* <Route exact path='/about-us/:id' component={
        (props) =>
          <AboutUs postId={props.match.params.id}/>
      />     */}
      <Route exact path="/booklist/demo2" component={BookList} />
      <Route exact path="/all-events/demo2" component={AllEventsList} />
      <Route exact path="/classrooms/demo2" component={ClassRooms} />
      <Route exact path="/donors/demo2" component={DonorMembers} />
      <Route exact path="/committee/demo2" component={CommitteeMembers} />
      <Route exact path="/download-corner/demo2" component={DownloadCorner} />
      <Route exact path="/dressCode" component={DressCode} />
      <Route exact path="/syllabus-info" component={SyllabusInfo} />
      <Route
        exact
        path="/section-wise-attendance"
        component={SectionWiseAttendance}
      />
      <Route exact path="/student-wise-attendance" component={StudentWiseAttendance}/>
      <Route exact path="/section-wise-result" component={SectionWiseResult} />
      <Route exact path="/fail-list" component={FailList} />
      <Route exact path="/example" component={ExampleDesign} />
      <Route exact path="/all-teachers" component={TeacherInformation} />
      <Route exact path="/fees-info" component={FeesInfo} />
      <Route exact path="/Student-info" component={StudentInfo} />
      <Route exact path="/welcome-speech" component={WelcomeSpeech} />
      <Route exact path="/individual-result" component={IndividualResult} />
      <Route exact path="/teacher-attendance" component={TeacherAttendance} />
      <Route exact path="/merit-list" component={MeritList} />
      <Route exact path="/seat-info" component={SeatInfo} />



      <Route exact path="/all-notice" component={AllNotice} />
      <Route exact path="/stuff_information" component={StuffInformation} />
      <Route exact path="/event_gallery" component={EventGallery} />
      <Route exact path="/infrastucture" component={BasicInfrastucture} />
      <Route exact path="/find-pay-slip" component={FindPayslip} />

      <Route path="" component={NotFoundPage} />
      
    </Switch>
  );
}
