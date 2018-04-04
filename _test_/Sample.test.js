
import React from 'react';
import Sample from '../src/index';

describe('Sample', () => {

    it('should be defined', () => {
        expect(Sample).toBeDefined();
    });

    it('should render correctly', () => {
        const tree = shallow(
            <Sample name="rohan" />
        );
        expect(tree).toMatchSnapshot();
    });
});