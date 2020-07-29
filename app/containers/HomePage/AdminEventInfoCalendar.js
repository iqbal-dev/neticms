import React, { Component, Children } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import 'react-big-calendar/lib/addons/dragAndDrop/styles';
 
const localizer = momentLocalizer(moment)
let allViews = Object.keys(Views).map(k => Views[k])

// const ColoredDateCellWrapper = ({ children }) =>
//     React.cloneElement(React.Children.only(children), {
//         style: {
//             backgroundColor: 'red',
//         },
//     })

const MyEvent = (e) =>{
    console.log('MyEvent:::::::::::::::::::::', e);
    return <div>
        <strong>MyEvent</strong>
    </div>
}

const MyToolBar = (e) =>{
    console.log('MyToolBar:::::::::::::::::::::', e);
    return <div>
        <strong>MyToolBar</strong>
    </div>
}

const MyAgenda = (e) =>{
    console.log('MyAgenda:::::::::::::::::::::', e);
    return <div>
        <strong>MyAgenda</strong>
    </div>
}

// const CURRENT_DATE = moment().toDate();
// const ColoredDateCellWrapper = ({children, value}) =>
//     React.cloneElement(Children.only(children), {
//         style: {
//             ...children.style,
//             backgroundColor: value < CURRENT_DATE ? 'lightgreen' : 'lightblue',
//         },
//     });

export const MyCalendar = props => {
    let events = []

    props.events.map((item, index) => {
        events.push({
            start: moment(item.eventStartDate, 'YYYY-MM-DD'),
            end: moment(item.eventEndDate, 'YYYY-MM-DD').add(1, "days").toDate(),
            title: item.eventTitle + ' (' + item.eventType + ')'
        })
    })

    return <div>
        <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            views={{
                month: true,
                agenda: true,
                // week: true
            }}
            // views={allViews}
            showMultiDayTimes
            drilldownView="agenda"
            getDrilldownView={(targetDate, currentViewName, configuredViewNames) =>{
                if(currentViewName === 'month' && configuredViewNames.includes('week')) {
                    return 'week'
                } 
                return  null
            }}
            style={{ height: 500 }}
            components={{
                // timeSlotWrapper: ColoredDateCellWrapper,
                // event: MyEvent, // used by each view (Month, Day, Week)
                // toolbar: MyToolBar,
                // agenda: {
                //     event: MyAgenda // with the agenda view use a different component to render events
                // }
                // dateCellWrapper: ColoredDateCellWrapper,
            }}
        />
    </div>
}