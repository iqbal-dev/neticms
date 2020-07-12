/**
 *
 * AdminSyllabus
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
import makeSelectAdminSyllabus from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { AdminPrivateLayout } from '../AdminPrivateLayout';

import {
  makeSelectAdminSyllabusList,
  makeSelectClassList,
  makeSelectClassId,
  makeSelectGroupList,
  makeSelectGroupId,
  makeSelectUploadFile,
  makeSelectRowData,
  makeSelectDialogVisibleStatus
} from './selectors';
import {
  setClassId, setGroupId, setUploadFile,
  setRowData, setDialogVisibleStatus,
} from './actions'

/* eslint-disable react/prefer-stateless-function */
export class AdminSyllabus extends React.Component {
  render() {
    return (
      <AdminPrivateLayout>
        <Helmet>
          <title>AdminSyllabus</title>
          <meta name="description" content="Description of AdminSyllabus" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </AdminPrivateLayout>
    );
  }
}

AdminSyllabus.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  adminSyllabus: makeSelectAdminSyllabus(),
  syllabusList: makeSelectAdminSyllabusList(),
  classList: makeSelectClassList(),
  classId: makeSelectClassId(),
  groupList: makeSelectGroupList(),
  groupId: makeSelectGroupId(),
  selectedRowData: makeSelectRowData(),
  dialogVisibleStatus: makeSelectDialogVisibleStatus()
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

const withReducer = injectReducer({ key: 'adminSyllabus', reducer });
const withSaga = injectSaga({ key: 'adminSyllabus', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AdminSyllabus);
