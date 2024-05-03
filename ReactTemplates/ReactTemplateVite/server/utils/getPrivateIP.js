import os from 'os';

export default async function getPrivateIP(ipFirstThreeNumber) {
  const interfaces = os.networkInterfaces();

  for (const interfaceName in interfaces) {
    const interfacesList = interfaces[interfaceName];

    for (const interfaceInfo of interfacesList) {
      if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
        const ipAddress = interfaceInfo.address;
        if (ipAddress.startsWith(ipFirstThreeNumber)) {
          return ipAddress;
        }
      }
    }
  }

  return `Unable to determine private IP address started with ${ipFirstThreeNumber} number.`;
}
