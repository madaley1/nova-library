import Modal from '@/components/Modal';
import styles from '@/styles/modal.module.scss';
import { Box, Button, Typography, useScrollTrigger } from '@mui/material';
import { useState } from 'react';
import { AddNewLibraryContext } from './AddNewLibraryContext';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';

type EditRowModalProps = {
  open: boolean;
  closeModal: () => void;
};

export const AddNewLibraryModal = (props: EditRowModalProps) => {
  const [stepOneActive, setStepOneActive] = useState(true)
  const [stepTwoActive, setStepTwoActive] = useState(false)
  const [stepThreeActive, setStepThreeActive] = useState(false)


  const continueToStepTwo = () => {
    setStepOneActive(false)
    setStepTwoActive(true)
  }

  const continueToStepThree = () => {
    setStepTwoActive(false)
    setStepThreeActive(true)
  }

  const headerContent = (
    <>
      <Typography variant="h5" component="h2">
        Add New Library{
          (function(){
            if(stepOneActive) return ' - Select Template'
            if(stepTwoActive) return ' - Customize Library'
            if(stepThreeActive) return ' - Confirm Library'
          })()
        }
      </Typography>
    </>
  );
  const bodyContent = (
    <AddNewLibraryContext.Provider value={{libraryType: '', fields: {}}}>
      <StepOne active={stepOneActive} continueFunction={continueToStepTwo}/>
      <StepTwo active={stepTwoActive} continueFunction={continueToStepThree}/>
      <StepThree active={stepThreeActive}/>
    </AddNewLibraryContext.Provider>
  );
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
