'use client';

import { useState } from 'react';
import { IconXboxX } from '@tabler/icons-react';
import { FileButton, Button, Group, Text } from '@mantine/core';
import { usePathname } from 'next/navigation';

export const DocInput = () => {
  const [files, setFiles] = useState([]);

  const pathname = usePathname();
  const pdfUrl = new URLSearchParams(pathname).get('pdfUrl');

  return (
    <>
      <Group justify='center'>
        <FileButton onChange={setFiles} accept='.pdf,.jpg' multiple>
          {(props) => <Button {...props}>Upload image</Button>}
        </FileButton>
      </Group>
      {files.length > 0 && (
        <Text size='sm' mt='sm'>
          Picked files:
        </Text>
      )}
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <span>
              {file.name}

              <IconXboxX stroke={2} />
            </span>
          </li>
        ))}
      </ul>
      {pdfUrl && <iframe src={pdfUrl} title='PDF Viewer' />}
    </>
  );
};
