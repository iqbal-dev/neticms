import React from 'react';
import ContentLoader from 'react-content-loader';

function emptyTableMessage() {
    return <div className="no-data-msg-wrapper">
        <div className="ui-g ui-fluid">
            <div className="ui-g-12 ui-lg-2 ui-md-2 ui-sm-12"></div>
            <div className="ui-g-12 ui-lg-8 ui-md-8 ui-sm-12 text-center">
                <h1 className="no-data-msg">No data is available! Please fillup all the required fields above and Click on <b>"Search"</b> button.</h1>
                {/* <h1 className="no-data-msg">No data is showing! Please select your desired field above and hit <b>"Search"</b> button.</h1> */}
            </div>
        </div>
    </div>
}

function emptyAutoLoadTableMsg() {
    return <div className="no-data-msg-wrapper">
        <div className="ui-g ui-fluid">
            <div className="ui-g-12 ui-lg-2 ui-md-2 ui-sm-12"></div>
            <div className="ui-g-12 ui-lg-8 ui-md-8 ui-sm-12 text-center">
                <h1 className="no-data-msg">No data is available!</h1>
                {/* <h1 className="no-data-msg">No data is showing! Please select your desired field above and hit <b>"Search"</b> button.</h1> */}
            </div>
        </div>
    </div>
}

function normalFormInputField() {
    return <ContentLoader
        height={45}
        width={500}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="-1" y="5" rx="0" ry="0" width="99" height="10" />
        <rect x="-5" y="20" rx="0" ry="0" width="510" height="30" />
    </ContentLoader>
}

function inlineFormInputField() {
    return <ContentLoader
        height={55}
        width={500}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="-1" y="1" rx="0" ry="0" width="99" height="15" />
        <rect x="-5" y="25" rx="0" ry="0" width="510" height="35" />
    </ContentLoader>
}

function inputFieldLoader() {
    return <ContentLoader
        height={100}
        width={500}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        {/* <rect x="-1" y="15" rx="0" ry="0" width="99" height="20" /> */}
        <rect x="-5" y="26" rx="0" ry="0" width="300" height="40" />
    </ContentLoader>
}

function inputFieldLoaderLarge() {
    return <ContentLoader
        height={100}
        width={600}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        {/* <rect x="-1" y="15" rx="0" ry="0" width="99" height="20" /> */}
        <rect x="-5" y="26" rx="0" ry="0" width="600" height="40" />
    </ContentLoader>
}

function tableLoader() {
    return <ContentLoader
        height={405}
        width={760}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="-5" y="0" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="15" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="30" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="45" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="60" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="75" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="90" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="105" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="120" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="135" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="150" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="165" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="180" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="195" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="210" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="225" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="240" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="255" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="270" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="285" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="300" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="315" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="330" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="345" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="360" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="375" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="390" rx="0" ry="0" width="720" height="12" />
        <rect x="-5" y="405" rx="0" ry="0" width="720" height="12" />
    </ContentLoader>
}

function centerTableLoader() {

    return <div className="container">
        <div className="row">
            <div className="col-lg-2 " />
            <div className="col-lg-10 col-md-12 col-sm-12">
                <ContentLoader
                    height={405}
                    width={760}
                    speed={2}
                    primaryColor="#f3f3f3"
                    secondaryColor="#ecebeb"
                >
                    <rect x="-5" y="0" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="15" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="30" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="45" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="60" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="75" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="90" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="105" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="120" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="135" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="150" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="165" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="180" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="195" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="210" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="225" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="240" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="255" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="270" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="285" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="300" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="315" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="330" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="345" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="360" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="375" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="390" rx="0" ry="0" width="720" height="12" />
                    <rect x="-5" y="405" rx="0" ry="0" width="720" height="12" />
                </ContentLoader>
            </div>
        </div>
    </div>
}

//For All Table of 4 Row / Accounts/
function smallTableLoader() {
    return <ContentLoader
        height={40}
        width={500}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        <rect x="-5" y="0" rx="0" ry="0" width="510" height="10" />
        <rect x="-5" y="12" rx="0" ry="0" width="510" height="10" />
        <rect x="-5" y="24" rx="0" ry="0" width="510" height="10" />
    </ContentLoader>
}

function listLoader() {
    return <ContentLoader
        viewBox="0 0 300 70"
        width={300}
        height={70}
        speed={2}
    >
        <rect x="5" y="5" rx="0" ry="0" width="150" height="20" />
        <rect x="5" y="40" rx="0" ry="0" width="300" height="20" />
    </ContentLoader>

}
export {
    normalFormInputField,
    inlineFormInputField,
    inputFieldLoader,
    inputFieldLoaderLarge,
    tableLoader,
    centerTableLoader,
    smallTableLoader,
    emptyTableMessage,
    emptyAutoLoadTableMsg,
    listLoader
};
