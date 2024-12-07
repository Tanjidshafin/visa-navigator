import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../src/firebase.init';
import { toast } from 'react-toastify';

export const AppContext = createContext();
const AppContextProvider = (props) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [visas, setVisas] = useState([]);
  const [addApplications, setApplications] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem('user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('user');
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchVisaData = async () => {
    try {
      const response = await axios.get('https://visa-server-tau.vercel.app/visa');
      setVisas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVisaApplications = async () => {
    try {
      const response = await axios.get('https://visa-server-tau.vercel.app/applications');
      setApplications(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVisaData();
    fetchVisaApplications();
  }, []);

  const addVisaApplications = async (applicationData) => {
    const timestamp = new Date().toLocaleString();
    const applicationWithTimestamp = { ...applicationData, showTime: timestamp };

    try {
      const response = await axios.post('https://visa-server-tau.vercel.app/add-visa-application', applicationWithTimestamp);
      if (response.data.success) {
        setApplications((prevApplications) => [...prevApplications, applicationWithTimestamp]);
        console.log(applicationWithTimestamp);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteVisa = async (id) => {
    try {
      const response = await axios.delete(`https://visa-server-tau.vercel.app/visa/${id}`);
      if (response.data.success) {
        setVisas((prevVisas) => prevVisas.filter((visa) => visa._id !== id));
        toast.success("Deleted Visa")
        console.log(response.data.message);
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting visa:', error);
    }
  };

  const deleteApplication = async (id) => {
    try {
      const response = await axios.delete(`https://visa-server-tau.vercel.app/applications/${id}`);
      if (response.data.success) {
        setApplications((prevApplications) => prevApplications.filter((app) => app._id !== id));
        console.log(response.data.message);
        toast.success("Deleted Visa Application")
      } else {
        console.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const isAuthenticated = user !== null;

  const value = {
    user,
    isAuthenticated,
    visas,
    addVisaApplications,
    addApplications,
    fetchVisaData,
    fetchVisaApplications,
    deleteVisa,
    deleteApplication,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
