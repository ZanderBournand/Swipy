import * as Device from 'expo-device';

export const hasNotch = () => {
    let brand = Device.brand;
    let device = Device.modelName;

    if (brand === "Apple" && (device.includes("X") || device.includes("11") || device.includes("12") || device.includes("13"))){
        return true;
    }

    return false;
}