# ⛅ ClimateX

![React](https://img.shields.io/badge/React-%2361DAFB.svg?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338bdf8.svg?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-%23646CFF.svg?logo=vite&logoColor=white)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-%23FF6F00.svg?logo=tensorflow&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-%2322b5bf.svg?logo=chartdotjs&logoColor=white)
![Lucide React](https://img.shields.io/badge/Lucide%20React-%23F56565.svg?logo=lucide&logoColor=white)
[![License: MIT](https://img.shields.io/badge/License-MIT-38bdf8.svg?style=flat&logo=opensourceinitiative&logoColor=white)](https://opensource.org/licenses/MIT)

ClimateX is a weather dashboard that shows real-time weather data and forecasts for any city.   
Search a location to view current conditions and browse 30-day historical trends through interactive charts.   
The forecast uses a neural network built with TensorFlow.js that trains in your browser, analyzing temperature, humidity, and CO₂ patterns to predict weather for the next 7 days. Each chart displays trend analysis and provides context to help interpret the data.

## 🧡 Features

-  **Global City Search** - Find weather info for any city
-  **Real-Time Weather** - Current temperature, humidity, wind speed, and conditions
-  **ML-Based 7-Day Forecast** - Weather predictions created with a neural network that learns from past weather patterns
-  **Visual Data Charts** - See 30-day trends for temperature, CO₂, rainfall, and humidity

## 🌐 Demo

[Check out the live demo](https://climate-x-amber.vercel.app/)

### 🖼️ Screenshots

| Home Screen | Weather Dashboard | Charts & Analytics |
|:---:|:---:|:---:|
| <img width="250" src="https://github.com/user-attachments/assets/2d8a1047-167f-4f5d-9ede-c5eeeecceb64" /> | <img width="250" src="https://github.com/user-attachments/assets/9ddb4066-caaf-49cf-80ad-ce5c8355b4d8" /> | <img width="250" src="https://github.com/user-attachments/assets/612c0b93-9560-41c4-93b1-d7c46e3a52c2" /> |

## 👩‍💻 Tech Stack

- **React** - UI framework with hooks for state management
- **Tailwind CSS** - Utility classes for styling
- **Recharts** - Interactive charts and graphs
- **TensorFlow.js** - Runs ML models in the browser
- **Lucide React** - Icon set for weather symbols and UI elements

### Custom Hooks
- `useSuggestions` - Handles city search 
- `useWeather` - Fetches and manages weather data
- `usePrediction` - Trains ML model and generates forecasts

### APIs
- **Open-Meteo Weather API**: `https://api.open-meteo.com/v1/forecast`
  - Gets current weather conditions
- **Open-Meteo Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`
  - Searches cities and returns coordinates

## 📦 Installation

### What You'll Need

- **Node.js** 
- **npm**

### Setup Steps

1. **Clone this repo**
```bash
git clone https://github.com/yusraSyed05/ClimateX.git
```

2. **Go to the project folder**
```bash
cd ClimateX
```

3. **Install packages**
```bash
npm install
npm install lucide-react
npm install recharts
npm install @tensorflow/tfjs
```

4. **Run the dev server**
```bash
npm run dev
```


## 📁 Project Structure
```
climatex/
├── public/
├── src/
│   ├── components/
│   │   ├── Charts/
│   │   │   ├── CO2Chart.jsx
│   │   │   ├── HumidityChart.jsx
│   │   │   ├── RainfallChart.jsx
│   │   │   └── TemperatureChart.jsx
│   │   ├── Forecast/
│   │   │   ├── ForecastDayCard.jsx
│   │   │   ├── ForecastHeader.jsx
│   │   │   └── ForecastSummary.jsx
│   │   ├── WeatherCards/
│   │   │   ├── CO2Card.jsx
│   │   │   ├── HumidityCard.jsx
│   │   │   ├── TemperatureCard.jsx
│   │   │   └── WindCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SuggestionsDropdown.jsx
│   │   └── WelcomeSection.jsx
│   ├── hooks/
│   │   ├── usePrediction.js
│   │   ├── useSuggestions.js
│   │   └── useWeather.js
│   ├── ClimateX.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── App.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── LICENSE
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## 🤝 Want to Contribute?
Contributions are welcome!

1. Fork the repo
2. Make a new branch 
3. Commit your changes 
4. Push it 
5. Open a pull request


## 📄 License

MIT License - see the [LICENSE](LICENSE) file
