import React from 'react';
import FormUncontrolled from '../../components/FormUncontrolled/FormUncontrolled';
import FormControlled from '../../components/FormControlled/FormControlled';

interface FormPageProps {
	isControlled: boolean;
}

const FormPage: React.FC<FormPageProps> = ({ isControlled }) => {
	return <div>{isControlled ? <FormControlled /> : <FormUncontrolled />}</div>;
};

export default FormPage;
