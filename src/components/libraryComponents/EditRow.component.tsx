import Modal from '@/components/Modal';
import styles from '@/styles/modal.module.scss';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';

type EditRowModalProps = {
  open: boolean;
  closeModal: () => void;
};

export const EditRowModal = (props: EditRowModalProps) => {
  const headerContent = (
    <>
      <Typography variant="h5" component="h2">
        Edit Resource
      </Typography>
    </>
  );
  const bodyContent = <Typography>It&apos;s a Modal!</Typography>;
  const footerContent = <></>;

  return (
    <Modal
      open={props.open}
      closeModal={props.closeModal}
      headerContent={headerContent}
      bodyContent={bodyContent}
      footerContent={footerContent}
    />
  );
};
