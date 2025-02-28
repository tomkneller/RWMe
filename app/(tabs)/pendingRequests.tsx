import { Text, Modal, TextInput } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { InviteRequestList } from '../../components/InviteRequestList';


export default function PendingRequests() {
  return (
    <ThemedView>
      <InviteRequestList />

      <Modal visible='false'>
        <Text>Give a reason?</Text>
        <TextInput></TextInput>
      </Modal>
    </ThemedView>
  );
}