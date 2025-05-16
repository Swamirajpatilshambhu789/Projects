// import React, { useState } from 'react';
// import './Calender.css';

// const Calendar = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());

//   const daysInMonth = (month, year) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const firstDayOfMonth = (month, year) => {
//     return new Date(year, month, 1).getDay();
//   };

//   const renderDays = () => {
//     const month = currentDate.getMonth();
//     const year = currentDate.getFullYear();
//     const days = daysInMonth(month, year);
//     const firstDay = firstDayOfMonth(month, year);

//     const calendarDays = [];
//     for (let i = 0; i < firstDay; i++) {
//       calendarDays.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
//     }

//     for (let day = 1; day <= days; day++) {
//       calendarDays.push(
//         <div key={day} className="calendar-day">
//           {day}
//         </div>
//       );
//     }

//     return calendarDays;
//   };

//   const handlePrevMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
//   };

//   const handleNextMonth = () => {
//     setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
//   };

//   return (
//     <div className="calendar">
//       <div className="calendar-header">
//         <button className="back" onClick={handlePrevMonth}>Prev</button>
//         <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
//         <button className="forward"onClick={handleNextMonth}>Next</button>
//       </div>
//       <div className="calendar-grid">
//         <div className="calendar-day-name">Sun</div>
//         <div className="calendar-day-name">Mon</div>
//         <div className="calendar-day-name">Tue</div>
//         <div className="calendar-day-name">Wed</div>
//         <div className="calendar-day-name">Thu</div>
//         <div className="calendar-day-name">Fri</div>
//         <div className="calendar-day-name">Sat</div>
//         {renderDays()}
//       </div>
//     </div>
//   );
// };

// export default Calendar;
import React, { useState } from 'react';
import './Calender.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const days = daysInMonth(month, year);
    const firstDay = firstDayOfMonth(month, year);

    const calendarDays = [];
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(<div key={`empty${i}`} className="calendarDay empty"></div>);
    }

    for (let day = 1; day <= days; day++) {
      calendarDays.push(
        <div key={day} className="calendarDay">
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  return (
    <div className="calendar">
      <div className="calendarHeader">
        <button className='back' onClick={handlePrevMonth}>Prev</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
        <button className='forward' onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendarGrid">
        <div className="calendarDayName">Sun</div>
        <div className="calendarDayName">Mon</div>
        <div className="calendarDayName">Tue</div>
        <div className="calendarDayName">Wed</div>
        <div className="calendarDayName">Thu</div>
        <div className="calendarDayName">Fri</div>
        <div className="calendarDayName">Sat</div>
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
