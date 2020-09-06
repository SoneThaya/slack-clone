import React, { useState } from 'react'
import { connect } from 'react-redux';
import { Menu, Icon, Modal, Form, Button, Segment } from 'semantic-ui-react'

import './Channels.css'

const Channels = (props) => {

  const [modalOpenState, setModalOpenState] = useState(false);
  const [channelAddState, setChannelAddState] = useState({});

  const openModal = () => {
    setModalOpenState(true);
  }

  const closeModal = () => {
    setModalOpenState(false);
  }

  const onSubmit = () => {

  }

  const handleInput = (e) => {

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
        <span onClick={openModal}>
          <Icon name="add" /> ADD
        </span>
      </Menu.Item>
    </Menu.Menu>

      <Modal open={modalOpenState} onClose={closeModal}>
        <Modal.Header>
         Create Channel
        </Modal.Header>
        <Modal.Content>
          <Form onSubmit={onSubmit}>
            <Segment stacked>
            
              <Form.Input
                name="name"
                value={channelAddState.Name}
                
                
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Name"
              />
              <Form.Input
                name="description"
                value={channelAddState.description}
                onChange={handleInput}
                type="text"
                placeholder="Enter Channel Description"
              />
              
            </Segment>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button>
            <Icon name="checkmark" /> Save
          </Button>
          <Button onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
    </Modal>
    </>
  )
}

export default connect()(Channels);
