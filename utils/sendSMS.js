const axios = require("axios");

const sendSMS = async (phone, otp) => {
 
    try {
        await axios.post(
            "https://www.fast2sms.com/dev/bulkV2",
            {
                route: "otp",
                variables_values: otp,
                numbers: phone
            },
            {
                headers: {
                    authorization: process.env.FAST2SMS_API_KEY,
                    "Content-Type": "application/json"
                }
            }
        );
    } catch (error) {
        // ⚠️ SMS failed, but OTP logic still works
        console.warn("⚠️ SMS not sent (provider restriction or dev mode)");
    }
};

module.exports = sendSMS;
