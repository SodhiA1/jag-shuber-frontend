import * as React from 'react';
import { default as FormFieldWrapper, FormFieldWrapperProps } from './FormFieldWrapper';
import TimeSlider from './TimeSlider';
import { TimeType } from '../../api/Api';

export default class TimeSliderField extends React.PureComponent<FormFieldWrapperProps
    & { minTime: TimeType, maxTime: TimeType, timeIncrement: number, sTime: TimeType, eTime: TimeType, color: string}> {

    render() {
        const { input: { onChange, value }, minTime, maxTime, timeIncrement, sTime, eTime, color } = this.props;
        const { startTime = sTime, endTime = eTime } = value;
        return (
            <FormFieldWrapper {...this.props}>
                <TimeSlider
                    minTime={minTime}
                    maxTime={maxTime}
                    startTime={startTime}
                    endTime={endTime}
                    timeIncrement={timeIncrement}
                    onTimeChanged={onChange}
                    color={color}
                />
            </FormFieldWrapper>
        );
    }
}