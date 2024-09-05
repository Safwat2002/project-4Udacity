/* Global Variables */
let baseURL = "https://api.openweathermap.org/data/2.5/weather?q=London,uk";
let apiKey = "&APPID=ec0b8557555e947ebc7959e55194b24a&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

const getData = async () => {
    const response = await fetch(url);
    try {
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error", error);
    }
};

document.getElementById("generate").addEventListener("click", performAction);

function performAction(e) {
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;
    getWeather(baseURL, zip, apiKey)
        .then(function (data) {
            let newData = {
                temperature: data.main.temp,
                date: newDate,
                userResponse: feelings,
            };

            
            postWeather("/add", newData);
        }).then(updateUI())
}

const updateUI = async () => {
    const request = await fetch("/all");
    try {
        const allData = await request.json();
        console.log(allData);
        document.getElementById("date").innerHTML = allData.date;
        document.getElementById("temp").innerHTML = Math.round(allData.temperature)+ 'degrees';
        document.getElementById("content").innerHTML = allData.userResponse;
    } catch (error) {
        console.log("Error", error);
    }
};

const postWeather = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("Error", error);
    }
};

const getWeather = async (baseURL, zip, apiKey) => {
    let response = await fetch(baseURL + zip + apiKey);
    try {
        let data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("There has been a problem with your fetch operation:", error);
    }
};