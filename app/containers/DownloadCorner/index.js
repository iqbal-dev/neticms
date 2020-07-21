/**
 *
 * DownloadCorner
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
import makeSelectDownloadCorner, { makeSelectDownloadList } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import BreadcrumComponent from '../../components/BreadcrumComponent';
import { Table } from 'reactstrap';
import { AppLayout } from '../AppLayout';
import { concat } from 'lodash';

/* eslint-disable react/prefer-stateless-function */
export class DownloadCorner extends React.PureComponent {
  render() {
    let downloadLists = this.props.downloadList;
    return (
      <div>
        <AppLayout>
        <Helmet>
          <title>ClassRooms</title>
          <meta name="description" content="Description of ClassRooms" />
        </Helmet>
        <BreadcrumComponent pageTitle="Download Corner" menuStepFirst="Home" menuStepSenond="Administration" menuStepThird="Download Corner" />
        <section>
          <div className="container-fluid">
            <div className="container p-t-60">
              <div className="row">
                <div className="col-md-12">
                  <div className="page-inner-title">
                    <h2 className="text-orange">Download Corner</h2>
                    <div className="custom-title-border-left"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="container">
              <div className="row">
                <di className="col-md-12">
                  <div className="table-responsive custom-table">
                  <Table striped className="download-corner-table">
                    <thead>
                      <tr>
                        <th>Sl No.</th>
                        <th>File Name</th>
                        <th className="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        downloadLists && downloadLists.map((item, index) =>{
                          return(
                            <tr>
                              <td>{index > 9 ? index + 1 : '0'+(index + 1) }</td>
                              <td>{item.fileTitle}</td>
                              <td className="text-center"><button class="btn explore-btn"><i class="fas fa-download pr-2"></i>DOWNLOAD</button></td>
                            </tr>
                          )
                        }
                        )
                      }
                    </tbody>
                  </Table>
                  </div>
                </di>
              </div>
              <div className="row m-t-40">
              <div className="col-md-12">
                <div className="text-center m-t-40">
                <button class="btn explore-btn-lg">Load More <i class="fas fa-angle-right"></i></button>
                </div>
              </div>
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

DownloadCorner.propTypes = {
  dispatch: PropTypes.func.isRequired,
  downloadList: PropTypes.any
};

const mapStateToProps = createStructuredSelector({
  downloadCorner: makeSelectDownloadCorner(),
  downloadList: makeSelectDownloadList()
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

const withReducer = injectReducer({ key: 'downloadCorner', reducer });
const withSaga = injectSaga({ key: 'downloadCorner', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DownloadCorner);
