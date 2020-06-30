/**
 *
 * TeacherInformation
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
import makeSelectTeacherInformation, { makeSelectTeacherInformationList } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import donorImage from '../../assets/img/donor-image.png';
import demoImageMale from '../../assets/img/demo-image.jpg';
import demoImageFemale from '../../assets/img/demo-image-female.jpg';

import BreadcrumComponent from '../../components/BreadcrumComponent';
import { AppLayout } from '../AppLayout';


/* eslint-disable react/prefer-stateless-function */
export class TeacherInformation extends React.PureComponent {
  render() {
    
    let teachers = this.props.teacherList;
    return (
      <div>
        <AppLayout>
        <Helmet>
          <title>TeacherInformation</title>
          <meta
            name="description"
            content="Description of TeacherInformation"
          />
        </Helmet>
        <BreadcrumComponent pageTitle="Teacher's Information" menuStepFirst="Home" menuStepSenond="Administration" menuStepThird="Teacher's Information" />

        <section>
          <div className="container-fluid">
            <div className="container p-t-60">
              <div className="row">
                <div className="col-md-12">
                  <div className="page-inner-title">
                    <h2 className="text-orange">Teacher's Information</h2>
                    <div className="custom-title-border-left"></div>
                  </div>
                </div>
              </div>
              <div className="row">
                {
                  teachers.map((item) => {
                    return(
                      <div className="col-md-4">
                        <div className="grid-list-wrapper">
                          {
                            item.gender == "Male" ? <div className="grid-image teachers">
                            {item.image ? <img src={item.imageName} className="mx-auto d-block"/> : <img src={demoImageMale} className="mx-auto d-block"/>}
                          </div> : <div className="grid-image teachers">
                            {item.image ? <img src={item.imageName} className="mx-auto d-block"/> : <img src={demoImageFemale} className="mx-auto d-block"/>}
                          </div>
                          }
                          <div className="grid-content text-center">
                              <div className="grid-title">
                                {item.staffName ? <h3>{item.staffName}</h3> : <h3>No Name</h3>}
                              </div>
                              <div className="grid-subtitle-title">
                                {item.staffName ? <h4>{item.designationName}</h4> : <h4>No Data</h4>}
                              </div>
                          </div>
                          <div className="grid-social">
                            <ul className="d-flex justify-content-center w-100 nav">
                              
                              {item.staffMobile1 ? <li><a className="phone" href="#" phoneNumber={item.staffMobile1}><i class="fas fa-phone"></i></a></li> : <li><a className="phone" href="#" phoneNumber="No Phone Found"><i class="fas fa-phone"></i></a></li>}
                              {item.staffEmail ? <li><a href="#" className="phone" phoneNumber={item.staffEmail}><i class="fas fa-envelope"></i></a></li> : <li><a href="#" phoneNumber="No Email Found"><i class="fas fa-envelope"></i></a></li>}
                              <li><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                              <li><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )                    
                  })
                }
              </div> 
            </div>
            <div className="container">
              <div className="row">
                <div className="offset-md-1 col-md-10">
                  <div className="custom-title-border-center"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </AppLayout>
      </div>
    );
  }
}

TeacherInformation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  teacherList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  teacherInformation: makeSelectTeacherInformation(),
  teacherList: makeSelectTeacherInformationList()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'teacherInformation', reducer });
const withSaga = injectSaga({ key: 'teacherInformation', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TeacherInformation);
