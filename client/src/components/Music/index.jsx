import React, { useContext, useState, useEffect } from 'react';
import { NotificationContext } from '../shared/Notifications';
import { GlobalStoreContext } from '../shared/Globals';
import Axios from 'axios';
import Header from '../shared/Header';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Music = () => {
  const { setNotification } = useContext(NotificationContext);
  const { globalStore } = useContext(GlobalStoreContext);

  const [music, setMusic] = useState([]);

  useEffect(() => {
    if (!globalStore.REACT_APP_ENDPOINT) return;
    Axios.get(`${globalStore.REACT_APP_ENDPOINT}/music`)
    .then(({ data }) => {
      //reterive data from db
      setMusic(data);
    })
    .catch(error => {
      setNotification({
        type: "danger",
        message: `There was an error retrieving the music: ${error.message}`
      });
    });
  }, [globalStore, setNotification]);

  return (
    <>
      <Header title="Music"/>
      <Container>
        {music && music.length > 0 ? (
          <Table striped bordered hover>
            <thead>
              <th>Title</th>
              <th>Author</th>
              <th>Gender</th>
              <th>Actions</th>
            </thead>

            <tbody>
              {music.map((mus, i) => (
                <tr key={i}>
                  <td>
                    {mus.title}
                  </td>
                  
                  <td>
                    {mus.artist}
                  </td>

                  <td>
                    {mus.genre}
                  </td>
             
                  <td>
                    <Link to={`/edit/${mus._id}`}>
                      edit
                    </Link>
                    &nbsp;|&nbsp;
                    <Link to={`/destroy/${mus._id}`}>
                      delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : null}
      </Container>
    </>
  );
}
 
export default Music;