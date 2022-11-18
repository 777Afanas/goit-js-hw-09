import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('button'),
  clockFace: document.querySelector('.timer')
} 

let selectedDate = null;
let isActive = false;
let intervalId = null;



// Об'єкт налаштувань для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,

  // Функція яка виконається при закритті вікна flatpickr
  onClose(selectedDates) {
    // Перевіряємо чи вибрана дата в минулому
    if (selectedDates[0] < Date.now()) {
        console.log('Please choose a date in the future');
        alert('Please choose a date in the future');
      // Підключаємо плагін notiflix із сповіщеннями,
      // другим параметром передаємо об'єкт налаштувань
    //   Notify.failure('Please choose a date in the future', {
    //     position: "center-top",
    //     clickToClose: true,
    //     closeButton: true,
    //     useIcon: false,
    //     backOverlayClickToClose: true,
    //     timeout: 1000,
    //     fontSize: 20,
    //     background:'#a85d5d'
    //   });
      refs.startBtn.disabled = true;
      return
    }

    // Виконуємо якщо дата вибрана в майбутньому
    refs.startBtn.disabled = false;
    selectedDate = selectedDates[0];
    return selectedDate
  },
};


// Ініціалізуємо плагін flatpickr на інпуті
flatpickr('#datetime-picker',options)

// Функція запуску таймера
function startTimer() {
// перевіряємо чи був запущений таймер
  if (isActive) {
    console.log('Інтервал вже був запущений');
    return;
  };

// Якщо не запущений то запускаємо
  isActive = true;
  refs.startBtn.disabled = true;
  intervalId = setInterval(() => {

// оприділяємо поточний час на момент виконання інтервалу(кожну секунду буде інший)
    const currentTime = Date.now();
    

// рахуємо різницю між стартовим часом і поточним (в даному інтервалі)
    let deltaTime = selectedDate - currentTime;
       if (deltaTime < 1000) {
    //   console.log('Акція закінчилася');
    //   Notify.success('Акція закінчилася', {
    //     position: "center-top",
    //     // backOverlay: false,
    //     clickToClose: true,
    //     closeButton: true,
    //     useIcon: false,
    //     backOverlayClickToClose: true,
    //     timeout: 1000,
    //     fontSize: 20,
    //     background:'#5da85d'
    //   });
      clearInterval(intervalId);
      // таймер зависає на 1 секунді,
      // щоб цього уникнути обнулюємо 
      updateClockFace(convertMs(0));
      console.log('Встановлено 00:00:00');
      return
}
// Конвертуємо мілісекунди в дні години хвилини секунди
   const time = convertMs(deltaTime);
    console.log(time);
      
// повертаємо значення на сторінку
    updateClockFace(time);
        
  }, 1000)
};


function pad(value) {
return String(value).padStart(2,'0') 
}

// Функція конвертації мілісекунд в дні години хвилини секунди
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


// Функція повернення значень таймера на сторінку
function updateClockFace( { days, hours, minutes, seconds }) {
  const clockDays = refs.clockFace.querySelector('[data-days]')
  clockDays.textContent =pad(days);

  const clockHours = refs.clockFace.querySelector('[data-hours]')
  clockHours.textContent =pad(hours);
  
  const clockMinutes = refs.clockFace.querySelector('[data-minutes]')
  clockMinutes.textContent =pad(minutes);
  
  const clockSeconds = refs.clockFace.querySelector('[data-seconds]')
  clockSeconds.textContent =pad(seconds);
  
}

// Слухач подій на кнопці Start, запускає таймер
refs.startBtn.addEventListener('click', startTimer)









// import flatpickr from "flatpickr"; 
// import "flatpickr/dist/flatpickr.min.css";


// const refs = {
//     selector: document.querySelector('#datetime-picker'),
//     startBtn: document.querySelector('button[data-start]'),
//     days: document.querySelector('span[data-days]'),
//     hours: document.querySelector('span[data-hours]'),
//     minutes: document.querySelector('span[data-minutes]'),
//     secondss: document.querySelector('span[data-secondss]'),
// }

// refs.startBtn.disabled = true;
// // flatpickr(test,{
// //     onClose(selectedDates){
// //         const time = selectedDates[0];
// //         console.log(time);
// //     }
// // });

// const options = {
//     enableTime: true,
//     time_24hr: true,
//     defaultDate: new Date(),
//     minuteIncrement: 1,  
//     onClose(selectedDates) {
//         const selectedTime = selectedDates[0].getTime();
//         const startTime = options.defaultDate.getTime();
        
//         // if (selectedDates[0] - new Date() < 0) {
//         //     alert('Please choose a date in the future');
//         //     //   Notiflix.Notify.failure('Please choose a date in the future');
//         //     return;
//         // }

//          if (selectedTime - startTime < 0) {
//             alert('Please choose a date in the future');
//             //   Notiflix.Notify.failure('Please choose a date in the future');
//             return;
//         }
            
//         // refs.startBtn.addEventListener('click', () => {
//         //     setInterval(() => {
//         //         // const startTime = options.defaultDate.getTime();
//         //         const deltaTime = selectedTime - startTime;
//         //         const { days, hours, minutes, seconds } = convertMs(deltaTime);
//         //         console.log(`${days}:${hours}:${minutes}:${seconds}`);

//         //         refs.hours.textContent = `${hours}`
//         //         refs.minutes.textContent = `${minutes}`
//         //         refs.secondss.textContent = `${seconds}`
//         //     }, 1000);
            
//         //         const startTime = options.defaultDate.getTime();
//         //         const deltaTime = selectedTime - startTime;
//         //         const { days, hours, minutes, seconds } = convertMs(deltaTime);
//         //         console.log(`${days}:${hours}:${minutes}:${seconds}`);

//         //         refs.days.textContent = `${days}`
//         //         refs.hours.textContent = `${hours}`
//         //         refs.minutes.textContent = `${minutes}`
//         //         refs.secondss.textContent = `${seconds}`
            

//         //     refs.startBtn.disabled = true;
//         // });


//         refs.startBtn.addEventListener('click', () => {
//             setInterval(() => {
//                 // const startTime = options.defaultDate.getTime();
//                 const deltaTime = selectedTime - startTime;
//                 const { days, hours, minutes, seconds } = convertMs(deltaTime);
//                 // console.log();
//                 console.log(`${days}:${hours}:${minutes}:${seconds}`);

//                 refs.days.textContent = `${days}`
//                 console.log(refs.days.textContent);
//                 refs.hours.textContent = `${hours}`
//                 refs.minutes.textContent = `${minutes}`
//                 refs.secondss.textContent = `${seconds}`
//                 refs.secondss.value = seconds;
//                 console.log(refs.secondss.value);

//             }, 1000);
            
                       

//             refs.startBtn.disabled = true;
//         });




//         refs.startBtn.disabled = false;
//     }
// };

// flatpickr(refs.selector, options);
// //  console.log(options.defaultDate);


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







// function addLeadingZero(value) {
//     return String(value).padStart(2, '0');
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   // Remaining days
//   const days = addLeadingZero(Math.floor(ms / day));
//   // Remaining hours
//   const hours = addLeadingZero(Math.floor((ms % day) / hour));
//   // Remaining minutes
//   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
//   // Remaining seconds
//   const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

//   return { days, hours, minutes, seconds };
// }
