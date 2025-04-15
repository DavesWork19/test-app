import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
export const successModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      withCloseButton={false}
      size={'xs'}
    >
      <Text size='md' fw={600} c={'green'} ta='center' pb={12}>
        Successfully Saved!
      </Text>
      <Text size='xs' fw={500} c={'green'} ta='center'>
        Continue editing or exit and return to the Appointments page
      </Text>
    </Modal>
  );
};
