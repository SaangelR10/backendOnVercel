import sensorService from '../services/sensorService.js';

// Function for getting devices list in controller
const getDevices = async (req, res) => {
    try {
        // Get devices list
        const devices = await sensorService.getDevices();
        // Return devices
        res.json(devices);
    } catch (error) {
        // If error, return error
        console.error('Error fetching devices:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function for getting realtime data in controller
const getRealtimeData = async (req, res) => {
    // Get device from params in request url
    const { device } = req.params;
    try {
        // Get realtime data
        const data = await sensorService.getRealtimeData(device);
        console.log('Realtime data:', data);

        // Add prediction fields for co, humidity, smoke, temp, and lpg
        const dataWithPredictions = {
            ...data,
            co_prediction: data.co * (1 + (Math.random() * 0.1 - 0.05)), // ±5% variation
            humidity_prediction: data.humidity * (1 + (Math.random() * 0.1 - 0.05)),
            smoke_prediction: data.smoke * (1 + (Math.random() * 0.1 - 0.05)),
            temp_prediction: data.temp * (1 + (Math.random() * 0.1 - 0.05)),
            lpg_prediction: data.lpg * (1 + (Math.random() * 0.1 - 0.05)),
        };

        // Return realtime data with predictions
        res.json(dataWithPredictions);
    } catch (error) {
        // If error, return error
        console.error('Error querying data:', error);
        res.status(403).json({ message: error.message });
    }
};

// Function for getting history data in controller
const getHistoryData = async (req, res) => {
    // Get device from params in request url
    const { device } = req.params;
    try {
        // Get history data
        const data = await sensorService.getHistoryData(device);
        // Return history data
        res.json(data);
    } catch (error) {
        // If error, return error
        console.error('Error querying history:', error);
        res.status(403).json({ message: error.message });
    }
};

export default {
    getDevices,
    getRealtimeData,
    getHistoryData,
};
