/**
 *
 * BasicInfrastucture
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectBasicInfrastucture, { makeSelectInfrastructureList, makeSelectInfrastructureLoaderType } from './selectors';
import reducer from './reducer';
import saga from './saga';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import infrastructure from '../../assets/img/Infrustructure.png';
import { AppLayout } from '../AppLayout';
import staticImg from '../../assets/img/blank-image.png';
import ReadMoreReact from 'read-more-react';
import { centerTableLoader } from '../../utils/contentLoader';

/* eslint-disable react/prefer-stateless-function */
export class BasicInfrastucture extends React.PureComponent {

  render() {

    let { infrastructureList } = this.props
    return (
      <div>
        <AppLayout>
          <Helmet>
            <title>BasicInfrastucture</title>
            <meta
              name="description"
              content="Description of BasicInfrastucture"
            />
          </Helmet>
          <BreadcrumComponent
            pageTitle="Institute Details"
            menuStepFirst="Institute Info"
            menuStepSenond="About"
            menuStepThird="Institute Details"
          />
          <section>
            <div className="container p-t-60 content-wrapper">
              {this.props.loaderType === 'autoLoadOn' ? centerTableLoader() :
                infrastructureList && infrastructureList.map((item) =>
                  <React.Fragment>

                    <div className="row align-items-md-center ">
                      <div className="col-md-6">
                        <div className="infrastructure-content-wrapper">
                          <div className="page-inner-title">
                            <h2 className="text-orange">{item.aboutusType}</h2>
                            <div className="custom-title-border-left no-border"></div>
                          </div>
                          <div className="">
                            <div className="content" style={{ height: '185px', overflowY: 'auto', textAlign: 'justify' }}>

                              {item.aboutusDetails ?

                                <ReadMoreReact text={item.aboutusDetails}
                                  min={315}
                                  ideal={315}
                                  max={2000}
                                  readMoreText={<button className="btn explore-btn m-t-20">
                                    Read More <i className="fas fa-angle-right" />
                                  </button>} />
                                : ''
                              }

                              {/* <p>{ item.aboutusDetails }</p> */}
                            </div>

                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="infrastructure-content-image">
                          {item.fileContent ?
                            <img className="img-fluid w-100 box-shadow" src={"data:image/*;base64," + item.fileContent} alt="infrastructure" /> :
                            <img className="img-fluid w-100 box-shadow" src={staticImg} style={{ objectFit: 'contain', background: 'white', padding: '16px' }} alt="infrastructure" />
                          }
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="offset-md-1 col-md-10">
                        <div className="custom-title-border-center" />
                      </div>
                    </div>
                  </React.Fragment>
                )
              }

            </div>

          </section>
        </AppLayout>
      </div>
    );
  }
}

BasicInfrastucture.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  basicInfrastucture: makeSelectBasicInfrastucture(),
  infrastructureList: makeSelectInfrastructureList(),
  loaderType: makeSelectInfrastructureLoaderType(),
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

const withReducer = injectReducer({ key: 'basicInfrastucture', reducer });
const withSaga = injectSaga({ key: 'basicInfrastucture', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BasicInfrastucture);
