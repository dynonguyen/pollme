import { LS_KEY } from './../constants/key';
const IP_ADDRESS_API_URI = 'https://api.db-ip.com/v2/free/self';

async function getUserIp(): Promise<string> {
	const ipInLS = localStorage.getItem(LS_KEY.USER_IP);
	if (ipInLS) return ipInLS;

	try {
		const apiResponse = await fetch(IP_ADDRESS_API_URI);
		if (apiResponse.status === 200) {
			const data = await apiResponse.json();
			const ip = data.ipAddress || '';
			localStorage.setItem(LS_KEY.USER_IP, ip);
			return ip;
		}
		return '';
	} catch (error) {
		return '';
	}
}

export default getUserIp;
