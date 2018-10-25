import React from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions';

const mapStateToProps = ({ modalWindow, channelDeletingState }) => {
  const { channelId, show, type } = modalWindow;

  const props = {
    modalDeleteChannelShow: show && type === 'deleting',
    channelDeletingState,
    channelId,
  };
  return props;
};


export default
@connect(mapStateToProps, actionCreators)
class ModalDeleteChannel extends React.Component {
  closeModal = () => {
    const { closeModalWindow } = this.props;
    closeModalWindow();
  }

  handleDeletingChannel = () => {
    const { channelId, deleteChannel } = this.props;
    return deleteChannel(channelId);
  }

  renderAlert = () => (
    <Alert dismissible variant="danger">
      <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
      <p>Error while deleting channel. Try again please</p>
    </Alert>
  );

  render() {
    const { modalDeleteChannelShow, channelDeletingState } = this.props;
    const failed = channelDeletingState === 'failed';
    return (
      <Modal
        show={modalDeleteChannelShow}
        onHide={this.closeModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
              Delete channel
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete channel?
          { failed && this.renderAlert() }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.closeModalWindow}>Cancel</Button>
          <Button variant="danger" onClick={this.handleDeletingChannel}>Delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
