import React, { memo } from 'react';
import { useParams } from 'react-router';
import { Button, Drawer, Alert } from 'rsuite';

import { useModalState, useMediaQuery } from '../../../misc/custom-hooks';
import EditableInput from '../../EditableInput';
import { useCurrentRoom } from '../../../context/current.room.context';
import { database } from '../../../misc/firebase';

const EditRoomBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();
  const { chatId } = useParams();

  const isMobile = useMediaQuery(`(max-width: 992px)`);

  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);

  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.success('Successfully updated', 4000);
      })
      .catch(err => {
        Alert.error(err.message, 4000);
      });
  };

  const onNameSave = newName => {
    updateData('name', newName);
  };

  const onDescSave = newDesc => {
    updateData('description', newDesc);
  };

  return (
    <div>
      <Button className="bt-circle" size="xs" color="red" onClick={open}>
        A
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          <EditableInput
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
            emptyMsg="Name cannot be empty"
          />
          <EditableInput
            wrapperClassName="mt-3"
            componentClass="textarea"
            rows={5}
            initialValue={description}
            onSave={onDescSave}
            label={<h6 className="mb-2">Description</h6>}
            emptyMsg="Description cannot be empty"
          />
        </Drawer.Body>

        <Drawer.Footer>
          <Button block onClick={close}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomBtnDrawer);
