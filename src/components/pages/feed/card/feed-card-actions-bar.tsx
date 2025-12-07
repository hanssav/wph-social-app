import { FeedCardActions, FeedCardActionsItem } from './feed-card.-icons';
import { useFeedCardContext } from './feed-card-context';

export const FeedCardActionsBar = () => {
  const { iconActions } = useFeedCardContext();

  return (
    <div className='flex-between'>
      <FeedCardActions>
        {iconActions.map(
          (icon, idx) =>
            idx < 3 && <FeedCardActionsItem data={icon} key={idx} />
        )}
      </FeedCardActions>
      <FeedCardActionsItem data={iconActions[3]} />
    </div>
  );
};
