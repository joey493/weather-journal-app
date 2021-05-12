// Create a new date instance dynamically with JS
let d = new Date();
let newDate =
  parseInt(d.getMonth()) + 1 + '.' + d.getDate() + '.' + d.getFullYear();

// Personal API Key for OpenWeatherMap API
const api_key = '7ba564fc9053480e4acff29ff333a875';
// Temperature unit
const unit = 'metric';

/* Function to GET Web API Data*/
const get_api = async () => {
  // get zip_code value
  const zip_code = document.querySelector('#zip').value;
  // api url
  const URL = `https://api.openweathermap.org/data/2.5/weather?zip=${zip_code}&appid=${api_key}&units=${unit}`;
  /*
   ** check if the is zip_code is alphanumeric and the input field is not empty
   ** zipCode may contain letters
   */
  if (/[0-9A-Za-z]/.test(zip_code)) {
    try {
      return api_data(URL);
    } catch (error) {
      console.log('Error:', error);
    }
  } else {
    alert('Please, enter a zip code');
  }
};

// fetch api data
const api_data = async (url) => {
  try {
    // fetch api to get data
    const res = await fetch(url);
    // change data formation
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('Error:', error);
  }
};

/* Function to POST data */
const post_data = async (url = '', data = {}) => {
  // post data to local server
  const post_req = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(data),
  });
  try {
    // change data formation
    const newData = await post_req.json();
    return newData;
  } catch (error) {
    console.log('Error:', error);
  }
};

// updata UI
const update_UI = async () => {
  // call vars
  const date = document.querySelector('#date');
  const temp = document.querySelector('#temp');
  const content = document.querySelector('#content');

  // fetch data from local server
  const req = await fetch('/getData', { credentials: 'same-origin' });
  try {
    const all_data = await req.json();

    // Set Element value dynamically
    date.innerHTML = `date: ${all_data.date}`;
    temp.innerHTML = `Temperature: ${all_data.temp}°C`;
    content.innerHTML = `content: ${all_data.feeling}`;
  } catch (error) {
    console.log('Error:', error);
  }
};

/* Function called by event listener */
const event_function = () => {
  // get content value
  const content = document.querySelector('#feelings').value;
  // call get_api() function
  get_api().then((data) => {
    console.log(data);
    // add data to post request
    post_data('/addData', {
      temp: data.main.temp,
      date: newDate,
      feeling: content,
    }).then(() => {
      // call update_UI() function to update page UI
      update_UI();
    });
  });
};

// Event listener to add function to existing HTML DOM element
document.querySelector('#generate').onclick = event_function;
