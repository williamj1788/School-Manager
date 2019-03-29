import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../components/login';

const wrapper = shallow(<Login />);
const instance = wrapper.instance();

describe('Login Component',() => {
    test('Login Renders without Crashing', () => {
        shallow(<Login />);
    });
    
    test('HandleSumbit is definded', () => {
        expect(instance.handleSubmit).toBeTruthy();
    });
});