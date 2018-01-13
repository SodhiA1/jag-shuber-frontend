import * as React from 'react';
import { AssignmentTimeline, AssignmentTimelineProps } from '../../assignments/components/AssignmentTimeline'
import { getSheriffList } from '../../sheriffs/actions';
import { visibleTime } from '../selectors';
import { allAssignments } from '../../assignments/selectors';
import { sheriffs } from '../../sheriffs/selectors';
import { getAssignments } from '../../assignments/actions';
import { updateVisibleTime } from '../actions';
import { connect } from 'react-redux';
import { RootState } from '../../../store/reducers';


interface DispatchProps {
    getSheriffs: () => void;
    getAssignments: () => void;
    onVisibleTimeChange: (start: any, end: any) => void
}

class ConnectedAssignmentTimeline extends React.Component<AssignmentTimelineProps & Partial<DispatchProps>>{

    componentWillMount() {
        const { getSheriffs, getAssignments } = this.props;
        getSheriffs && getSheriffs();
        getAssignments && getAssignments();
    }

    render() {
        return (
            <AssignmentTimeline {...this.props} showTime={false} sideBarHeaderTitle="Off Duty Sheriffs" />
        )
    }

}

const mapStateToProps = (state: RootState, props: AssignmentTimelineProps) => {
    const allSheriffs = sheriffs(state);
    const assignments = allAssignments(state);

    // Create Timeline groups out of all sheriffs


    const { visibleTimeStart, visibleTimeEnd } = visibleTime(state);

    return {
        groups: allSheriffs,
        items: assignments,
        visibleTimeStart,
        visibleTimeEnd
    };
}

const mapDispatcToProps: DispatchProps = {
    onVisibleTimeChange: updateVisibleTime,
    getAssignments: getAssignments,
    getSheriffs: getSheriffList
}

export default connect<AssignmentTimelineProps>(mapStateToProps, mapDispatcToProps)(ConnectedAssignmentTimeline);

