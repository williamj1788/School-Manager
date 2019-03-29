import React from 'react';
import { shallow } from 'enzyme';
import { Dashboard } from "../../components/dashboard/dashboard";

const component = shallow(<Dashboard />);

describe('Dashboard component', () => {
    test('Dashboard renders without crashing', () => {
        expect(component).toBeTruthy();
    });
});