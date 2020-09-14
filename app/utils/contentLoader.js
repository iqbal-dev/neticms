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
        height={40}
        width={350}
        speed={2}
        primaryColor="#f3f3f3"
        secondaryColor="#ecebeb"
    >
        {/* <rect x="-1" y="15" rx="0" ry="0" width="99" height="20" /> */}
        <rect x="-5" y="0" rx="0" ry="0" width="350" height="32" />
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

function sliderLoader() {
    return <ContentLoader
        speed={2}
        width={1280}
        height={471}
        // viewBox="0 0 1280 471"
        backgroundColor="#f5f5f5"
        foregroundColor="#dbdbdb"
    >
        <rect x="4" y="8" rx="3" ry="3" width="7" height="458" />
        <rect x="6" y="460" rx="3" ry="3" width="825" height="8" />
        <rect x="824" y="9" rx="3" ry="3" width="6" height="458" />
        <rect x="55" y="42" rx="16" ry="16" width="474" height="380" />
        <rect x="612" y="113" rx="3" ry="3" width="102" height="7" />
        <rect x="602" y="91" rx="3" ry="3" width="178" height="6" />
        <rect x="605" y="139" rx="3" ry="3" width="178" height="6" />
        <rect x="616" y="162" rx="3" ry="3" width="102" height="7" />
        <rect x="605" y="189" rx="3" ry="3" width="178" height="6" />

        <rect x="616" y="215" rx="3" ry="3" width="102" height="7" />
        <rect x="605" y="240" rx="3" ry="3" width="178" height="6" />

        <rect x="616" y="265" rx="3" ry="3" width="102" height="7" />
        <rect x="605" y="290" rx="3" ry="3" width="178" height="6" />

        <rect x="616" y="315" rx="3" ry="3" width="102" height="7" />
        <rect x="605" y="340" rx="3" ry="3" width="178" height="6" />
        
        <rect x="5" y="8" rx="3" ry="3" width="825" height="7" />
        <rect x="606" y="380" rx="14" ry="14" width="72" height="32" />
        <rect x="705" y="380" rx="14" ry="14" width="72" height="32" />
        <rect x="576" y="41" rx="3" ry="3" width="231" height="29" />
    </ContentLoader>

}

function speechLoader() {
    return <ContentLoader
        speed={2}
        width={1280}
        height={290}
        // viewBox="0 0 1280 293"
        backgroundColor="#f5f5f5"
        foregroundColor="#dbdbdb"
    >
        <rect x="20" y="8" rx="0" ry="0" width="150" height="150" />
        <rect x="20" y="170" rx="0" ry="0" width="150" height="10" />
        <rect x="190" y="8" rx="0" ry="0" width="100" height="15" />
        <rect x="190" y="30" rx="0" ry="0" width="300" height="15" />
        <rect x="190" y="80" rx="0" ry="0" width="600" height="15" />
        <rect x="190" y="110" rx="0" ry="0" width="600" height="15" />
        <rect x="190" y="140" rx="0" ry="0" width="600" height="15" />
        <rect x="190" y="170" rx="0" ry="0" width="600" height="15" />
        <rect x="20" y="200" rx="0" ry="0" width="770" height="15" />
        <rect x="20" y="230" rx="0" ry="0" width="770" height="15" />
        {/* <rect x="20" y="260" rx="0" ry="0" width="770" height="15" /> */}
    </ContentLoader>

}

function threeDotLoader() {
    return <ContentLoader
        viewBox="0 0 400 160"
        height={160}
        width={400}
        speed={2}
        backgroundColor="transparent"
    >
        <circle cx="150" cy="86" r="8" />
        <circle cx="194" cy="86" r="8" />
        <circle cx="238" cy="86" r="8" />
    </ContentLoader>

}

function galleryImageLoader() {
    return <ContentLoader
        // viewBox="0 0 1644 360"
        height={360}
        width={1280}
        speed={2}
    >
        <rect x="300" y="30" rx="0" ry="0" width="650" height="300"/>
        <rect x="150" y="53" rx="0" ry="0" width="550" height="254"/>
        <rect x="0" y="76" rx="0" ry="0" width="550" height="208"/>
        <rect x="550" y="53" rx="0" ry="0" width="550" height="254"/>
        <rect x="700" y="76" rx="0" ry="0" width="550" height="208"/>
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
    listLoader,
    sliderLoader,
    speechLoader,
    threeDotLoader,
    galleryImageLoader
};
