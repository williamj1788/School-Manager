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
                {id: uuid(),name: 'Math2', due: '2019-03-17'},
                {id: uuid(),name: 'Math3', due: '2019-03-14'},
            ],
            tests: [
                {id: uuid(),name: 'Test1', due: '2019-06-10'},
                {id: uuid(),name: 'Test2', due: '2019-03-17'},
                {id: uuid(),name: 'Test3', due: '2019-03-14'},
            ],
        },
        {
            name: 'History',
            color: '#000000',
            tasks:  [
                {id: uuid(), name: 'History1', due: '2019-06-10'},
                {id: uuid(),name: 'History2', due: '2019-03-17'},
                {id: uuid(),name: 'History3', due: '2019-03-14'},
            ],
            tests: [
                {id: uuid(),name: 'Test1', due: '2019-06-10'},
                {id: uuid(),name: 'Test2', due: '2019-03-17'},
                {id: uuid(),name: 'Test3', due: '2019-03-14'},
            ],
        },
        {
            name: 'English',
            color: '#c1424b',
            tasks:  [
                {id: uuid(), name: 'English1', due: '2019-06-10'},
                {id: uuid(),name: 'English2', due: '2019-03-17'},
                {id: uuid(),name: 'English3', due: '2019-03-14'},
            ],
            tests: [
                {id: uuid(),name: 'Test1', due: '2019-06-10'},
                {id: uuid(),name: 'Test2', due: '2019-03-17'},
                {id: uuid(),name: 'Test3', due: '2019-03-14'},
            ],
        },
    ]
}
const component = shallow(<Dashboard {...props} />);

describe('Dashboard component', () => {
    test('Dashboard renders without crashing', () => {
        expect(component).toBeTruthy();
    });
});