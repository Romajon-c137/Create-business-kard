import { Button } from '@mui/material';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class CopyButton extends React.Component {
  copyToClipboard = (event) => {
    const { text } = this.props;
    navigator.clipboard.writeText(text)
    .then(() => {
        console.log('Текст скопирован в буфер обмена!');
      })
      .catch((err) => {
        console.error('Ошибка при копировании текста: ', err);
      });

      event.preventDefault();
      toast.success("Текст скопирован");
      
    }


  render() {
    const { text, label } = this.props;
    return (
      <>
        <Button variant="contained"  onClick={this.copyToClipboard}>
          {label}
        </Button>
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
        />
      </>
    );
  }
}

export default CopyButton;