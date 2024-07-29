import styles from '@/styles/modal.module.scss';
import { Modal as MuiModal } from '@mui/base';
import { Box, Button, Grid } from '@mui/material';
import React from 'react';

type ModalProps = {
  open: boolean;
  closeModal: () => void;
  headerContent?: React.ReactNode;
  bodyContent: React.ReactNode;
  footerContent?: React.ReactNode;
};
export const Modal = (props: ModalProps) => {
  return (
    <Box
      className={props.open ? styles['modalBg-open'] : styles.modalBg}
      onClick={(e) => {
        if (e.target instanceof HTMLElement && e.target.matches(`.${styles['modalBg-open']}`)) {
          props.closeModal();
        }
      }}
    >
      <MuiModal open={props.open}>
        <Box className={styles.modal} role="dialog">
          <Grid container sx={{ display: 'flex', flexFlow: 'column nowrap' }}>
            <Grid item className={styles['modal-header']}>
              {props.headerContent}
              <Button className={styles['modal-close']} onClick={props.closeModal}>
                &times;
              </Button>
            </Grid>
            <Grid item className={styles['modal-body']}>
              {props.bodyContent}
            </Grid>
            <Grid item className={styles['modal-footer']}>
              {props.footerContent}
            </Grid>
          </Grid>
        </Box>
      </MuiModal>
    </Box>
  );
};
