import React from 'react';
import { shallow } from 'enzyme';
import { AddClass } from '../../components/dashboard/Add/addClass';

const props = {
    dispatch: jest.fn(),
    toggle: jest.fn(),
}

const component = shallow(<AddClass {...props} />);
const instance = component.instance();

afterEach(() => {
    jest.restoreAllMocks()
});

test('there is a form that has a onSumbit function', () => {
   expect(component.find('form').props().onSubmit).toBeDefined();
});


test('a dispatch is called when the form is submited', async () => {
    const fakeEvent = {
        preventDefault: jest.fn()
    }
    jest.spyOn(instance, 'postNewClass').mockImplementation(() => Promise.resolve());
    await instance.onSubmit(fakeEvent);
    expect(props.dispatch).toBeCalled();
});

test('toggle is called when the form is submited', async () => {
    const fakeEvent = {
        preventDefault: jest.fn()
    }
    jest.spyOn(instance, 'postNewClass').mockImplementation(() => Promise.resolve());
    await instance.onSubmit(fakeEvent);
    expect(props.toggle).toBeCalled();
});
