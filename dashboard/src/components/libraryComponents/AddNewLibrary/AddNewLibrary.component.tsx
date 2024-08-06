import Modal from '@/components/Modal';
import { setTemplates } from '@/resources/libraryData';
import styles from '@/styles/modal.module.scss';

import { libraryTemplate } from '@/utils/libraries/templates';
import { Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useEffect, useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AddNewLibraryContext, addNewLibraryReducer, initialAddNewLibraryContextValue } from './AddNewLibraryContext';
import StepOne from './StepOne.component';
import StepThree from './StepThree.component';
import StepTwo from './StepTwo.component';

type EditRowModalProps = {
  open: boolean;
  closeModal: () => void;
};

export const AddNewLibraryModal = (props: EditRowModalProps) => {
  const [stepOneActive, setStepOneActive] = useState(true);
  const [stepTwoActive, setStepTwoActive] = useState(false);
  const [stepThreeActive, setStepThreeActive] = useState(false);

  const dispatch = useDispatch();

  const continueToStepTwo = () => {
    setStepOneActive(false);
    setStepTwoActive(true);
  };
  const returnToStepOne = () => {
    setStepOneActive(true);
    setStepTwoActive(false);
  };

  const continueToStepThree = () => {
    setStepTwoActive(false);
    setStepThreeActive(true);
  };
  const returnToStepTwo = () => {
    setStepTwoActive(true);
    setStepThreeActive(false);
  };

  const headerContent = (
    <>
      <Typography variant="h5" component="h2">
        Add New Library
        {(function () {
          if (stepOneActive) return ' - Select Template';
          if (stepTwoActive) return ' - Customize Library';
          if (stepThreeActive) return ' - Confirm Library';
        })()}
      </Typography>
    </>
  );

  const [state, dispatchFormData] = useReducer(addNewLibraryReducer, initialAddNewLibraryContextValue);
  const BodyContent = () => {
    return (
      <AddNewLibraryContext.Provider value={[state, dispatchFormData]}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StepOne active={stepOneActive} continueFunction={continueToStepTwo} />
          <StepTwo active={stepTwoActive} continueFunction={continueToStepThree} goBackFunction={returnToStepOne} />
          <StepThree active={stepThreeActive} goBackFunction={returnToStepTwo} />
        </LocalizationProvider>
      </AddNewLibraryContext.Provider>
    );
  };

  const footerContent = <></>;
  const getTemplates = async () => {
    // Needs to be fixed post-api update
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/libraries/create`);
    const templateJSON = await response.json();
    if (templateJSON.length > 0) {
      const procesedTemplates: libraryTemplate[] = templateJSON.map((template: any) => {
        const { title, fields } = template;
        return { title, fields: JSON.parse(fields) };
      });
      dispatch(setTemplates(procesedTemplates));
    } else {
      dispatch(setTemplates(templateJSON));
    }
  };

  useEffect(() => {
    getTemplates();
  }, []);

  return (
    <Modal
      open={props.open}
      closeModal={props.closeModal}
      headerContent={headerContent}
      bodyContent={<BodyContent />}
      footerContent={footerContent}
    />
  );
};
