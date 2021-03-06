import React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../store';
import { Sheriff } from '../api';
import { sheriffs } from '../modules/sheriffs/selectors';
import Selector, { SelectorProps } from '../components/FormElements/Selector';

interface SheriffListStateProps {
    sheriffList: Sheriff[];
}

interface SheriffListProps extends SelectorProps {
    showVariedOption?: boolean;
    isDisabled?: boolean;
}

class SheriffList extends React.PureComponent<
    SheriffListProps & SheriffListStateProps> {

    render() {
        const { sheriffList = [], showVariedOption = false, isDisabled = false, ...restProps } = this.props;
        const selectorValues = sheriffList.map(sheriff =>
            ({
                key: sheriff.id,
                value: `${sheriff.lastName}, ${sheriff.firstName}`
            }));

        return (
            <Selector
                {...restProps}
                data={selectorValues}
                allowNone={true}
                noneLabel="Not Assigned"
                showVariedOption={showVariedOption}
                variedLabel="Sheriffs Varied"
                isDisabled={isDisabled}
            />
        );
    }

}

const mapStateToProps = (state: RootState) => {
    return {
        sheriffList: sheriffs(state)
    };
};

// tslint:disable-next-line:max-line-length
export default connect<SheriffListStateProps, {}, SheriffListProps>(
    mapStateToProps
)(SheriffList);