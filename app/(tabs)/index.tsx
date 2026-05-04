import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator, Alert,
  FlatList,
  SafeAreaView,
  StyleSheet, Text,
  TouchableOpacity,
  View
} from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';

const bleManager = new BleManager();

export default function HomeScreen() {
  const router = useRouter();
  const [devices, setDevices] = useState<Device[]>([]);
  const [scanning, setScanning] = useState(false);
  const [connectedId, setConnectedId] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      bleManager.stopDeviceScan();
      bleManager.destroy();
    };
  }, []);

  const startScan = useCallback(() => {
    setDevices([]);
    setScanning(true);

    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        Alert.alert('Scan error', error.message);
        setScanning(false);
        return;
      }
      if (device && device.name) {
        setDevices(prev => {
          const exists = prev.find(d => d.id === device.id);
          return exists ? prev : [...prev, device];
        });
      }
    });

    // Stop after 10 seconds
    setTimeout(() => {
      bleManager.stopDeviceScan();
      setScanning(false);
    }, 10000);
  }, []);

  const stopScan = useCallback(() => {
    bleManager.stopDeviceScan();
    setScanning(false);
  }, []);

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.heading}>Nearby Devices</Text>

      <TouchableOpacity
        style={[styles.scanBtn, scanning && styles.scanBtnActive]}
        onPress={scanning ? stopScan : startScan}
      >
        {scanning && (
          <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />
        )}
        <Text style={styles.scanBtnText}>
          {scanning ? 'Scanning… Tap to stop' : 'Scan for Devices'}
        </Text>
      </TouchableOpacity>

      {devices.length === 0 && !scanning && (
        <Text style={styles.empty}>No devices found. Tap Scan to start.</Text>
      )}

      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push({
              pathname: '/device-detail' as any,
              params: {
                name: item.name ?? item.id,
                connected: String(connectedId === item.id)
              }
            })}
          >
            <View>
              <Text style={styles.deviceName}>{item.name ?? 'Unknown'}</Text>
              <Text style={styles.deviceId}>{item.id}</Text>
              <Text style={[styles.status, connectedId === item.id && styles.statusOn]}>
                {connectedId === item.id ? 'Connected' : 'Not connected'}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.btn, connectedId === item.id && styles.btnOn]}
              onPress={() => setConnectedId(
                connectedId === item.id ? null : item.id
              )}
            >
              <Text style={styles.btnText}>
                {connectedId === item.id ? 'Disconnect' : 'Connect'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 16,
    marginTop: 8,
  },
  scanBtn: {
    backgroundColor: '#2E75B6',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scanBtnActive: {
    backgroundColor: '#888',
  },
  scanBtnText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  empty: {
    textAlign: 'center',
    color: '#aaa',
    marginTop: 40,
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  deviceName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  deviceId: {
    fontSize: 11,
    color: '#bbb',
    marginBottom: 4,
  },
  status: {
    fontSize: 12,
    color: '#999',
  },
  statusOn: {
    color: '#1D9E75',
  },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  btnOn: {
    backgroundColor: '#1D9E75',
    borderColor: '#1D9E75',
  },
  btnText: {
    fontSize: 13,
    color: '#333',
  },
});