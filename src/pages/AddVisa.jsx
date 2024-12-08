import React, { useContext, useState } from 'react';
import axios from 'axios';
import { PlusIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';

const AddVisa = () => {
  const { user, fetchVisaData, loading, setLoading } = useContext(AppContext);
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();
  const [formData, setFormData] = useState({
    countryImage: '',
    countryName: '',
    visaType: '',
    processingTime: '',
    requiredDocuments: [],
    description: '',
    ageRestriction: '',
    fee: '',
    validity: '',
    applicationMethod: '',
    email: user.email,
    date: date,
    time: time,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      requiredDocuments: checked
        ? [...prevData.requiredDocuments, value]
        : prevData.requiredDocuments.filter((doc) => doc !== value),
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('https://visa-server-tau.vercel.app/add-visa', formData);
      if (data.success) {
        await fetchVisaData();
        toast.success('Visa Added');
        setLoading(false);
        navigate('/');
      }
      console.log(data);
    } catch (error) {
      console.error('Error adding visa:', error);
      toast.warning('Failed to add');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden'>
        <div className='px-6 py-8 bg-gradient-to-r from-blue-600 to-indigo-600 sm:px-10'>
          <h2 className='text-3xl font-extrabold text-white text-center'>Add New Visa</h2>
        </div>
        <form className='px-6 py-8 sm:px-10 space-y-8' onSubmit={handleSubmit}>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Country Image</label>
            <input
              type='url'
              name='countryImage'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
              placeholder='Enter image URL'
              value={formData.countryImage}
              onChange={handleChange}
            />
            {formData.countryImage && (
              <img src={formData.countryImage} alt='Country' className='mt-4 w-[12rem] h-32 object-cover rounded-md' />
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Country Name</label>
            <input
              type='text'
              name='countryName'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
              placeholder='Enter country name'
              value={formData.countryName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Visa Type</label>
            <select
              name='visaType'
              className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
              value={formData.visaType}
              onChange={handleChange}
              required>
              <option value='' disabled>
                Select visa type
              </option>
              <option value='tourist'>Tourist Visa</option>
              <option value='student'>Student Visa</option>
              <option value='official'>Official Visa</option>
              <option value='business'>Business Visa</option>
            </select>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>Processing Time</label>
            <input
              type='text'
              name='processingTime'
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
              placeholder='e.g., 5-7 days'
              value={formData.processingTime}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <span className='block text-sm font-medium text-gray-700'>Required Documents</span>
            <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4'>
              {['Valid Passport', 'Visa Application Form', 'Recent Passport Photo', 'Bank Statement'].map((doc) => (
                <div key={doc} className='flex items-center'>
                  <input
                    type='checkbox'
                    value={doc}
                    checked={formData.requiredDocuments.includes(doc)}
                    onChange={handleCheckboxChange}
                    className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
                  />
                  <label className='ml-2 text-sm text-gray-700'>{doc}</label>
                </div>
              ))}
            </div>
          </div>

          {['description', 'ageRestriction', 'fee', 'validity', 'applicationMethod'].map((field) => (
            <div key={field}>
              <label className='block text-sm font-medium text-gray-700 capitalize'>
                {field.replace(/([A-Z])/g, ' $1')}
              </label>
              <input
                type={field === 'fee' || field === 'ageRestriction' ? 'number' : 'text'}
                name={field}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50'
                placeholder={`Enter ${field}`}
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button
            type='submit'
            className='w-full py-3 px-4 text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-md shadow-md hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <PlusIcon className='inline-block h-5 w-5 mr-2' />
            Add Visa
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVisa;
