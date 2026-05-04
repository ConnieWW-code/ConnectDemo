# ConnectDemo

A React Native app built with Expo demonstrating Bluetooth Low Energy (BLE) 
device scanning and connection UI patterns.

## What it does
- Scans for real nearby BLE devices using react-native-ble-plx
- Lists discovered devices with name and device ID
- Connect / disconnect toggle per device
- Tap through to a device detail screen showing connection status and protocol
- Built with TypeScript and Expo Router

## Background
Built as a learning project alongside my professional work at TalkiPlay 
(Melbourne), where I implement real Bluetooth Low Energy communication 
between a .NET MAUI app and physical hardware devices. ConnectDemo 
explores the same BLE patterns in React Native.

## Tech stack
- React Native + Expo
- TypeScript
- Expo Router (file-based navigation)
- react-native-ble-plx (real BLE scanning)