import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from "../../components/dashboard/dashboard";
import uuid from 'uuid';

const props = {
    classes: [
        {
            name: 'Math',
            color: '#000000',
            tasks:  [
                {id: uuid(), name: 'Math1', due: '2019-06-10'},
            ],
            tests: [
                {id: uuid(),name: 'Test1', due: '2019-06-10'},
            ],
        }
    ],
    dispatch: jest.fn(),
}
const component = shallow(<Dashboard {...props} />);
const instance = component.instance();

afterEach(() => {
    jest.restoreAllMocks()
});

describe('Dashboard component', () => {
    test('Dashboard renders without crashing', () => {
        expect(component).toBeTruthy();
    });

    test('getUserData is called when component mounts', () => {
        jest.spyOn(instance, 'getUserData');
        instance.componentDidMount();
        expect(instance.getUserData).toBeCalled();
    });

    test('loadUserData is called with proper args when user is found', async () => {
        jest.spyOn(instance,'getUserData').mockImplementation(() => Promise.resolve({username: 'fake'}));
        jest.spyOn(instance, 'loadUserData');
        await instance.componentDidMount();
        expect(instance.loadUserData).toBeCalledWith({username: 'fake'});
    });

    test('redirectToLogin is called when user is not found', async () => {
        jest.spyOn(instance,'getUserData').mockImplementation(() => Promise.resolve());
        jest.spyOn(instance, 'redirectToLogin');
        await instance.componentDidMount();
        expect(instance.redirectToLogin).toBeCalled();
    });

    test('redirectToLogin is called when signed out', async () => {
        jest.spyOn(instance,'sendSignRequest').mockImplementation(() => Promise.resolve());
        jest.spyOn(instance, 'redirectToLogin');
        await instance.signOut();
        expect(instance.redirectToLogin).toBeCalled();
    });

    test('loadUserData calls a dispatch with proper args', async () => {
        const instance = component.instance();
        const fakeUser = {
            username: 'fake'
        }
        const expectedPayload = {
            payload: {
                username: 'fake'
            },
            type: 'SET_USER'
        }
        instance.loadUserData(fakeUser);
        expect(props.dispatch).toBeCalledWith(expectedPayload);
    });

    test('toggleShowClassDetail calls a dispatch with proper args', async () => {
        const instance = component.instance();
        const expectedPayload = {
            payload: 2,
            type: 'SET_CLASS_INDEX'
        }
        instance.toggleShowClassDetail(2);
        expect(props.dispatch).toBeCalledWith(expectedPayload);
    });


});