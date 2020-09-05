import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Menu, Icon, Modal } from 'semantic-ui-react'

import './Channels.css'

const Channels = (props) => {

  const [modalOpenState, setModalOpenState] = useState(false);

  const openModal = () => {
    setModalOpenState(true);
  }

  const closeModal = () => {
    setModalOpenState(false);
  }


  return (
    <>
    <Menu.Menu>
      <Menu.Item>
        <span>
          <Icon name="exchange" />Channels
        </span>
        (0)
      </Menu.Item>
      <Menu.Item>
        <span>
          <Icon name="add" onClick={openModal} />ADD
        </span>
      </Menu.Item>
    </Menu.Menu>

      <Modal open={modalOpenState} onClose={closeModal}>
        <Modal.Header>
          <Modal.Content>
          
          </Modal.Content>
        </Modal.Header>
    </Modal>
    </>
  )
}

export default connect()(Channels);
