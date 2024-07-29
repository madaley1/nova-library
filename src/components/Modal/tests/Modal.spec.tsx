import { afterEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Modal } from '../Modal.component';

describe('Modal', () => {
  const closeModal = jest.fn();

  const defaultProps = {
    open: true,
    closeModal: closeModal,
    headerContent: <div>Header Content</div>,
    bodyContent: <div>Body Content</div>,
    footerContent: <div>Footer Content</div>,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the modal with all content', () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByText('Header Content')).toBeInTheDocument();
    expect(screen.getByText('Body Content')).toBeInTheDocument();
    expect(screen.getByText('Footer Content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /×/i })).toBeInTheDocument();
  });

  it('should call closeModal when close button is clicked', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: /×/i }));
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('should call closeModal when clicking outside the modal', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.click(document.querySelector('[class*="modalBg-open"]') as HTMLElement);
    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('should not call closeModal when clicking inside the modal', () => {
    render(<Modal {...defaultProps} />);

    fireEvent.click(screen.getByRole('dialog'));
    expect(closeModal).not.toHaveBeenCalled();
  });

  it('should not render modal content when open is false', () => {
    render(<Modal {...defaultProps} open={false} />);

    expect(screen.queryByText('Header Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Body Content')).not.toBeInTheDocument();
    expect(screen.queryByText('Footer Content')).not.toBeInTheDocument();
  });
});
