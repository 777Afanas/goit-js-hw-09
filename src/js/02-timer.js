import flatpickr from "flatpickr"; 
import "flatpickr/dist/flatpickr.min.css";


const refs = {
    selector: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    secondss: document.querySelector('span[data-secondss]'),
}

refs.startBtn.disabled = true;
// flatpickr(test,{
//     onClose(selectedDates){
//         const time = selectedDates[0];
//         console.log(time);
//     }
// });

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,  
    onClose(selectedDates) {
        const selectedTime = selectedDates[0].getTime();
        const startTime = options.defaultDate.getTime();
        
        // if (selectedDates[0] - new Date() < 0) {
        //     alert('Please choose a date in the future');
        //     //   Notiflix.Notify.failure('Please choose a date in the future');
        //     return;
        // }

         if (selectedTime - startTime < 0) {
            alert('Please choose a date in the future');
            //   Notiflix.Notify.failure('Please choose a date in the future');
            return;
        }
            
        refs.startBtn.addEventListener('click', () => {
            // setInterval(() => {
            //     // const startTime = options.defaultDate.getTime();
            //     const deltaTime = selectedTime - startTime;
            //     const { days, hours, minutes, seconds } = convertMs(deltaTime);
            //     console.log(`${days}:${hours}:${minutes}:${seconds}`);

            //     refs.hours.textContent = `${hours}`
            //     refs.minutes.textContent = `${minutes}`
            //     refs.secondss.textContent = `${seconds}`
            // }, 1000);
            
                // const startTime = options.defaultDate.getTime();
                const deltaTime = selectedTime - startTime;
                const { days, hours, minutes, seconds } = convertMs(deltaTime);
                console.log(`${days}:${hours}:${minutes}:${seconds}`);

                refs.days.textContent = `${days}`
                refs.hours.textContent = `${hours}`
                refs.minutes.textContent = `${minutes}`
                refs.secondss.textContent = `${seconds}`
            

            refs.startBtn.disabled = true;
        });
        refs.startBtn.disabled = false;
    }
};

flatpickr(refs.selector, options);
//  console.log(options.defaultDate);


// onClose(selectedDates) {
//     console.log(selectedDates[0]);
//     if (selectedDates[0] - new Date() < 0) {
//       // alert('Please choose a date in the future');
//       Notiflix.Notify.failure('Please choose a date in the future');
//     } else {
//       startBtnRef.removeAttribute('disabled');
//       startBtnRef.addEventListener('click', () => {
//         countDoun(selectedDates[0]);
//         startBtnRef.setAttribute('disabled', true);
//       });
//     }
//   },







function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
