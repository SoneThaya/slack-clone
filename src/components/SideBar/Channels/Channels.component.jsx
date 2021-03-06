import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Menu, Icon, Modal, Form, Button, Segment } from "semantic-ui-react";
import firebase from "../../../server/firebase";
import { setChannel } from "../../../store/actioncreator";

import "./Channels.css";

const Channels = (props) => {
  const [modalOpenState, setModalOpenState] = useState(false);
  const [isLoadingState, setIsLoadingState] = useState(false);
  const [channelsState, setChannelsState] = useState([]);
  const [channelAddState, setChannelAddState] = useState({
    name: "",
    description: "",
  });
  const channelsRef = firebase.database().ref("channels");

  useEffect(() => {
    channelsRef.on("child_added", (snap) => {
      setChannelsState((currentState) => {
        let updatedState = [...currentState];
        updatedState.push(snap.val());
        if (updatedState.length === 1) {
          props.selectChannel(updatedState[0])
        }
        return updatedState;
      });
    });
  }, []);

  const displayChannels = () => {
    if (channelsState.length > 0) {
      return channelsState.map((channel) => {
        return (
          <Menu.Item
            key={channel.id}
            name={channel.name}
            onClick={() => props.selectChannel(channel)}
            active={channel.id === props.channel.id}
          ></Menu.Item>
        );
      });
    }
  };

  const openModal = () => {
    setModalOpenState(true);
  };

  const closeModal = () => {
    setModalOpenState(false);
  };

  const onSubmit = () => {
    if (!checkIfFormValid()) {
      return;
    }

    const key = channelsRef.push().key;

    const channel = {
      id: key,
      name: channelAddState.name,
      description: channelAddState.description,
      created_by: {
        name: props.user.displayName,
        avatar: props.user.photoURL,
      },
    };
    setIsLoadingState(true);
    channelsRef
      .child(key)
      .update(channel)
      .then(() => {
        setChannelAddState({ name: "", description: "" });
        setIsLoadingState(false);
        closeModal();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const checkIfFormValid = () => {
    return (
      channelAddState && channelAddState.name && channelAddState.description
    );
  };

  const handleInput = (e) => {
    let target = e.target;
    setChannelAddState((currentState) => {
      let updatedState = { ...currentState };
      updatedState[target.name] = target.value;
      return updatedState;
    });
  };

  return (
    <>
      <Menu.Menu>
        <Menu.Item>
          <span>
            <Icon name="exchange" />
            Channels
          </span>
          ({channelsState.length})
        </Menu.Item>
        {displayChannels()}
        <Menu.Item>
          <span className="clickable" onClick={openModal}>
            <Icon name="add" /> ADD
          </span>
        </Menu.Item>
      </Menu.Menu>

      <Modal open={modalOpenState} onClose={closeModal}>
        <Modal.Header>Create Channel</Modal.Header>
        <Modal.Content>
          <Form onSubmit={onSubmit}>
            <Segment stacked>
              <Form.Input
                name="name"
                value={channelAddState.name}
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
          <Button loading={isLoadingState} onClick={onSubmit}>
            <Icon name="checkmark" /> Save
          </Button>
          <Button onClick={closeModal}>
            <Icon name="remove" /> Cancel
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.currentUser,
    channel: state.channel.currentChannel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectChannel: (channel) => dispatch(setChannel(channel)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
