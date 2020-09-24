/**
 *
 * ClassRoutine
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectClassRoutine, {
  makeSelectClassConfigId,
  makeSelectClassRoutineListData,
  makeSelectSectionList,
  makeSelectDataTableLoader,
  makeSelectClassLoader
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { AppLayout } from '../AppLayout';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { Form, FormGroup, Input, Button, Table } from 'reactstrap';
import { makeChangeSection, submitSearchHandle } from './actions';
import { centerTableLoader, inputFieldLoader } from '../../utils/contentLoader';

let sectionName = '';

export class ClassRoutine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    }
  }

  emptyFieldCheck() {

    let fieldIsEmpty = false;
    let { errors } = this.state;

    if (!this.props.classConfigId) {
      fieldIsEmpty = true;
      errors["section"] = "section can't left empty.";
    }

    this.setState({ errors });
    return fieldIsEmpty;

  }

  onSearch = (e) => {
    e.preventDefault();
    if (!this.emptyFieldCheck()) {
      this.getSectionName();
      this.props.onSubmitSearch();
    }
  }

  getSectionName = () => {

    if (this.props.sectionList && this.props.sectionList.length) {
      this.props.sectionList.filter(item => {
        if (item.classConfigId == this.props.classConfigId) { sectionName = item.classShiftSection }
      })
    }
  }

  getPeriodWiseResult = (period) => {
    let periodValue = period.map((item1, index1) => <td>{item1.subjectName}<br /><u>{item1.teacherName}</u></td>)
    if (periodValue.length > 0) {
      return periodValue
    }
    else {
      return <td>---</td>
    }
  }

  parseTime = (cTime) => {
    if (cTime == '') return null;
    var d = new Date();
    var time = cTime.match(/(\d+)(:(\d\d))?\s*(p?)/);
    d.setHours(parseInt(time[1]) + ((parseInt(time[1]) < 12 && time[4]) ? 12 : 0));
    d.setMinutes(parseInt(time[3]) || 0);
    d.setSeconds(0, 0);
    return d;
  }

  getPeriodTime = (period) => {
    // let periodTime = period.map((item, index) => {
    var res = period.split(" - ");

    let difference = ""
    if (res[0] != "" && res[1] != "") {
      var tStart = this.parseTime(res[0]);
      var tStop = this.parseTime(res[1]);

      difference = (tStop - tStart) / (1000 * 60);
    }
    else {
      difference = "";
    }

    return <th>
      {period}<br />
      (Duration: {difference} min)
        </th>
    // })

    // console.log("periodTime...........", periodTime);
    // if(periodTime.length > 0){
    //   return periodTime
    // }
    // else{
    //   return <td>---</td>
    // } 
  }

  render() {

    let { errors } = this.state;
    let { sectionList, classRoutineListData, classLoader } = this.props;

    let dayList = []
    let periodList = []
    let periodOriginalList = []
    let timeList = []
    if (classRoutineListData) {
      dayList = classRoutineListData.map((item, index) =>
        item.dayName
      )

      classRoutineListData.map((item, index) => {
        if (index == 0) {
          Object.keys(item.periodCellViewer).map((item2, index2) => {

            let setPeriod = ""
            item2 == "firstPeriod" ? setPeriod = "1st Period" :
              item2 == "secondPeriod" ? setPeriod = "2nd Period" :
                item2 == "thirdPeriod" ? setPeriod = "3rd Period" :
                  item2 == "fourthPeriod" ? setPeriod = "4th Period" :
                    item2 == "fifthPeriod" ? setPeriod = "5th Period" :
                      item2 == "sixthPeriod" ? setPeriod = "6th Period" :
                        item2 == "seventhPeriod" ? setPeriod = "7th Period" :
                          item2 == "eighthPeriod" ? setPeriod = "8th Period" :
                            item2 == "ninethPeriod" ? setPeriod = "9th Period" :
                              ""

            periodOriginalList.push(item2)
            periodList.push(setPeriod)
            periodList.sort();
          })

          periodOriginalList.map((item3, index) => {
            timeList.push(item.periodCellViewer[item3][0].periodTime)
            timeList.sort()
          })

          // console.log("TimeList...........//", timeList);
        }
      })
    }

    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>ClassRoutine</title>
            <meta name="description" content="Description of ClassRoutine" />
          </Helmet>
          {/* <FormattedMessage {...messages.header} /> */}
          <BreadcrumComponent
            pageTitle="Class Routine"
            menuStepFirst="More"
            menuStepSenond="Routine"
            menuStepThird="Class Routine"
          />

          <section>
            <div className="container-fluid">
              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12 result-body-header">
                    <div className="row result-body-header-inside py-4 no-box-shadow bg-gray-light">

                      <div className="col-md-12 col-lg-12 form">
                        <Form inline>
                          <div className="col-md-6 col-lg-4">
                            {this.props.classLoader ? inputFieldLoader() :
                              <div>
                                <FormGroup className="custom-dropdown">
                                  <Input
                                    className=" bg-white"
                                    type="select"
                                    name="examType"
                                    onChange={e => this.props.onChangeSection(e)}
                                  >
                                    <option value=''>Select Class</option>
                                    {
                                      sectionList && sectionList.map((item, index) =>
                                        <option key={item.classConfigId} value={item.classConfigId}>{item.classShiftSection}</option>
                                      )
                                    }
                                  </Input>
                                  <span className="error-message"> {errors['examType']}</span>
                                </FormGroup>
                              </div>
                            }

                          </div>

                          <div className="col-md-6 col-lg-2">
                            <FormGroup>
                              <Button
                                className="btn explore-btn all-border-radious"
                                onClick={this.onSearch}
                              >
                                <i class="fas fa-chevron-circle-right mr-3" ></i> Search
                              </Button>
                            </FormGroup>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="container m-t-40">
                <div className="row">
                  <div className="col-md-12">
                    <div className="page-inner-title with-print mb-4">
                      <h2 className="bg-gray-light px-4 py-2">
                        <span className="font-18">
                          Showing Result of <span className="text-orange ml-1"> {sectionName}</span></span>
                        {/* <Button className="btn btn-success bg-primary-color-dark"><i className="fas fa-download"></i> Download</Button> */}
                      </h2>
                      {/* <div className="custom-title-border-left my-4" /> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    {this.props.dataTableLoader ? centerTableLoader() :
                      <div className="table-responsive custom-table">
                        <Table striped className="class-routine-table">
                          <thead>
                            <tr>
                              <th colSpan="10" className="text-left">Class Routine</th>
                            </tr>
                            {
                              classRoutineListData && !classRoutineListData.length > 0 ?
                                <tr>
                                  <th colSpan="10" className="">No Data Found</th>
                                </tr>
                                :
                                <>
                                  <tr className="">
                                    <th className="bg-orange text-white" rowSpan="2">
                                      Day<br />&<br />Time
                                  </th>
                                    {periodList.map((item2, index2) => <th>{item2}</th>)}
                                  </tr>

                                  <tr className="bg-orange border-b-0">
                                    {
                                      timeList.map((item, index) =>
                                        this.getPeriodTime(item)
                                      )
                                    }
                                    {
                                      // classRoutineListData.map((item, index) => {
                                      //   let countPeriod = Object.keys(item.periodCellViewer).length
                                      //   let setPeriod = ""

                                      //   // console.log("item.periodCellViewer.firstPeriod", item.periodCellViewer.firstPeriod);
                                      //   index == 0 ? setPeriod = "firstPeriod" :
                                      //   index == 1 ? setPeriod = "secondPeriod" :
                                      //   index == 2 ? setPeriod = "thirdPeriod" :
                                      //   index == 3 ? setPeriod = "fourthPeriod" :
                                      //   index == 4 ? setPeriod = "fifthPeriod" :
                                      //   index == 5 ? setPeriod = "sixthPeriod" :
                                      //   // index == 6 ? setPeriod = "seventhPeriod" :
                                      //   // index == 7 ? setPeriod = "eighthPeriod" :
                                      //   // index == 8 ? setPeriod = "ninethPeriod" :
                                      //   ""

                                      //   // console.log("index", index, setPeriod);
                                      //   return <>
                                      //       { setPeriod ? this.getPeriodTime(item.periodCellViewer[setPeriod]) : null }
                                      //   </>

                                      // })
                                    }

                                  </tr>
                                </>
                            }

                          </thead>
                          <tbody>

                            {
                              classRoutineListData && classRoutineListData.length ? classRoutineListData.map((item, index) => {
                                let periodCellViewer = Object.keys(item.periodCellViewer)

                                // console.log("item.periodCellViewer", periodCellViewer);
                                return <>
                                  <tr>
                                    <td>{item.dayName}</td>
                                    {this.getPeriodWiseResult(item.periodCellViewer.firstPeriod)}
                                    {this.getPeriodWiseResult(item.periodCellViewer.secondPeriod)}
                                    {this.getPeriodWiseResult(item.periodCellViewer.thirdPeriod)}
                                    {this.getPeriodWiseResult(item.periodCellViewer.fourthPeriod)}
                                    {this.getPeriodWiseResult(item.periodCellViewer.fifthPeriod)}
                                    {this.getPeriodWiseResult(item.periodCellViewer.sixthPeriod)}
                                    {/* { this.getPeriodWiseResult(item.periodCellViewer && item.periodCellViewer.seventhPeriod) } */}
                                    {/* { this.getPeriodWiseResult(item.periodCellViewer.eighthPeriod) } */}
                                    {/* { this.getPeriodWiseResult(item.periodCellViewer.ninethPeriod) } */}

                                    {/* {
                                        item.periodCellViewer.map((item2, index2) => {
                                          console.log("item2",item2); */}
                                    {/* <td>{ item.periodCellViewer.firstPeriod && item.periodCellViewer.firstPeriod[0].subjectName}<br/>{ item.periodCellViewer.firstPeriod && item.periodCellViewer.firstPeriod[0].teacherName}</td> */}
                                    {/* })
                                      } */}

                                  </tr>

                                </>

                              })

                                : ''
                            }

                          </tbody>
                        </Table>
                      </div>
                    }
                  </div>
                </div>
              </div>

              {/* <div className="container">
                <div className="row">
                  <div className="col-md-12">
                      <div className="table-responsive custom-table">
                        <Table striped className="class-routine-table">
                          <thead>
                            <tr>
                              <th colSpan="10" className="text-left">Class Routine</th>
                            </tr>
                            <tr className="">
                              <th className="bg-orange text-white" rowSpan="2">
                                Day<br/>&<br/>Time
                              </th>
                              <th>1st Period</th>
                              <th>2nd Period</th>
                              <th>3rd Period</th>
                              <th>4th Period</th>
                              <th>5th Period</th>
                              <th>6th Period</th>
                              <th>7th Period</th>
                              <th>8th Period</th>
                              <th>9th Period</th>
                            </tr>
                            <tr className="bg-orange border-b-0">
                              <th>
                                10:15 AM-10:55 AM
                                <br/>
                                (Duration: 40 min)
                              </th>
                              <th>
                                10:55 AM-11:30 AM
                                <br/>
                                (Duration: 35 min)
                              </th>
                              <th>
                                10:55 AM-11:30 AM
                                <br/>
                                (Duration: 35 min)
                              </th>
                              <th>
                                10:55 AM-11:30 AM
                                <br/>
                                (Duration: 35 min)
                              </th>
                              <th>
                                10:55 AM-11:30 AM
                                <br/>
                                (Duration: 35 min)
                              </th>
                              <th>
                                10:55 AM-11:30 AM
                                <br/>
                                (Duration: 35 min)
                              </th>
                              <th>
                                10:55 AM-11:30 AM
                                <br/>
                                (Duration: 35 min)
                              </th>
                              <th>
                                10:55 AM-11:30 AM
                                <br/>
                                (Duration: 35 min)
                              </th>
                              <th>
                                10:55 AM-11:30 AM
                                <br/>
                                (Duration: 35 min)
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Saturday</td>
                              <td>
                                Mathematics
                                <br/>
                                M.R
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>

                            </tr>

                            <tr>
                              <td>Sunday</td>
                              <td>
                                Mathematics
                                <br/>
                                M.R
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              
                            </tr>

                            <tr><td colSpan="10">Continue till ...</td></tr>

                            <tr>
                              <td>Thursday</td>
                              <td>
                                Mathematics
                                <br/>
                                M.R
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td>
                                English For
                                <br/>
                                Today M.A
                              </td>
                              <td colSpan="5"></td>
                              
                            </tr>
                          </tbody>
                        </Table>
                      </div>
                  </div>
                </div>
              </div> */}

            </div>
          </section>

          <div className="container">
            <div className="row">
              <div className="offset-md-1 col-md-10">
                <div className="custom-title-border-center mb-2" />
              </div>
            </div>
          </div>

        </AppLayout>
      </div>
    );
  }
}

ClassRoutine.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  classRoutine: makeSelectClassRoutine(),

  sectionList: makeSelectSectionList(),
  classConfigId: makeSelectClassConfigId(),
  classRoutineListData: makeSelectClassRoutineListData(),

  dataTableLoader: makeSelectDataTableLoader(),
  classLoader: makeSelectClassLoader(),

  // loaderType: makeSelectFailListLoaderType(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onChangeSection: (evt) => { dispatch(makeChangeSection(evt.target.value)) },
    onSubmitSearch: () => { dispatch(submitSearchHandle()) },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'classRoutine', reducer });
const withSaga = injectSaga({ key: 'classRoutine', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ClassRoutine);
