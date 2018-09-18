import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Run } from '../api';
import { allRuns } from '../modules/assignments/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';

interface RunListStateProps {
    runs: Run[];
}

class RunList extends React.PureComponent<
    SelectorProps & RunListStateProps> {

    render() {
        const { runs = [], ...restProps } = this.props;
        const selectorValues = runs.map(run => ({
            key: run.id, value: run.title
        }));
        return (
            <Selector {...restProps} data={selectorValues} />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        runs: allRuns(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<RunListStateProps, {}, SelectorProps>(
    mapStateToProps
)(RunList);