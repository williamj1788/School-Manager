import React from 'react';
import { shallow } from 'enzyme';
import { Signup } from '../components/signup';

const wrapper = shallow(<Signup />);
const instance = wrapper.instance();

describe('Signup Componet',() => {
    test('Signup Renders without Crashing', () => {
        shallow(<Signup />);
    });
    
    test('HandleSumbit is definded', () => {
        expect(instance.handleSubmit).toBeTruthy();
    });
});