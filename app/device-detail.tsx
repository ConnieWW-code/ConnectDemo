import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function DeviceDetailScreen() {
  const { name, connected } = useLocalSearchParams<{
    name: string;
    connected: string;
  }>();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{name}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Status</Text>
        <Text style={[styles.value, connected === 'true' && styles.valueOn]}>
          {connected === 'true' ? 'Connected' : 'Not connected'}
        </Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Protocol</Text>
        <Text style={styles.value}>Bluetooth Low Energy (BLE)</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Device ID</Text>
        <Text style={styles.value}>{name?.split('-')[1] ?? '—'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: '500',
    marginBottom: 20,
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  valueOn: {
    color: '#1D9E75',
  },
});