import React from 'react';
import logo from '../../assets/img/logo.png';

import { getFullDayName, getFullMonthName, getHHcloneMMwithAMorPM } from '../../utils/dateFormat';
import { getUrlInfoLocally } from '../../utils/localStorageMethod';
import LocalClockTime from './LocalClockTime';

export class AppHeader extends React.Component {

    constructor() {
        super();
        this.state = { testState: '', }
    }

    componentDidUpdate() {
        let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
    }

    render() {

        let instituteUrlInfo = JSON.parse(localStorage.getItem('instituteInfo'));
        const date = new Date();

        let fullDateInEng = getFullDayName(date.getDay()) + ', ' + getFullMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();

        return (
            <header className="header-wrapper pt-4 pb-4">
                <div className="container-fluid">
                    <div className="container"> {/*  container   */}
                        <div className="row">
                            <div className="col-md-8">
                                <div className="d-md-inline-flex d-sm-block justify-content-md-center align-items-sm-center">
                                    <div className="logo-wrapper">
                                        <img src={instituteUrlInfo && instituteUrlInfo.length ? "data:image/*;base64," + instituteUrlInfo[0].logoContent : ''} />
                                    </div>
                                    <div className="inst-title-wrapper">
                                        <h1 className="ins-title" style={{ marginTop: '-15px' }}>{instituteUrlInfo && instituteUrlInfo.length ? instituteUrlInfo[0].instituteName : ''}</h1>
                                        <address>{instituteUrlInfo && instituteUrlInfo.length ? instituteUrlInfo[0].instituteAddress : ''}</address>
                                        {/* <span>Neti ID : {this.props.appHeaderData}</span> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="social-wrapper">
                                    <ul className="d-inline-flex justify-content-md-end w-100 pl-0">
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-facebook-f" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-twitter" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-youtube" />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <i className="fab fa-linkedin-in" />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="calender-wrapper-top d-md-inline-flex justify-content-md-center align-items-sm-center w-100">
                                    <div className="calender-icon">
                                        <i className="far fa-calendar-alt" />
                                    </div>
                                    <div className="calender-details" style={{ marginTop: '0' }}>
                                        <span>{fullDateInEng}</span>

                                        <LocalClockTime />

                                        {/* <span>26th Boishakh, 1427 (Bangla)</span> */}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }

}
